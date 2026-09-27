# Promotions & Event Popups

How to run a time-boxed promotion (popup, carousel card) for an event, and how
to take it down afterwards.

## How it works

- Promotions live in `/data/promotions/`, one file per promotion, registered in
  `/data/promotions/index.ts`.
- The site-wide popup (`components/feature/promotion/WelcomeModal.tsx`) is
  mounted in `app/layout.tsx`, so it can appear on whichever page a visitor
  lands on. It shows the highest-`priority` promotion that has
  `showPopup: true` and is currently live.
- **Live** means `isActive: true` AND `startDate <= now <= endDate`. The check
  runs in the visitor's browser, so a promotion turns itself off the moment
  `endDate` passes. No redeploy needed.
- Dates **fail closed**: if `startDate` or `endDate` is missing or malformed,
  the promotion never shows (with a console warning in development).
- Each visitor sees a given popup at most once per 24 hours. The dismissal is
  stored per promotion (`promoPopupLastShown:<id>` in localStorage), so a new
  promotion is not suppressed because someone closed an older one.

## Zeffy ticket / donation buttons

Zeffy's `embed-form-script` (loaded in `app/layout.tsx`) only binds
`zeffy-form-link` elements that exist when the page first loads. Anything
rendered later, such as popups, dialogs or content after client-side
navigation, does **nothing** when clicked.

For those cases, set `zeffyFormUrl` on the promotion (or render
`components/feature/payment/ZeffyFormModal.tsx` yourself). It opens the same
Zeffy form in an on-page modal using Zeffy's own open/close messages.

Use the **embed** URL for `zeffyFormUrl` and the public page for `buttonUrl`
(the fallback when a promotion is shown somewhere without the modal):

```
embed:     https://www.zeffy.com/embed/ticketing/<slug>?modal=true
public:    https://www.zeffy.com/en-US/ticketing/<slug>
```

Keep both in `/data/zeffy-links.ts`.

## Adding an event promotion (checklist)

1. Add the Zeffy links to `/data/zeffy-links.ts` under a named key.
2. Create `/data/promotions/<event-slug>.ts` exporting a `Promotion`:
   - `id`: unique and includes the year, e.g. `capitals-rugby-night-2026`
   - `startDate`: when the popup should start (ISO with offset, e.g.
     `2026-10-01T00:00:00-04:00`)
   - `endDate`: **required.** Use the end of event day in Eastern time, e.g.
     `2026-11-14T23:59:59-05:00`. Watch the offset: `-04:00` during daylight
     time, `-05:00` after early November.
   - `showPopup: true`, plus `zeffyFormUrl` if tickets are sold on Zeffy
   - `eventDetails` (date + location) for the info pills, `badge` for the
     image label
3. Register it in the `promotions` array in `/data/promotions/index.ts`.
4. Pick `priority`: the highest live popup wins, so event promos should
   outrank evergreen ones.
5. Check it locally: `npm run dev`, clear the `promoPopupLastShown:*` keys in
   localStorage, reload, and confirm the popup opens and the Zeffy form works.

## After the event (cleanup)

The popup already stopped at `endDate`, so cleanup is housekeeping, not
urgent. Within a week or two of the event:

1. Delete `/data/promotions/<event-slug>.ts` and its entry in `index.ts`.
2. Remove its block from `/data/zeffy-links.ts`.
3. Search for leftover references: `grep -rn "<event-slug>" app components data`.

To pull a promotion **early** (event cancelled, sold out), set
`isActive: false` and deploy.

## Recurring events

For annual events (e.g. Cherry Blossom), keep the file but set
`isActive: false` between editions and update the dates and Zeffy link when
the next edition opens. The file header should say what to change.
