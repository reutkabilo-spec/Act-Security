import type { ReactNode } from 'react'
import {
  siOkta,
  siGooglecloud,
  siSplunk,
  siElastic,
  siJira,
  siGithub,
  siTerraform,
} from 'simple-icons'

/**
 * Single-color brand glyphs, normalised to a 24×24 viewBox so they render
 * crisply at any size (the LogoTile scales the <svg>, not a bitmap).
 *
 * Two sources, one visual language:
 *  • Vendors still published by simple-icons → their official outline path.
 *  • Vendors simple-icons dropped for trademark reasons (AWS, Azure, Entra,
 *    Sentinel, QRadar, ServiceNow, Slack, Teams, Cortex, Tines) → a clean,
 *    complete, hand-authored mark in the brand's own visual idiom.
 *
 * Every glyph paints with `currentColor`; the LogoTile sets that to the vendor's
 * authentic brand colour and sits the glyph on a white chip - no recolouring.
 *
 * NEED THE PIXEL-PERFECT OFFICIAL LOGO?  Don't touch the glyphs below - use the
 * LOGO_IMAGES escape hatch at the bottom: drop the vendor's real asset into
 * /public/logos/ and add a single line. LogoTile renders that image instead.
 */

const path = (d: string, extra?: Record<string, string | number>) => (
  <path d={d} fill="currentColor" {...extra} />
)

export const BRAND_LOGOS: Record<string, ReactNode> = {
  /* ---- simple-icons (official outlines) ---- */
  okta: path(siOkta.path),
  gcp: path(siGooglecloud.path),
  splunk: path(siSplunk.path),
  elastic: path(siElastic.path),
  jira: path(siJira.path),
  github: path(siGithub.path),
  terraform: path(siTerraform.path),

  /* ---- hand-authored marks (trademark-dropped vendors) ---- */

  // AWS - the smile: a swoosh that sweeps right into an arrowhead
  aws: (
    <>
      <path
        d="M3.6 13.4c2.7 2 5.7 3 8.7 3 2.4 0 4.8-.6 7-1.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.7 12.5l3.1.2-.8 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  // Microsoft Azure - the two-flag "A"
  azure: (
    <>
      <path
        d="M13.3 4.1 7.7 18.4l4.7-.85 2.8 3.25H20a.5.5 0 0 0 .47-.68L13.3 4.1Z"
        fill="currentColor"
      />
      <path
        d="M11.6 6.5 3.55 20.45a.5.5 0 0 0 .43.75H8.2c.32 0 .6-.17.74-.45L13 9.7 11.6 6.5Z"
        fill="currentColor"
        opacity="0.68"
      />
    </>
  ),

  // Microsoft Entra ID - hexagonal identity ring with a verified core
  entra: (
    <>
      <path
        d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </>
  ),

  // Microsoft Sentinel - security shield with a verified check
  sentinel: (
    <>
      <path
        d="M12 2.5 19.5 5.2v6.3c0 4.8-3.2 8.4-7.5 10.5C7.7 19.9 4.5 16.3 4.5 11.5V5.2L12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 11.9l2.3 2.3 4.4-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  // IBM QRadar - a radar sweep: concentric rings, sweep line, blip
  qradar: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 12 19.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.2" cy="8.8" r="1.5" fill="currentColor" />
    </>
  ),

  // ServiceNow - the open "now" loop
  servicenow: (
    <path
      d="M19 6.6A8 8 0 1 0 20.6 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  ),

  // Slack - the four-arm pinwheel hashtag
  slack: (
    <path
      d="M5.04 15.17a2.53 2.53 0 0 1-2.52 2.52A2.53 2.53 0 0 1 0 15.17a2.53 2.53 0 0 1 2.52-2.52h2.52v2.52Zm1.27 0a2.53 2.53 0 0 1 2.52-2.52 2.53 2.53 0 0 1 2.52 2.52v6.31A2.53 2.53 0 0 1 8.83 24a2.53 2.53 0 0 1-2.52-2.52v-6.31ZM8.83 5.04a2.53 2.53 0 0 1-2.52-2.52A2.53 2.53 0 0 1 8.83 0a2.53 2.53 0 0 1 2.52 2.52v2.52H8.83Zm0 1.27a2.53 2.53 0 0 1 2.52 2.52 2.53 2.53 0 0 1-2.52 2.52H2.52A2.53 2.53 0 0 1 0 8.83a2.53 2.53 0 0 1 2.52-2.52h6.31Zm10.13 2.52a2.53 2.53 0 0 1 2.52-2.52A2.53 2.53 0 0 1 24 8.83a2.53 2.53 0 0 1-2.52 2.52h-2.52V8.83Zm-1.27 0a2.53 2.53 0 0 1-2.52 2.52 2.53 2.53 0 0 1-2.52-2.52V2.52A2.53 2.53 0 0 1 15.17 0a2.53 2.53 0 0 1 2.52 2.52v6.31Zm-2.52 10.13a2.53 2.53 0 0 1 2.52 2.52A2.53 2.53 0 0 1 15.17 24a2.53 2.53 0 0 1-2.52-2.52v-2.52h2.52Zm0-1.27a2.53 2.53 0 0 1-2.52-2.52 2.53 2.53 0 0 1 2.52-2.52h6.31A2.53 2.53 0 0 1 24 15.17a2.53 2.53 0 0 1-2.52 2.52h-6.31Z"
      fill="currentColor"
    />
  ),

  // Microsoft Teams - the rounded "T" badge with a person dot
  teams: (
    <>
      <circle cx="18.1" cy="5.6" r="2.9" fill="currentColor" />
      <rect x="2.6" y="5.4" width="13" height="14.2" rx="3" fill="currentColor" />
      <path
        d="M5.6 9h7M9.1 9v7.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </>
  ),

  // Cortex XSOAR - nested hexagons
  xsoar: (
    <>
      <path
        d="M12 2.5 20.5 7.25v9.5L12 21.5 3.5 16.75v-9.5L12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 7 16 9.5v5L12 17 8 14.5v-5L12 7Z" fill="currentColor" />
    </>
  ),

  // Tines - three automation nodes wired into a flow
  tines: (
    <>
      <path
        d="M6 6.5H18M6 6.5 12 17.5M18 6.5 12 17.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="6" cy="6.5" r="2.4" fill="currentColor" />
      <circle cx="18" cy="6.5" r="2.4" fill="currentColor" />
      <circle cx="12" cy="17.5" r="2.4" fill="currentColor" />
    </>
  ),
}

/**
 * Official-asset escape hatch.  When the team has a vendor's real logo file,
 * drop it in /public/logos/ (e.g. /public/logos/aws.svg or .png) and add one
 * line below - LogoTile renders that image and ignores the inline glyph above.
 * No other code changes needed.
 *
 *   export const LOGO_IMAGES: Record<string, string> = {
 *     aws:  '/logos/aws.svg',
 *     okta: '/logos/okta.png',
 *   }
 */
export const LOGO_IMAGES: Record<string, string> = {
  // official brand marks pulled from the Act design library (Figma)
  aws: '/logos/aws.svg',
  azure: '/logos/azure.svg',
  entra: '/logos/entra.svg',
  okta: '/logos/okta.svg',
  gcp: '/logos/gcp.svg',
  servicenow: '/logos/servicenow.svg',
  slack: '/logos/slack.svg',
  jira: '/logos/jira.svg',
  github: '/logos/github.svg',
  terraform: '/logos/terraform.svg',
}

export function brandLogoImage(id?: string): string | undefined {
  return id ? LOGO_IMAGES[id] : undefined
}

export function hasBrandLogo(id?: string): boolean {
  return !!id && (id in BRAND_LOGOS || id in LOGO_IMAGES)
}
