#!/usr/bin/env bash
# Deterministic capture of the four UI screenshots + the deck PDF.
# Requires the dev server running on :5180.
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:5180"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
SHOTS="$DIR/public/shots"
OUT="$DIR/../deliverables"

shot() { # name url
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=1500,940 \
    --virtual-time-budget=4000 \
    --screenshot="$SHOTS/$1.png" "$BASE/$2" >/dev/null 2>&1
  echo "captured $1.png"
}

# --- catalog / page states (final UI) ---
shot catalog-dark    "?demo=live&still=1"                 # populated, dark
shot catalog-day0     "?demo=fresh&still=1"               # Day-0 get-started hero
shot catalog-light    "?demo=live&theme=light&still=1"    # light mode (accessibility pass)

# --- guided connect flow (AWS) ---
shot aws-overview "?open=aws&phase=overview&demo=fresh&still=1"  # trust-first overview
shot aws-consent  "?open=aws&phase=consent&still=1"             # read vs write scopes
shot aws-error    "?open=aws&phase=error&still=1"               # names missing permission + fix
shot aws-success  "?open=aws&phase=success&still=1"             # connected + audit

# --- lifecycle states ---
shot okta-update  "?open=okta&phase=overview&demo=live&still=1" # connected w/ pending update

# deck → PDF (print CSS sets @page 1280x720)
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=6000 \
  --print-to-pdf="$OUT/Act-Security-Integrations-Deck.pdf" \
  "$BASE/?view=deck&still=1" >/dev/null 2>&1
echo "exported deck PDF"
