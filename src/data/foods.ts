// ============================================================================
// BASE DE DATOS DE ALIMENTOS — macros por 100 g (o 100 ml en líquidos).
// kcal, p=proteína(g), c=carbohidratos(g), f=grasa(g). portion = porción típica en g.
//
// FUENTES / FIABILIDAD:
//  - Alimentos simples (frutas, verduras, carnes, lácteos, cereales, huevos):
//    valores alineados con USDA FoodData Central (SR Legacy, dominio público)
//    https://fdc.nal.usda.gov  — verificados por muestreo.
//  - Platos compuestos (chilenos, comida rápida y mundial): estimación por
//    receta típica/porción estándar (composición de ingredientes USDA).
//    Son aproximaciones razonables; las porciones reales varían según preparación.
// ============================================================================

export type FoodCategory =
  | "Panes y masas"
  | "Lácteos y quesos"
  | "Fiambres y jamones"
  | "Galletas y dulces"
  | "Postres"
  | "Snacks"
  | "Frutas"
  | "Verduras"
  | "Legumbres y cereales"
  | "Carnes"
  | "Pescados y mariscos"
  | "Huevos"
  | "Frutos secos"
  | "Grasas y aceites"
  | "Salsas y condimentos"
  | "Bebidas"
  | "Suplementos"
  | "Sopas y caldos"
  | "Comida rápida"
  | "Platos chilenos"
  | "Platos globales";

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  kcal: number;
  p: number;
  c: number;
  f: number;
  portion: number; // gramos de 1 porción típica
  portionLabel: string;
}

export const FOODS: Food[] = [
  // ======================= PANES Y MASAS =======================
  { id: "marraqueta", name: "Marraqueta (pan batido)", category: "Panes y masas", kcal: 271, p: 8.5, c: 55, f: 1.4, portion: 100, portionLabel: "1 marraqueta" },
  { id: "hallulla", name: "Hallulla", category: "Panes y masas", kcal: 305, p: 8, c: 53, f: 6.5, portion: 80, portionLabel: "1 hallulla" },
  { id: "pan-amasado", name: "Pan amasado", category: "Panes y masas", kcal: 290, p: 7.5, c: 52, f: 6, portion: 90, portionLabel: "1 pan" },
  { id: "pan-molde-blanco", name: "Pan de molde blanco", category: "Panes y masas", kcal: 265, p: 8, c: 49, f: 3.5, portion: 28, portionLabel: "1 rebanada" },
  { id: "pan-molde-integral", name: "Pan de molde integral", category: "Panes y masas", kcal: 247, p: 11, c: 41, f: 4, portion: 30, portionLabel: "1 rebanada" },
  { id: "pan-centeno", name: "Pan de centeno", category: "Panes y masas", kcal: 259, p: 8.5, c: 48, f: 3.3, portion: 32, portionLabel: "1 rebanada" },
  { id: "pan-pita", name: "Pan pita", category: "Panes y masas", kcal: 275, p: 9, c: 55, f: 1.2, portion: 60, portionLabel: "1 pan" },
  { id: "pan-hamburguesa", name: "Pan de hamburguesa", category: "Panes y masas", kcal: 290, p: 9, c: 50, f: 5, portion: 60, portionLabel: "1 pan" },
  { id: "pan-hot-dog", name: "Pan de completo", category: "Panes y masas", kcal: 280, p: 8.5, c: 51, f: 4.5, portion: 55, portionLabel: "1 pan" },
  { id: "dobladita", name: "Dobladita / tortilla de rescoldo", category: "Panes y masas", kcal: 290, p: 7.5, c: 52, f: 5.5, portion: 70, portionLabel: "1 unidad" },
  { id: "tortilla-trigo", name: "Tortilla de trigo", category: "Panes y masas", kcal: 310, p: 8, c: 50, f: 8, portion: 40, portionLabel: "1 tortilla" },
  { id: "tortilla-maiz", name: "Tortilla de maíz", category: "Panes y masas", kcal: 218, p: 5.7, c: 45, f: 2.9, portion: 30, portionLabel: "1 tortilla" },
  { id: "croissant", name: "Croissant", category: "Panes y masas", kcal: 406, p: 8.2, c: 45, f: 21, portion: 60, portionLabel: "1 unidad" },
  { id: "baguette", name: "Baguette", category: "Panes y masas", kcal: 274, p: 9, c: 55, f: 1.4, portion: 70, portionLabel: "1 trozo" },

  // ======================= LÁCTEOS Y QUESOS =======================
  { id: "leche-entera", name: "Leche entera", category: "Lácteos y quesos", kcal: 61, p: 3.2, c: 4.8, f: 3.3, portion: 200, portionLabel: "1 vaso" },
  { id: "leche-descremada", name: "Leche descremada", category: "Lácteos y quesos", kcal: 35, p: 3.4, c: 5, f: 0.1, portion: 200, portionLabel: "1 vaso" },
  { id: "leche-condensada", name: "Leche condensada", category: "Lácteos y quesos", kcal: 321, p: 7.9, c: 54, f: 8.7, portion: 30, portionLabel: "2 cdas" },
  { id: "yogur-natural", name: "Yogur natural", category: "Lácteos y quesos", kcal: 61, p: 3.5, c: 4.7, f: 3.3, portion: 125, portionLabel: "1 pote" },
  { id: "yogur-griego", name: "Yogur griego", category: "Lácteos y quesos", kcal: 97, p: 9, c: 3.6, f: 5, portion: 150, portionLabel: "1 pote" },
  { id: "yogur-batido", name: "Yogur batido con frutas", category: "Lácteos y quesos", kcal: 85, p: 3.2, c: 14, f: 1.8, portion: 150, portionLabel: "1 pote" },
  { id: "queso-gauda", name: "Queso gauda", category: "Lácteos y quesos", kcal: 356, p: 25, c: 2.2, f: 27, portion: 30, portionLabel: "2 láminas" },
  { id: "queso-mantecoso", name: "Queso mantecoso", category: "Lácteos y quesos", kcal: 380, p: 22, c: 1.5, f: 32, portion: 30, portionLabel: "1 trozo" },
  { id: "queso-chanco", name: "Queso chanco", category: "Lácteos y quesos", kcal: 370, p: 24, c: 1, f: 30, portion: 30, portionLabel: "2 láminas" },
  { id: "queso-parmesano", name: "Queso parmesano", category: "Lácteos y quesos", kcal: 431, p: 38, c: 4.1, f: 29, portion: 15, portionLabel: "2 cdas rallado" },
  { id: "queso-mozzarella", name: "Queso mozzarella", category: "Lácteos y quesos", kcal: 300, p: 22, c: 2.2, f: 22, portion: 40, portionLabel: "1 trozo" },
  { id: "quesillo", name: "Quesillo", category: "Lácteos y quesos", kcal: 174, p: 14, c: 3, f: 12, portion: 60, portionLabel: "1 trozo" },
  { id: "queso-crema", name: "Queso crema", category: "Lácteos y quesos", kcal: 342, p: 6, c: 4, f: 34, portion: 30, portionLabel: "1 cda colmada" },
  { id: "ricotta", name: "Ricotta", category: "Lácteos y quesos", kcal: 174, p: 11, c: 3, f: 13, portion: 60, portionLabel: "1 porción" },
  { id: "crema-leche", name: "Crema de leche", category: "Lácteos y quesos", kcal: 292, p: 2.1, c: 3, f: 30, portion: 30, portionLabel: "2 cdas" },
  { id: "mantequilla", name: "Mantequilla", category: "Grasas y aceites", kcal: 717, p: 0.9, c: 0.1, f: 81, portion: 10, portionLabel: "1 cdita" },
  { id: "margarina", name: "Margarina", category: "Grasas y aceites", kcal: 717, p: 0.2, c: 0.7, f: 80, portion: 10, portionLabel: "1 cdita" },
  { id: "manjar", name: "Manjar (dulce de leche)", category: "Galletas y dulces", kcal: 315, p: 6.8, c: 55, f: 7.4, portion: 20, portionLabel: "1 cda" },

  // ======================= FIAMBRES Y JAMONES =======================
  { id: "jamon-pierna", name: "Jamón de pierna", category: "Fiambres y jamones", kcal: 145, p: 18, c: 1.5, f: 7.5, portion: 30, portionLabel: "2 láminas" },
  { id: "jamon-pavo", name: "Jamón de pavo", category: "Fiambres y jamones", kcal: 104, p: 17, c: 2, f: 3, portion: 30, portionLabel: "2 láminas" },
  { id: "jamon-acaballo", name: "Jamón acaballo", category: "Fiambres y jamones", kcal: 240, p: 16, c: 1, f: 19, portion: 30, portionLabel: "2 láminas" },
  { id: "jamon-serrano", name: "Jamón serrano", category: "Fiambres y jamones", kcal: 241, p: 31, c: 0.3, f: 13, portion: 30, portionLabel: "3 láminas" },
  { id: "mortadela", name: "Mortadela", category: "Fiambres y jamones", kcal: 311, p: 12, c: 3, f: 28, portion: 30, portionLabel: "2 láminas" },
  { id: "salame", name: "Salame", category: "Fiambres y jamones", kcal: 378, p: 22, c: 1.5, f: 31, portion: 25, portionLabel: "4 láminas" },
  { id: "tocino", name: "Tocino (bacon)", category: "Fiambres y jamones", kcal: 541, p: 37, c: 1.4, f: 42, portion: 20, portionLabel: "2 lonjas" },
  { id: "vienesa", name: "Vienesa (salchicha)", category: "Fiambres y jamones", kcal: 290, p: 11, c: 3, f: 26, portion: 50, portionLabel: "1 vienesa" },
  { id: "longaniza", name: "Longaniza", category: "Fiambres y jamones", kcal: 330, p: 18, c: 2, f: 28, portion: 70, portionLabel: "1 longaniza" },
  { id: "chorizo", name: "Chorizo", category: "Fiambres y jamones", kcal: 455, p: 24, c: 1.9, f: 38, portion: 60, portionLabel: "1 chorizo" },
  { id: "prieta", name: "Prieta (morcilla)", category: "Fiambres y jamones", kcal: 379, p: 14, c: 1.3, f: 35, portion: 80, portionLabel: "1 prieta" },
  { id: "pate", name: "Paté", category: "Fiambres y jamones", kcal: 320, p: 12, c: 2, f: 29, portion: 20, portionLabel: "1 cda" },

  // ======================= GALLETAS Y DULCES =======================
  { id: "galleta-soda", name: "Galleta de soda", category: "Galletas y dulces", kcal: 418, p: 9, c: 72, f: 10, portion: 24, portionLabel: "4 galletas" },
  { id: "galleta-agua", name: "Galleta de agua", category: "Galletas y dulces", kcal: 410, p: 9, c: 75, f: 8, portion: 24, portionLabel: "4 galletas" },
  { id: "galleta-vino", name: "Galleta vino / champaña", category: "Galletas y dulces", kcal: 430, p: 7, c: 78, f: 10, portion: 30, portionLabel: "6 galletas" },
  { id: "obleas-mckay", name: "Obleas rellenas", category: "Galletas y dulces", kcal: 510, p: 5, c: 65, f: 26, portion: 30, portionLabel: "1 paquete chico" },
  { id: "galleta-chocolate", name: "Galleta con chocolate", category: "Galletas y dulces", kcal: 490, p: 6, c: 65, f: 23, portion: 30, portionLabel: "2 galletas" },
  { id: "alfajor", name: "Alfajor", category: "Galletas y dulces", kcal: 420, p: 5, c: 60, f: 18, portion: 50, portionLabel: "1 alfajor" },
  { id: "chocolate-leche", name: "Chocolate de leche", category: "Galletas y dulces", kcal: 535, p: 7.6, c: 59, f: 30, portion: 25, portionLabel: "1/4 barra" },
  { id: "chocolate-amargo", name: "Chocolate amargo 70%", category: "Galletas y dulces", kcal: 598, p: 7.8, c: 46, f: 43, portion: 20, portionLabel: "2 cuadros" },
  { id: "mermelada", name: "Mermelada", category: "Galletas y dulces", kcal: 250, p: 0.4, c: 62, f: 0.1, portion: 20, portionLabel: "1 cda" },
  { id: "nutella", name: "Crema de avellanas (Nutella)", category: "Galletas y dulces", kcal: 539, p: 6.3, c: 57, f: 31, portion: 20, portionLabel: "1 cda" },
  { id: "azucar", name: "Azúcar", category: "Galletas y dulces", kcal: 387, p: 0, c: 100, f: 0, portion: 8, portionLabel: "1 cdita" },
  { id: "miel", name: "Miel", category: "Galletas y dulces", kcal: 304, p: 0.3, c: 82, f: 0, portion: 12, portionLabel: "1 cda" },

  // ======================= POSTRES =======================
  { id: "helado-vainilla", name: "Helado de vainilla", category: "Postres", kcal: 207, p: 3.5, c: 24, f: 11, portion: 100, portionLabel: "2 bolas" },
  { id: "helado-agua", name: "Helado de agua (fruta)", category: "Postres", kcal: 110, p: 0.3, c: 27, f: 0.1, portion: 80, portionLabel: "1 paleta" },
  { id: "torta-chocolate", name: "Torta de chocolate", category: "Postres", kcal: 370, p: 5, c: 50, f: 17, portion: 110, portionLabel: "1 trozo" },
  { id: "torta-milhojas", name: "Torta mil hojas", category: "Postres", kcal: 410, p: 5, c: 48, f: 22, portion: 110, portionLabel: "1 trozo" },
  { id: "brazo-reina", name: "Brazo de reina", category: "Postres", kcal: 330, p: 6, c: 50, f: 11, portion: 90, portionLabel: "1 trozo" },
  { id: "kuchen", name: "Kuchen de frutas", category: "Postres", kcal: 290, p: 5, c: 40, f: 12, portion: 100, portionLabel: "1 trozo" },
  { id: "cheesecake", name: "Cheesecake", category: "Postres", kcal: 321, p: 6, c: 26, f: 22, portion: 110, portionLabel: "1 trozo" },
  { id: "leche-asada", name: "Leche asada", category: "Postres", kcal: 145, p: 5, c: 20, f: 5, portion: 150, portionLabel: "1 porción" },
  { id: "arroz-con-leche", name: "Arroz con leche", category: "Postres", kcal: 130, p: 3.2, c: 23, f: 2.5, portion: 180, portionLabel: "1 pote" },
  { id: "semola-leche", name: "Sémola con leche", category: "Postres", kcal: 110, p: 3.5, c: 19, f: 2.2, portion: 180, portionLabel: "1 pote" },
  { id: "flan", name: "Flan de huevo", category: "Postres", kcal: 145, p: 4, c: 23, f: 4, portion: 120, portionLabel: "1 unidad" },
  { id: "mousse-chocolate", name: "Mousse de chocolate", category: "Postres", kcal: 225, p: 4, c: 24, f: 13, portion: 100, portionLabel: "1 pote" },
  { id: "picarones", name: "Picarones", category: "Postres", kcal: 280, p: 4, c: 45, f: 9, portion: 120, portionLabel: "3 unidades" },
  { id: "calzones-rotos", name: "Calzones rotos", category: "Postres", kcal: 420, p: 6, c: 55, f: 20, portion: 60, portionLabel: "3 unidades" },
  { id: "berlin", name: "Berlín", category: "Postres", kcal: 360, p: 6, c: 48, f: 16, portion: 80, portionLabel: "1 berlín" },
  { id: "sopaipilla-pasada", name: "Sopaipillas pasadas", category: "Postres", kcal: 230, p: 3, c: 38, f: 8, portion: 150, portionLabel: "1 porción" },
  { id: "mote-huesillo", name: "Mote con huesillo", category: "Postres", kcal: 110, p: 1.2, c: 27, f: 0.2, portion: 300, portionLabel: "1 vaso grande" },
  { id: "pan-pascua", name: "Pan de pascua", category: "Postres", kcal: 360, p: 5, c: 58, f: 12, portion: 80, portionLabel: "1 trozo" },
  { id: "panqueque-manjar", name: "Panqueque con manjar", category: "Postres", kcal: 270, p: 6, c: 40, f: 9, portion: 120, portionLabel: "1 unidad" },

  // ======================= SNACKS =======================
  { id: "papas-fritas-bolsa", name: "Papas fritas (bolsa)", category: "Snacks", kcal: 536, p: 6, c: 53, f: 34, portion: 30, portionLabel: "1 bolsa chica" },
  { id: "ramitas", name: "Ramitas / palitos", category: "Snacks", kcal: 480, p: 9, c: 60, f: 22, portion: 30, portionLabel: "1 puñado" },
  { id: "suflitos", name: "Suflitos de queso", category: "Snacks", kcal: 520, p: 6, c: 56, f: 30, portion: 25, portionLabel: "1 bolsa chica" },
  { id: "doritos", name: "Nachos / Doritos", category: "Snacks", kcal: 498, p: 7, c: 63, f: 24, portion: 30, portionLabel: "1 puñado" },
  { id: "palomitas", name: "Cabritas (palomitas)", category: "Snacks", kcal: 387, p: 12, c: 78, f: 4, portion: 25, portionLabel: "1 taza" },
  { id: "barra-cereal", name: "Barra de cereal", category: "Snacks", kcal: 380, p: 6, c: 70, f: 9, portion: 25, portionLabel: "1 barra" },
  { id: "galleta-arroz", name: "Galleta de arroz", category: "Snacks", kcal: 387, p: 8, c: 81, f: 3, portion: 18, portionLabel: "2 galletas" },

  // ======================= FRUTAS =======================
  { id: "manzana", name: "Manzana", category: "Frutas", kcal: 52, p: 0.3, c: 14, f: 0.2, portion: 150, portionLabel: "1 unidad" },
  { id: "platano", name: "Plátano", category: "Frutas", kcal: 89, p: 1.1, c: 23, f: 0.3, portion: 120, portionLabel: "1 unidad" },
  { id: "naranja", name: "Naranja", category: "Frutas", kcal: 47, p: 0.9, c: 12, f: 0.1, portion: 130, portionLabel: "1 unidad" },
  { id: "pera", name: "Pera", category: "Frutas", kcal: 57, p: 0.4, c: 15, f: 0.1, portion: 150, portionLabel: "1 unidad" },
  { id: "uva", name: "Uva", category: "Frutas", kcal: 69, p: 0.7, c: 18, f: 0.2, portion: 100, portionLabel: "1 racimo chico" },
  { id: "frutilla", name: "Frutillas", category: "Frutas", kcal: 32, p: 0.7, c: 7.7, f: 0.3, portion: 150, portionLabel: "1 taza" },
  { id: "palta", name: "Palta", category: "Frutas", kcal: 160, p: 2, c: 9, f: 15, portion: 70, portionLabel: "1/2 palta" },
  { id: "kiwi", name: "Kiwi", category: "Frutas", kcal: 61, p: 1.1, c: 15, f: 0.5, portion: 75, portionLabel: "1 unidad" },
  { id: "sandia", name: "Sandía", category: "Frutas", kcal: 30, p: 0.6, c: 7.6, f: 0.2, portion: 200, portionLabel: "1 tajada" },
  { id: "melon", name: "Melón", category: "Frutas", kcal: 34, p: 0.8, c: 8, f: 0.2, portion: 200, portionLabel: "1 tajada" },
  { id: "durazno", name: "Durazno", category: "Frutas", kcal: 39, p: 0.9, c: 10, f: 0.3, portion: 120, portionLabel: "1 unidad" },
  { id: "ciruela", name: "Ciruela", category: "Frutas", kcal: 46, p: 0.7, c: 11, f: 0.3, portion: 70, portionLabel: "1 unidad" },
  { id: "mandarina", name: "Mandarina", category: "Frutas", kcal: 53, p: 0.8, c: 13, f: 0.3, portion: 90, portionLabel: "1 unidad" },
  { id: "arandano", name: "Arándanos", category: "Frutas", kcal: 57, p: 0.7, c: 14, f: 0.3, portion: 80, portionLabel: "1 puñado" },
  { id: "frambuesa", name: "Frambuesas", category: "Frutas", kcal: 52, p: 1.2, c: 12, f: 0.7, portion: 80, portionLabel: "1 puñado" },
  { id: "pina", name: "Piña", category: "Frutas", kcal: 50, p: 0.5, c: 13, f: 0.1, portion: 120, portionLabel: "1 tajada" },
  { id: "mango", name: "Mango", category: "Frutas", kcal: 60, p: 0.8, c: 15, f: 0.4, portion: 120, portionLabel: "1/2 unidad" },
  { id: "palta-hass", name: "Cereza", category: "Frutas", kcal: 63, p: 1.1, c: 16, f: 0.2, portion: 80, portionLabel: "1 puñado" },
  { id: "limon", name: "Limón", category: "Frutas", kcal: 29, p: 1.1, c: 9, f: 0.3, portion: 60, portionLabel: "1 unidad" },

  // ======================= VERDURAS =======================
  { id: "tomate", name: "Tomate", category: "Verduras", kcal: 18, p: 0.9, c: 3.9, f: 0.2, portion: 120, portionLabel: "1 unidad" },
  { id: "lechuga", name: "Lechuga", category: "Verduras", kcal: 15, p: 1.4, c: 2.9, f: 0.2, portion: 50, portionLabel: "1 plato" },
  { id: "zanahoria", name: "Zanahoria", category: "Verduras", kcal: 41, p: 0.9, c: 10, f: 0.2, portion: 80, portionLabel: "1 unidad" },
  { id: "cebolla", name: "Cebolla", category: "Verduras", kcal: 40, p: 1.1, c: 9, f: 0.1, portion: 60, portionLabel: "1/2 unidad" },
  { id: "pepino", name: "Pepino", category: "Verduras", kcal: 15, p: 0.7, c: 3.6, f: 0.1, portion: 100, portionLabel: "1/2 unidad" },
  { id: "brocoli", name: "Brócoli", category: "Verduras", kcal: 34, p: 2.8, c: 7, f: 0.4, portion: 100, portionLabel: "1 taza" },
  { id: "coliflor", name: "Coliflor", category: "Verduras", kcal: 25, p: 1.9, c: 5, f: 0.3, portion: 100, portionLabel: "1 taza" },
  { id: "papa", name: "Papa cocida", category: "Verduras", kcal: 87, p: 1.9, c: 20, f: 0.1, portion: 150, portionLabel: "1 unidad media" },
  { id: "pure-papas", name: "Puré de papas", category: "Verduras", kcal: 108, p: 2, c: 16, f: 4.2, portion: 200, portionLabel: "1 porción" },
  { id: "choclo", name: "Choclo", category: "Verduras", kcal: 96, p: 3.4, c: 21, f: 1.5, portion: 100, portionLabel: "1/2 taza" },
  { id: "zapallo", name: "Zapallo", category: "Verduras", kcal: 26, p: 1, c: 6.5, f: 0.1, portion: 100, portionLabel: "1 trozo" },
  { id: "zapallo-italiano", name: "Zapallo italiano (zucchini)", category: "Verduras", kcal: 17, p: 1.2, c: 3.1, f: 0.3, portion: 120, portionLabel: "1 unidad" },
  { id: "espinaca", name: "Espinaca", category: "Verduras", kcal: 23, p: 2.9, c: 3.6, f: 0.4, portion: 80, portionLabel: "1 plato" },
  { id: "acelga", name: "Acelga", category: "Verduras", kcal: 19, p: 1.8, c: 3.7, f: 0.2, portion: 100, portionLabel: "1 plato" },
  { id: "porotos-verdes", name: "Porotos verdes", category: "Verduras", kcal: 31, p: 1.8, c: 7, f: 0.2, portion: 100, portionLabel: "1 taza" },
  { id: "betarraga", name: "Betarraga", category: "Verduras", kcal: 43, p: 1.6, c: 10, f: 0.2, portion: 80, portionLabel: "1/2 taza" },
  { id: "pimenton", name: "Pimentón", category: "Verduras", kcal: 31, p: 1, c: 6, f: 0.3, portion: 80, portionLabel: "1/2 unidad" },
  { id: "champinon", name: "Champiñón", category: "Verduras", kcal: 22, p: 3.1, c: 3.3, f: 0.3, portion: 80, portionLabel: "1 taza" },
  { id: "palta-aji", name: "Ají verde", category: "Verduras", kcal: 40, p: 1.9, c: 9, f: 0.4, portion: 20, portionLabel: "1 unidad" },

  // ======================= LEGUMBRES Y CEREALES =======================
  { id: "arroz", name: "Arroz blanco cocido", category: "Legumbres y cereales", kcal: 130, p: 2.7, c: 28, f: 0.3, portion: 150, portionLabel: "1 taza" },
  { id: "arroz-integral", name: "Arroz integral cocido", category: "Legumbres y cereales", kcal: 123, p: 2.7, c: 26, f: 1, portion: 150, portionLabel: "1 taza" },
  { id: "fideos", name: "Fideos cocidos", category: "Legumbres y cereales", kcal: 158, p: 5.8, c: 31, f: 0.9, portion: 150, portionLabel: "1 plato" },
  { id: "porotos", name: "Porotos cocidos", category: "Legumbres y cereales", kcal: 127, p: 8.7, c: 22, f: 0.5, portion: 150, portionLabel: "1 taza" },
  { id: "lentejas", name: "Lentejas cocidas", category: "Legumbres y cereales", kcal: 116, p: 9, c: 20, f: 0.4, portion: 150, portionLabel: "1 taza" },
  { id: "garbanzos", name: "Garbanzos cocidos", category: "Legumbres y cereales", kcal: 164, p: 8.9, c: 27, f: 2.6, portion: 150, portionLabel: "1 taza" },
  { id: "arvejas", name: "Arvejas", category: "Legumbres y cereales", kcal: 84, p: 5.4, c: 16, f: 0.2, portion: 100, portionLabel: "1/2 taza" },
  { id: "quinoa", name: "Quínoa cocida", category: "Legumbres y cereales", kcal: 120, p: 4.4, c: 21, f: 1.9, portion: 150, portionLabel: "1 taza" },
  { id: "avena-hojuelas", name: "Avena en hojuelas", category: "Legumbres y cereales", kcal: 389, p: 16.9, c: 66, f: 6.9, portion: 40, portionLabel: "1/2 taza" },
  { id: "cereal-azucarado", name: "Cereal azucarado", category: "Legumbres y cereales", kcal: 380, p: 6, c: 84, f: 3, portion: 30, portionLabel: "1 taza" },
  { id: "harina", name: "Harina de trigo", category: "Legumbres y cereales", kcal: 364, p: 10, c: 76, f: 1, portion: 30, portionLabel: "2 cdas" },

  // ======================= CARNES =======================
  { id: "pollo-pechuga", name: "Pechuga de pollo", category: "Carnes", kcal: 165, p: 31, c: 0, f: 3.6, portion: 150, portionLabel: "1 filete" },
  { id: "pollo-trutro", name: "Trutro de pollo", category: "Carnes", kcal: 209, p: 26, c: 0, f: 11, portion: 120, portionLabel: "1 trutro" },
  { id: "vacuno-posta", name: "Posta de vacuno", category: "Carnes", kcal: 187, p: 27, c: 0, f: 8, portion: 150, portionLabel: "1 bistec" },
  { id: "vacuno-lomo", name: "Lomo vetado", category: "Carnes", kcal: 250, p: 26, c: 0, f: 16, portion: 150, portionLabel: "1 bistec" },
  { id: "vacuno-molida", name: "Carne molida", category: "Carnes", kcal: 250, p: 26, c: 0, f: 17, portion: 120, portionLabel: "1 porción" },
  { id: "plateada", name: "Plateada", category: "Carnes", kcal: 280, p: 25, c: 0, f: 20, portion: 150, portionLabel: "1 porción" },
  { id: "cerdo-chuleta", name: "Chuleta de cerdo", category: "Carnes", kcal: 231, p: 26, c: 0, f: 14, portion: 150, portionLabel: "1 chuleta" },
  { id: "cerdo-costillar", name: "Costillar de cerdo", category: "Carnes", kcal: 290, p: 22, c: 0, f: 22, portion: 180, portionLabel: "1 porción" },
  { id: "pavo", name: "Pavo (pechuga)", category: "Carnes", kcal: 135, p: 30, c: 0, f: 1, portion: 150, portionLabel: "1 filete" },
  { id: "pollo-asado", name: "Pollo asado entero", category: "Carnes", kcal: 215, p: 27, c: 0, f: 12, portion: 200, portionLabel: "1/4 pollo" },

  // ======================= PESCADOS Y MARISCOS =======================
  { id: "merluza", name: "Merluza", category: "Pescados y mariscos", kcal: 90, p: 18, c: 0, f: 2, portion: 150, portionLabel: "1 filete" },
  { id: "salmon", name: "Salmón", category: "Pescados y mariscos", kcal: 208, p: 20, c: 0, f: 13, portion: 150, portionLabel: "1 filete" },
  { id: "atun-lata", name: "Atún en agua (lata)", category: "Pescados y mariscos", kcal: 116, p: 26, c: 0, f: 1, portion: 80, portionLabel: "1 lata" },
  { id: "jurel-lata", name: "Jurel en lata", category: "Pescados y mariscos", kcal: 170, p: 20, c: 0, f: 10, portion: 100, portionLabel: "1/2 lata" },
  { id: "reineta", name: "Reineta", category: "Pescados y mariscos", kcal: 110, p: 21, c: 0, f: 2.5, portion: 150, portionLabel: "1 filete" },
  { id: "congrio", name: "Congrio", category: "Pescados y mariscos", kcal: 110, p: 19, c: 0, f: 3.5, portion: 150, portionLabel: "1 filete" },
  { id: "machas", name: "Machas", category: "Pescados y mariscos", kcal: 86, p: 14, c: 3, f: 1.5, portion: 100, portionLabel: "1 porción" },
  { id: "camaron", name: "Camarones", category: "Pescados y mariscos", kcal: 99, p: 24, c: 0.2, f: 0.3, portion: 100, portionLabel: "1 porción" },
  { id: "choritos", name: "Choritos (mejillones)", category: "Pescados y mariscos", kcal: 86, p: 12, c: 3.7, f: 2.2, portion: 100, portionLabel: "1 porción" },
  { id: "ostiones", name: "Ostiones", category: "Pescados y mariscos", kcal: 88, p: 17, c: 2.4, f: 0.8, portion: 100, portionLabel: "1 porción" },

  // ======================= HUEVOS =======================
  { id: "huevo", name: "Huevo", category: "Huevos", kcal: 143, p: 12.6, c: 0.7, f: 9.5, portion: 55, portionLabel: "1 huevo" },
  { id: "huevo-frito", name: "Huevo frito", category: "Huevos", kcal: 196, p: 13.6, c: 0.8, f: 15, portion: 60, portionLabel: "1 huevo" },
  { id: "clara-huevo", name: "Clara de huevo", category: "Huevos", kcal: 52, p: 11, c: 0.7, f: 0.2, portion: 33, portionLabel: "1 clara" },
  { id: "huevo-revuelto", name: "Huevos revueltos", category: "Huevos", kcal: 166, p: 11, c: 1.6, f: 12, portion: 120, portionLabel: "2 huevos" },
  { id: "tortilla-huevo", name: "Tortilla de huevo (omelette)", category: "Huevos", kcal: 154, p: 11, c: 1, f: 11, portion: 120, portionLabel: "1 porción" },

  // ======================= FRUTOS SECOS =======================
  { id: "almendra", name: "Almendras", category: "Frutos secos", kcal: 579, p: 21, c: 22, f: 50, portion: 20, portionLabel: "1 puñado" },
  { id: "nuez", name: "Nueces", category: "Frutos secos", kcal: 654, p: 15, c: 14, f: 65, portion: 20, portionLabel: "1 puñado" },
  { id: "mani", name: "Maní", category: "Frutos secos", kcal: 567, p: 26, c: 16, f: 49, portion: 20, portionLabel: "1 puñado" },
  { id: "mantequilla-mani", name: "Mantequilla de maní", category: "Frutos secos", kcal: 588, p: 25, c: 20, f: 50, portion: 16, portionLabel: "1 cda" },
  { id: "pistacho", name: "Pistachos", category: "Frutos secos", kcal: 560, p: 20, c: 28, f: 45, portion: 20, portionLabel: "1 puñado" },
  { id: "castana-caju", name: "Castañas de cajú", category: "Frutos secos", kcal: 553, p: 18, c: 30, f: 44, portion: 20, portionLabel: "1 puñado" },
  { id: "pasas", name: "Pasas", category: "Frutos secos", kcal: 299, p: 3.1, c: 79, f: 0.5, portion: 25, portionLabel: "1 puñado" },

  // ======================= GRASAS Y ACEITES =======================
  { id: "aceite-oliva", name: "Aceite de oliva", category: "Grasas y aceites", kcal: 884, p: 0, c: 0, f: 100, portion: 10, portionLabel: "1 cda" },
  { id: "aceite-vegetal", name: "Aceite vegetal", category: "Grasas y aceites", kcal: 884, p: 0, c: 0, f: 100, portion: 10, portionLabel: "1 cda" },

  // ======================= SALSAS Y CONDIMENTOS =======================
  { id: "mayonesa", name: "Mayonesa", category: "Salsas y condimentos", kcal: 680, p: 1, c: 1, f: 75, portion: 15, portionLabel: "1 cda" },
  { id: "ketchup", name: "Ketchup", category: "Salsas y condimentos", kcal: 112, p: 1.3, c: 27, f: 0.1, portion: 17, portionLabel: "1 cda" },
  { id: "mostaza", name: "Mostaza", category: "Salsas y condimentos", kcal: 66, p: 4, c: 5, f: 3.3, portion: 15, portionLabel: "1 cda" },
  { id: "salsa-tomate", name: "Salsa de tomate", category: "Salsas y condimentos", kcal: 32, p: 1.3, c: 7, f: 0.2, portion: 60, portionLabel: "1/4 taza" },
  { id: "pebre", name: "Pebre", category: "Salsas y condimentos", kcal: 60, p: 1, c: 5, f: 4, portion: 40, portionLabel: "2 cdas" },
  { id: "palta-molida", name: "Palta molida (guacamole simple)", category: "Salsas y condimentos", kcal: 165, p: 2, c: 9, f: 14, portion: 50, portionLabel: "2 cdas" },
  { id: "salsa-soya", name: "Salsa de soya", category: "Salsas y condimentos", kcal: 53, p: 8, c: 4.9, f: 0.6, portion: 15, portionLabel: "1 cda" },

  // ======================= BEBIDAS =======================
  { id: "agua", name: "Agua", category: "Bebidas", kcal: 0, p: 0, c: 0, f: 0, portion: 250, portionLabel: "1 vaso" },
  { id: "bebida-cola", name: "Bebida cola", category: "Bebidas", kcal: 42, p: 0, c: 10.6, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "bebida-light", name: "Bebida light/zero", category: "Bebidas", kcal: 0, p: 0, c: 0, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "jugo-naranja", name: "Jugo de naranja natural", category: "Bebidas", kcal: 45, p: 0.7, c: 10, f: 0.2, portion: 250, portionLabel: "1 vaso" },
  { id: "jugo-polvo", name: "Jugo en polvo (preparado)", category: "Bebidas", kcal: 38, p: 0, c: 9.5, f: 0, portion: 250, portionLabel: "1 vaso" },
  { id: "energetica", name: "Bebida energética", category: "Bebidas", kcal: 45, p: 0, c: 11, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "cerveza", name: "Cerveza", category: "Bebidas", kcal: 43, p: 0.5, c: 3.6, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "vino", name: "Vino tinto", category: "Bebidas", kcal: 85, p: 0.1, c: 2.6, f: 0, portion: 150, portionLabel: "1 copa" },
  { id: "pisco", name: "Pisco / destilado", category: "Bebidas", kcal: 231, p: 0, c: 0, f: 0, portion: 45, portionLabel: "1 trago" },
  { id: "cafe-negro", name: "Café negro", category: "Bebidas", kcal: 2, p: 0.1, c: 0, f: 0, portion: 200, portionLabel: "1 taza" },
  { id: "cafe-leche", name: "Café con leche", category: "Bebidas", kcal: 55, p: 3, c: 5, f: 2.5, portion: 200, portionLabel: "1 taza" },
  { id: "te", name: "Té", category: "Bebidas", kcal: 1, p: 0, c: 0.2, f: 0, portion: 200, portionLabel: "1 taza" },
  { id: "cola-mono", name: "Cola de mono", category: "Bebidas", kcal: 180, p: 2.5, c: 22, f: 6, portion: 200, portionLabel: "1 vaso" },
  { id: "batido-proteico", name: "Batido proteico con leche", category: "Bebidas", kcal: 95, p: 9, c: 8, f: 3, portion: 300, portionLabel: "1 vaso" },

  // ======================= COMIDA RÁPIDA =======================
  { id: "completo", name: "Completo italiano", category: "Comida rápida", kcal: 250, p: 8, c: 22, f: 15, portion: 250, portionLabel: "1 completo" },
  { id: "completo-clasico", name: "Completo (palta-mayo-tomate)", category: "Comida rápida", kcal: 270, p: 8, c: 24, f: 16, portion: 260, portionLabel: "1 completo" },
  { id: "as-chileno", name: "As (sándwich de carne)", category: "Comida rápida", kcal: 270, p: 14, c: 24, f: 13, portion: 280, portionLabel: "1 sándwich" },
  { id: "barros-luco", name: "Barros Luco", category: "Comida rápida", kcal: 290, p: 16, c: 24, f: 14, portion: 280, portionLabel: "1 sándwich" },
  { id: "barros-jarpa", name: "Barros Jarpa", category: "Comida rápida", kcal: 295, p: 14, c: 25, f: 15, portion: 250, portionLabel: "1 sándwich" },
  { id: "chacarero", name: "Chacarero", category: "Comida rápida", kcal: 240, p: 13, c: 25, f: 9, portion: 320, portionLabel: "1 sándwich" },
  { id: "churrasco", name: "Churrasco italiano", category: "Comida rápida", kcal: 260, p: 13, c: 24, f: 12, portion: 280, portionLabel: "1 sándwich" },
  { id: "ave-palta", name: "Sándwich ave-palta", category: "Comida rápida", kcal: 230, p: 11, c: 22, f: 11, portion: 220, portionLabel: "1 sándwich" },
  { id: "lomito", name: "Lomito completo", category: "Comida rápida", kcal: 280, p: 14, c: 23, f: 15, portion: 300, portionLabel: "1 sándwich" },
  { id: "mechada", name: "Sándwich de mechada", category: "Comida rápida", kcal: 275, p: 15, c: 24, f: 13, portion: 300, portionLabel: "1 sándwich" },
  { id: "hamburguesa", name: "Hamburguesa con queso", category: "Comida rápida", kcal: 295, p: 15, c: 24, f: 15, portion: 200, portionLabel: "1 hamburguesa" },
  { id: "hamburguesa-doble", name: "Hamburguesa doble", category: "Comida rápida", kcal: 320, p: 18, c: 22, f: 18, portion: 280, portionLabel: "1 hamburguesa" },
  { id: "papas-fritas", name: "Papas fritas (porción)", category: "Comida rápida", kcal: 312, p: 3.4, c: 41, f: 15, portion: 150, portionLabel: "1 porción" },
  { id: "aros-cebolla", name: "Aros de cebolla", category: "Comida rápida", kcal: 332, p: 4.6, c: 38, f: 18, portion: 100, portionLabel: "1 porción" },
  { id: "nuggets", name: "Nuggets de pollo", category: "Comida rápida", kcal: 296, p: 15, c: 16, f: 19, portion: 100, portionLabel: "6 unidades" },
  { id: "pollo-broaster", name: "Pollo broaster / frito", category: "Comida rápida", kcal: 246, p: 19, c: 8, f: 15, portion: 150, portionLabel: "1 presa" },
  { id: "alitas-bbq", name: "Alitas de pollo BBQ", category: "Comida rápida", kcal: 250, p: 18, c: 8, f: 16, portion: 150, portionLabel: "4 alitas" },
  { id: "salchipapas", name: "Salchipapas", category: "Comida rápida", kcal: 280, p: 7, c: 30, f: 15, portion: 300, portionLabel: "1 porción" },
  { id: "chorrillana", name: "Chorrillana", category: "Comida rápida", kcal: 230, p: 9, c: 18, f: 14, portion: 400, portionLabel: "1 porción" },
  { id: "pizza", name: "Pizza muzzarella", category: "Comida rápida", kcal: 266, p: 11, c: 33, f: 10, portion: 125, portionLabel: "1 trozo" },
  { id: "pizza-pepperoni", name: "Pizza pepperoni", category: "Comida rápida", kcal: 298, p: 13, c: 30, f: 14, portion: 125, portionLabel: "1 trozo" },
  { id: "hot-dog", name: "Hot dog simple", category: "Comida rápida", kcal: 247, p: 9, c: 22, f: 14, portion: 120, portionLabel: "1 unidad" },
  { id: "empanada-pino", name: "Empanada de pino", category: "Comida rápida", kcal: 270, p: 9, c: 28, f: 13, portion: 200, portionLabel: "1 empanada" },
  { id: "empanada-queso", name: "Empanada de queso (frita)", category: "Comida rápida", kcal: 320, p: 8, c: 28, f: 19, portion: 120, portionLabel: "1 empanada" },
  { id: "empanada-mariscos", name: "Empanada de mariscos", category: "Comida rápida", kcal: 250, p: 10, c: 28, f: 11, portion: 130, portionLabel: "1 empanada" },
  { id: "sopaipilla", name: "Sopaipilla", category: "Comida rápida", kcal: 350, p: 5, c: 45, f: 17, portion: 50, portionLabel: "1 sopaipilla" },
  { id: "shawarma", name: "Shawarma / kebab", category: "Comida rápida", kcal: 215, p: 14, c: 18, f: 10, portion: 300, portionLabel: "1 unidad" },
  { id: "taco", name: "Taco de carne", category: "Comida rápida", kcal: 217, p: 11, c: 20, f: 11, portion: 75, portionLabel: "1 taco" },
  { id: "burrito", name: "Burrito", category: "Comida rápida", kcal: 206, p: 9, c: 26, f: 7.5, portion: 300, portionLabel: "1 burrito" },
  { id: "donut", name: "Donut glaseado", category: "Comida rápida", kcal: 452, p: 4.9, c: 51, f: 25, portion: 60, portionLabel: "1 unidad" },

  // ======================= PLATOS CHILENOS =======================
  { id: "cazuela-vacuno", name: "Cazuela de vacuno", category: "Platos chilenos", kcal: 95, p: 7, c: 9, f: 3.5, portion: 400, portionLabel: "1 plato hondo" },
  { id: "cazuela-pollo", name: "Cazuela de pollo (ave)", category: "Platos chilenos", kcal: 85, p: 7, c: 9, f: 2.5, portion: 400, portionLabel: "1 plato hondo" },
  { id: "lentejas-longaniza", name: "Lentejas con longaniza", category: "Platos chilenos", kcal: 160, p: 9, c: 18, f: 6, portion: 350, portionLabel: "1 plato" },
  { id: "porotos-rienda", name: "Porotos con riendas", category: "Platos chilenos", kcal: 150, p: 7, c: 24, f: 3.5, portion: 350, portionLabel: "1 plato" },
  { id: "porotos-granados", name: "Porotos granados", category: "Platos chilenos", kcal: 110, p: 6, c: 18, f: 1.8, portion: 350, portionLabel: "1 plato" },
  { id: "pastel-choclo", name: "Pastel de choclo", category: "Platos chilenos", kcal: 145, p: 7, c: 17, f: 5.5, portion: 350, portionLabel: "1 porción" },
  { id: "pastel-papa", name: "Pastel de papas", category: "Platos chilenos", kcal: 140, p: 8, c: 14, f: 6, portion: 350, portionLabel: "1 porción" },
  { id: "charquican", name: "Charquicán", category: "Platos chilenos", kcal: 120, p: 6, c: 15, f: 4, portion: 350, portionLabel: "1 plato" },
  { id: "carbonada", name: "Carbonada", category: "Platos chilenos", kcal: 90, p: 5, c: 11, f: 3, portion: 400, portionLabel: "1 plato" },
  { id: "ajiaco", name: "Ajiaco", category: "Platos chilenos", kcal: 100, p: 7, c: 9, f: 4, portion: 400, portionLabel: "1 plato" },
  { id: "tomaticann", name: "Tomaticán", category: "Platos chilenos", kcal: 110, p: 6, c: 12, f: 4.5, portion: 350, portionLabel: "1 plato" },
  { id: "valdiviano", name: "Valdiviano", category: "Platos chilenos", kcal: 95, p: 8, c: 8, f: 3.5, portion: 400, portionLabel: "1 plato" },
  { id: "humita", name: "Humita", category: "Platos chilenos", kcal: 165, p: 4, c: 22, f: 7, portion: 150, portionLabel: "1 humita" },
  { id: "pantrucas", name: "Pantrucas", category: "Platos chilenos", kcal: 110, p: 5, c: 16, f: 3, portion: 400, portionLabel: "1 plato" },
  { id: "arroz-valenciana", name: "Arroz a la valenciana", category: "Platos chilenos", kcal: 170, p: 8, c: 22, f: 5.5, portion: 300, portionLabel: "1 plato" },
  { id: "arroz-huevo", name: "Arroz con huevo frito", category: "Platos chilenos", kcal: 165, p: 5, c: 24, f: 5.5, portion: 250, portionLabel: "1 plato" },
  { id: "cazuela-congrio", name: "Caldillo de congrio", category: "Platos chilenos", kcal: 90, p: 9, c: 6, f: 3, portion: 400, portionLabel: "1 plato" },
  { id: "paila-marina", name: "Paila marina", category: "Platos chilenos", kcal: 95, p: 11, c: 5, f: 3.5, portion: 400, portionLabel: "1 plato" },
  { id: "chupe-mariscos", name: "Chupe de mariscos", category: "Platos chilenos", kcal: 160, p: 10, c: 12, f: 8, portion: 300, portionLabel: "1 porción" },
  { id: "machas-parmesana", name: "Machas a la parmesana", category: "Platos chilenos", kcal: 175, p: 12, c: 4, f: 12, portion: 200, portionLabel: "1 porción" },
  { id: "pescado-frito", name: "Pescado frito (merluza)", category: "Platos chilenos", kcal: 200, p: 18, c: 9, f: 11, portion: 180, portionLabel: "1 filete" },
  { id: "plateada-horno", name: "Plateada al horno con puré", category: "Platos chilenos", kcal: 180, p: 13, c: 12, f: 9, portion: 350, portionLabel: "1 plato" },
  { id: "asado-tira", name: "Asado de tira", category: "Platos chilenos", kcal: 290, p: 23, c: 0, f: 22, portion: 200, portionLabel: "1 porción" },
  { id: "pernil", name: "Pernil de cerdo", category: "Platos chilenos", kcal: 280, p: 24, c: 0, f: 20, portion: 200, portionLabel: "1 porción" },
  { id: "arrollado-huaso", name: "Arrollado huaso", category: "Platos chilenos", kcal: 240, p: 18, c: 1, f: 18, portion: 120, portionLabel: "2 láminas" },
  { id: "pollo-arvejado", name: "Pollo arvejado", category: "Platos chilenos", kcal: 130, p: 12, c: 8, f: 5.5, portion: 350, portionLabel: "1 plato" },
  { id: "ensalada-chilena", name: "Ensalada chilena", category: "Platos chilenos", kcal: 55, p: 1, c: 5, f: 3.5, portion: 150, portionLabel: "1 porción" },
  { id: "ensalada-surtida", name: "Ensalada surtida", category: "Platos chilenos", kcal: 50, p: 1.5, c: 7, f: 2, portion: 150, portionLabel: "1 porción" },
  { id: "curanto", name: "Curanto / pulmay", category: "Platos chilenos", kcal: 150, p: 14, c: 8, f: 7, portion: 400, portionLabel: "1 porción" },

  // ======================= PLATOS GLOBALES =======================
  // --- China ---
  { id: "arroz-chaufan", name: "Arroz chaufán / frito", category: "Platos globales", kcal: 163, p: 5, c: 22, f: 6, portion: 300, portionLabel: "1 plato" },
  { id: "pollo-salteado", name: "Pollo salteado con verduras", category: "Platos globales", kcal: 130, p: 12, c: 8, f: 5.5, portion: 300, portionLabel: "1 plato" },
  { id: "lomo-salteado", name: "Lomo salteado", category: "Platos globales", kcal: 160, p: 11, c: 13, f: 7, portion: 350, portionLabel: "1 plato" },
  { id: "chop-suey", name: "Chop suey", category: "Platos globales", kcal: 95, p: 7, c: 9, f: 3.5, portion: 300, portionLabel: "1 plato" },
  { id: "chow-mein", name: "Chow mein (tallarines saltados)", category: "Platos globales", kcal: 155, p: 7, c: 21, f: 5, portion: 300, portionLabel: "1 plato" },
  { id: "pollo-agridulce", name: "Pollo agridulce", category: "Platos globales", kcal: 185, p: 11, c: 20, f: 7, portion: 300, portionLabel: "1 plato" },
  { id: "wanton-frito", name: "Wantán frito", category: "Platos globales", kcal: 320, p: 9, c: 30, f: 18, portion: 100, portionLabel: "6 unidades" },
  { id: "arrollado-primavera", name: "Arrollado primavera (rollito)", category: "Platos globales", kcal: 240, p: 6, c: 25, f: 13, portion: 80, portionLabel: "2 rollitos" },
  // --- Japonesa ---
  { id: "sushi-california", name: "Sushi roll California", category: "Platos globales", kcal: 145, p: 5, c: 28, f: 2, portion: 180, portionLabel: "8 piezas" },
  { id: "sushi-salmon", name: "Sushi roll salmón/palta", category: "Platos globales", kcal: 175, p: 7, c: 25, f: 5, portion: 180, portionLabel: "8 piezas" },
  { id: "sushi-frito", name: "Sushi roll frito (panko)", category: "Platos globales", kcal: 230, p: 7, c: 28, f: 10, portion: 180, portionLabel: "8 piezas" },
  { id: "nigiri", name: "Nigiri de salmón", category: "Platos globales", kcal: 140, p: 8, c: 20, f: 3, portion: 90, portionLabel: "3 piezas" },
  { id: "sashimi", name: "Sashimi de salmón", category: "Platos globales", kcal: 180, p: 20, c: 0, f: 11, portion: 100, portionLabel: "1 porción" },
  { id: "ramen", name: "Ramen", category: "Platos globales", kcal: 110, p: 6, c: 14, f: 3.5, portion: 450, portionLabel: "1 bowl" },
  { id: "gyoza", name: "Gyoza", category: "Platos globales", kcal: 210, p: 8, c: 22, f: 10, portion: 120, portionLabel: "5 unidades" },
  { id: "tempura", name: "Tempura de verduras", category: "Platos globales", kcal: 230, p: 5, c: 26, f: 12, portion: 120, portionLabel: "1 porción" },
  { id: "pollo-teriyaki", name: "Pollo teriyaki", category: "Platos globales", kcal: 165, p: 15, c: 12, f: 6, portion: 300, portionLabel: "1 plato" },
  // --- Peruana ---
  { id: "ceviche", name: "Ceviche", category: "Platos globales", kcal: 95, p: 14, c: 6, f: 1.5, portion: 250, portionLabel: "1 porción" },
  { id: "aji-gallina", name: "Ají de gallina", category: "Platos globales", kcal: 165, p: 11, c: 13, f: 8, portion: 300, portionLabel: "1 plato" },
  { id: "pollo-brasa", name: "Pollo a la brasa con papas", category: "Platos globales", kcal: 215, p: 16, c: 14, f: 11, portion: 350, portionLabel: "1/4 pollo" },
  { id: "anticucho", name: "Anticucho", category: "Platos globales", kcal: 180, p: 20, c: 3, f: 10, portion: 150, portionLabel: "2 brochetas" },
  // --- Mexicana ---
  { id: "quesadilla", name: "Quesadilla", category: "Platos globales", kcal: 290, p: 12, c: 26, f: 15, portion: 150, portionLabel: "1 unidad" },
  { id: "fajitas", name: "Fajitas de pollo", category: "Platos globales", kcal: 170, p: 12, c: 16, f: 6, portion: 300, portionLabel: "1 porción" },
  { id: "nachos-queso", name: "Nachos con queso", category: "Platos globales", kcal: 330, p: 8, c: 36, f: 17, portion: 200, portionLabel: "1 porción" },
  { id: "guacamole", name: "Guacamole", category: "Platos globales", kcal: 155, p: 2, c: 9, f: 13, portion: 60, portionLabel: "2 cdas" },
  { id: "chili-carne", name: "Chili con carne", category: "Platos globales", kcal: 130, p: 9, c: 11, f: 5.5, portion: 350, portionLabel: "1 plato" },
  // --- Italiana ---
  { id: "lasana", name: "Lasaña", category: "Platos globales", kcal: 165, p: 9, c: 14, f: 8, portion: 350, portionLabel: "1 porción" },
  { id: "pasta-bolonesa", name: "Pasta a la boloñesa", category: "Platos globales", kcal: 150, p: 7, c: 19, f: 5, portion: 350, portionLabel: "1 plato" },
  { id: "pasta-carbonara", name: "Pasta carbonara", category: "Platos globales", kcal: 200, p: 8, c: 22, f: 9, portion: 350, portionLabel: "1 plato" },
  { id: "noquis", name: "Ñoquis con salsa", category: "Platos globales", kcal: 155, p: 4, c: 28, f: 3, portion: 300, portionLabel: "1 plato" },
  { id: "ravioles", name: "Ravioles", category: "Platos globales", kcal: 165, p: 7, c: 24, f: 4.5, portion: 300, portionLabel: "1 plato" },
  { id: "risotto", name: "Risotto", category: "Platos globales", kcal: 165, p: 4, c: 24, f: 5.5, portion: 300, portionLabel: "1 plato" },
  // --- Otros ---
  { id: "paella", name: "Paella", category: "Platos globales", kcal: 160, p: 9, c: 18, f: 5.5, portion: 350, portionLabel: "1 plato" },
  { id: "tortilla-espanola", name: "Tortilla española", category: "Platos globales", kcal: 170, p: 6, c: 13, f: 10, portion: 150, portionLabel: "1 trozo" },
  { id: "curry-pollo", name: "Curry de pollo", category: "Platos globales", kcal: 150, p: 11, c: 9, f: 8, portion: 300, portionLabel: "1 plato" },
  { id: "hummus", name: "Hummus", category: "Platos globales", kcal: 177, p: 5, c: 20, f: 8.6, portion: 60, portionLabel: "1/4 taza" },
  { id: "falafel", name: "Falafel", category: "Platos globales", kcal: 333, p: 13, c: 32, f: 18, portion: 120, portionLabel: "4 unidades" },
  { id: "pad-thai", name: "Pad thai", category: "Platos globales", kcal: 155, p: 8, c: 20, f: 5, portion: 350, portionLabel: "1 plato" },
  { id: "milanesa", name: "Milanesa de pollo", category: "Platos globales", kcal: 240, p: 18, c: 16, f: 12, portion: 180, portionLabel: "1 milanesa" },
  { id: "pancakes", name: "Pancakes (con sirope)", category: "Platos globales", kcal: 227, p: 6, c: 38, f: 6, portion: 150, portionLabel: "2 unidades" },
  { id: "waffle", name: "Waffle", category: "Platos globales", kcal: 291, p: 7.9, c: 33, f: 14, portion: 80, portionLabel: "1 unidad" },
  { id: "ensalada-cesar", name: "Ensalada César con pollo", category: "Platos globales", kcal: 130, p: 9, c: 6, f: 8, portion: 250, portionLabel: "1 plato" },

  // ======================= SUPLEMENTOS =======================
  // Ostrovit WPC80.eu — valores oficiales del fabricante (sabor chocolate).
  // Fuente: ficha de producto ostrovit.com (por 100 g; porción 30 g ≈ 21 g proteína).
  { id: "ostrovit-wpc-choco", name: "Ostrovit WPC80 Chocolate", category: "Suplementos", kcal: 368, p: 70, c: 11, f: 4.9, portion: 30, portionLabel: "1 scoop (30 g)" },
  { id: "whey-generica", name: "Proteína whey (genérica)", category: "Suplementos", kcal: 400, p: 80, c: 8, f: 6, portion: 30, portionLabel: "1 scoop (30 g)" },
  { id: "caseina", name: "Caseína (chocolate)", category: "Suplementos", kcal: 360, p: 75, c: 8, f: 3, portion: 30, portionLabel: "1 scoop (30 g)" },
  { id: "proteina-vegana", name: "Proteína vegetal", category: "Suplementos", kcal: 375, p: 72, c: 10, f: 6, portion: 30, portionLabel: "1 scoop (30 g)" },
  { id: "mass-gainer", name: "Ganador de masa (mass gainer)", category: "Suplementos", kcal: 380, p: 20, c: 62, f: 5, portion: 100, portionLabel: "1 porción (100 g)" },
  { id: "creatina", name: "Creatina monohidratada", category: "Suplementos", kcal: 0, p: 0, c: 0, f: 0, portion: 5, portionLabel: "1 dosis (5 g)" },
  { id: "bcaa", name: "BCAA en polvo", category: "Suplementos", kcal: 285, p: 70, c: 0, f: 0, portion: 7, portionLabel: "1 dosis (7 g)" },
  { id: "preentreno", name: "Pre-entreno", category: "Suplementos", kcal: 40, p: 0, c: 8, f: 0, portion: 10, portionLabel: "1 dosis (10 g)" },
  { id: "barra-proteica", name: "Barra proteica", category: "Suplementos", kcal: 350, p: 33, c: 38, f: 8, portion: 60, portionLabel: "1 barra" },
  { id: "avena-instant", name: "Avena instantánea (saborizada)", category: "Suplementos", kcal: 380, p: 11, c: 65, f: 7, portion: 50, portionLabel: "1 porción (50 g)" },

  // ======================= PASTAS Y FIDEOS =======================
  { id: "spaghetti-cocido", name: "Spaghetti cocido", category: "Legumbres y cereales", kcal: 158, p: 5.8, c: 31, f: 0.9, portion: 200, portionLabel: "1 plato" },
  { id: "penne-cocido", name: "Penne / mostachones cocido", category: "Legumbres y cereales", kcal: 158, p: 5.8, c: 31, f: 0.9, portion: 200, portionLabel: "1 plato" },
  { id: "fideos-cabello", name: "Fideos cabello de ángel cocido", category: "Legumbres y cereales", kcal: 157, p: 5.8, c: 30, f: 0.9, portion: 200, portionLabel: "1 plato" },
  { id: "corbatas-cocido", name: "Corbatas (farfalle) cocido", category: "Legumbres y cereales", kcal: 158, p: 5.8, c: 31, f: 0.9, portion: 200, portionLabel: "1 plato" },
  { id: "tallarines-cocido", name: "Tallarines cocido", category: "Legumbres y cereales", kcal: 158, p: 5.8, c: 31, f: 0.9, portion: 200, portionLabel: "1 plato" },
  { id: "fideos-huevo", name: "Fideos al huevo cocido", category: "Legumbres y cereales", kcal: 168, p: 6.5, c: 30, f: 2, portion: 200, portionLabel: "1 plato" },
  { id: "fideos-integral", name: "Fideos integrales cocido", category: "Legumbres y cereales", kcal: 149, p: 6, c: 30, f: 1.3, portion: 200, portionLabel: "1 plato" },
  { id: "pasta-seca", name: "Pasta seca (cruda)", category: "Legumbres y cereales", kcal: 371, p: 13, c: 75, f: 1.5, portion: 80, portionLabel: "1 porción seca" },
  { id: "carozzi-spaghetti", name: "Spaghetti Carozzi (crudo)", category: "Legumbres y cereales", kcal: 360, p: 12, c: 74, f: 1.5, portion: 80, portionLabel: "1 porción seca" },
  { id: "lucchetti-fideos", name: "Fideos Lucchetti (crudo)", category: "Legumbres y cereales", kcal: 358, p: 12, c: 73, f: 1.5, portion: 80, portionLabel: "1 porción seca" },
  { id: "canelones", name: "Canelones rellenos", category: "Platos globales", kcal: 165, p: 8, c: 17, f: 7, portion: 300, portionLabel: "1 plato" },
  { id: "macarrones-queso", name: "Macarrones con queso", category: "Platos globales", kcal: 190, p: 7.5, c: 22, f: 8, portion: 300, portionLabel: "1 plato" },

  // ======================= SOPAS Y CALDOS =======================
  { id: "sopa-pollo", name: "Sopa de pollo casera", category: "Sopas y caldos", kcal: 45, p: 3.5, c: 4.5, f: 1.3, portion: 350, portionLabel: "1 plato" },
  { id: "crema-verduras", name: "Crema de verduras", category: "Sopas y caldos", kcal: 55, p: 1.8, c: 8, f: 1.8, portion: 300, portionLabel: "1 plato" },
  { id: "crema-zapallo", name: "Crema de zapallo", category: "Sopas y caldos", kcal: 60, p: 1.5, c: 9, f: 2, portion: 300, portionLabel: "1 plato" },
  { id: "crema-esparragos", name: "Crema de espárragos", category: "Sopas y caldos", kcal: 65, p: 2, c: 8, f: 3, portion: 300, portionLabel: "1 plato" },
  { id: "sopa-tomate", name: "Sopa de tomate", category: "Sopas y caldos", kcal: 50, p: 1.5, c: 8, f: 1.5, portion: 300, portionLabel: "1 plato" },
  { id: "minestrone", name: "Minestrone", category: "Sopas y caldos", kcal: 55, p: 2.5, c: 9, f: 1.2, portion: 350, portionLabel: "1 plato" },
  { id: "sopa-mariscos", name: "Sopa de mariscos", category: "Sopas y caldos", kcal: 70, p: 8, c: 4, f: 2.5, portion: 350, portionLabel: "1 plato" },
  { id: "sopa-cebolla", name: "Sopa de cebolla", category: "Sopas y caldos", kcal: 65, p: 2, c: 7, f: 3.5, portion: 300, portionLabel: "1 plato" },
  { id: "ramen-instant", name: "Ramen instantáneo (preparado)", category: "Sopas y caldos", kcal: 88, p: 2, c: 12, f: 3.5, portion: 350, portionLabel: "1 sobre prep." },
  { id: "sopa-sobre", name: "Sopa de sobre (Maggi)", category: "Sopas y caldos", kcal: 40, p: 1, c: 7, f: 1, portion: 250, portionLabel: "1 taza" },
  { id: "caldo-cubo", name: "Caldo (cubito preparado)", category: "Sopas y caldos", kcal: 12, p: 0.6, c: 1.5, f: 0.4, portion: 250, portionLabel: "1 taza" },
  { id: "sopa-wanton", name: "Sopa wantán", category: "Sopas y caldos", kcal: 75, p: 4, c: 9, f: 2.5, portion: 350, portionLabel: "1 plato" },
  { id: "sopa-miso", name: "Sopa miso", category: "Sopas y caldos", kcal: 35, p: 3, c: 4, f: 1, portion: 250, portionLabel: "1 tazón" },

  // ======================= MARCAS — Cereales y desayuno =======================
  { id: "zucaritas", name: "Zucaritas (Kellogg's)", category: "Legumbres y cereales", kcal: 384, p: 5, c: 88, f: 1, portion: 30, portionLabel: "1 taza" },
  { id: "chocapic", name: "Chocapic (Nestlé)", category: "Legumbres y cereales", kcal: 384, p: 7, c: 78, f: 4, portion: 30, portionLabel: "1 taza" },
  { id: "corn-flakes", name: "Corn Flakes (Kellogg's)", category: "Legumbres y cereales", kcal: 357, p: 7, c: 84, f: 0.9, portion: 30, portionLabel: "1 taza" },
  { id: "milo", name: "Milo en polvo (Nestlé)", category: "Bebidas", kcal: 400, p: 8, c: 78, f: 6, portion: 20, portionLabel: "2 cdas" },
  { id: "quaker-avena", name: "Avena Quaker", category: "Legumbres y cereales", kcal: 389, p: 17, c: 66, f: 7, portion: 40, portionLabel: "1/2 taza" },
  { id: "nesquik", name: "Nesquik (Nestlé)", category: "Bebidas", kcal: 377, p: 4, c: 88, f: 2.5, portion: 15, portionLabel: "1.5 cdas" },

  // ======================= MARCAS — Lácteos =======================
  { id: "yogur-soprole", name: "Yogur batido Soprole", category: "Lácteos y quesos", kcal: 85, p: 3, c: 14, f: 1.8, portion: 165, portionLabel: "1 pote" },
  { id: "yogur-colun", name: "Yogur Colun", category: "Lácteos y quesos", kcal: 88, p: 3.2, c: 14, f: 2, portion: 165, portionLabel: "1 pote" },
  { id: "yogur-griego-soprole", name: "Yogur griego Soprole", category: "Lácteos y quesos", kcal: 100, p: 8, c: 6, f: 4.5, portion: 155, portionLabel: "1 pote" },
  { id: "chamyto", name: "Chamyto / Yogur líquido", category: "Lácteos y quesos", kcal: 75, p: 2.5, c: 14, f: 1.2, portion: 200, portionLabel: "1 botella" },
  { id: "leche-soprole", name: "Leche Soprole entera", category: "Lácteos y quesos", kcal: 62, p: 3.1, c: 4.7, f: 3.3, portion: 200, portionLabel: "1 vaso" },
  { id: "queso-quillayes", name: "Queso crema Quillayes", category: "Lácteos y quesos", kcal: 245, p: 6, c: 4, f: 23, portion: 30, portionLabel: "1 cda colmada" },

  // ======================= MARCAS — Galletas y dulces =======================
  { id: "triton", name: "Tritón (Costa)", category: "Galletas y dulces", kcal: 495, p: 5, c: 64, f: 24, portion: 36, portionLabel: "3 galletas" },
  { id: "vizzio", name: "Vizzio (Costa)", category: "Galletas y dulces", kcal: 510, p: 5.5, c: 62, f: 27, portion: 30, portionLabel: "2 galletas" },
  { id: "super8", name: "Super 8 (Nestlé)", category: "Galletas y dulces", kcal: 520, p: 5, c: 62, f: 28, portion: 31, portionLabel: "1 unidad" },
  { id: "chocman", name: "Chocman (Costa)", category: "Galletas y dulces", kcal: 420, p: 4, c: 64, f: 16, portion: 35, portionLabel: "1 unidad" },
  { id: "negrita", name: "Negrita (McKay)", category: "Galletas y dulces", kcal: 460, p: 5, c: 66, f: 19, portion: 28, portionLabel: "1 unidad" },
  { id: "kuky", name: "Kuky chocochips (McKay)", category: "Galletas y dulces", kcal: 490, p: 6, c: 66, f: 22, portion: 30, portionLabel: "3 galletas" },
  { id: "frac", name: "Frac (McKay)", category: "Galletas y dulces", kcal: 480, p: 6, c: 70, f: 19, portion: 30, portionLabel: "4 galletas" },
  { id: "doblon", name: "Doblón (Costa)", category: "Galletas y dulces", kcal: 500, p: 6, c: 65, f: 24, portion: 28, portionLabel: "1 paquete" },
  { id: "nikolo", name: "Nikolo (Costa)", category: "Galletas y dulces", kcal: 470, p: 5, c: 70, f: 18, portion: 30, portionLabel: "2 galletas" },
  { id: "morochas", name: "Morochas (McKay)", category: "Galletas y dulces", kcal: 495, p: 6, c: 67, f: 22, portion: 30, portionLabel: "2 galletas" },

  // ======================= MARCAS — Chocolates y golosinas =======================
  { id: "sahne-nuss", name: "Sahne Nuss (Nestlé)", category: "Galletas y dulces", kcal: 560, p: 8, c: 52, f: 35, portion: 25, portionLabel: "1/4 barra" },
  { id: "trencito", name: "Trencito (Nestlé)", category: "Galletas y dulces", kcal: 535, p: 7, c: 59, f: 30, portion: 25, portionLabel: "1/4 barra" },
  { id: "golpe", name: "Golpe (Costa)", category: "Galletas y dulces", kcal: 510, p: 5, c: 62, f: 27, portion: 28, portionLabel: "1 unidad" },
  { id: "snickers", name: "Snickers", category: "Galletas y dulces", kcal: 491, p: 8, c: 60, f: 24, portion: 50, portionLabel: "1 barra" },
  { id: "kitkat", name: "KitKat", category: "Galletas y dulces", kcal: 518, p: 6, c: 61, f: 27, portion: 41, portionLabel: "1 barra" },
  { id: "ambrosoli", name: "Caramelos / gomitas", category: "Galletas y dulces", kcal: 350, p: 3, c: 80, f: 0.5, portion: 30, portionLabel: "1 puñado" },

  // ======================= MARCAS — Snacks =======================
  { id: "lays", name: "Papas Lay's", category: "Snacks", kcal: 536, p: 6, c: 53, f: 34, portion: 30, portionLabel: "1 bolsa chica" },
  { id: "pringles", name: "Pringles", category: "Snacks", kcal: 536, p: 4, c: 52, f: 34, portion: 30, portionLabel: "1 puñado" },
  { id: "cheetos", name: "Cheetos", category: "Snacks", kcal: 525, p: 6, c: 55, f: 31, portion: 30, portionLabel: "1 bolsa chica" },
  { id: "rumba", name: "Rumba", category: "Snacks", kcal: 510, p: 6, c: 58, f: 28, portion: 30, portionLabel: "1 bolsa chica" },
  { id: "kryzpo", name: "Kryzpo", category: "Snacks", kcal: 530, p: 5, c: 54, f: 33, portion: 30, portionLabel: "1 bolsa chica" },

  // ======================= MARCAS — Bebidas =======================
  { id: "cocacola", name: "Coca-Cola", category: "Bebidas", kcal: 42, p: 0, c: 10.6, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "cocacola-zero", name: "Coca-Cola Zero", category: "Bebidas", kcal: 0.3, p: 0, c: 0, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "sprite", name: "Sprite", category: "Bebidas", kcal: 40, p: 0, c: 10, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "fanta", name: "Fanta", category: "Bebidas", kcal: 46, p: 0, c: 12, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "bilz", name: "Bilz", category: "Bebidas", kcal: 44, p: 0, c: 11, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "pap", name: "Pap", category: "Bebidas", kcal: 43, p: 0, c: 11, f: 0, portion: 350, portionLabel: "1 lata" },
  { id: "redbull", name: "Red Bull", category: "Bebidas", kcal: 45, p: 0, c: 11, f: 0, portion: 250, portionLabel: "1 lata" },
  { id: "monster", name: "Monster Energy", category: "Bebidas", kcal: 47, p: 0, c: 11, f: 0, portion: 473, portionLabel: "1 lata" },
  { id: "gatorade", name: "Gatorade", category: "Bebidas", kcal: 26, p: 0, c: 6, f: 0, portion: 500, portionLabel: "1 botella" },
  { id: "watts-jugo", name: "Jugo Watt's (caja)", category: "Bebidas", kcal: 50, p: 0.2, c: 12, f: 0, portion: 200, portionLabel: "1 caja" },
  { id: "nestea", name: "Nestea / té helado", category: "Bebidas", kcal: 30, p: 0, c: 7.5, f: 0, portion: 350, portionLabel: "1 lata" },

  // ======================= MARCAS — Embutidos y comida rápida =======================
  { id: "vienesa-pf", name: "Vienesas PF", category: "Fiambres y jamones", kcal: 270, p: 11, c: 3, f: 24, portion: 50, portionLabel: "1 vienesa" },
  { id: "big-mac", name: "Big Mac (McDonald's)", category: "Comida rápida", kcal: 245, p: 12, c: 20, f: 13, portion: 215, portionLabel: "1 hamburguesa" },
  { id: "mcnuggets", name: "McNuggets (McDonald's)", category: "Comida rápida", kcal: 296, p: 15, c: 16, f: 19, portion: 100, portionLabel: "6 unidades" },
  { id: "whopper", name: "Whopper (Burger King)", category: "Comida rápida", kcal: 240, p: 11, c: 18, f: 14, portion: 270, portionLabel: "1 hamburguesa" },
  { id: "kfc-presa", name: "Pollo KFC (presa)", category: "Comida rápida", kcal: 260, p: 19, c: 9, f: 16, portion: 120, portionLabel: "1 presa" },

  // ======================= MÁS BÁSICOS =======================
  { id: "tomate-conserva", name: "Tomate en conserva / salsa pomarola", category: "Salsas y condimentos", kcal: 38, p: 1.6, c: 7, f: 0.4, portion: 100, portionLabel: "1/2 taza" },
  { id: "arroz-grano-largo", name: "Arroz grado 1 (crudo)", category: "Legumbres y cereales", kcal: 360, p: 7, c: 79, f: 0.7, portion: 70, portionLabel: "1 porción cruda" },
  { id: "tuna-conserva", name: "Atún en aceite (lata)", category: "Pescados y mariscos", kcal: 198, p: 25, c: 0, f: 11, portion: 80, portionLabel: "1 lata" },
  { id: "champinon-conserva", name: "Champiñón en conserva", category: "Verduras", kcal: 25, p: 2, c: 4, f: 0.3, portion: 80, portionLabel: "1/2 taza" },
  { id: "choclo-conserva", name: "Choclo en conserva", category: "Verduras", kcal: 80, p: 2.6, c: 17, f: 0.8, portion: 100, portionLabel: "1/2 taza" },
  { id: "arvejas-conserva", name: "Arvejas en conserva", category: "Verduras", kcal: 70, p: 4.5, c: 12, f: 0.3, portion: 100, portionLabel: "1/2 taza" },
  { id: "tortilla-verduras", name: "Tortilla de verduras (al horno)", category: "Platos chilenos", kcal: 110, p: 6, c: 6, f: 7, portion: 150, portionLabel: "1 porción" },
];

export const CATEGORIES: FoodCategory[] = [
  "Comida rápida", "Platos chilenos", "Platos globales", "Sopas y caldos",
  "Panes y masas", "Lácteos y quesos", "Fiambres y jamones",
  "Carnes", "Pescados y mariscos", "Huevos",
  "Frutas", "Verduras", "Legumbres y cereales", "Frutos secos",
  "Galletas y dulces", "Postres", "Snacks", "Suplementos",
  "Salsas y condimentos", "Grasas y aceites", "Bebidas",
];
