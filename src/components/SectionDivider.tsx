import { Cylinder, Cog, CheckCircle } from "lucide-react";
import { CMYK } from "@/lib/cmyk";

const SectionDivider = () => {
  return (
    <div className="section-divider">
      <div className="section-divider-cmyk-bar" aria-hidden>
        <span className="section-divider-cmyk-stripe" style={{ backgroundColor: CMYK.cyan }} />
        <span className="section-divider-cmyk-stripe" style={{ backgroundColor: CMYK.magenta }} />
        <span className="section-divider-cmyk-stripe" style={{ backgroundColor: CMYK.yellow }} />
        <span className="section-divider-cmyk-stripe" style={{ backgroundColor: CMYK.black }} />
      </div>
      <div className="section-divider-content">
        <div className="section-divider-line" />
        <div className="section-divider-icons">
          <Cylinder className="section-divider-icon" style={{ color: CMYK.cyan }} aria-hidden />
          <span className="section-divider-dot" aria-hidden />
          <Cog className="section-divider-icon" style={{ color: CMYK.magenta }} aria-hidden />
          <span className="section-divider-dot" aria-hidden />
          <CheckCircle className="section-divider-icon" style={{ color: CMYK.yellow }} aria-hidden />
          <span className="section-divider-dot" aria-hidden />
          <Cylinder className="section-divider-icon" style={{ color: CMYK.black }} aria-hidden />
        </div>
        <div className="section-divider-line" />
      </div>
    </div>
  );
};

export default SectionDivider;
