import type { ReactNode } from "react";
import SealMark from "./SealMark";

export default function SectionHeader({
  id, label, title, aside,
}: { id: string; label: string; title: ReactNode; aside?: string }) {
  return (
    <div className="g12 section-header" id={id}>
      <div className="section-header-main">
        <p className="eyebrow"><SealMark size={13} decorative /> {label}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {aside && <p className="prose section-header-aside">{aside}</p>}
    </div>
  );
}
