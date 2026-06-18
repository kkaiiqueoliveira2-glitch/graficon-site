import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

// O HTML pré-renderizado (prerender de produção) existe para SEO e first paint:
// é o que o Google indexa e o que o usuário vê instantaneamente. O React monta
// a aplicação interativa por cima com createRoot. Não usamos hydrateRoot porque
// o site tem markup dependente de viewport (menu responsivo), que não casa com
// um único HTML estático em todos os tamanhos de tela — hidratar geraria
// mismatches. createRoot substitui o markup estático pelo render do cliente sem
// erros, mantendo o conteúdo idêntico (sem flash perceptível).
createRoot(rootEl).render(<App />);
