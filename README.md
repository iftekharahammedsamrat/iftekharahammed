# UK Plumber AI Receptionist Website — Fresh Build

Trust-first, demo-led sales website for an AI voice receptionist aimed at UK plumbing and heating firms with roughly 2–5 engineers.

Production domain: `https://iftekharahammedsamrat.com`

Public brand: **Iftekhar Ahammed**  
Service descriptor: **AI Reception for UK Plumbing Firms**  
Footer/legal identity: **Iftekhar Ahammed Samrat**

## Build boundary

This folder is a clean implementation based on:

- `UK-PLUMBER-BUYER-RESEARCH.md`
- `UK-PLUMBER-WEBSITE-DESIGN-RESEARCH.md`

No HTML, CSS, JavaScript, page structure or copy was taken from the earlier websites or build prompts. The only reused source material is the real founder portrait and the working SwiftPipe demo video requested by the research.

## Project files

- `index.html` — full sales page
- `styles.css` — responsive visual system and legal-page styles
- `script.js` — navigation, demo player, mobile actions, optional contact configuration and event hooks
- `site-config.js` — public WhatsApp/email settings
- `privacy.html` — website and pre-deployment data boundaries
- `terms.html` — honest demo, safety, pricing and performance limits
- `favicon.svg` — local brand mark
- `assets/` — founder portrait, demo video, poster and local Manrope font files

Current demo source copied into the site:

```text
C:\Projects\My Project\DEMO VIDEO\SHORT DEMO\SHORT DEMO VIDEO (FINAL).mp4
```

## Preview locally

From this folder, run the included range-enabled preview server:

```powershell
python serve.py
```

Then open:

```text
http://localhost:4173/
```

The included server supports video byte-range requests, so the demo can seek immediately from the timeline. Opening `index.html` directly may work, but it is not a reliable way to test video seeking. When deploying, use a host/CDN that returns `206 Partial Content` for MP4 range requests.

## Public settings

Edit `site-config.js` to change the WhatsApp number, default message or confirmed public email address.

The confirmed fallback email is `iftekharahammedsamrat2@gmail.com`.

## Deliberate trust decisions

- SwiftPipe is labelled as a **fictional demo firm**.
- No fake testimonial, client logo, Gas Safe badge or performance statistic is used.
- The demo duration is not claimed in page copy.
- No settled price, minute allowance, setup fee or response time is invented.
- The managed pilot states which commercial details must be agreed in writing.
- The gas example is described as a configured rule, not professional emergency guidance.
- The +880 WhatsApp number is shown transparently rather than disguised as a UK number.
- No analytics, advertising tracker, cookie banner or remote font request is enabled in this build.

## Confirm before public launch

The following details were not supplied by the research and should be confirmed rather than guessed:

1. Public business/trading name, legal service address and any registration details.
2. A response-time promise, only if it can be honoured.
3. Final monthly fee and any setup fee.
4. Included calls/minutes and exact extra-usage rate.
5. Pilot cancellation, support and change policy.
6. Whether a live test phone number will be published.
7. Production hosting provider and its log-retention settings.
8. Client-specific call recording, processors, storage regions, access and retention schedule.
9. Privacy-compliant analytics and consent setup if conversion measurement is added.

## Conversion event hooks

Buttons with `data-event` dispatch a browser event named `site:conversion`. If a `window.dataLayer` array exists later, the same event is pushed there. This build does not send tracking data anywhere by itself.

Key actions already labelled include:

- hero/header/demo clicks
- actual demo plays
- WhatsApp clicks
- email opens and copy actions
- mobile sticky-bar clicks
- pilot enquiry clicks

## Accessibility and mobile behaviour

- Semantic headings, landmarks and native disclosure controls
- Skip link and visible keyboard focus
- 48px+ primary targets
- No autoplay audio or video
- On-page demo transcript/key moments
- Reduced-motion support
- Mobile menu and slim sticky `Hear demo` / `WhatsApp` actions
- Content remains visible if JavaScript fails
