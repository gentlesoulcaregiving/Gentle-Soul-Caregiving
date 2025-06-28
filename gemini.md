<!-- ─────────────────────────────────────────────────────────── -->
<!--  GEMINI.md — Gentle Soul Caregiving (All-in-One Spec)      -->
<!--  Author: Mike Laffin | Updated: 2025-06-27                 -->
<!-- ─────────────────────────────────────────────────────────── -->

# 0 GLOBAL OBJECTIVE  
Design → build → test → deploy a WCAG-AA, senior-friendly, high-performance website & booking funnel for **Gentle Soul Caregiving**—a solo in-home care service—using Gemini CLI’s autonomous Plan → Act → Reflect loop.

# 1 BRAND & VISUAL IDENTITY  
| Token      | Hex       | Use-case & Rationale |  
|------------|-----------|----------------------|  
| Primary    | `#CDB4DB` (Lavender 200) | Low-arousal hue scientifically linked to relaxation & trust |  
| Accent     | `#C3E2C2` (Moss 100)     | Signals health & renewal |  
| Neutral    | `#FFF9F2` (Cream 50)     | Warm backdrop, reduces glare |  
| Action     | `#2F4A7F` (Navy 700)     | High-contrast CTAs; blue ranks most calming |  
**Fonts** – *Playfair Display* 700 (headings, 1.25 em tracking); *Karla* 400 (body, 1 rem size, 1.45 rem line-height).  
Max line length: 65 ch.  
Pastel, hand-drawn illustrations (Imagen 4) soften clinical tone.

# 2 USER PERSONAS & CONTENT  
Family decision-makers, independent seniors, and overloaded spouses in Adams/Baraboo/ Wisconsin Dells.  
SEO keywords: **in-home senior care Adams WI**, **respite caregiver Baraboo**, **solo caregiver Wisconsin Dells**.

# 3 TECH STACK (IMMUTABLE)  
- **Frontend** Next.js 15.3 + React 19 (Turbopack)  
- **Styling** Tailwind CSS 4 “Oxide”  
- **UI Kit** shadcn/ui  
- **Animation** Framer Motion + `useReducedMotion()`  
- **Backend** Supabase (Postgres + RLS)  
- **Deployment** Vercel prod alias `gentle-soul-caregiving.com`  
- **Testing** Jest + Playwright + Lighthouse-CI

# 4 DESIGN SYSTEM  
- 8-pt grid: all spacing & icon sizes in multiples of 8 px.  
- Breakpoints: 480 / 768 / 1024 / 1440 px; 12-col grid ≥ 768 px.  
- Icons ≥ 24 px, alt text + visible labels.  
- Focus ring: 2 px solid **Action** color, persistent.  
- `@media (prefers-reduced-motion: reduce)` disables transforms; opacity-only fades ≤ 150 ms.

# 5 ACCESSIBILITY & PERFORMANCE TARGETS  
- WCAG 2.2 AA compliance.  
- Lighthouse: mobile ≥ 95, desktop = 100 (CI gate aborts below).

# 6 DATA MODEL (Supabase)  

```sql
create table leads (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  phone       text,
  email       text,
  address     text,
  services    text[],
  message     text,
  created_at  timestamptz default now()
);
RLS: insert allowed for anon, select restricted to service-role key.

7 SEO & STRUCTURED DATA
Embed Service-level JSON-LD:

jsx
Copy
Edit
<script type="application/ld+json">
{
 "@context":"https://schema.org",
 "@type":"LocalBusiness",
 "name":"Gentle Soul Caregiving",
 "areaServed":"Adams County, WI",
 "serviceType":["Companion care","Respite care"],
 "url":"https://gentle-soul-caregiving.com",
 "telephone":"+1-608-555-0199"
}
</script>
Generate sitemap & robots via next-sitemap.config.mjs.

8 TOOL MAP (/tools.json)
jsonc
Copy
Edit
{
  "vercel":   { "cmd":"npx", "args":["vercel","--prod"] },
  "npm":      { "cmd":"npm", "args":["$*"] },
  "supabase": { "cmd":"npx", "args":["supabase","$*"] },
  "lhci":     { "cmd":"npx", "args":["lighthouse-ci","autorun"] }
}
9 OPERATING CONSTRAINTS
Atomic commits after each major step (/git commit -m + summary).

Log every /bash, /code, and /tool action to Memory MCP.

External command timeout ≤ 180 s; auto-retry lint/test failures.

10 ACTION PLAN
#	Directive	Success Gate
1	/bash npx create-next-app@latest gentle-soul-caregiving --ts --tailwind	Scaffold ready
2	/code apply brand tokens in tailwind.config.js & globals.css, install shadcn preset	npm run lint clean
3	Build Home, About, Services pages with 8-pt spacing & accessible components	Unit tests pass
4	Add Booking form → Supabase leads + EmailJS notification	Data saved
5	Insert Calendar picker (react-cal)	Slot selection visible
6	Inject JSON-LD, meta tags, open graph; run npm run test:seo	Passed
7	/tool lhci → Lighthouse-CI; abort if mobile < 95	Score met
8	/tool vercel	Live 200 OK

11 CI/CD
.github/workflows/ci.yml → lint → unit → Playwright → Lighthouse-CI → deploy → Slack webhook.

12 EXIT CRITERIA
✓ Domain resolves (HTTPS).
✓ Booking writes to Supabase & emails owner.
✓ Google Rich-Results test passes.
✓ Lighthouse thresholds met.
✓ All tasks logged to Memory MCP.