import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Anima um número de 0 até `end` quando o elemento entra na viewport.
 * No prerender (SSG) o script rola a página e aguarda, então o HTML estático
 * já sai com o valor final — bom para SEO e no-JS.
 */
const isPrerender = () =>
  typeof window !== "undefined" && (window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__;

const CountUp = ({ end, prefix = "", suffix = "", duration = 1600, className }: CountUpProps) => {
  // No prerender (SSG) renderiza o valor final direto → HTML estático correto p/ SEO.
  // No cliente real começa em 0 e anima até o valor.
  const [value, setValue] = useState(() => (isPrerender() ? end : 0));
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (isPrerender()) return;
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * end));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animate();
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export default CountUp;
