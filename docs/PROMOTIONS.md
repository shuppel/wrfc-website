# Promotions & the Homepage Event Feed

How to list a time-boxed event on the site, and how to take it down
afterwards.

We deliberately do **not** use a page-load popup: it interrupts every visitor
(and hurts mobile/SEO). Events go in the "What's On" feed in the homepage hero
instead.

## How it works

- Promotions live in `/data/promotions/`, one file per promotion, registered in
  `/data/promotions/index.ts`.
- The homepage hero's "What's On" feed
  (`components/feature/promotion/EventFeed.tsx`, data in `/data/feed.ts`)
  lists every live promotion, **soonest `eventStart` first**, up to four,
  then the recurring practice item so the feed is never empty. The next
  upcoming event gets the red "Next up" tile.
- **Live** means `isActive: true` AND `startDate <= now <= endDate`. The check
  runs in the visitor's browser, so a promotion turns itself off the moment
  `endDate` passes. No redeploy needed.
- Dates **fail closed**: if `startDate` or `endDate` is missing or malformed,
  the promotion never shows (with a console warning in development).
- `startDate`/`endDate` control **visibility**; `eventStart` is **when the
  event happens** and drives the date tile and ordering. Undated promotions
  sort after dated ones, by `priority`.

## Zeffy ticket / donation buttons

Zeffy's `embed-form-script` (loaded in `app/layout.tsx`) only binds
`zeffy-form-link` elements that exist when the page first loads. Anything
rendered later, such as client components, dialogs or content after
client-side navigation, does **nothing** when clicked.

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
   - `startDate`: when the listing should start (ISO with offset, e.g.
     `2026-10-01T00:00:00-04:00`)
   - `endDate`: **required.** Use the end of event day in Eastern time, e.g.
     `2026-11-14T23:59:59-05:00`. Watch the offset: `-04:00` during daylight
     time, `-05:00` after early November.
   - `eventStart`: when the event starts (add `allDay: true` for
     tournaments / multi-day events to hide the time)
   - `location`: short venue label, e.g. `Capital One Arena`
   - `zeffyFormUrl` if tickets are sold on Zeffy, and `buttonText` for the
     row's CTA (e.g. `Get Tickets`)
3. Register it in the `promotions` array in `/data/promotions/index.ts`.
4. Check it locally: `npm run dev`, open the homepage, and confirm the event
   shows in "What's On" with the right date/time and that its CTA (or the
   Zeffy form) opens.

## After the event (cleanup)

The feed already dropped the event at `endDate`, so cleanup is
housekeeping, not urgent. Within a week or two of the event:

1. Delete `/data/promotions/<event-slug>.ts` and its entry in `index.ts`.
2. Remove its block from `/data/zeffy-links.ts`.
3. Search for leftover references: `grep -rn "<event-slug>" app components data`.

To pull a promotion **early** (event cancelled, sold out), set
`isActive: false` and deploy.

## Recurring events

For annual events (e.g. Cherry Blossom), keep the file but set
`isActive: false` between editions and update the dates and Zeffy link when
the next edition opens. The file header should say what to change.
