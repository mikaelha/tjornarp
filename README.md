# tjornarp.com

Byns gemensamma hemsida för Tjörnarp i Höörs kommun. Statisk sajt byggd med
[Astro](https://astro.build) + Tailwind, redigerbar via ett enkelt webbaserat
verktyg (Sveltia CMS) och hostad gratis på Netlify.

Ägs och drivs av **Tjörnarps Sockengille**.

---

## Innehåll

- [Vad sidan innehåller](#vad-sidan-innehåller)
- [Köra lokalt](#köra-lokalt)
- [Redigera innehåll](#redigera-innehåll)
- [Publicera (deploy) på Netlify](#publicera-deploy-på-netlify)
- [Koppla domänen tjornarp.com (Loopia)](#koppla-domänen-tjornarpcom-loopia)
- [Webbverktyget för icke-tekniska (Sveltia CMS)](#webbverktyget-för-icke-tekniska-sveltia-cms)
- [Kontaktformuläret](#kontaktformuläret)
- [Vad kostar det?](#vad-kostar-det)

---

## Vad sidan innehåller

| Sida | Sökväg | Innehåll |
|------|--------|----------|
| Start | `/` | Hero, senaste nytt, kommande evenemang, sektionsöversikt |
| Nyheter | `/nyheter` | Nyhetsflöde (markdown) |
| Kalender | `/kalender` | Kommande evenemang, grupperade per månad |
| Föreningar | `/foreningar` | Föreningskatalog, grupperad per kategori |
| Företag | `/foretag` | Företagskatalog |
| Natur & sjön | `/natur` | Tjörnarpssjön, fiske, bad, vandringsleder, naturreservat |
| Historia | `/historia` | Byns historia + tidslinje |
| Sockengillet | `/sockengille` | Om Tjörnarps Sockengille |
| PDF-bibliotek | `/bibliotek` | Länkar till dokumenten på tjornarpshistoria.se |
| Bildgalleri | `/galleri` | Bilder (platshållare tills riktiga foton läggs in) |
| Kontakt | `/kontakt` | Formulär + kontaktuppgifter |

---

## Köra lokalt

Kräver **Node.js 22 eller senare**.

```bash
nvm install 22 && nvm use 22   # om du använder nvm
npm install
npm run dev                    # http://localhost:4321
```

Bygga för produktion:

```bash
npm run build      # genererar dist/
npm run preview    # förhandsgranska bygget lokalt
```

---

## Redigera innehåll

Allt innehåll är vanliga **markdown-filer** under `src/content/`:

```
src/content/
  nyheter/      → en .md-fil per nyhet
  evenemang/    → en .md-fil per evenemang
  foreningar/   → en .md-fil per förening
  foretag/      → en .md-fil per företag
```

Varje fil har en "frontmatter"-rubrik (mellan `---`) med fält, följt av brödtext.
Exempel på en nyhet:

```markdown
---
title: Rubriken
date: 2026-05-20
summary: Kort ingress som visas i listan.
author: Tjörnarps Sockengille
draft: false
---

Brödtexten skrivs här, i markdown.
```

- Sätt `draft: true` för att dölja något (t.ex. ett halvfärdigt utkast).
- Evenemang som passerat sitt slutdatum försvinner automatiskt ur kalendern.
- Bilder läggs i `public/` (t.ex. `public/galleri/`) och `public/uploads/` för
  CMS-uppladdningar.

De flesta i byn ska dock inte behöva röra filer alls – se
[webbverktyget](#webbverktyget-för-icke-tekniska-sveltia-cms) nedan.

---

## Publicera (deploy) på Netlify

1. **Lägg koden på GitHub.** Skapa ett repo (t.ex. under organisationen
   `tjornarps-sockengille`) och pusha projektet dit.
2. **Koppla repot till Netlify.** Logga in på [netlify.com](https://netlify.com)
   → *Add new site* → *Import from Git* → välj repot.
3. Bygginställningarna läses automatiskt från `netlify.toml`
   (`npm run build`, publish-mapp `dist`, Node 22). Klicka *Deploy*.
4. Sajten får en adress som `dinsajt.netlify.app`. Varje gång du pushar till
   `main` (eller någon sparar via CMS) byggs och publiceras den om automatiskt.

---

## Koppla domänen tjornarp.com (Loopia)

Domänen ligger hos Loopia. Du behöver inte flytta den – peka bara DNS mot
Netlify. Två alternativ:

### Alternativ A – DNS hos Loopia (enklast att börja med)

I Netlify: *Domain settings* → *Add a domain* → skriv `tjornarp.com`.
Logga sedan in på **Loopia → Mina tjänster → DNS-editorn** för `tjornarp.com`
och sätt:

| Typ | Namn | Värde |
|-----|------|-------|
| `A` | `@` (tjornarp.com) | `75.2.60.5` |
| `CNAME` | `www` | `dinsajt.netlify.app.` |

> `75.2.60.5` är Netlifys lastbalanserare för apex-domäner. Bekräfta den
> aktuella adressen i Netlifys domäninställningar – de visar exakt vilket
> värde som gäller för just din sajt.

Det kan ta upp till några timmar innan DNS slår igenom. Netlify utfärdar
gratis HTTPS-certifikat (Let's Encrypt) automatiskt när domänen pekar rätt.

### Alternativ B – Netlify DNS (smidigare i längden)

I Netlify: *Domain settings* → *Add domain* → välj *Use Netlify DNS*. Netlify
ger dig då fyra namnservrar (t.ex. `dns1.p01.nsone.net` …). Logga in på Loopia
och byt domänens **namnservrar** till dessa. Då sköter Netlify all DNS och
HTTPS automatiskt.

> Den nuvarande WordPress-sidan på tjornarp.com ersätts när DNS pekar om.
> Spara/exportera eventuellt innehåll därifrån först om något ska behållas.

---

## Webbverktyget för icke-tekniska (Sveltia CMS)

På `tjornarp.com/admin/` finns ett enkelt redigeringsverktyg där man kan lägga
till nyheter, evenemang, föreningar och företag utan att koda. Det sparar
ändringarna som markdown-filer i GitHub-repot, varpå sajten byggs om av sig
själv.

[Sveltia CMS](https://sveltiacms.app) är gratis och öppen källkod.

### Engångsinställning

Repot är redan inställt i `public/admin/config.yml` (`repo: mikaelha/tjornarp`,
branch `main`). Kvar att göra:

1. **Koppla repot för automatisk publicering (continuous deployment).** I Netlify:
   projektet *tjornarp* → *Project configuration → Build & deploy → Continuous
   deployment → Link repository* → GitHub → välj `mikaelha/tjornarp`. Då byggs
   sajten om automatiskt vid varje ändring (inkl. CMS-sparningar).
2. **Aktivera inloggning via Netlify (GitHub OAuth):**
   - Skapa en GitHub OAuth-app: *Settings → Developer settings → OAuth Apps →
     Register a new application*.
     - **Homepage URL:** `https://tjornarp.netlify.app`
     - **Authorization callback URL:** `https://api.netlify.com/auth/done`
   - Kopiera *Client ID*, generera en *Client Secret*.
   - Klistra in båda i Netlify under *Project configuration → Access & security
     → OAuth → Authentication providers → Install provider → GitHub*.
3. **Bjud in redaktörer** som collaborators på GitHub-repot
   (*Settings → Collaborators*). De loggar sedan in på `/admin/` med sina
   GitHub-konton.

> Vill du som teknisk redaktör redigera lokalt utan inloggning? Sveltia stödjer
> en "local backend" – se Sveltias dokumentation.

---

## Kontaktformuläret

Formuläret på `/kontakt` använder **Netlify Forms** – det fungerar automatiskt
när sajten ligger på Netlify, helt utan server. Inskickade meddelanden dyker
upp under *Forms* i Netlify-panelen. Inget login krävs för den som skickar.

Gratisnivån täcker 100 inskick/månad.

### Mejlnotifiering till sockengillet@gmail.com

Sajtens kontaktadress är **`sockengillet@gmail.com`** (visas på `/kontakt` och
styrs centralt i [`src/lib/site.ts`](src/lib/site.ts)). För att inskick från
formuläret ska mejlas dit: Netlify → *Forms* → välj formuläret `kontakt` →
*Settings & usage* → *Form notifications* → *Add notification* → *Email
notification*, och ange `sockengillet@gmail.com`. Detta är en
Netlify-inställning – ingen kodändring behövs.

---

## Vad kostar det?

Ingenting för normal användning:

- **Astro / Sveltia CMS** – öppen källkod, gratis.
- **Netlify** – gratisnivån räcker gott för en bysajt (hosting, HTTPS,
  byggen, formulär, OAuth).
- **GitHub** – gratis för publika och privata repon.
- **Domänen tjornarp.com** – den årliga avgiften hos Loopia (den har ni redan).
