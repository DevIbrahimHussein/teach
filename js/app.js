/* ==========================================================================
   Router + renderer. Vanilla, no dependencies.
   Routes:  #/                        course list
            #/c/<courseId>            module list
            #/c/<courseId>/m/<n>      module page (objectives + exercises)
            #/<id>                    an announced course from data/soon.js
   ========================================================================== */

(function () {
  'use strict';

  var LANGS = [
    { id: 'cpp',  label: 'C++' },
    { id: 'java', label: 'Java' }
  ];
  var LANG_KEY = 'teach.lang';

  function currentLang() {
    var stored = null;
    try { stored = localStorage.getItem(LANG_KEY); } catch (e) { /* file:// */ }
    return (stored === 'java' || stored === 'cpp') ? stored : 'cpp';
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
  }

  /* ---------- text helpers ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Escapes HTML, then turns `inline code` into <code> spans. */
  function fmt(s) {
    return esc(s).replace(/`([^`]+)`/g, function (_, c) { return '<code>' + c + '</code>'; });
  }

  /* Titles are authored with markdown-ish backticks. Headings render them as <code>;
     nav labels and aria text drop them entirely. */
  function plain(s) { return String(s == null ? '' : s).replace(/`/g, ''); }

  function langLabel(id) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].id === id) return LANGS[i].label;
    return id;
  }

  /* ---------- small components ---------- */

  function langSelector(lang) {
    return '<div class="langsel" role="group" aria-label="Programming language">' +
      LANGS.map(function (l) {
        var on = l.id === lang;
        /* both states carry a class attribute so classList.toggle stays symmetric */
        return '<button type="button" class="lang-opt' + (on ? ' active' : '') + '"' +
          ' data-lang="' + l.id + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
          esc(l.label) + '</button>';
      }).join('') +
      '</div>';
  }

  function codeBlock(code, title) {
    return '<div class="code-head">' +
        '<span class="eyebrow">' + esc(title) + '</span>' +
        '<button type="button" class="copy-btn" data-copy="1">Copy</button>' +
      '</div>' +
      '<pre class="code"><code>' + esc(code) + '</code></pre>';
  }

  /* Published for js/quiz.js, which renders inside the same page and must look
     identical. Same idea as window.Curriculum and window.starterCpp. */
  window.UI = {
    esc: esc,
    fmt: fmt,
    plain: plain,
    codeBlock: codeBlock,
    langSelector: langSelector,
    langLabel: langLabel,
    currentLang: currentLang
  };

  function field(label, body) {
    if (!body) return '';
    return '<div class="field"><span class="eyebrow">' + esc(label) + '</span>' +
      '<div class="body">' + fmt(body) + '</div></div>';
  }

  function list(label, items, cls) {
    if (!items || !items.length) return '';
    return '<div class="field"><span class="eyebrow">' + esc(label) + '</span>' +
      '<ul class="' + (cls || 'rules') + '">' +
      items.map(function (i) { return '<li>' + fmt(i) + '</li>'; }).join('') +
      '</ul></div>';
  }

  function samplesTable(samples) {
    if (!samples || !samples.length) return '';
    var rows = samples.map(function (s, i) {
      return '<tr>' +
        '<td class="n">' + (i + 1) + '</td>' +
        '<td>' + cell(s.input) + '</td>' +
        '<td>' + cell(s.output) + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="field"><span class="eyebrow">Sample cases</span>' +
      '<div class="samples-wrap"><table class="samples">' +
      '<thead><tr><th></th><th>Input</th><th>Output</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div></div>';
  }

  function cell(text) {
    if (text === '' || text == null) return '<span class="none">(nothing)</span>';
    if (text === '-') return '<span class="none">(no input)</span>';
    return '<pre>' + esc(text) + '</pre>';
  }

  /* ---------- exercise card ---------- */

  /* The only part of a card that changes with the language. Kept separate so the
     selector can rewrite it in place, without re-rendering (and re-scrolling) the page. */
  function langAreaInner(ex, lang) {
    var spec = ex[lang] || {};
    var starter = spec.starter ||
      (lang === 'cpp' ? window.starterCpp(spec.includes) : window.starterJava(spec.scanner));

    return '<span class="eyebrow">' + esc(langLabel(lang)) + ' notes</span>' +
      '<ul>' + (spec.notes || []).map(function (n) {
        return '<li>' + fmt(n) + '</li>';
      }).join('') + '</ul>' +
      codeBlock(starter, 'Starter template');
  }

  function exerciseCard(ex, index, lang, oi) {
    var diff = (ex.difficulty || 'Easy').toLowerCase();

    return '<article class="card" id="ex-' + (oi + 1) + '-' + (index + 1) + '" ' +
             'data-obj="' + oi + '" data-ex="' + index + '">' +
      '<div class="card-head">' +
        '<div class="card-title">' +
          '<span class="eyebrow">Exercise ' + (index + 1) + '</span>' +
          '<h4>' + esc(ex.title) + '</h4>' +
        '</div>' +
        '<div class="card-tools">' +
          '<span class="badge ' + diff + '">' + esc(ex.difficulty || 'Easy') + '</span>' +
          langSelector(lang) +
        '</div>' +
      '</div>' +

      '<p class="desc">' + fmt(ex.description) + '</p>' +
      field('Input', ex.input) +
      field('Output', ex.output) +
      samplesTable(ex.samples) +
      list('Constraints', ex.constraints) +

      '<div class="lang-area">' + langAreaInner(ex, lang) + '</div>' +

      (ex.hint
        ? '<details class="hint"><summary>Hint</summary><p>' + fmt(ex.hint) + '</p></details>'
        : '') +

      '</article>';
  }

  /* ---------- objective ---------- */

  function objectiveBlock(obj, oi, lang) {
    var example = obj.example && obj.example[lang];
    return '<section class="objective" id="obj-' + (oi + 1) + '">' +
      '<div class="objective-head">' +
        '<span class="rule-label">Objective ' + (oi + 1) + '</span>' +
        '<h3>' + fmt(obj.title) + '</h3>' +
      '</div>' +
      (obj.summary ? '<p class="objective-summary">' + fmt(obj.summary) + '</p>' : '') +
      (obj.points && obj.points.length
        ? '<ul class="keypoints">' + obj.points.map(function (p) {
            return '<li>' + fmt(p) + '</li>';
          }).join('') + '</ul>'
        : '') +
      (example
        ? '<div class="example-block" data-obj="' + oi + '">' +
            codeBlock(example, langLabel(lang) + ' example') + '</div>'
        : '') +
      '<div class="exercise-grid">' +
        (obj.exercises || []).map(function (ex, i) {
          return exerciseCard(ex, i, lang, oi);
        }).join('') +
      '</div>' +
      '</section>';
  }

  /* ---------- services ---------- */

  var WA_GLYPH =
    '<svg class="wa-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>' +
    '</svg>';

  function waLink(message) {
    var number = (window.CONTACT && window.CONTACT.whatsapp) || '';
    return 'https://wa.me/' + number + (message ? '?text=' + encodeURIComponent(message) : '');
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* Shared by the hero and every service block, so they stay visually identical. */
  function portraitFigure() {
    return '<figure class="hero-portrait">' +
      '<img src="img/ibrahim-hussein.png" alt="Mr. Ibrahim Hussein" ' +
           'width="900" height="1125" decoding="async">' +
      '<figcaption>' +
        '<strong>' + esc(window.CONTACT.name) + '</strong>' +
        '<span>' + esc(window.CONTACT.place) + '</span>' +
      '</figcaption>' +
    '</figure>';
  }

  function statsRow(pairs) {
    return '<div class="hero-stats">' + pairs.map(function (p) {
      return '<span><strong>' + esc(p[0]) + '</strong> ' + esc(p[1]) + '</span>';
    }).join('') + '</div>';
  }

  /* The inner half of a hero slide: copy on the left, shared portrait on the right. */
  function serviceSlideInner(s) {
    return '<div class="hero-copy">' +
        '<span class="hero-eyebrow">' + esc(s.eyebrow) + '</span>' +
        '<h2 class="hero-title is-inline">' + esc(s.title) +
          ' <em>' + esc(s.titleAccent) + '</em></h2>' +
        '<p class="hero-lede">' + esc(s.lede) + '</p>' +
        '<div class="hero-majors">' +
          '<span class="rule-label">' + esc(s.deliveryLabel) + '</span>' +
          '<div class="pill-row">' +
            s.delivery.map(function (d) {
              return '<span class="pill pill-solid">' + esc(d) + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="hero-actions">' +
          '<a class="btn btn-whatsapp" href="' + esc(waLink(s.cta.message)) + '" ' +
             'target="_blank" rel="noopener">' + WA_GLYPH + esc(s.cta.label) + '</a>' +
          '<a class="btn btn-ghost" href="tel:+' + esc(window.CONTACT.whatsapp) + '">Call ' +
             esc(window.CONTACT.display) + '</a>' +
        '</div>' +
        statsRow(s.stats || []) +
      '</div>' +
      portraitFigure();
  }

  /* Shared by the service blocks and the course pricing, so a price card looks the
     same wherever it appears. */
  function packagesBlock(label, packages) {
    return '<span class="rule-label">' + esc(label) + '</span>' +
      '<div class="package-grid">' +
        packages.map(function (p) {
          return '<div class="package' + (p.featured ? ' is-featured' : '') + '">' +
            (p.tag ? '<span class="package-tag">' + esc(p.tag) + '</span>' : '') +
            '<span class="package-label">' + esc(p.label) + '</span>' +
            '<span class="package-price">' + esc(p.price) + '</span>' +
            '<span class="package-note">' + esc(p.note) + '</span>' +
          '</div>';
        }).join('') +
      '</div>';
  }

  function ctaRow(cta) {
    return '<div class="service-cta">' +
        '<a class="btn btn-whatsapp" href="' + esc(waLink(cta.message)) + '" ' +
           'target="_blank" rel="noopener">' + WA_GLYPH + esc(cta.label) + '</a>' +
        '<span class="service-cta-note">Or call ' + esc(window.CONTACT.display) + '</span>' +
      '</div>';
  }

  function serviceDetail(s) {
    return '<div class="service-detail" id="service-' + esc(s.id) + '">' +

      '<span class="rule-label">' + esc(s.subjectsLabel) + '</span>' +
      '<div class="subject-grid">' +
        s.subjects.map(function (name, i) {
          return '<div class="subject">' +
            '<span class="subject-num">' + pad2(i + 1) + '</span>' +
            '<span class="subject-name">' + esc(name) + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +

      packagesBlock(s.packagesLabel, s.packages) +
      ctaRow(s.cta) +

      '</div>';
  }

  /* The Programming & OOP offering, built to the same shape as serviceDetail above:
     what it covers, then its packages, then its CTA. The courses are what it covers,
     so the grid sits where a service puts its subject list. */
  function courseOffering(grid) {
    var p = window.CoursePricing;
    if (!p) return '<div class="course-grid">' + grid + '</div>';

    return '<h2 class="section-title">' + esc(p.title) + '</h2>' +
      '<div class="service-detail" id="offer-courses">' +
        '<span class="rule-label">' + esc(p.coursesLabel) + '</span>' +
        '<div class="course-grid">' + grid + '</div>' +
        packagesBlock(p.packagesLabel, p.packages) +
        ctaRow(p.cta) +
      '</div>';
  }

  function allServices() { return window.Services || []; }

  /* ---------- home-only blocks ---------- */

  /* Numbered path from a first WhatsApp message to a first session. */
  function stepsBlock() {
    var s = window.HomeContent && window.HomeContent.steps;
    if (!s || !s.items || !s.items.length) return '';

    return '<h2 class="section-title">' + esc(s.title) + '</h2>' +
      '<div class="steps" id="how-sessions-work">' +
        '<span class="rule-label">' + esc(s.label) + '</span>' +
        '<ol class="step-flow">' +
          s.items.map(function (it, i) {
            return '<li class="step">' +
              '<span class="step-head">' +
                '<span class="step-num">' + pad2(i + 1) + '</span>' +
                '<strong class="step-title">' + esc(it.title) + '</strong>' +
              '</span>' +
              '<span class="step-body">' + fmt(it.body) + '</span>' +
            '</li>';
          }).join('') +
        '</ol>' +
      '</div>';
  }

  /* Disclosures rather than a wall of text: the questions read as a list, and only
     the answer someone came for is opened. */
  function faqBlock() {
    var f = window.HomeContent && window.HomeContent.faq;
    if (!f || !f.items || !f.items.length) return '';

    return '<h2 class="section-title">' + esc(f.title) + '</h2>' +
      '<div class="faq" id="faq">' +
        '<span class="rule-label">' + esc(f.label) + '</span>' +
        '<div class="faq-list">' +
          f.items.map(function (it) {
            return '<details class="faq-item">' +
              '<summary>' + esc(it.q) + '</summary>' +
              '<p>' + fmt(it.a) + '</p>' +
            '</details>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  /* ---------- hero slider ---------- */

  function chevron(dir) {
    var d = dir === 'left' ? 'M15 4 L7 12 L15 20' : 'M9 4 L17 12 L9 20';
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.4" ' +
      'stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  }

  /* items: [{ label, inner }] — one hero per slide. A single item renders as a
     plain hero with no carousel chrome. */
  function heroSlider(items) {
    if (!items.length) return '';
    if (items.length === 1) return '<section class="hero">' + items[0].inner + '</section>';

    var slides = items.map(function (it, i) {
      return '<article class="hero hero-slide" role="group" aria-roledescription="slide" ' +
        'aria-label="' + esc(it.label) + ', slide ' + (i + 1) + ' of ' + items.length + '"' +
        /* inert="" rather than bare inert, so it matches what go() writes later */
        (i === 0 ? '' : ' aria-hidden="true" inert=""') + '>' + it.inner + '</article>';
    }).join('');

    /* the fill span doubles as the autoplay progress bar and its clock */
    var dots = items.map(function (it, i) {
      return '<button type="button" class="hero-dot' + (i === 0 ? ' is-active' : '') + '" ' +
        'data-slide-to="' + i + '" aria-label="Show ' + esc(it.label) + '"' +
        (i === 0 ? ' aria-current="true"' : '') + '>' +
        '<span class="hero-dot-fill"></span></button>';
    }).join('');

    return '<section class="hero-slider" role="region" aria-roledescription="carousel" ' +
             'aria-label="Tutoring highlights">' +
        '<div class="hero-viewport"><div class="hero-track">' + slides + '</div></div>' +
        '<button type="button" class="hero-arrow is-prev" data-slide-step="-1" ' +
          'aria-label="Previous slide">' + chevron('left') + '</button>' +
        '<button type="button" class="hero-arrow is-next" data-slide-step="1" ' +
          'aria-label="Next slide">' + chevron('right') + '</button>' +
        '<div class="hero-nav">' + dots + '</div>' +
      '</section>';
  }

  /* Live controller, rebuilt after every render.

     Autoplay is driven by the progress-fill animation rather than a timer: the active
     dot fills over the slide duration and its `animationend` advances the carousel.
     That keeps the bar and the advance exactly in step, and lets CSS handle pausing. */
  var slider = { go: null, index: 0, restart: function () {} };

  function initSlider() {
    slider.go = null;

    var root = document.querySelector && document.querySelector('.hero-slider');
    if (!root) return;

    var track = root.querySelector('.hero-track');
    var slides = root.querySelectorAll('.hero-slide');
    var dots = root.querySelectorAll('.hero-dot');
    if (!track || slides.length < 2) return;

    var index = 0;
    var reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function go(next) {
      index = ((next % slides.length) + slides.length) % slides.length;
      slider.index = index;
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      for (var i = 0; i < slides.length; i++) {
        var on = i === index;
        /* inert keeps the off-screen slide's links and buttons out of the tab order */
        if (on) { slides[i].removeAttribute('aria-hidden'); slides[i].removeAttribute('inert'); }
        else { slides[i].setAttribute('aria-hidden', 'true'); slides[i].setAttribute('inert', ''); }
        dots[i].classList.toggle('is-active', on);
        if (on) dots[i].setAttribute('aria-current', 'true');
        else dots[i].removeAttribute('aria-current');
      }
      restartFill();
    }

    /* Re-triggers the fill animation on the newly active dot. Stripping the
       animation and reading offsetWidth forces the reflow that lets it replay. */
    function restartFill() {
      if (reduced) return;
      var fill = dots[index].querySelector('.hero-dot-fill');
      if (!fill || !fill.style) return;
      fill.style.animation = 'none';
      void fill.offsetWidth;
      fill.style.animation = '';
    }

    slider.go = go;
    slider.restart = restartFill;

    if (root.addEventListener) {
      /* Hovering does not stop the carousel — the pointer sits over the hero for most
         of a visit, which would leave it frozen on the first slide. Keyboard focus
         still pauses it, so tabbing through a slide's links never moves them away. */
      root.addEventListener('focusin', function () { root.classList.add('is-paused'); });
      root.addEventListener('focusout', function () { root.classList.remove('is-paused'); });

      /* A full bar is the cue to advance. Skipped entirely under reduced motion,
         where the shortened animation would otherwise fire back to back. */
      if (!reduced) {
        root.addEventListener('animationend', function (e) {
          if (e.target && e.target.className &&
              String(e.target.className).indexOf('hero-dot-fill') > -1) {
            go(index + 1);
          }
        });
      }

      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') go(index + 1);
        else if (e.key === 'ArrowLeft') go(index - 1);
      });

      var startX = null;
      root.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
      }, { passive: true });
      root.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
      }, { passive: true });
    }
  }

  /* ---------- views ---------- */

  function viewHome() {
    var cards = Curriculum.allCourses().map(function (c, i) {
      var ready = c.modules.filter(function (m) { return m.status !== 'pending'; }).length;
      return '<a class="course-card' + (i === 0 ? ' is-featured' : '') + '" href="#/c/' + esc(c.id) + '">' +
        '<span class="eyebrow">' + esc(c.subtitle) + '</span>' +
        '<h2>' + esc(c.title) + '</h2>' +
        '<p>' + esc(c.description) + '</p>' +
        '<div class="course-meta">' +
          '<span><strong>' + c.modules.length + '</strong> modules</span>' +
          '<span><strong>' + Curriculum.countExercises(c) + '</strong> exercises</span>' +
          '<span><strong>' + ready + '</strong> ready</span>' +
        '</div></a>';
    }).join('');

    var courses = Curriculum.allCourses();
    var published = courses.reduce(function (n, c) { return n + Curriculum.countExercises(c); }, 0);
    var modules = courses.reduce(function (n, c) { return n + c.modules.length; }, 0);

    var majors = ['Data Science', 'Computer Science', 'IT', 'MIS', 'Engineering'];

    var platformSlide =
        '<div class="hero-copy">' +
        '<span class="hero-eyebrow">Private Tutoring</span>' +
        '<h1 class="hero-title">Programming<em>&amp; OOP</em></h1>' +
        '<p class="hero-lede">Build a strong foundation in code &mdash; from first principles ' +
        'to object-oriented mastery.</p>' +
        '<div class="hero-majors">' +
          '<span class="rule-label">Designed for majors in</span>' +
          '<div class="pill-row">' +
            majors.map(function (m) { return '<span class="pill">' + esc(m) + '</span>'; }).join('') +
          '</div>' +
        '</div>' +
        '<div class="hero-actions">' +
          '<a class="btn btn-primary" href="#/c/fundamentals">Start Programming Fundamentals</a>' +
          '<a class="btn btn-ghost" href="#/c/oop">Explore the OOP course</a>' +
        '</div>' +
        statsRow([
          [courses.length, 'courses'],
          [modules, 'modules'],
          [published, 'exercises published'],
          ['C++', '& Java']
        ]) +
        '</div>' +
        portraitFigure();

    var slides = [{ label: 'Programming & OOP', inner: platformSlide }].concat(
      allServices().map(function (s) {
        return { label: s.title + ' ' + s.titleAccent, inner: serviceSlideInner(s) };
      })
    );

    return heroSlider(slides) +
      courseOffering(cards) +
      allServices().map(function (s) {
        return '<h2 class="section-title">' + esc(s.title + ' ' + s.titleAccent) + '</h2>' +
          serviceDetail(s);
      }).join('') +
      stepsBlock() +
      faqBlock() +
      '<div class="panel">' +
        '<span class="rule-label">How this platform works</span>' +
        '<ul>' +
          '<li>Pick a course, then open a module.</li>' +
          '<li>Read the short explanation and example at the top of each objective.</li>' +
          '<li>Solve the three exercises yourself, in order.</li>' +
          '<li>Switch between C++ and Java at the top-right of any exercise. The problem never changes &mdash; only the syntax notes and the starter template do.</li>' +
        '</ul>' +
      '</div>';
  }

  function viewCourse(courseId) {
    var course = Curriculum.getCourse(courseId);
    if (!course) return notFound();

    var rows = course.modules.map(function (m) {
      var pending = m.status === 'pending';
      var count = (m.objectives || []).reduce(function (n, o) {
        return n + (o.exercises || []).length;
      }, 0);
      var inner =
        '<span class="module-num">' + (m.number < 10 ? '0' : '') + m.number + '</span>' +
        '<span class="module-body">' +
          '<strong>' + esc(m.title) + '</strong>' +
          '<span>' + esc(m.summary || m.note || '') + '</span>' +
        '</span>' +
        (pending
          ? '<span class="tag">Syllabus pending</span>'
          : '<span class="module-count">' + count + ' exercises</span>');

      return pending
        ? '<div class="module-row is-pending">' + inner + '</div>'
        : '<a class="module-row" href="#/c/' + esc(course.id) + '/m/' + m.number + '">' + inner + '</a>';
    }).join('');

    /* Only courses that have a question bank offer the test. */
    var quizCta = (window.Quiz && Quiz.has(course.id))
      ? '<a class="quiz-cta" href="#/quiz/' + esc(course.id) + '">' +
          '<span class="quiz-cta-body">' +
            '<span class="eyebrow">Evaluation test</span>' +
            '<strong>Find out what you already know</strong>' +
            '<span>' + Quiz.countQuestions(course.id) + ' multiple-choice questions across ' +
              Quiz.countTopics(course.id) + ' objectives. The score at the end lists the ' +
              'objectives you know and the ones still to study.</span>' +
          '</span>' +
          '<span class="quiz-cta-go">Start &rarr;</span>' +
        '</a>'
      : '';

    return '<div class="breadcrumb"><a href="#/">Courses</a><span>/</span>' + esc(course.title) + '</div>' +
      '<span class="eyebrow">' + esc(course.subtitle) + '</span>' +
      '<h1 class="page-title">' + esc(course.title) + '</h1>' +
      '<p class="page-lede">' + esc(course.description) + '</p>' +
      '<div class="module-list">' + rows + '</div>' +
      quizCta;
  }

  function viewModule(courseId, number, lang) {
    var course = Curriculum.getCourse(courseId);
    var mod = Curriculum.getModule(courseId, number);
    if (!course || !mod) return notFound();

    var crumb = '<div class="breadcrumb">' +
      '<a href="#/">Courses</a><span>/</span>' +
      '<a href="#/c/' + esc(course.id) + '">' + esc(course.title) + '</a><span>/</span>' +
      'Module ' + mod.number + '</div>';

    var head = '<span class="eyebrow">Module ' + mod.number + '</span>' +
      '<h1 class="page-title">' + esc(mod.title) + '</h1>' +
      (mod.summary ? '<p class="page-lede">' + esc(mod.summary) + '</p>' : '');

    if (mod.status === 'pending' || !mod.objectives) {
      return crumb + head +
        '<div class="pending-note"><strong>Syllabus not defined yet.</strong> ' +
        esc(mod.note || 'The detailed objectives for this module are agreed with the instructor before exercise content is generated.') +
        (mod.plannedTopics && mod.plannedTopics.length
          ? '<ul style="margin:10px 0 0;padding-left:20px">' + mod.plannedTopics.map(function (t) {
              return '<li>' + esc(t) + '</li>';
            }).join('') + '</ul>'
          : '') +
        '</div>' + pager(course, mod);
    }

    var body = mod.objectives.map(function (o, i) {
      return objectiveBlock(o, i, lang);
    }).join('');

    return crumb + head +
      '<div class="module-layout">' +
        moduleNav(mod) +
        '<div class="module-main">' + body + pager(course, mod) + '</div>' +
      '</div>';
  }

  /* Sticky index of the module: every objective, with its three exercises nested
     underneath. Buttons rather than anchors, since an in-page #hash would clobber
     the route. On narrow screens it collapses into a <details> disclosure. */
  function moduleNav(mod) {
    var exerciseCount = mod.objectives.reduce(function (n, o) {
      return n + (o.exercises || []).length;
    }, 0);

    var items = mod.objectives.map(function (o, oi) {
      var exercises = (o.exercises || []).map(function (ex, i) {
        return '<li>' +
          '<button type="button" class="nav-ex" data-scroll="ex-' + (oi + 1) + '-' + (i + 1) + '">' +
            '<span class="nav-ex-num">' + (i + 1) + '</span>' +
            '<span class="nav-ex-title">' + esc(plain(ex.title)) + '</span>' +
            '<span class="nav-ex-dot ' + (ex.difficulty || 'Easy').toLowerCase() + '" ' +
              'title="' + esc(ex.difficulty || 'Easy') + '"></span>' +
          '</button>' +
        '</li>';
      }).join('');

      return '<li>' +
        '<button type="button" class="nav-obj" data-scroll="obj-' + (oi + 1) + '">' +
          '<span class="nav-obj-num">' + (oi + 1) + '</span>' +
          '<span class="nav-obj-title">' + esc(plain(o.title)) + '</span>' +
        '</button>' +
        '<ol class="nav-exercises">' + exercises + '</ol>' +
      '</li>';
    }).join('');

    return '<details class="module-nav">' +
        '<summary>' +
          '<span class="rule-label">In this module</span>' +
          '<span class="module-nav-count">' + mod.objectives.length + ' objectives &middot; ' +
            exerciseCount + ' exercises</span>' +
        '</summary>' +
        '<nav class="module-nav-inner" aria-label="Module contents">' +
          '<ol class="nav-objectives">' + items + '</ol>' +
        '</nav>' +
      '</details>';
  }

  function pager(course, mod) {
    var mods = course.modules;
    var idx = mods.indexOf(mod);
    var prev = idx > 0 ? mods[idx - 1] : null;
    var next = idx > -1 && idx < mods.length - 1 ? mods[idx + 1] : null;
    var link = function (m, text) {
      if (!m) return '<span></span>';
      if (m.status === 'pending') return '<span></span>';
      return '<a href="#/c/' + esc(course.id) + '/m/' + m.number + '">' + text + ' ' + esc(m.title) + '</a>';
    };
    return '<nav class="pager">' + link(prev, '←') + link(next, '→') + '</nav>';
  }

  /* The announced-but-unwritten courses. The whole page is the announcement: a badge,
     the name, why it is not here yet and one way to ask about it. No syllabus is
     shown — the topics are not agreed, and listing them would promise a shape the
     course may not take. */
  function soonCourse(id) {
    var list = window.SoonCourses || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function viewSoon(c) {
    var title = c.title || 'This course';
    var accent = c.titleAccent || '';

    return '<div class="breadcrumb"><a href="#/">Courses</a><span>/</span>' +
        esc((title + ' ' + accent).trim()) + '</div>' +

      '<div class="soon-page">' +
        '<span class="soon-badge">' + esc(c.eyebrow || 'Coming soon') + '</span>' +
        '<h1 class="soon-title">' + esc(title) +
          (accent ? ' <em>' + esc(accent) + '</em>' : '') + '</h1>' +
        (c.lede ? '<p class="soon-lede">' + esc(c.lede) + '</p>' : '') +
        '<p class="soon-note">' +
          esc(c.note || 'This course is being prepared. Sessions open once it is ' +
                        'ready.') + '</p>' +
        ctaRow(c.cta || { label: 'Ask about this course',
          message: 'Hello, I am interested in the ' + title + ' course. When does it start?' }) +
      '</div>';
  }

  function notFound() {
    return '<div class="breadcrumb"><a href="#/">Courses</a></div>' +
      '<h1 class="page-title">Page not found</h1>' +
      '<p class="page-lede">That course or module does not exist. ' +
      '<a href="#/">Back to the course list</a>.</p>';
  }

  /* ---------- routing ---------- */

  function render() {
    var hash = location.hash.replace(/^#/, '');
    var app = document.getElementById('app');
    var lang = currentLang();
    var m;

    if ((m = hash.match(/^\/c\/([\w-]+)\/m\/(\d+)/))) {
      app.innerHTML = viewModule(m[1], m[2], lang);
    } else if ((m = hash.match(/^\/([\w-]+)\/?$/)) && soonCourse(m[1])) {
      app.innerHTML = viewSoon(soonCourse(m[1]));
    } else if ((m = hash.match(/^\/quiz\/([\w-]+)/))) {
      app.innerHTML = (window.QuizUI && QuizUI.page(m[1], lang)) || notFound();
    } else if ((m = hash.match(/^\/c\/([\w-]+)/))) {
      app.innerHTML = viewCourse(m[1]);
    } else if (/^\/?$/.test(hash)) {
      app.innerHTML = viewHome();
    } else {
      app.innerHTML = notFound();
    }
    window.scrollTo(0, 0);
    initSlider();
    initModuleNav();
  }

  /* ---------- module sidebar ---------- */

  var WIDE = '(min-width: 1100px)';
  var navScrollHandler = null;
  var navResizeHandler = null;

  function isWide() {
    return !window.matchMedia || window.matchMedia(WIDE).matches;
  }

  /* Open on desktop (where the summary is hidden), collapsed on mobile. */
  function syncNavDisclosure(nav) {
    nav.open = isWide();
  }

  function initModuleNav() {
    if (navScrollHandler && window.removeEventListener) {
      window.removeEventListener('scroll', navScrollHandler);
      window.removeEventListener('resize', navResizeHandler);
    }
    navScrollHandler = navResizeHandler = null;

    var nav = document.querySelector && document.querySelector('.module-nav');
    if (!nav) return;
    syncNavDisclosure(nav);

    var buttons = nav.querySelectorAll('[data-scroll]');
    var entries = [];
    for (var i = 0; i < buttons.length; i++) {
      var id = buttons[i].getAttribute('data-scroll');
      var el = document.getElementById(id);
      if (el) entries.push({ btn: buttons[i], el: el, id: id });
    }
    if (!entries.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      /* the last thing whose top has passed under the sticky header is "current" */
      var active = entries[0];
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].el.getBoundingClientRect().top <= 140) active = entries[i];
      }
      /* an exercise also lights up the objective that owns it */
      var owner = 'obj-' + (active.id.split('-')[1] || '');
      for (i = 0; i < entries.length; i++) {
        var e = entries[i];
        e.btn.classList.toggle('is-current', e === active);
        e.btn.classList.toggle('is-owner', e.id === owner && e !== active);
      }
    }

    navScrollHandler = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    navResizeHandler = function () { syncNavDisclosure(nav); };

    if (window.addEventListener) {
      window.addEventListener('scroll', navScrollHandler, { passive: true });
      window.addEventListener('resize', navResizeHandler);
    }
    update();
  }

  /* ---------- language switching ---------- */

  function currentModule() {
    var m = location.hash.replace(/^#/, '').match(/^\/c\/([\w-]+)\/m\/(\d+)/);
    return m ? Curriculum.getModule(m[1], m[2]) : null;
  }

  /* Rewrites only the language-dependent regions. The page is never re-rendered, so
     the scroll position, the open hints and the browser history all stay untouched. */
  function swapLanguage(lang) {
    setLang(lang);

    var i, buttons = document.querySelectorAll('.langsel button');
    for (i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-lang') === lang;
      buttons[i].classList.toggle('active', on);
      buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    /* the test asks language-specific questions, so it is redrawn whole */
    if (window.QuizUI && QuizUI.isActive()) { QuizUI.refresh(false); return; }

    var mod = currentModule();
    if (!mod || !mod.objectives) return;   // course list and pending pages have no code

    var examples = document.querySelectorAll('.example-block[data-obj]');
    for (i = 0; i < examples.length; i++) {
      var obj = mod.objectives[Number(examples[i].getAttribute('data-obj'))];
      var snippet = obj && obj.example && obj.example[lang];
      if (snippet) examples[i].innerHTML = codeBlock(snippet, langLabel(lang) + ' example');
    }

    var cards = document.querySelectorAll('.card[data-obj]');
    for (i = 0; i < cards.length; i++) {
      var owner = mod.objectives[Number(cards[i].getAttribute('data-obj'))];
      var ex = owner && owner.exercises[Number(cards[i].getAttribute('data-ex'))];
      var area = cards[i].querySelector('.lang-area');
      if (ex && area) area.innerHTML = langAreaInner(ex, lang);
    }
  }

  /* ---------- events ---------- */

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('button') : null;
    if (!btn) return;

    if (btn.hasAttribute('data-lang')) {
      var next = btn.getAttribute('data-lang');
      if (next !== currentLang()) swapLanguage(next);
      return;
    }

    if (window.QuizUI && QuizUI.click(btn)) return;

    if (btn.hasAttribute('data-slide-to') && slider.go) {
      slider.go(Number(btn.getAttribute('data-slide-to')));
      slider.restart();
      return;
    }

    if (btn.hasAttribute('data-slide-step') && slider.go) {
      slider.go(slider.index + Number(btn.getAttribute('data-slide-step')));
      slider.restart();
      return;
    }

    if (btn.hasAttribute('data-scroll')) {
      var target = document.getElementById(btn.getAttribute('data-scroll'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      /* on mobile the sidebar is a disclosure — close it once a choice is made */
      var nav = btn.closest('.module-nav');
      if (nav && !isWide()) nav.open = false;
      return;
    }

    if (btn.hasAttribute('data-copy')) {
      var pre = btn.parentElement.nextElementSibling;
      if (pre) copyText(pre.innerText, btn);
    }
  });

  function copyText(text, btn) {
    var done = function () {
      var old = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = old; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else {
      fallback(text, done);
    }
  }

  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* give up quietly */ }
    document.body.removeChild(ta);
  }

  window.addEventListener('hashchange', render);
  render();
})();
