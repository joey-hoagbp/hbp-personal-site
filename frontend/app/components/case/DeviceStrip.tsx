import { KanaScreen, KanjiScreen } from "../HajimeScreens";

// Same real app screens shown on the homepage's Work section — the case
// study isn't a separate mockup, it's the same product. The screens
// themselves (copy, layout, DeviceFrame) live in HajimeScreens.tsx so this
// file only owns the strip's own layout wrapper.
export default function DeviceStrip() {
  return (
    <section className="device-strip">
      <div className="device-strip-row">
        <KanaScreen />
        <KanjiScreen />
      </div>
    </section>
  );
}
