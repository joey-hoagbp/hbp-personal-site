"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import SealMark from "../SealMark";

function DiagramArrow() {
  return (
    <span className="diagram-arrow" aria-hidden="true">
      <svg viewBox="0 0 46 16">
        <path d="M0 8 H36" stroke="var(--control-border)" strokeWidth="1.2" />
        <path d="M36 3 L44 8 L36 13 Z" fill="var(--control-border)" />
      </svg>
    </span>
  );
}

export default function DecisionDiagram() {
  const { lang } = useLang();
  const t = messages[lang].caseHajime.decision;
  const { nodes } = t;

  return (
    <section className="decision shell">
      <div className="g12">
        <div className="decision-main">
          <p className="eyebrow"><SealMark size={12} decorative /> {t.label}</p>
          <h2 className="h2">{t.title}</h2>
        </div>
        <div className="decision-body">
          <p className="prose">{t.body1}</p>
          <p className="prose">{t.body2}</p>
        </div>

        <div className="decision-diagram-wrap">
          <div className="diagram">
            <div className="diagram-split">
              <div className="node">
                <b>{nodes.start.title}</b>
                <span>{nodes.start.body}</span>
              </div>
              <DiagramArrow />
              <div className="diagram-lanes">
                <div className="diagram-lane">
                  <div className="node">
                    <b>{nodes.client.title}</b>
                    <span>{nodes.client.body}</span>
                  </div>
                  <DiagramArrow />
                  <div className="node">
                    <b>{nodes.clientOut.title}</b>
                    <span>{nodes.clientOut.body}</span>
                  </div>
                </div>
                <div className="diagram-lane">
                  <div className="node">
                    <b>{nodes.server.title}</b>
                    <span>{nodes.server.body}</span>
                  </div>
                  <DiagramArrow />
                  <div className="node">
                    <b>{nodes.serverOut.title}</b>
                    <span>{nodes.serverOut.body}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagram-shared">
              <SealMark size={26} />
              <div className="node node-seal">
                <b>{t.sharedTitle}</b>
                <span>{t.sharedNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
