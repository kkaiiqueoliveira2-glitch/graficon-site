/// <reference types="vite/client" />

// Imagens processadas pelo vite-imagetools (ex.: "@/assets/x.jpg?w=1920&format=webp"):
// o plugin devolve a URL da imagem gerada.
declare module "*&format=webp" {
  const src: string;
  export default src;
}

interface Window {
  gtag?: (...args: unknown[]) => void;
}
