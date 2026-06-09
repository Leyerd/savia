// Identificación de alimentos por IA usando la API gratuita de Google Gemini.
// Obtén tu API key gratis en https://aistudio.google.com/apikey y pégala en Ajustes.
// (La key se guarda solo en tu dispositivo, en localStorage.)

export interface AIFoodResult {
  name: string;
  kcal: number;       // por porción estimada
  protein: number;
  carbs: number;
  fat: number;
  grams: number;      // gramos estimados de la porción en la foto
  confidence: number; // 0..1
  notes?: string;
}

const MODEL = "gemini-2.0-flash";

const PROMPT = `Eres un nutricionista experto en comida chilena y mundial, especializado en estimar porciones a partir de fotos.
Analiza la imagen y:
1. Identifica el alimento o plato principal (en español, específico: ej. "cazuela de vacuno", "completo italiano").
2. ESTIMA LA CANTIDAD en gramos usando referencias visuales: tamaño del plato/vaso (un plato hondo ~22 cm, un vaso ~250 ml), cubiertos, manos, o el envase. Considera la altura/volumen de la comida, no solo el área. Si hay un empaque con peso visible, úsalo.
3. Calcula los macros TOTALES para esa porción estimada (no por 100 g).
Si dudas, da tu mejor estimación y baja el "confidence".
Responde SOLO con un JSON válido, sin texto extra, con este formato exacto:
{"name": "nombre en español", "grams": number, "kcal": number, "protein": number, "carbs": number, "fat": number, "confidence": number_entre_0_y_1, "notes": "cómo estimaste la porción, breve"}`;

export async function identifyFood(
  base64Image: string,
  apiKey: string,
  mimeType = "image/jpeg"
): Promise<AIFoodResult> {
  if (!apiKey) throw new Error("Falta la API key de Gemini. Configúrala en Ajustes.");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [
      {
        parts: [
          { text: PROMPT },
          { inline_data: { mime_type: mimeType, data: base64Image } },
        ],
      },
    ],
    generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini ${res.status}: ${txt.slice(0, 200)}`);
  }

  const data = await res.json();
  const text: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Respuesta vacía de Gemini.");

  const cleaned = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return {
    name: String(parsed.name ?? "Alimento"),
    grams: Number(parsed.grams ?? 100),
    kcal: Math.round(Number(parsed.kcal ?? 0)),
    protein: Math.round(Number(parsed.protein ?? 0)),
    carbs: Math.round(Number(parsed.carbs ?? 0)),
    fat: Math.round(Number(parsed.fat ?? 0)),
    confidence: Number(parsed.confidence ?? 0.5),
    notes: parsed.notes ? String(parsed.notes) : undefined,
  };
}

// Convierte un File/Blob a base64 (sin el prefijo data:).
export function fileToBase64(file: Blob): Promise<{ data: string; mime: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [meta, data] = result.split(",");
      const mime = /data:(.*?);/.exec(meta)?.[1] ?? "image/jpeg";
      resolve({ data, mime });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
