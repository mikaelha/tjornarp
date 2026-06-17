import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// News posts – the "Nyheter" feed. Edited via /admin or as markdown.
const nyheter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nyheter' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string().optional(),
      cover: image().optional(),
      author: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

// Calendar events – the "Evenemang" listing.
const evenemang = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/evenemang' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      start: z.coerce.date(),
      end: z.coerce.date().optional(),
      // Free-text time, e.g. "kl 10–14", left optional for all-day events.
      time: z.string().optional(),
      location: z.string().optional(),
      organizer: z.string().optional(),
      summary: z.string().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

// Local associations / clubs.
const foreningar = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/foreningar' }),
  schema: z.object({
    name: z.string(),
    category: z
      .enum(['Idrott', 'Kultur & hembygd', 'Natur & friluft', 'Barn & ungdom', 'Övrigt'])
      .default('Övrigt'),
    summary: z.string().optional(),
    website: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    contactPerson: z.string().optional(),
    order: z.number().default(100),
  }),
});

// Local businesses.
const foretag = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/foretag' }),
  schema: z.object({
    name: z.string(),
    category: z
      .enum([
        'Mat & dryck',
        'Hantverk & bygg',
        'Handel & service',
        'Industri & tillverkning',
        'Besök & boende',
        'Övrigt',
      ])
      .default('Övrigt'),
    summary: z.string().optional(),
    website: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { nyheter, evenemang, foreningar, foretag };
