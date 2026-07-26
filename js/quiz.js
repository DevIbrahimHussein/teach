/* ==========================================================================
   Evaluation test — engine and views.
   Route:  #/quiz/<courseId>

   The page shell is rendered by app.js; everything that changes with the
   student's progress lives inside #quiz-root and is re-rendered from here.
   Text helpers come from window.UI, which app.js publishes.

   Scoring: an objective counts as known when at least two of its three
   questions are answered correctly. Unanswered counts as wrong.
   ========================================================================== */

window.QuizUI = (function () {
  'use strict';

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  var KEY = 'teach.quiz.';
  var PASS = 2 / 3;          /* share of an objective's questions needed to "know" it */

  var state = null;          /* { course, phase, index, answers } */

  /* ---------- state ---------- */

  function blank(courseId) {
    return { course: courseId, phase: 'intro', index: 0, answers: {} };
  }

  function load(courseId) {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY + courseId)); } catch (e) { /* file:// */ }
    if (!saved || saved.course !== courseId || !saved.answers) return blank(courseId);
    saved.index = Number(saved.index) || 0;
    return saved;
  }

  function save() {
    try { localStorage.setItem(KEY + state.course, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function clear(courseId) {
    try { localStorage.removeItem(KEY + courseId); } catch (e) { /* ignore */ }
  }

  function answeredCount(courseId, lang) {
    return Quiz.questions(courseId).filter(function (e) {
      return givenOf(e, lang) != null;
    }).length;
  }

  /* Answers given in the other language and not carried over. */
  function pendingCount(courseId, lang) {
    return Quiz.questions(courseId).filter(function (e) {
      return state.answers[e.qid] && givenOf(e, lang) == null;
    }).length;
  }

  /* ---------- language-aware fields ---------- */

  /* A field is either shared, or an object carrying one value per language. */
  function pick(value, lang) {
    if (value && typeof value === 'object' && !(value instanceof Array) && 'cpp' in value) {
      return value[lang];
    }
    return value;
  }

  function options(q, lang) { return pick(q.options, lang) || []; }
  function answerOf(q, lang) { return Number(pick(q.answer, lang)); }

  /* True when both languages show the same four options in the same order. */
  function sharedOptions(q) {
    if (!q.options || !('cpp' in q.options)) return true;   // one shared array
    return String(q.options.cpp) === String(q.options.java);
  }

  /* An answer is stored as the option number, which only means something in the
     language it was picked in. A pick on a syntax question therefore does not
     carry over when the language is switched — it comes back if you switch back. */
  function givenOf(entry, lang) {
    var a = state.answers[entry.qid];
    if (!a) return null;
    return (a.lang === lang || sharedOptions(entry.q)) ? a.i : null;
  }

  function isCorrect(entry, lang) {
    var given = givenOf(entry, lang);
    return given != null && given === answerOf(entry.q, lang);
  }

  /* ---------- scoring ---------- */

  /* One row per objective: how many of its questions were answered correctly,
     and whether that clears the bar. */
  function scoreTopics(courseId, lang) {
    return Quiz.topics(courseId).map(function (topic) {
      var entries = Quiz.questions(courseId).filter(function (e) { return e.topic === topic; });
      var correct = entries.filter(function (e) { return isCorrect(e, lang); }).length;
      return {
        topic: topic,
        entries: entries,
        correct: correct,
        total: entries.length,
        known: entries.length > 0 && correct / entries.length >= PASS
      };
    });
  }

  /* ---------- small pieces ---------- */

  function snippet(code) {
    return '<pre class="code quiz-code"><code>' + UI.esc(code) + '</code></pre>';
  }

  function progressBar(done, total) {
    var pct = total ? Math.round((done / total) * 100) : 0;
    return '<div class="quiz-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" ' +
      'aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div>';
  }

  function moduleTitle(courseId, number) {
    var mod = Curriculum.getModule(courseId, number);
    return mod ? mod.title : 'Module ' + number;
  }

  /* ---------- intro ---------- */

  function viewIntro(courseId, lang) {
    var total = Quiz.countQuestions(courseId);
    var topics = Quiz.countTopics(courseId);
    var mods = Quiz.modules(courseId);
    var done = answeredCount(courseId, lang);

    var coverage = mods.map(function (m) {
      return '<div class="quiz-cover">' +
        '<span class="quiz-cover-num">' + (m.number < 10 ? '0' : '') + m.number + '</span>' +
        '<span class="quiz-cover-body">' +
          '<strong>' + UI.esc(moduleTitle(courseId, m.number)) + '</strong>' +
          '<span>' + m.topics.length + ' objectives &middot; ' +
            m.topics.reduce(function (n, t) { return n + t.questions.length; }, 0) +
            ' questions</span>' +
        '</span>' +
      '</div>';
    }).join('');

    return '<div class="quiz-intro">' +
      '<div class="panel">' +
        '<span class="rule-label">How the test works</span>' +
        '<ul>' +
          '<li>' + total + ' multiple-choice questions — three for every one of the ' +
            topics + ' objectives in the course.</li>' +
          '<li>One question at a time. You may go back and change an answer before you finish.</li>' +
          '<li>Nothing is timed. Your progress is saved in this browser, so you can stop and return.</li>' +
          '<li>Switch between C++ and Java at any point. Questions about syntax follow the ' +
            'language you have selected, so those few have to be answered again after a switch.</li>' +
          '<li>An objective counts as <strong>known</strong> when at least two of its three ' +
            'questions are correct. A question you skip counts as wrong.</li>' +
        '</ul>' +
      '</div>' +

      '<span class="rule-label">What is covered</span>' +
      '<div class="quiz-cover-grid">' + coverage + '</div>' +

      '<div class="quiz-start">' +
        (done
          ? '<button type="button" class="btn btn-primary" data-quiz="resume">Resume — ' +
              done + ' of ' + total + ' answered</button>' +
            '<button type="button" class="btn btn-ghost" data-quiz="restart">Start over</button>'
          : '<button type="button" class="btn btn-primary" data-quiz="start">Start the test</button>') +
      '</div>' +
      '</div>';
  }

  /* ---------- one question ---------- */

  function viewQuestion(courseId, lang) {
    var all = Quiz.questions(courseId);
    var i = Math.max(0, Math.min(state.index, all.length - 1));
    var entry = all[i];
    var q = entry.q;
    var given = givenOf(entry, lang);
    var code = pick(q.code, lang);
    var last = i === all.length - 1;
    var pending = pendingCount(courseId, lang);

    var opts = options(q, lang).map(function (text, oi) {
      var on = given === oi;
      return '<button type="button" class="quiz-opt' + (on ? ' is-picked' : '') + '" ' +
        'data-quiz="pick" data-i="' + oi + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
        '<span class="quiz-key">' + LETTERS[oi] + '</span>' +
        '<span class="quiz-opt-text">' + UI.fmt(text) + '</span>' +
      '</button>';
    }).join('');

    /* The objective being tested is deliberately not named while the test is running —
       it would give the answer away. It appears on the result page. */
    return '<div class="quiz-run">' +
      '<div class="quiz-head">' +
        '<div class="quiz-head-meta">' +
          '<span class="eyebrow">Question ' + (i + 1) + ' of ' + all.length + '</span>' +
          '<span class="quiz-answered">' + answeredCount(courseId, lang) + ' answered</span>' +
        '</div>' +
        UI.langSelector(lang) +
      '</div>' +
      progressBar(i + 1, all.length) +

      (pending
        ? '<p class="quiz-notice">' + pending + ' answer' + (pending === 1 ? '' : 's') +
          ' came from the other language and the choices there are different, so ' +
          (pending === 1 ? 'that question needs' : 'those questions need') +
          ' answering again in ' + UI.esc(UI.langLabel(lang)) + '.</p>'
        : '') +

      '<article class="quiz-card">' +
        '<p class="quiz-ask">' + UI.fmt(pick(q.ask, lang)) + '</p>' +
        (code ? snippet(code) : '') +
        '<div class="quiz-options">' + opts + '</div>' +
      '</article>' +

      '<nav class="quiz-actions">' +
        '<button type="button" class="btn btn-ghost" data-quiz="prev"' +
          (i === 0 ? ' disabled' : '') + '>&larr; Previous</button>' +
        (last
          ? '<button type="button" class="btn btn-primary" data-quiz="finish">Finish &amp; score</button>'
          : '<button type="button" class="btn btn-primary" data-quiz="next">Next &rarr;</button>') +
      '</nav>' +

      (last ? '' :
        '<p class="quiz-early">' +
          '<button type="button" class="linkish" data-quiz="finish">Finish now and see my score</button>' +
          ' &mdash; unanswered questions count as wrong.</p>') +
      '</div>';
  }

  /* ---------- result ---------- */

  function objectiveLine(courseId, row) {
    return '<li>' +
      '<a href="#/c/' + UI.esc(courseId) + '/m/' + row.topic.module + '">' +
        '<span class="obj-mod">M' + row.topic.module + '</span>' +
        '<span class="obj-title">' + UI.fmt(row.topic.objective) + '</span>' +
        '<span class="obj-score">' + row.correct + '/' + row.total + '</span>' +
      '</a></li>';
  }

  function reviewBlock(courseId, rows, lang) {
    var body = rows.map(function (row) {
      var qs = row.entries.map(function (entry, n) {
        var q = entry.q;
        var given = givenOf(entry, lang);
        var right = answerOf(q, lang);
        var opts = options(q, lang);
        var ok = given === right;

        return '<div class="review-q">' +
          '<p class="review-ask"><span class="review-mark ' + (ok ? 'ok' : 'bad') + '">' +
            (ok ? '&#10003;' : '&#10007;') + '</span>' +
            '<span>' + (n + 1) + '. ' + UI.fmt(pick(q.ask, lang)) + '</span></p>' +
          '<p class="review-line"><span class="eyebrow">Your answer</span> ' +
            (given == null ? '<em>not answered</em>' : UI.fmt(opts[given])) + '</p>' +
          (ok ? '' :
            '<p class="review-line"><span class="eyebrow">Correct</span> ' +
              UI.fmt(opts[right]) + '</p>') +
          (q.why ? '<p class="review-why">' + UI.fmt(pick(q.why, lang)) + '</p>' : '') +
        '</div>';
      }).join('');

      return '<section class="review-topic">' +
        '<h4>' + UI.fmt(row.topic.objective) +
          '<span class="review-topic-score ' + (row.known ? 'is-known' : 'is-gap') + '">' +
            row.correct + '/' + row.total + '</span></h4>' +
        qs +
      '</section>';
    }).join('');

    return '<details class="quiz-review">' +
      '<summary>Review every question, with the correct answer and why</summary>' +
      body +
      '</details>';
  }

  function viewResult(courseId, lang) {
    var rows = scoreTopics(courseId, lang);
    var total = rows.reduce(function (n, r) { return n + r.total; }, 0);
    var correct = rows.reduce(function (n, r) { return n + r.correct; }, 0);
    var pct = total ? Math.round((correct / total) * 100) : 0;
    var known = rows.filter(function (r) { return r.known; });
    var gaps = rows.filter(function (r) { return !r.known; });

    var byModule = Quiz.modules(courseId).map(function (m) {
      var mine = rows.filter(function (r) { return r.topic.module === m.number; });
      var c = mine.reduce(function (n, r) { return n + r.correct; }, 0);
      var t = mine.reduce(function (n, r) { return n + r.total; }, 0);
      var k = mine.filter(function (r) { return r.known; }).length;
      return '<div class="mod-score">' +
        '<div class="mod-score-head">' +
          '<strong>' + UI.esc(moduleTitle(courseId, m.number)) + '</strong>' +
          '<span>' + c + '/' + t + '</span>' +
        '</div>' +
        progressBar(c, t) +
        '<span class="mod-score-note">' + k + ' of ' + mine.length + ' objectives known</span>' +
      '</div>';
    }).join('');

    return '<div class="quiz-result">' +

      '<div class="score-head">' +
        '<div class="score-big"><strong>' + correct + '</strong><span>/ ' + total + '</span></div>' +
        '<div class="score-side">' +
          '<div class="score-pct">' + pct + '%</div>' +
          '<p>You know <strong>' + known.length + '</strong> of ' + rows.length +
            ' objectives. An objective counts as known when at least two of its three ' +
            'questions are correct.</p>' +
        '</div>' +
      '</div>' +

      '<div class="mod-score-grid">' + byModule + '</div>' +

      '<div class="quiz-panels">' +
        '<section class="quiz-panel is-known">' +
          '<span class="rule-label">Objectives you know</span>' +
          (known.length
            ? '<ul class="obj-list">' + known.map(function (r) {
                return objectiveLine(courseId, r);
              }).join('') + '</ul>'
            : '<p class="quiz-empty">None yet. Work through the modules and take the test again.</p>') +
        '</section>' +

        '<section class="quiz-panel is-gap">' +
          '<span class="rule-label">Objectives to study</span>' +
          (gaps.length
            ? '<ul class="obj-list">' + gaps.map(function (r) {
                return objectiveLine(courseId, r);
              }).join('') + '</ul>'
            : '<p class="quiz-empty">Nothing left — every objective is covered. Well done.</p>') +
        '</section>' +
      '</div>' +

      reviewBlock(courseId, rows, lang) +

      '<div class="quiz-actions quiz-actions-end">' +
        '<button type="button" class="btn btn-ghost" data-quiz="back">&larr; Back to the questions</button>' +
        '<button type="button" class="btn btn-primary" data-quiz="restart">Take the test again</button>' +
      '</div>' +
      '</div>';
  }

  /* ---------- page ---------- */

  function body(courseId, lang) {
    if (state.phase === 'result') return viewResult(courseId, lang);
    if (state.phase === 'test') return viewQuestion(courseId, lang);
    return viewIntro(courseId, lang);
  }

  function page(courseId, lang) {
    var course = Curriculum.getCourse(courseId);
    if (!course || !Quiz.has(courseId)) return null;

    if (!state || state.course !== courseId) state = load(courseId);

    return '<div class="breadcrumb">' +
        '<a href="#/">Courses</a><span>/</span>' +
        '<a href="#/c/' + UI.esc(course.id) + '">' + UI.esc(course.title) + '</a><span>/</span>' +
        'Evaluation test</div>' +
      '<span class="eyebrow">' + UI.esc(course.subtitle) + ' &middot; self-assessment</span>' +
      '<h1 class="page-title">Evaluation Test</h1>' +
      '<p class="page-lede">Every objective in the course, three questions each. The score at ' +
        'the end lists the objectives you already know and the ones still to study.</p>' +
      '<div id="quiz-root">' + body(courseId, lang) + '</div>';
  }

  function refresh(scroll) {
    var root = document.getElementById('quiz-root');
    if (!root || !state) return;
    root.innerHTML = body(state.course, UI.currentLang());
    if (scroll) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- events ---------- */

  function isActive() {
    return !!document.getElementById('quiz-root');
  }

  function step(delta) {
    var total = Quiz.countQuestions(state.course);
    state.index = Math.max(0, Math.min(state.index + delta, total - 1));
    save();
    refresh(true);
  }

  /* Returns true when the click belonged to the quiz. */
  function click(btn) {
    if (!state || !btn.hasAttribute('data-quiz')) return false;
    var action = btn.getAttribute('data-quiz');

    if (action === 'start' || action === 'resume') {
      state.phase = 'test';
      if (action === 'start') state.index = 0;
      save();
      refresh(false);
      return true;
    }

    if (action === 'restart') {
      clear(state.course);
      state = blank(state.course);
      state.phase = 'test';
      save();
      refresh(false);
      return true;
    }

    if (action === 'pick') {
      var entry = Quiz.questions(state.course)[state.index];
      if (entry) {
        /* the language is stored with the pick: option 3 in C++ is not option 3 in Java */
        state.answers[entry.qid] = { i: Number(btn.getAttribute('data-i')), lang: UI.currentLang() };
        save();
        refresh(false);
      }
      return true;
    }

    if (action === 'next') { step(1); return true; }
    if (action === 'prev') { step(-1); return true; }

    if (action === 'finish') {
      state.phase = 'result';
      save();
      refresh(false);
      window.scrollTo(0, 0);
      return true;
    }

    if (action === 'back') {
      state.phase = 'test';
      save();
      refresh(false);
      window.scrollTo(0, 0);
      return true;
    }

    return false;
  }

  /* A, B, C, D or 1-4 answers; the arrow keys move between questions. */
  document.addEventListener('keydown', function (e) {
    if (!state || state.phase !== 'test' || !isActive()) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    var entry = Quiz.questions(state.course)[state.index];
    if (!entry) return;

    var lang = UI.currentLang();
    var key = String(e.key || '').toUpperCase();
    var count = options(entry.q, lang).length;
    var index = LETTERS.indexOf(key);
    if (index < 0 && key >= '1' && key <= '9') index = Number(key) - 1;

    if (index > -1 && index < count) {
      state.answers[entry.qid] = { i: index, lang: lang };
      save();
      refresh(false);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      step(1);
    } else if (e.key === 'ArrowLeft') {
      step(-1);
    }
  });

  return { page: page, click: click, refresh: refresh, isActive: isActive };
})();
