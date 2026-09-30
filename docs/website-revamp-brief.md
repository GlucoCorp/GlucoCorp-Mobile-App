# GluCorp website revamp: brief

Status: built, then revised. The first build transcribed the deck and read like a document. The current site uses the deck for facts only: short copy, product visuals, one idea per section.

## 0. Source of truth

This brief is based on the **GluCorp Health Pitch Deck** artifact (last updated 29 Sep 2026). It is the most recent description of the company available to this session. The claude.ai chats and the GluCorp project folder could not be opened from here. **If anything in those chats contradicts this brief, the chats win.** Please flag any differences before the build starts.

## 1. What changed, and why the current site is wrong

The live `index.html` describes a consumer pregnancy-tracking **app**: sign up, log blood pressure and glucose, get AI alerts, chat with a bot, join a community. That is no longer the business.

| | Current site says | GluCorp today |
|---|---|---|
| Product | Mobile app for mothers | **Aya Mama**: a clinical early-warning **band** plus a **monitoring and referral system** |
| Problem | General maternal health | **Postpartum haemorrhage (PPH)**, the leading cause of maternal death in Kenya and Rwanda |
| User | Pregnant women download it | Clinicians and facilities; the band is fitted to the mother at admission |
| Who pays | Implied consumer | **The mother never pays.** Hospitals, insurers, governments and donors pay |
| Stage | "Subscribe now", "Watch demo" | Early stage. Hardware specified, prototype next, pilots in Rwanda |
| Base | Unstated | Moving HQ to **Kigali, Rwanda**. Hardware build partner in Kenya |
| Team | 2 founders | 3-person team and 2 board members, looking for partners |

The app MVP on Google Play is now **traction history**: it produced 50+ interviews with mothers and providers and led to the pivot. It is not the product.

## 2. Who the site is for, in priority order

1. **Clinical and health-system partners**: Rwanda MoH/RBC, facilities, obstetricians, and potential pilot sites.
2. **Partners**: hospitals, clinicians, researchers and organisations who can pilot and validate Aya Mama. GluCorp is not hiring.
3. **Anyone checking us out**: funders who've seen the deck, accelerators, press and the general public. They should come away understanding the problem, the product and the team, and feeling they can trust us.

The site explains what GluCorp does and why it matters. It is not a pitch: **the raise, use of funds, pricing, market sizing and competitor table stay in the deck**, and none of them appear on the site.

Mothers are not the primary audience for the site. They are the reason the product exists.

## 3. Core messages (use in this order)

1. **Headline idea:** *Catching postpartum haemorrhage before the body gives it away.*
2. **The problem:** About 45,000 women die from bleeding after childbirth every year (WHO, 2025). About 70% of maternal deaths happen in sub-Saharan Africa (UN, 2025). A mother can go from stable to fatal in about 2 hours.
3. **Why detection fails:** The body compensates. Blood pressure stays near normal while blood is lost, and blood loss estimated by eye misses about half of PPH cases. **Compensatory reserve** falls from the first blood lost. That is the signal Aya Mama reads.
4. **What we build:** One band and one system that follow one mother from admission to discharge.
   - *The band*: worn on the upper arm, green and infrared optics, alarms on its own with no network needed, hot-swappable cells, LoRaWAN to the ward, voice in Kinyarwanda and English.
   - *The system*: one clinician watches many mothers, ranked by urgency. A referred mother's data travels with her. Built to connect to DHIS2.
5. **Earlier detection starts every other clock:** Of the six delays in *The Lancet* 2026 PPH series, Aya Mama acts on the first, diagnosis. That gives more time for response, escalation, transfer, treatment and blood.
6. **Evidence:** Reserve index AUC 0.90 in trauma medicine (Janak et al., 2015). First obstetric evidence in 51 caesarean patients (Reppucci et al., 2024). GluCorp's own result: AUC 0.815 from pulse shape alone across 1,570 ICU patients, using a proxy label and not yet a maternal model.
7. **Fits clinical practice:** Works alongside the WHO-recommended calibrated drape, not against it. The drape's measured blood loss becomes the training label, and that paired data is the moat.
8. **Where we are:** a "Done / In progress / What's next" view, taken from the deck's traction and roadmap slides but written as milestones, not as what a funding round buys. Leave out fundraising milestones such as "seed-ready".
9. **Team and board**, then **Work with us**.

### Honesty rules (non-negotiable for a medtech site)
- Every hardware and software claim carries a **status label**: *Designed*, *Specified*, *Prototype*, *In pilot* or *Validated*. Today the band is "designed, not yet built" and the system is "specified, not yet built".
- Every statistic shows its **source** inline or in a footnote. No invented figures, testimonials or logos.
- No "AI-powered" hype language, and no claims of diagnosis or regulatory clearance.
- Add a short "Investigational device, not approved for clinical use" note near product content.

## 4. Proposed page structure (single long page, `index.html`)

| # | Section | Content | Signature element |
|---|---|---|---|
| 1 | **Hero** | Headline, one-line subhead, "See how it works" and "Work with us" | A slow, animated **pulse waveform** drawn in SVG, whose line thins as "reserve" drains. No stock-photo hero |
| 2 | **The two-hour window** | 45,000 / 70% / 2 hours, with sources | Large serif numerals on cream, set like an editorial spread |
| 3 | **The body hides the bleed** | Reserve vs blood-pressure explanation | The deck's **reserve curve** chart, redrawn as a responsive SVG and animated on scroll |
| 4 | **Close to home** | Kenya 37% of deaths from PPH; Rwanda 83% of maternal deaths in hospitals | Two-column "field note" cards |
| 5 | **Aya Mama** | Band + system, with status labels | Band image, plus an interactive **Green / Amber / Red** state switcher that shows what the clinician sees and hears |
| 6 | **One mother's journey** | Admission → Labour → Ward → Discharge | Horizontal timeline that becomes vertical on mobile |
| 7 | **The six delays** | Diagnosis highlighted as the delay we act on | Numbered strip; delay 1 in the accent colour |
| 8 | **Evidence** | 0.90 / 51 / 0.815, with citations | Citation-style cards with DOI-style footnotes |
| 9 | **Progress** | Done / In progress / What's next | Checklist-style ledger, not a generic roadmap graphic |
| 10 | **People** | Yvonne, Margaret, Caroline; board (confirmed): Scott Remborg, Zuena Munywoki | Portrait row plus a "looking for partners" link. GluCorp is not hiring |
| 11 | **Work with us** | Separate paths for facilities and pilot sites, clinicians and researchers, and organisations that want to support the work | Three plain text links with icons, plus the contact email |
| 12 | **Footer** | Kigali, Rwanda · links to legal pages · socials | Short and quiet |

Nav: *Problem · Aya Mama · Evidence · Progress · Team · Work with us*.

## 5. Visual direction: "clinical editorial"

The site should read like a well-designed medical journal feature or a museum exhibit panel, not a SaaS template.

**Carry over from the deck** so the site and pitch feel like one brand:
- Colours: ink `#1F1B18`, cream `#FAF6F0`, sand `#F2EBE1`, card `#FFFDF9`, rule `#E6DDD1`, blood red accent `#A8322D`, coral `#E8836F` (on dark backgrounds only), muted text `#4B443D`.
- Clinical states: green, amber and red, **always paired with an icon and label**, never colour alone.
- Type: **Merriweather** for headings and big numbers, **Poppins** for body text and labels. Small-caps eyebrow labels with letter-spacing (like "THE PROBLEM").

**Avoid these AI-template tropes:**
- Pink gradient backgrounds, glassmorphism, floating blobs, and cards that lift on hover everywhere.
- A 3×3 grid of identical "feature" cards with round icon badges.
- A centred hero with a stock photo and two pill buttons.
- "Powerful Features", "Our Purpose", "How It Works" headings.
- Emoji anywhere, including in copy, buttons and meta tags.
- Fade-up animations on every element.

**Instead, use:**
- Asymmetric layouts, generous margins, and hairline rules between sections.
- Numbered sections (01, 02, …) in the margin, like a journal.
- One real motion idea (the pulse and reserve line) used consistently. Everything else stays still. Respect `prefers-reduced-motion`.
- Footnote-style source markers (¹ ²) that expand on tap.
- The dark ink sections used sparingly for statement moments (hero, "Our answer", close).

## 6. Icons (no emoji)

Use **Lucide** icons as **inline SVG**, copied into the HTML with no runtime dependency. They are stroke-based and 1.5px, so they match the editorial feel.

| Use | Lucide icon |
|---|---|
| Pulse / waveform | `activity` |
| Band on arm | `watch` (or a custom band SVG) |
| Alarm / alert | `bell-ring`, `triangle-alert` |
| Normal state | `circle-check` |
| No-network operation | `wifi-off`, `radio-tower` (LoRaWAN) |
| Battery swap | `battery-charging` |
| Voice prompts | `volume-2` |
| Referral / transfer | `ambulance`, `arrow-right-left` |
| Dashboard | `layout-dashboard`, `monitor` |
| Evidence | `book-open`, `flask-conical` |
| Location | `map-pin` |
| Partnering | `handshake` |
| Contact | `mail` |
| Status labels | `pencil-ruler` (designed), `file-check` (specified), `cpu` (prototype) |

Keep the social icons already in the footer: LinkedIn, X, Facebook and TikTok.

## 7. Assets needed

- [ ] **Band render** (front view, "reserve 88, steady"). This is in the deck as an uploaded image and needs exporting as PNG or WebP.
- [ ] **Three screen states** image (Normal / Warning / Critical). This is also in the deck and needs exporting, or it can be rebuilt in HTML/SVG, which is preferred for sharpness.
- [ ] **Cover image** (silhouette of a pregnant woman at a window) from the deck.
- [ ] Portrait of **Caroline Kemunto Malachi**. The site currently has photos of Yvonne and Margaret only.
- [ ] Board portraits, or a text-only board list.
- [ ] Logo: the current mark is a line illustration with a beige blob. Decide whether to keep it or move to a simpler wordmark for the clinical positioning.

## 8. What to remove, keep and change in the repo

**Remove from `index.html`**
- The app features grid, "How it works", the "Watch Demo" button (it does nothing), and the pink theme.
- The Tailwind CDN script, which isn't meant for production. Replace it with one handwritten `css/site.css`.
- References to the unused legacy files in `css/` and `js/` (aos, bootstrap, tiny-slider, three-effects, etc.). Delete them after checking that no other page uses them.

**Keep**
- `privacy-policy.html`, `terms-service.html`, `data-deletion.html` and `account-deletion.html`. Google Play still needs them for the Aya Mama app. Restyle them later to match the new site, but don't change the legal text.
- The Substack link, relabelled as "Field notes" or "Updates", if the Substack is still active.

**Update**
- `<title>`, meta description, Open Graph and Twitter card tags to match the PPH positioning.
- `sitemap.xml` `lastmod`.
- The footer year and the location, "Kigali, Rwanda".
- The copyright line currently reads "GluCorp Health". Use "GluCorp Health Inc." to match the legal pages.

## 9. Decisions (taken from the deck)

1. **The app**: the Aya Mama app MVP on Google Play is history. The site mentions it once, under "Done" in Progress, as where the pivot came from. The legal pages stay because the Play listing still needs them.
2. **Location**: Kigali, Rwanda (the deck's cover), with the hardware build partner in Kenya.
3. **Contact**: `mwende@glucorp.org` (the deck's closing slide).
4. **Evidence**: publish 0.815 with the deck's caveat: a proxy label on public ICU data, not yet a maternal model.
5. **Waitlist backend**: not part of the pivoted product. The site uses `mailto:` links, and `server/main.py` is left as it is.
6. **Language**: English only for now. The band's Kinyarwanda and English voice prompts are a product feature, not a site feature.

## 10. Build order once approved

1. Lock the copy (sections 3 and 4) using the section 9 decisions.
2. Export the assets (section 7).
3. Build the design tokens and base CSS (colours, type scale, spacing, dark mode).
4. Build the hero pulse animation and the reserve-curve SVG, the two signature pieces.
5. Build the remaining sections, mobile first (16px side gutter, no horizontal scroll).
6. Pass on accessibility: contrast, alt text, focus states, reduced motion, and state colour always paired with an icon and label.
7. Restyle the four legal pages with the new CSS, leaving their text unchanged.
8. Update meta tags and the sitemap, then remove the dead CSS and JS.
9. Review on phone and desktop, then open a PR.
