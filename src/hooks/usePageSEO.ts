import { useEffect } from "react";

const SITE_URL = "https://graficonrevestimento.com";
const SITE_NAME = "Graficon Revestimento de Cilindros";
// Cartão 1200×630 da marca (scripts/gerar-assets-marca.mjs). Antes apontava pro
// logo quadrado, que virava um selo recortado na prévia do WhatsApp.
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-graficon.jpg`;
// O logo continua sendo o que vai no JSON-LD como logo da organização.
const ORG_LOGO = `${SITE_URL}/logo-graficon-horizontal.png`;

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
  type?: "website" | "article";
  noindex?: boolean;
  image?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  jsonLd?: { name: string; description: string };
  /**
   * Rótulo curto da página na trilha. Definir isso liga o BreadcrumbList:
   * "Início > <breadcrumbLabel>". Só as páginas de serviço tinham trilha
   * declarada; artigos e institucionais ficavam sem hierarquia.
   *
   * É uma string, e não um array, de propósito: array literal passado inline
   * gera referência nova a cada render e faria o efeito rodar sem parar.
   */
  breadcrumbLabel?: string;
  /** Nível intermediário opcional, entre o Início e a página. */
  breadcrumbParentName?: string;
  breadcrumbParentPath?: string;
};

/**
 * Atualiza title, meta description, canonical e Open Graph para a página.
 * No cleanup (navegação para outra rota), restaura os valores padrão da home.
 */
export function usePageSEO({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  image,
  faqItems = [],
  jsonLd,
  breadcrumbLabel,
  breadcrumbParentName,
  breadcrumbParentPath,
}: PageSEOOptions) {
  useEffect(() => {
    const canonicalUrl = path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const imageUrl = image ?? DEFAULT_OG_IMAGE;
    const robotsValue = noindex ? "noindex, nofollow" : "index, follow";

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

    const ogType = ensureMeta("og:type", true);
    const prevOgType = ogType.getAttribute("content");
    ogType.setAttribute("content", type);

    const ogImage = ensureMeta("og:image", true);
    const prevOgImage = ogImage.getAttribute("content");
    ogImage.setAttribute("content", imageUrl);

    const ogSiteName = ensureMeta("og:site_name", true);
    const prevOgSiteName = ogSiteName.getAttribute("content");
    ogSiteName.setAttribute("content", SITE_NAME);

    const ogLocale = ensureMeta("og:locale", true);
    const prevOgLocale = ogLocale.getAttribute("content");
    ogLocale.setAttribute("content", "pt_BR");

    const twitterCard = ensureMeta("twitter:card");
    const prevTwitterCard = twitterCard.getAttribute("content");
    twitterCard.setAttribute("content", "summary_large_image");

    const twitterTitle = ensureMeta("twitter:title");
    const prevTwitterTitle = twitterTitle.getAttribute("content");
    twitterTitle.setAttribute("content", title);

    const twitterDescription = ensureMeta("twitter:description");
    const prevTwitterDescription = twitterDescription.getAttribute("content");
    twitterDescription.setAttribute("content", description);

    const twitterImage = ensureMeta("twitter:image");
    const prevTwitterImage = twitterImage.getAttribute("content");
    twitterImage.setAttribute("content", imageUrl);

    const robots = ensureMeta("robots");
    const prevRobots = robots.getAttribute("content");
    robots.setAttribute("content", robotsValue);

    let scriptEl: HTMLScriptElement | null = null;
    let faqScriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": type === "article" ? "Article" : "WebPage",
        "@id": canonicalUrl,
        headline: title,
        name: jsonLd.name,
        description: jsonLd.description,
        url: canonicalUrl,
        inLanguage: "pt-BR",
        image: imageUrl,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: ORG_LOGO,
          },
        },
      });
      document.head.appendChild(scriptEl);
    }

    if (faqItems.length > 0) {
      faqScriptEl = document.createElement("script");
      faqScriptEl.type = "application/ld+json";
      faqScriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });
      document.head.appendChild(faqScriptEl);
    }

    let breadcrumbScriptEl: HTMLScriptElement | null = null;
    if (breadcrumbLabel) {
      const trilha = [
        { name: "Início", url: `${SITE_URL}/` },
        ...(breadcrumbParentName && breadcrumbParentPath
          ? [{ name: breadcrumbParentName, url: `${SITE_URL}${breadcrumbParentPath}` }]
          : []),
        { name: breadcrumbLabel, url: canonicalUrl },
      ];
      breadcrumbScriptEl = document.createElement("script");
      breadcrumbScriptEl.type = "application/ld+json";
      breadcrumbScriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trilha.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      });
      document.head.appendChild(breadcrumbScriptEl);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      metaDesc.setAttribute("content", prevDesc || DEFAULT_DESCRIPTION);
      canonical.setAttribute("href", prevCanonical || DEFAULT_CANONICAL);
      ogUrl.setAttribute("content", prevOgUrl || DEFAULT_CANONICAL);
      ogTitle.setAttribute("content", prevOgTitle || DEFAULT_TITLE);
      ogDesc.setAttribute("content", prevOgDesc || DEFAULT_DESCRIPTION);
      ogType.setAttribute("content", prevOgType || "website");
      ogImage.setAttribute("content", prevOgImage || DEFAULT_OG_IMAGE);
      ogSiteName.setAttribute("content", prevOgSiteName || SITE_NAME);
      ogLocale.setAttribute("content", prevOgLocale || "pt_BR");
      twitterCard.setAttribute("content", prevTwitterCard || "summary_large_image");
      twitterTitle.setAttribute("content", prevTwitterTitle || DEFAULT_TITLE);
      twitterDescription.setAttribute("content", prevTwitterDescription || DEFAULT_DESCRIPTION);
      twitterImage.setAttribute("content", prevTwitterImage || DEFAULT_OG_IMAGE);
      robots.setAttribute("content", prevRobots || "index, follow");
      if (scriptEl?.parentNode) scriptEl.parentNode.removeChild(scriptEl);
      if (faqScriptEl?.parentNode) faqScriptEl.parentNode.removeChild(faqScriptEl);
      if (breadcrumbScriptEl?.parentNode) breadcrumbScriptEl.parentNode.removeChild(breadcrumbScriptEl);
    };
  }, [
    title,
    description,
    path,
    type,
    noindex,
    image,
    faqItems,
    jsonLd?.name ?? "",
    jsonLd?.description ?? "",
    breadcrumbLabel,
    breadcrumbParentName,
    breadcrumbParentPath,
  ]);
}
