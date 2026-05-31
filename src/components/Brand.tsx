import type { CSSProperties } from 'react'

/**
 * The Act wordmark - the real act.security logo (single-color, #F94351),
 * vectorised from the brand SVG (viewBox 0 0 78 36). `size` sets the height;
 * width scales to the wordmark's natural aspect ratio. `color` flows to the
 * fill so it can adapt per theme (coral on light, can invert on dark tiles).
 */
export function ActLogo({
  size = 26,
  color = 'var(--brand-red)',
  style,
}: {
  size?: number
  color?: string
  /** @deprecated the real wordmark has no separate dot */
  withDot?: boolean
  style?: CSSProperties
}) {
  return (
    <svg
      height={size}
      width={size * (78 / 36)}
      viewBox="0 0 78 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Act"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      <path
        d="M0.0812471 26.7664C-1.12264 17.2017 11.3659 12.488 16.7742 20.4799H16.7736L23.3195 30.1385C23.8671 30.9463 25.1286 30.5581 25.1286 29.5841V17.0797C25.1286 14.4324 22.9884 12.2934 20.3552 12.2934H20.3533C12.6501 12.2872 2.67 12.3185 1.64858 12.3185V7.78562C2.61536 7.78562 12.6798 7.75435 20.357 7.76059L20.3564 7.7612C25.5003 7.76183 29.6614 11.9372 29.6614 17.0797V29.5841C29.6614 35.0248 22.6207 37.1876 19.5669 32.6815L13.021 23.0217L13.0198 23.0205C10.2881 18.9838 3.97152 21.3589 4.57869 26.1979L4.61105 26.4134C4.99621 28.6248 6.91579 30.2563 9.18237 30.2564H16.3914V34.7892H9.18237C4.55714 34.7892 0.66295 31.3504 0.0818577 26.7682L0.0812471 26.7664Z"
        fill={color}
      />
      <path d="M77.5631 7.76163V12.2945H61.2512V7.76163H77.5631Z" fill={color} />
      <path
        d="M66.0674 27.3657V0H70.6002V27.3657C70.6002 28.9712 71.8992 30.2701 73.5047 30.2701H77.9997V34.803H73.5047C69.3957 34.803 66.0674 31.4746 66.0674 27.3657Z"
        fill={color}
      />
      <path
        d="M46.9207 7.25293C51.0581 7.25301 54.4438 8.80741 56.7698 11.4481C58.162 13.0288 59.1196 14.9362 59.6584 17.0129H54.9124C54.5302 16.0294 54.0099 15.1629 53.3732 14.4399C51.9683 12.8449 49.8543 11.7798 46.9207 11.7797C42.2302 11.7797 38.1867 15.8714 38.1865 21.2203C38.1865 26.5702 42.2246 30.6614 46.9207 30.6615C49.9261 30.6614 52.0319 29.5897 53.4135 28.008C54.0243 27.3086 54.5246 26.4722 54.8966 25.5223H59.6462C59.1155 27.5553 58.1841 29.4272 56.8229 30.9857C54.5049 33.6397 51.1113 35.1876 46.9207 35.1876C39.4626 35.1876 33.6592 28.7999 33.6592 21.2203C33.6593 13.64 39.4698 7.25298 46.9207 7.25293Z"
        fill={color}
      />
    </svg>
  )
}

/**
 * Construction-line illustration in Act's brand language: lime geometric
 * forms overlaid with thin coral guide lines, concentric circles, crop marks
 * and dimension ticks at varying opacities - a blueprint of the "control
 * plane" being assembled. Decorative; used on title / section slides.
 */
export function ConstructionArt({
  className = '',
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  const lime = 'var(--accent)'
  const red = 'var(--brand-red)'
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* faint baseline grid */}
      <g stroke={red} strokeWidth="1" opacity="0.12">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="360" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="480" y2={i * 60} />
        ))}
      </g>

      {/* lime forms - the assembled control plane */}
      <rect x="64" y="96" width="168" height="168" rx="34" fill={lime} opacity="0.92" />
      <circle cx="332" cy="150" r="74" fill={lime} opacity="0.9" />
      <rect x="270" y="244" width="146" height="40" rx="20" fill={lime} opacity="0.55" />

      {/* concentric construction circles around the node */}
      <g stroke={red} fill="none">
        <circle cx="332" cy="150" r="74" strokeWidth="1.5" opacity="0.55" />
        <circle cx="332" cy="150" r="96" strokeWidth="1" opacity="0.3" />
        <circle cx="332" cy="150" r="118" strokeWidth="1" opacity="0.16" />
      </g>

      {/* crosshair through the node */}
      <g stroke={red} strokeWidth="1" opacity="0.5">
        <line x1="332" y1="34" x2="332" y2="266" />
        <line x1="206" y1="150" x2="458" y2="150" />
      </g>

      {/* crop / registration marks on the rounded square */}
      <g stroke={red} strokeWidth="1.5" opacity="0.75">
        <path d="M48 96 H72 M48 96 V120" />
        <path d="M248 96 H224 M248 96 V120" />
        <path d="M48 264 H72 M48 264 V240" />
        <path d="M248 264 H224 M248 264 V240" />
      </g>

      {/* dimension line with tick caps */}
      <g stroke={red} strokeWidth="1" opacity="0.45">
        <line x1="64" y1="292" x2="232" y2="292" />
        <line x1="64" y1="286" x2="64" y2="298" />
        <line x1="232" y1="286" x2="232" y2="298" />
      </g>

      {/* node dots at key intersections */}
      <g fill={red}>
        <circle cx="332" cy="150" r="4" opacity="0.9" />
        <circle cx="64" cy="96" r="3" opacity="0.7" />
        <circle cx="232" cy="264" r="3" opacity="0.7" />
        <circle cx="406" cy="150" r="3" opacity="0.6" />
      </g>

      {/* diagonal guide */}
      <line x1="64" y1="264" x2="332" y2="76" stroke={red} strokeWidth="1" opacity="0.22" />
    </svg>
  )
}

/**
 * Banner-tuned brand blueprint. Unlike ConstructionArt (solid lime forms), this
 * is stroke-forward - the three control-plane tiers drawn as outlined nodes wired
 * bottom-up, wrapped in coral construction geometry (rings, crosshair, crop
 * marks, dimension ticks). Reads crisply even when placed faintly behind banner
 * copy, where solid fills would just smudge. Decorative only.
 */
export function ControlPlaneBlueprint({
  className = '',
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  const red = 'var(--brand-red)'
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 300 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* faint baseline grid */}
      <g stroke={red} strokeWidth="1" opacity="0.1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="220" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 36} x2="300" y2={i * 36} />
        ))}
      </g>

      {/* concentric construction rings around the focal node - enlarged */}
      <g stroke={red} fill="none">
        <circle cx="170" cy="110" r="62" strokeWidth="1.5" opacity="0.55" />
        <circle cx="170" cy="110" r="88" strokeWidth="1.25" opacity="0.32" />
        <circle cx="170" cy="110" r="116" strokeWidth="1" opacity="0.16" />
      </g>

      {/* focal node + inner ring */}
      <g stroke={red} fill="none">
        <circle cx="170" cy="110" r="30" strokeWidth="2" opacity="0.7" />
        <circle cx="170" cy="110" r="4" fill={red} stroke="none" opacity="0.85" />
      </g>

      {/* crosshair through the node - full bleed */}
      <g stroke={red} strokeWidth="1.25" opacity="0.45">
        <line x1="170" y1="0" x2="170" y2="220" />
        <line x1="0" y1="110" x2="300" y2="110" />
      </g>

      {/* crop / registration marks framing the wider field */}
      <g stroke={red} strokeWidth="1.5" opacity="0.6">
        <path d="M44 20 H58 M44 20 V34" />
        <path d="M296 20 H282 M296 20 V34" />
        <path d="M44 200 H58 M44 200 V186" />
        <path d="M296 200 H282 M296 200 V186" />
      </g>

      {/* dimension line with tick caps */}
      <g stroke={red} strokeWidth="1" opacity="0.4">
        <line x1="44" y1="212" x2="296" y2="212" />
        <line x1="44" y1="206" x2="44" y2="218" />
        <line x1="296" y1="206" x2="296" y2="218" />
      </g>

      {/* diagonal guides */}
      <line x1="40" y1="208" x2="300" y2="14" stroke={red} strokeWidth="1" opacity="0.22" />
      <line x1="40" y1="14" x2="300" y2="208" stroke={red} strokeWidth="1" opacity="0.12" />
    </svg>
  )
}

/**
 * Small construction-line "spot" illustrations in Act's brand language -
 * lime geometric form + thin coral guide lines, concentric rings and tick
 * marks. Intentionally quiet (low opacity) so they sit behind content in
 * empty / success / error states without competing with it.
 */
export function SpotIllustration({
  variant,
  size = 132,
  className = '',
  style,
}: {
  variant: 'empty' | 'success' | 'error'
  size?: number
  className?: string
  style?: CSSProperties
}) {
  const lime = 'var(--accent)'
  const red = 'var(--brand-red)'
  const ok = 'var(--ok)'
  const danger = 'var(--danger)'
  const focal = variant === 'success' ? ok : variant === 'error' ? danger : lime

  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* faint baseline grid */}
      <g stroke={red} strokeWidth="1" opacity="0.08">
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="120" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 30} x2="120" y2={i * 30} />
        ))}
      </g>

      {/* concentric construction rings */}
      <g stroke={red} fill="none">
        <circle cx="60" cy="58" r="34" strokeWidth="1.25" opacity="0.4" />
        <circle cx="60" cy="58" r="46" strokeWidth="1" opacity="0.16" />
      </g>

      {/* crop marks */}
      <g stroke={red} strokeWidth="1.25" opacity="0.6">
        <path d="M18 22 H30 M18 22 V34" />
        <path d="M102 22 H90 M102 22 V34" />
        <path d="M18 94 H30 M18 94 V82" />
        <path d="M102 94 H90 M102 94 V82" />
      </g>

      {variant === 'empty' && (
        <>
          {/* empty dashed container - nothing inside yet */}
          <rect
            x="38"
            y="36"
            width="44"
            height="44"
            rx="11"
            fill={lime}
            opacity="0.14"
          />
          <rect
            x="38"
            y="36"
            width="44"
            height="44"
            rx="11"
            stroke={lime}
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.8"
            fill="none"
          />
          <line x1="60" y1="46" x2="60" y2="70" stroke={lime} strokeWidth="1.5" opacity="0.55" />
          <line x1="48" y1="58" x2="72" y2="58" stroke={lime} strokeWidth="1.5" opacity="0.55" />
        </>
      )}

      {variant === 'success' && (
        <>
          {/* assembled lime node + check */}
          <rect x="38" y="36" width="44" height="44" rx="13" fill={lime} opacity="0.9" />
          <path
            d="M50 58 L57 65 L72 50"
            stroke="var(--accent-ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}

      {variant === 'error' && (
        <>
          {/* lime form with a deliberate corner gap - something missing */}
          <rect x="38" y="36" width="44" height="44" rx="13" fill={lime} opacity="0.55" />
          <path
            d="M60 49 V61 M60 68 V69"
            stroke="var(--accent-ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {/* node dots */}
      <g fill={focal}>
        <circle cx="60" cy="58" r="2.5" opacity="0.9" />
        <circle cx="106" cy="58" r="2.5" opacity="0.6" />
        <circle cx="60" cy="12" r="2.5" opacity="0.5" />
      </g>
    </svg>
  )
}
