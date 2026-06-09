import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "cl.leyerd.savia",
  appName: "Savia",
  webDir: "dist",
  backgroundColor: "#FBFAF5",
  plugins: {
    Camera: {
      // Permisos de cámara para identificación de alimentos por IA.
    }
  }
};

export default config;
