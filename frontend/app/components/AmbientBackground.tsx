/**
 * A single fixed layer painted behind all page content (z-index: -1, so it
 * sits above the body's paper background but beneath every section). Pure
 * decoration: two drifting accent washes, a paper-grain noise overlay, and a
 * faint dot grid. Input-inert and hidden from assistive tech. All motion is
 * CSS-driven and disabled under prefers-reduced-motion (see globals.css).
 *
 * Each `.ambient-wash` is a parallax wrapper (tagged data-parallax, moved by
 * the Parallax component) wrapping an `.ambient-wash-inner` that drifts on a
 * keyframe loop — two separate elements so the scroll-parallax transform and
 * the drift transform never overwrite each other.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-wash ambient-wash-1" data-parallax="0.12">
        <div className="ambient-wash-inner" />
      </div>
      <div className="ambient-wash ambient-wash-2" data-parallax="0.05">
        <div className="ambient-wash-inner" />
      </div>
      <div className="ambient-grid" />
      <div className="ambient-grain" />
    </div>
  );
}
