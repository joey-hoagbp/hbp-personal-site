export default function SealMark({
  size = 32,
  counter = "var(--ground)",
  frame,
  decorative = false,
}: {
  size?: number;
  counter?: string;
  frame?: boolean;
  decorative?: boolean;
}) {
  // The inner frame is a hairline; below 48px it fills in and muddies the mark.
  const showFrame = frame ?? size >= 48;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Hoàng Bảo Phúc"}
      aria-hidden={decorative || undefined}
      style={{ display: "block", flex: "none" }}
    >
      <rect x="3" y="3" width="94" height="94" rx="9" fill="var(--seal)" />
      {showFrame && (
        <rect
          x="9.5" y="9.5" width="81" height="81" rx="5"
          fill="none" stroke={counter} strokeOpacity="0.32" strokeWidth="1.7"
        />
      )}
      <path
        fill={counter}
        fillRule="evenodd"
        d="M28 24 H71 V57 H39 V78 H28 Z M39 35 H60 V46 H39 Z"
      />
    </svg>
  );
}
