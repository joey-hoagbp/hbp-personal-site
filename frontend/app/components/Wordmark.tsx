export default function Wordmark({ size = 24 }: { size?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: size }} role="img" aria-label="phúc">
      <span aria-hidden="true">
        ph
        <span className="wordmark-u">
          u
          <svg className="wordmark-accent" viewBox="0 0 24 22" aria-hidden="true">
            <path d="M6 19 L16 3 L20 5.5 L10 21.5 Z" />
          </svg>
        </span>
        c
      </span>
    </span>
  );
}
