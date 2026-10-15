# pure-vision

Lead-generation website for a general contractor. The public business name, services, and project details are still placeholders.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current phase

Phase 2 is the design foundation: typography, color tokens, buttons, fields, and the shared header and footer. Marketing pages are labeled placeholders. The contact fields do not send a lead, and the estimator does not calculate a price.

Search indexing is off until `allowIndexing` is set to `true` in `src/content/site.ts`.

## Design tokens

Colors and type live in `src/app/globals.css`. Switzer and Boska load from Fontshare. The brand accent is the `--brand` variable. It currently matches the charcoal text color.

Repeated business details and navigation live in `src/content/site.ts`.
