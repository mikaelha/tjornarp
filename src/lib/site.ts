// Central site metadata and navigation. Keep human-editable.

export const site = {
  name: 'Tjörnarp',
  title: 'Tjörnarp – byn vid sjön i Höörs kommun',
  description:
    'Allt om Tjörnarp i Höörs kommun – nyheter, evenemang, föreningar, företag, ' +
    'natur kring Tjörnarpssjön och byns historia. En sida av och för bygden.',
  url: 'https://tjornarp.com',
  locale: 'sv_SE',
  // Sockengillet's contact address – used for the contact page and notifications.
  email: 'sockengillet@gmail.com',
  // Update these when the village's official channels change.
  social: {
    facebook: 'https://www.facebook.com/groups/1630832733894609/',
    facebookSockengille: 'https://www.facebook.com/people/Tj%C3%B6rnarps-sockengille/100070412051181/',
    historia: 'https://www.tjornarpshistoria.se/',
  },
};

export type NavItem = { href: string; label: string };

export const nav: NavItem[] = [
  { href: '/nyheter', label: 'Nyheter' },
  { href: '/kalender', label: 'Kalender' },
  { href: '/foreningar', label: 'Föreningar' },
  { href: '/foretag', label: 'Företag' },
  { href: '/natur', label: 'Natur & sjön' },
  { href: '/historia', label: 'Historia' },
  { href: '/sockengille', label: 'Sockengillet' },
];

// Used by the home page section grid.
export const sections = [
  {
    href: '/nyheter',
    title: 'Nyheter',
    blurb: 'Vad som händer i byn – information, beslut och notiser.',
    accent: 'tegel',
  },
  {
    href: '/kalender',
    title: 'Evenemang',
    blurb: 'Marknader, träffar, loppisar och årets återkommande tilldragelser.',
    accent: 'wheat',
  },
  {
    href: '/foreningar',
    title: 'Föreningar',
    blurb: 'Det rika föreningslivet – från idrott till hembygd och fiske.',
    accent: 'forest',
  },
  {
    href: '/foretag',
    title: 'Företag',
    blurb: 'Verksamheter och näringsliv i och omkring Tjörnarp.',
    accent: 'lake',
  },
  {
    href: '/natur',
    title: 'Natur & sjön',
    blurb: 'Tjörnarpssjön, vandringsleder, naturreservat, bad och fiske.',
    accent: 'lake',
  },
  {
    href: '/historia',
    title: 'Historia',
    blurb: 'Från stenålder och stambana till tegelbruk – byns långa historia.',
    accent: 'tegel',
  },
  {
    href: '/sockengille',
    title: 'Sockengillet',
    blurb: 'Tjörnarps Sockengille – den ideella föreningen som vårdar bygden.',
    accent: 'forest',
  },
  {
    href: '/bibliotek',
    title: 'PDF-bibliotek',
    blurb: 'Historiska texter och dokument från tjornarpshistoria.se.',
    accent: 'wheat',
  },
  {
    href: '/galleri',
    title: 'Bildgalleri',
    blurb: 'Bilder från byn, sjön och årstiderna.',
    accent: 'forest',
  },
] as const;
