type GtagEventPayload = Record<string, string | number | boolean | null | undefined>;

export const trackGoogleEvent = (eventName: string, payload?: GtagEventPayload) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, payload);
};
