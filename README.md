# 🌿 Savia — Nutrición & Entrenamiento

> **La savia es el fluido vital que nutre a la planta y le da energía para crecer y moverse.** Es la metáfora del producto: **lo que comes alimenta lo que entrenas.** Savia une nutrición + entrenamiento en casa, pensada para Chile/LatAm.

App para **PC y Android** (mismo código): rutina semanal con progresión por niveles, control nutricional diario con base de datos chilena + mundial (~380 alimentos), identificación de alimentos por IA (Gemini), historial de peso, gráficos de progreso y **determinación automática del objetivo** según tu % de grasa.

**Identidad:** verde (naturaleza/nutrición) + coral (energía/esfuerzo), tipografía Poppins + Inter, esquinas redondeadas y mucho aire. Tema **Savia (claro)** por defecto, más 5 paletas y 6 fondos alternativos. React + TypeScript + Vite; PC con **Tauri** (Rust), Android con **Capacitor**. Los recursos de marca están en `brand/` y la estrategia de producto en `brand/Savia-documento-producto-y-estrategia.pdf`.

## ✨ Novedades v1.1 (verificación científica + funciones)

Revisado por dos análisis con literatura científica (Schoenfeld, Morton, ISSN, etc.):

- **Apariencia:** 5 temas (Mocha, Macchiato, Frappé, **Latte claro**, **AMOLED**) y 6 fondos (Aurora, Malla, Atardecer, Océano, Cuadrícula, Sólido).
- **Nutrición corregida:** déficit/superávit por **% del TDEE** (no fijo); para perfiles delgados (IMC<22) la app pasa a **recomposición en mantención** en vez de déficit; **proteína sobre masa magra**; piso de grasa **1 g/kg / ≥20% kcal**; metas de **agua y fibra**. *(Para ti: ~2232 kcal recomp, no 1932 de déficit.)*
- **Rutina corregida:** core de 5→**3 días**, más volumen de pecho/hombro, **isquios/glúteo 2×** (hip thrust, RDL), **deltoides posterior + face pull** (ratio tirón≥empuje), regla **RIR 0‑2** (cerca del fallo: clave para crecer con poco peso), guía de pasos/sueño/LISS.
- **Funciones nuevas:** registro de **agua**, **temporizador de descanso** entre series, **racha de entrenos** 🔥, **marcar día completado**, y **copia de seguridad** (exportar/importar JSON, ideal para pasar de PC a celular).

---

## 📦 Entregables ya compilados (`/entregables`)

| Archivo | Plataforma | Uso |
|---|---|---|
| `Savia.apk` | Android | Instalar en el celular |
| `Savia-PC` | Linux | Binario nativo, ejecutar directo |
| `Savia_1.0.0_amd64.deb` | Debian/Ubuntu | `sudo dpkg -i` |
| `Savia-1.0.0-1.x86_64.rpm` | Fedora/openSUSE | `sudo rpm -i` |

> **CachyOS/Arch:** ejecuta el binario directo: `./entregables/Savia-PC`

---

## 🎯 Determinación automática del objetivo (lo importante)

**Para un sixpack lo que manda NO es el peso, es el % de grasa corporal.** El abdomen se ve cuando llegas a ~**10‑12 %** de grasa (hombres) / ~**18‑20 %** (mujeres).

La app calcula tu grasa con:
1. **Método US Navy** (cintura + cuello + altura) — más preciso. *Recomendado: mide con huincha.*
2. **Deurenberg** (IMC + edad + sexo) como respaldo si no mides circunferencias.

Y elige el plan solo:
- **Grasa alta** → déficit marcado (bajar grasa).
- **Grasa media** → déficit suave (recorte final).
- **Grasa baja** → **recomposición** (no morir de hambre; marcar el músculo).
- **Muy definido** → *lean bulk* (construir el músculo abdominal).

> Selecciona el objetivo **"🎯 Sixpack (automático)"** en Ajustes y la app decide por ti.

---

## 🔬 ¿Es válida la recomendación? (base científica)

**Sí, con un matiz importante para tu caso.** Fuentes: Mifflin‑St Jeor (gasto), Morton et al. 2018 (proteína), evidencia estándar de recomposición.

- **Calorías:** BMR por Mifflin‑St Jeor × actividad (la fórmula más precisa en población sana). Déficit/superávit ajustado al % de grasa, nunca por debajo de ~BMR.
- **Proteína:** 1.8 g/kg en mantención y **2.2 g/kg en déficit** (rango meta‑analítico 1.6‑2.2 g/kg para conservar músculo).
- **Grasa:** 0.9 g/kg (sobre el mínimo hormonal de ~0.5‑0.8). El resto, carbohidratos.
- **"Spot reduction" es mito:** hacer abdominales NO quema grasa local. La grasa baja por déficit calórico **sistémico**; por eso la app prioriza dieta + fuerza global, y usa el core como músculo a desarrollar.
- **Rutina:** full‑body + empuje/tirón/pierna + core 3‑4×/sem, con **sobrecarga progresiva** (sistema de niveles) — el principio nº1 de hipertrofia. La espalda ancha (dominadas/remo) y hombros estrechan visualmente la cintura (efecto V).
- **Matiz para ti (54 kg, 1.60 m, 21):** tu IMC es ~21 y grasa estimada ~14 %. **NO necesitas un déficit agresivo** (te dejaría "flaco sin marca"). La app te asigna *déficit suave/recomposición*: calorías casi de mantención + proteína alta + progresión de fuerza. Mide cintura/cuello para afinar.

⚠️ Esto es orientación basada en evidencia, no consejo médico.

---

## 🗓️ La rutina (resumen)

Equipo: 2 mancuernas (7 kg), barra (14 kg), barra de dominadas, ab roller.

| Día | Foco |
|---|---|
| **Lun** | Full body fuerza + core |
| **Mar** | Core intensivo + HIIT |
| **Mié** | Empuje (pecho · hombro · tríceps) |
| **Jue** | Descanso activo + movilidad |
| **Vie** | Tirón (espalda · bíceps) + core |
| **Sáb** | Pierna + acondicionamiento |
| **Dom** | Descanso total |

**Progresión por niveles:** cada ejercicio tiene 3‑4 variantes (ej. crunch → crunch con peso; dominada negativa → completa → con lastre). Si cumples el objetivo de reps/tiempo en todas las series **2 sesiones seguidas**, la app desbloquea la variante más difícil automáticamente.

---

## 🍽️ Base de datos de alimentos

~**380 alimentos** por 100 g + porción típica, con **fuentes verificadas**:
- **Alimentos simples** (frutas, carnes, lácteos, cereales, huevos): alineados con **USDA FoodData Central** (dominio público), verificados por muestreo.
- **Platos compuestos y marcas**: estimación por receta típica / etiqueta del fabricante.
- Incluye: panes, quesos, fiambres, **pastas y fideos** (spaghetti, penne, cabello de ángel, al huevo, Carozzi, Lucchetti…), **sopas y caldos** (de pollo, crema de verduras, minestrone, ramen, sopa de sobre…), galletas, **comida rápida** (completo, barros luco, hamburguesa, pizza, sushi, Big Mac, Whopper, KFC…), **casera chilena** (cazuela, lentejas con longaniza, porotos con riendas, charquicán, paila marina…), **mundial** (pollo/lomo salteado, chop suey, ramen, ceviche, lasaña, tacos, curry…), postres, bebidas y **suplementos**.
- **Marcas particulares**: Soprole, Colun, Nestlé (Chocapic, Milo, Sahne Nuss, Trencito, Super 8), Costa (Tritón, Vizzio), McKay (Negrita, Kuky), Carozzi, Lucchetti, Coca-Cola, Sprite, Bilz/Pap, Red Bull, Gatorade, Lay's, PF, KFC… y **Ostrovit WPC80 Chocolate** (valores oficiales).
- Puedes **crear alimentos personalizados** y dejar que la **IA cree entradas nuevas** automáticamente.

---

## 🤖 IA — identificación por foto (Gemini gratis)

1. Crea tu API key gratis con tu cuenta de Google: <https://aistudio.google.com/apikey>
2. Pégala en **Ajustes → IA · Gemini**.
3. En **Nutrición → Escanear IA**, toma una foto del plato. La IA:
   - **Identifica** el alimento/plato (chileno o mundial).
   - **Estima la cantidad** en gramos con referencias visuales (puedes **ajustarla** y los macros se recalculan).
   - Opcionalmente **guarda el alimento en tu base** para reutilizarlo (aparece en el buscador con la etiqueta “mío”).

> La estimación de porción por foto tiene un error típico de ±20‑40% (como cualquier app de este tipo): por eso la dejamos editable. La key se guarda **solo en tu dispositivo**.

---

## 🛠️ Desarrollo / recompilar

```bash
npm install

npm run dev          # desarrollo (http://localhost:5173)
npm run build        # build web → dist/

# PC (Tauri):
npx tauri dev        # ventana de escritorio en caliente
npx tauri build --bundles deb,rpm   # binario + paquetes

# Android (Capacitor):
export ANDROID_HOME=$HOME/Android/Sdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
npm run build && npx cap sync android
cd android && ./gradlew assembleDebug   # → android/app/build/outputs/apk/debug/
```

### Instalar el APK en tu celular
1. Copia `entregables/Savia.apk` al teléfono.
2. Ábrelo y permite "instalar apps de orígenes desconocidos".
3. Listo. (Es un build *debug*, sin firma de Play Store.)

---

## 📁 Estructura

```
src/
  data/        foods.ts · exercises.ts · routine.ts
  lib/         macros.ts (objetivo auto + % grasa) · gemini.ts · totals.ts · date.ts
  store/       useStore.ts (zustand + persistencia local)
  components/   pages/   styles/
src-tauri/     app de escritorio (Rust)
android/       proyecto Android (Capacitor)
```

Toda la información (perfil, diario, peso, progreso, niveles) se guarda **localmente** en el dispositivo. Sin servidores, sin cuentas.
