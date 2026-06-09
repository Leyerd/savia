// Búsqueda de productos por código de barras usando Open Food Facts (OFF).
// API pública y gratuita, sin key. Gran cobertura de marcas chilenas y mundiales.
// Devuelve valores nutricionales por 100 g/ml para encajar con nuestra base.

export interface BarcodeProduct {
  code: string;
  name: string;
  brand?: string;
  kcal: number; // por 100 g/ml
  p: number;
  c: number;
  f: number;
  portion?: number;      // tamaño de porción del envase, si existe (g)
  portionLabel?: string; // ej. "1 porción (30 g)"
  image?: string;
  isLiquid: boolean;
}

function num(v: unknown): number {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
}

// Extrae los gramos de un texto de porción tipo "30 g", "1 unidad (25g)".
function parsePortion(serving?: string): number | undefined {
  if (!serving) return undefined;
  const m = serving.match(/(\d+(?:[.,]\d+)?)\s*(g|ml)/i);
  if (!m) return undefined;
  const g = parseFloat(m[1].replace(",", "."));
  return g > 0 ? Math.round(g) : undefined;
}

/**
 * Consulta un código de barras en Open Food Facts.
 * Devuelve null si no existe o no trae datos nutricionales útiles.
 */
export async function lookupBarcode(code: string): Promise<BarcodeProduct | null> {
  const clean = code.trim().replace(/\D/g, "");
  if (!clean) return null;

  const url = `https://world.openfoodfacts.org/api/v2/product/${clean}.json?fields=product_name,product_name_es,brands,nutriments,serving_size,quantity,image_front_small_url`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Open Food Facts ${res.status}`);

  const data = await res.json();
  if (data.status !== 1 || !data.product) return null;

  const prod = data.product;
  const nut = prod.nutriments ?? {};

  // kcal por 100 g; si solo viene en kJ, convertir (1 kcal = 4.184 kJ).
  let kcal = num(nut["energy-kcal_100g"]);
  if (!kcal && nut["energy_100g"]) kcal = Math.round(num(nut["energy_100g"]) / 4.184);

  const p = num(nut["proteins_100g"]);
  const c = num(nut["carbohydrates_100g"]);
  const f = num(nut["fat_100g"]);

  // Sin ningún macro útil no sirve.
  if (kcal === 0 && p === 0 && c === 0 && f === 0) return null;

  const name = String(prod.product_name_es || prod.product_name || "Producto").trim();
  const brand = prod.brands ? String(prod.brands).split(",")[0].trim() : undefined;
  const portion = parsePortion(prod.serving_size);
  const isLiquid = /ml|cl|l\b/i.test(String(prod.quantity ?? "")) || /ml/i.test(String(prod.serving_size ?? ""));

  return {
    code: clean,
    name,
    brand,
    kcal: Math.round(kcal),
    p: Math.round(p * 10) / 10,
    c: Math.round(c * 10) / 10,
    f: Math.round(f * 10) / 10,
    portion,
    portionLabel: portion ? `1 porción (${portion} g)` : undefined,
    image: prod.image_front_small_url ? String(prod.image_front_small_url) : undefined,
    isLiquid,
  };
}
