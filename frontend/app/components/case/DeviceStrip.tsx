import { CheckScreen, KanaScreen, LearnScreen } from "../HajimeScreens";

// Same real app screens shown on the homepage's Work section, plus a third
// (the Kana chart) that only fits at the widest layout. The screens
// themselves (screenshots, DeviceFrame) live in HajimeScreens.tsx so this
// file only owns the strip's own layout: visibility and vertical offset are
// handled in globals.css against `.device-strip-row`'s children by
// position, per spec §3 ("Three phones >=1200 (outer two offset +44px);
// two at 960; one below").
export default function DeviceStrip() {
  return (
    <section className="device-strip">
      <div className="device-strip-row">
        <LearnScreen />
        <KanaScreen />
        <CheckScreen />
      </div>
    </section>
  );
}
