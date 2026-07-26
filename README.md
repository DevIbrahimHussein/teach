# Ustaz Ibrahim Hussein — Technology & Programming

An exercise-driven programming platform built from the specification in [`teach.md`](teach.md).

## Running it

Open `index.html` in a browser. There is no build step, no `npm install`, and no server
requirement — it works straight from the filesystem and from any static host such as
GitHub Pages.

```
open index.html
```

## What is published

| Course | Modules | Status |
| --- | --- | --- |
| Programming Fundamentals | 1 Basics, 2 Conditions, 3 Loops, 4 Arrays | **66 exercises authored**, C++ and Java |
| Programming Fundamentals | 5–10 | Syllabus pending |
| Object-Oriented Programming | 1–10 | Syllabus pending |

Modules 5–10 of Course 1 and all of Course 2 render as *Syllabus pending* with their
planned topics listed. `teach.md` asks for the detailed syllabus to be agreed with the
instructor before exercise content is generated, so those modules carry topic outlines
rather than invented objectives.

## Brand

The palette and typography follow the printed tutoring flyers.

| Token | Value | Used for |
| --- | --- | --- |
| `--navy` | `#16213f` | header, footer, featured cards, `Hard` badge |
| `--gold` | `#c7a02e` | rule-labels, accents, card borders, numerals |
| `--gold-deep` | `#8a6d12` | gold text on cream (contrast-safe) |
| `--gold-wash` | `#f1e7cd` | hint boxes, `Medium` badge, soft fills |
| `--cream` | `#f4efe5` | page background |
| `--cream-deep` | `#e9e0cd` | hero corner wedge |

Display type is a system serif stack (Iowan Old Style → Palatino → Georgia); body and
labels are the system sans. No webfonts, so nothing to download and nothing to break
offline.

Recurring devices from the flyers: the gold rule-label (`— SUBJECTS COVERED`), the
gold-dot field and cream wedge in the hero, gold left borders on white cards, one navy
"featured" card among white ones, and the navy booking bar in the footer.

Dark mode keeps the same brand — navy becomes the ground and cream the ink, gold stays
the accent. It is driven by `prefers-color-scheme`.

### The portrait

`img/` holds two sizes derived from `~/Downloads/bob.jpg`. That source file was named
`.jpg` but actually contained **HEIC** data, which Chrome and Firefox refuse to render —
so it was converted to real baseline JPEG with `sips`:

```sh
sips -s format jpeg -s formatOptions 82 --resampleWidth 900 bob.jpg --out img/ibrahim-hussein.jpg
sips -s format jpeg -s formatOptions 78 --resampleWidth 420 bob.jpg --out img/ibrahim-hussein-sm.jpg
```

To replace the photo, drop in a new source and re-run those two commands. Framing is done
in CSS (`object-fit: cover` with `object-position: 55% 22%`), not by cropping the file, so
a differently-composed photo may want that value adjusted.

## Layout

```
index.html                  page shell; loads every data file, then the app
css/styles.css              all styling, light and dark
img/ibrahim-hussein.jpg     hero portrait (900×1200)
img/ibrahim-hussein-sm.jpg  footer avatar (420×560)
js/app.js                   hash router and renderer
data/courses.js             registry, starter-code templates, course definitions
data/fundamentals/m1.js     Module 1 — Basics
data/fundamentals/m2.js     Module 2 — Conditions
data/fundamentals/m3.js     Module 3 — Loops
data/fundamentals/m4.js     Module 4 — Arrays
data/fundamentals/pending.js  Modules 5–10 placeholders
data/oop.js                 Course 2 placeholders
data/services.js            tutoring offerings (BT3 IT) + contact details
```

Everything is plain `<script>` — no ES modules, because `file://` blocks those.

## Adding a service

A *service* is a flyer offering — subjects, delivery, pricing, WhatsApp CTA — as opposed
to the exercise courses. They render on the home page and at `#/services`. Push another
object onto `window.Services` in `data/services.js`:

```js
{
  id: 'programming-oop',
  eyebrow: 'Private Tutoring',
  title: 'Programming', titleAccent: '& OOP',   // navy word, then gold word
  lede: 'One italic sentence.',
  subjectsLabel: 'All subjects covered',
  subjects: ['Networking', 'Assembly'],          // auto-numbered 01, 02, …
  delivery: ['Live Sessions', 'Online'],
  packagesLabel: 'Packages included',
  packages: [
    { label: 'Per session', price: '$30', note: 'Two hours · one topic' },
    { label: 'Per month', price: '$180', note: 'Full month · 16 hours',
      tag: 'Best value', featured: true }       // featured renders as the navy card
  ],
  cta: { label: 'Chat on WhatsApp', message: 'Prefilled WhatsApp message.' }
}
```

The phone number lives once in `window.CONTACT.whatsapp` (wa.me form: country code, no
`+`, no spaces). The CTA URL and its prefilled text are built from it at render time.

## Adding a module

Write a new file next to `m1.js` and add one `<script>` tag for it in `index.html`.
A module looks like this:

```js
Curriculum.addModule('fundamentals', {
  number: 5,
  title: 'Array Searching and Sorting',
  summary: 'One line shown under the module title.',
  objectives: [ /* ... */ ]
});
```

An objective carries the compact explanation students read before the exercises:

```js
{
  title: 'Linear Search',
  summary: 'One short paragraph.',
  points: ['Bullet.', 'Bullet with `inline code`.'],
  example: { cpp: 'code…', java: 'code…' },
  exercises: [ /* exactly three */ ]
}
```

An exercise:

```js
{
  title: 'Find a Value',
  difficulty: 'Easy',            // Easy | Medium | Hard
  description: 'What the program must do.',
  input:  'What is read, and in what order.',
  output: 'Exact lines to print.',
  samples: [{ input: '5\n1 2 3', output: 'Found' }],   // use '-' for no input
  constraints: ['Rule.', 'Rule.'],
  hint: 'Optional nudge, hidden behind a toggle.',
  cpp:  { includes: ['<iomanip>'], notes: ['…'] },
  java: { scanner: true,           notes: ['…'] }
}
```

The starter template is generated from `includes` / `scanner`, so you do not write it
by hand. Pass `starter: '…'` on either language block to override it.

Backticks inside `description`, `points`, `notes`, `constraints` and `hint` render as
inline `code`.

## Conventions the content follows

- The problem, the samples and the expected behaviour are identical across C++ and Java.
  Only the syntax notes and the starter template change when the selector is switched.
- Exercises never contain solutions — requirements, samples, constraints and a hint only.
- No exercise uses a concept introduced later in the curriculum.
- Sample output is complete: students print those lines and nothing else, with no prompts.
- Every objective reuses one concept across its three exercises, varying the scenario.

## Checking content

The data files are ordinary JavaScript, so they can be loaded and validated outside the
browser. The two checks used while authoring were: a structural pass (every objective has
three exercises, every exercise has both language blocks, at least two samples, a
difficulty, constraints and a hint) and an arithmetic pass that recomputes each sample's
expected output from its input and compares. All 66 exercises and 204 sample cases pass
both.
