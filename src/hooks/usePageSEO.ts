import { useEffect } from "react";

const SITE_URL = "https://graficonrevestimento.com";

const DEFAULT_CANONICAL = `${SITE_URL}/`;
const DEFAULT_TITLE = "Revestimento de Cilindros | Graficon - Recuperação e Revestimento Industrial em São Paulo";
const DEFAULT_DESCRIPTION =
  "Revestimento de cilindros industriais e gráficos. Recuperação de cilindros para flexografia, embalagens, papel e celulose. Orçamento em São Paulo. +40 anos de profissão.";

function ensureCanonical(): HTMLLinkElement {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  return link;
}

function ensureMeta(name: string, property?: boolean): HTMLMetaElement {
  const attr = property ? "property" : "name";
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  return meta;
}

export type PageSEOOptions = {
  title: string;
  description: string;
  path: string;
  jsonLd?: { name: string; description: string };
};

/**
 * Atualiza title, meta description, canonical e Open Graph para a página.
 * No cleanup (navegação para outra rota), restaura os valores padrão da home.
 */
export function usePageSEO({ title, description, path, jsonLd }: PageSEOOptions) {
  useEffect(() => {
    const canonicalUrl = path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

    document.title = title;

    const metaDesc = ensureMeta("description");
    const prevDesc = metaDesc.getAttribute("content");
    metaDesc.setAttribute("content", description);

    const canonical = ensureCanonical();
    const prevCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", canonicalUrl);

    const ogUrl = ensureMeta("og:url", true);
    const prevOgUrl = ogUrl.getAttribute("content");
    ogUrl.setAttribute("content", canonicalUrl);

    const ogTitle = ensureMeta("og:title", true);
    const prevOgTitle = ogTitle.getAttribute("content");
    ogTitle.setAttribute("content", title);

    const ogDesc = ensureMeta("og:description", true);
    const prevOgDesc = ogDesc.getAttribute("content");
    ogDesc.setAttribute("content", description);

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: jsonLd.name,
        description: jsonLd.description,
        url: canonicalUrl,
        publisher: {
          "@type": "Organization",
          name: "Graficon Revestimento de Cilindros",
          url: SITE_URL,
        },
      });
      document.head.appendChild(scriptEl);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      metaDesc.setAttribute("content", prevDesc || DEFAULT_DESCRIPTION);
      canonical.setAttribute("href", prevCanonical || DEFAULT_CANONICAL);
      ogUrl.setAttribute("content", prevOgUrl || DEFAULT_CANONICAL);
      ogTitle.setAttribute("content", prevOgTitle || DEFAULT_TITLE);
      ogDesc.setAttribute("content", prevOgDesc || DEFAULT_DESCRIPTION);
      if (scriptEl?.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    };
  }, [title, description, path, jsonLd?.name ?? "", jsonLd?.description ?? ""]);
}
