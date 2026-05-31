import { BRAND_LOGOS, brandLogoImage } from './brandLogos'

interface Props {
  /** integration id - keys into the SVG logo set; falls back to the monogram */
  id?: string
  mono: string
  /** the vendor's authentic brand colour - the glyph always renders in it */
  color: string
  size?: number
}

/**
 * A vendor logo on a neutral white chip - the standard, brand-compliant way to
 * present third-party logos (every brand permits its mark on white, and it keeps
 * dark logos like Splunk/GitHub legible on a dark app theme). Logos always paint
 * in their authentic brand colour; no recolouring.
 *
 * Resolution order: an official asset in LOGO_IMAGES → the inline brand glyph →
 * a monogram. The whole set lives in one file, brandLogos.tsx, so swapping in a
 * real logo is a single-line change.
 */
export function LogoTile({ id, mono, color, size = 44 }: Props) {
  const imageSrc = brandLogoImage(id)
  const glyph = !imageSrc && id && id in BRAND_LOGOS ? BRAND_LOGOS[id] : null

  const tile = {
    width: size,
    height: size,
    background: '#ffffff',
    border: '1px solid rgba(15, 18, 32, 0.10)',
    boxShadow: '0 1px 2px rgba(15, 18, 32, 0.06)',
  } as const

  // official asset (team-provided) takes precedence
  if (imageSrc) {
    return (
      <div className="flex shrink-0 items-center justify-center rounded-xl" style={tile}>
        <img
          src={imageSrc}
          alt={mono}
          width={size * 0.56}
          height={size * 0.56}
          style={{ objectFit: 'contain' }}
        />
      </div>
    )
  }

  if (glyph) {
    return (
      <div className="flex shrink-0 items-center justify-center rounded-xl" style={tile}>
        <svg
          width={size * 0.56}
          height={size * 0.56}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={mono}
          style={{ color }}
        >
          {glyph}
        </svg>
      </div>
    )
  }

  // monogram fallback - vendors without a defined glyph
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl font-bold"
      style={{ ...tile, color, fontSize: size * 0.36, letterSpacing: '-0.04em' }}
    >
      {mono.toUpperCase()}
    </div>
  )
}
