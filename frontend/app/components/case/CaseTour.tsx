"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import { HAJIME_TOUR } from "../../data";
import DeviceFrame from "../DeviceFrame";
import { Screenshot } from "../HajimeScreens";
import SectionHeader from "../SectionHeader";

// Every Hajime screen, in the order a new learner meets them, as one
// horizontally scrolling row. The row is a focusable region so keyboard
// users can scroll it with the arrow keys.
export default function CaseTour() {
  const { lang } = useLang();
  const t = messages[lang].caseHajime.tour;

  return (
    <section className="tour">
      <div className="shell">
        <SectionHeader id="screens" label={t.label} title={t.title} aside={t.note} />
      </div>
      <div className="tour-row" tabIndex={0} role="region" aria-label={t.regionLabel}>
        <ol className="tour-list">
          {HAJIME_TOUR.map(({ id, src }, i) => {
            const screen = t.screens[id];
            return (
              <li className="tour-item" key={id}>
                <figure>
                  {/* Short alt: the figcaption right below already describes the screen. */}
                  <DeviceFrame>
                    <Screenshot src={src} alt={screen.name} />
                  </DeviceFrame>
                  <figcaption className="tour-caption">
                    <span className="tour-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tour-name">{screen.name}</span>
                    <span className="tour-note">{screen.caption}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
