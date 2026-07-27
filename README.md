# Mr Ibrahim Hussein — Technology & Programming

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
| Programming Fundamentals | 1 Basics, 2 Conditions, 3 Loops, 4 Arrays, 5 Functions | **84 exercises authored**, C++ and Java |
| Object-Oriented Programming | 1–10 | Syllabus pending |
| Evaluation test | Fundamentals 1–4 | **66 questions**, three per objective |

Course 2 renders as *Syllabus pending* with its planned topics listed. `teach.md` asks
for the detailed syllabus to be agreed with the instructor before exercise content is
generated, so those modules carry topic outlines rather than invented objectives.
Fundamentals 6–10 are not published at all until their syllabus is agreed.

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

The site is light only, like the printed flyers. `color-scheme: light` on `:root` (and the
matching `<meta>` in `index.html`) keeps the browser's own widgets light as well, so a
visitor whose OS is set to dark still sees the cream page. There are no
`prefers-color-scheme` rules — do not add one without a full second palette.

### The portrait

`img/` holds two sizes derived from `~/Downloads/bob.jpg`. That source file was named
`.jpg` but actually contained **HEIC** data, which Chrome and Firefox refuse to render —
so it was converted to real baseline JPEG with `sips`:

```sh
sips -s format jpeg -s formatOptions 82 --resampleWidth 900 bob.jpg --out img/ibrahim-hussein.jpg
sips -s format jpeg -s formatOptions 78 --resampleWidth 420 bob.jpg --out img/ibrahim-hussein-sm.jpg
```

The site now serves **background-removed PNGs** instead: the street behind the subject was
cut out with the macOS Vision framework (`VNGenerateForegroundInstanceMaskRequest`), then
the cutout was placed on transparent canvases and quantised to 256 colours. The two JPEGs
stay in the repo as the un-cut originals.

| file | role | notes |
| --- | --- | --- |
| `ibrahim-hussein.png` | hero portrait, 900×1125 | full-body cutout on a 4:5 transparent canvas |
| `ibrahim-hussein-sm.png` | footer avatar, 240×240 | head-and-shoulders crop, transparent |
| `ibrahim-hussein-cutout.png` | 428×790 | the raw trimmed cutout both are built from |

Because each PNG is already framed at the aspect ratio its slot uses, the CSS no longer
re-crops (`object-position` is a plain `50% 50%`). The transparency means the card colour
shows through: `--cream-deep` behind the hero, `--navy-soft` behind the footer circle. To
replace the photo, re-cut a new source and rebuild those three files at the same sizes.

## Layout

```
index.html                  page shell; loads every data file, then the app
css/styles.css              all styling (light only)
img/ibrahim-hussein.png     hero portrait, background removed (900×1125)
img/ibrahim-hussein-sm.png  footer avatar, background removed (240×240)
img/ibrahim-hussein*.jpg    original photos, background intact
js/app.js                   hash router and renderer
js/quiz.js                  evaluation test: engine, views and scoring
data/courses.js             registry, starter-code templates, course definitions
data/fundamentals/m1.js     Module 1 — Basics
data/fundamentals/m2.js     Module 2 — Conditions
data/fundamentals/m3.js     Module 3 — Loops
data/fundamentals/m4.js     Module 4 — Arrays
data/fundamentals/m5.js     Module 5 — Functions
data/oop.js                 Course 2 placeholders
data/services.js            course pricing, tutoring offerings (BT3 IT), contact details
data/quiz/quiz.js           question-bank registry
data/quiz/fundamentals.js   66 questions, three per objective
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

## Course pricing

The Programming & OOP prices are not a service — they sit in `window.CoursePricing` in
`data/services.js` and render under the course grid on the home page, using the same
`packagesBlock()` as the service blocks. One block covers both courses, since a *subject*
is either Programming Fundamentals or OOP.

## Adding a module

Write a new file next to `m1.js` and add one `<script>` tag for it in `index.html`.
A module looks like this:

```js
Curriculum.addModule('fundamentals', {
  number: 6,
  title: 'Strings',
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

## The evaluation test

`#/quiz/fundamentals` — also linked from the header and from the bottom of the course
page. It exists so a student can find out where they stand before booking sessions, and
so the first session starts from evidence rather than a guess.

- **Coverage.** Three multiple-choice questions for every one of the 22 authored
  objectives of Modules 1–4. Module 5 has exercises but no questions yet; Modules 6–10
  and the OOP course have no questions because their syllabus is not agreed yet — the
  same rule the exercises follow.
- **During the test.** One question at a time, four choices, no timer. Answers can be
  changed until the test is finished, `A`–`D` and `1`–`4` pick, the arrow keys move, and
  progress is kept in `localStorage` so the browser can be closed and reopened. The
  objective being tested is deliberately not named until the result page — naming it
  would give the answer away.
- **The score.** Total correct, a per-module breakdown, then the two lists the student
  came for: **objectives you know** and **objectives to study**, each linking to its
  module. An objective counts as known at two of three correct; an unanswered question
  counts as wrong. Below that, every question is listed with the chosen answer, the
  correct one and why.
- **Language.** The C++/Java selector works inside the test. An answer is stored as the
  number of the option chosen, which only means something in the language it was chosen
  in, so a pick on a syntax question does not carry over to the other language — the
  header says how many need answering again, and switching back restores them.

### Adding questions

Write a topic per objective, in curriculum order, in `data/quiz/fundamentals.js`:

```js
Quiz.addTopic('fundamentals', {
  module: 1,
  objective: 'Data Types',          // must match the objective title exactly
  questions: [ /* exactly three */ ]
});
```

A question:

```js
{
  ask: 'Which data type fits the number of students in a class?',
  code: { cpp: 'int a = 7;', java: 'int a = 7;' },   // optional
  options: ['`double`', '`int`', '`char`', '`string`'],
  answer: 1,                                        // index into options
  why: 'Shown on the result page, next to the answer.'
}
```

`ask`, `code`, `options`, `answer` and `why` each accept `{ cpp: …, java: … }` in place
of a plain value, for the questions where the two languages genuinely differ. Backticks
render as inline `code`, as everywhere else in the content.

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
expected output from its input and compares. All 84 exercises and 260 sample cases pass
both.

The evaluation test was checked the same way: a structural pass (every objective covered
exactly once and in curriculum order, three questions each, four distinct options per
language, every answer index in range, balanced backticks) and a runtime pass that drives
`js/quiz.js` against a stub DOM — a perfect attempt scores 66/66 with 22 objectives known,
a wrong attempt scores 0 with none, two of three marks an objective known, and a
mid-test language switch drops exactly the answers whose choices differ and restores them
on switching back. Every rendered view was also checked for balanced tags.
