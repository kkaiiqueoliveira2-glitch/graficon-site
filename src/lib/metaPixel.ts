type MetaPixelPayload = Record<string, string | number | boolean | null | undefined>;

type FbqFn = (
  command: "track" | "trackCustom",
  eventName: string,
  payload?: MetaPixelPayload
) => void;

const getFbq = (): FbqFn | null => {
  if (typeof window === "undefined") return null;
  const maybeFbq = (window as Window & { fbq?: FbqFn }).fbq;
  return typeof maybeFbq === "function" ? maybeFbq : null;
};

export const trackMetaEvent = (
  eventName: string,
  payload?: MetaPixelPayload,
  useCustomEvent = true
) => {
  const fbq = getFbq();
  if (!fbq) return;

  if (useCustomEvent) {
    fbq("trackCustom", eventName, payload);
    return;
  }

  fbq("track", eventName, payload);
};
