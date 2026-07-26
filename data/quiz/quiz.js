/* ==========================================================================
   Evaluation-test registry.
   Loaded before every question bank. Plain script, no modules, works from file://

   A topic is one curriculum objective plus the questions that test it:
     Quiz.addTopic('fundamentals', { module: 1, objective: 'Data Types',
                                     questions: [ ... ] });

   Topics keep the order they are declared in, which is curriculum order.
   ========================================================================== */

window.Quiz = (function () {
  var banks = {};

  function topics(courseId) { return banks[courseId] || []; }

  return {
    addTopic: function (courseId, topic) {
      if (!banks[courseId]) banks[courseId] = [];
      /* the id survives edits to the wording, so saved progress stays meaningful */
      topic.id = 'm' + topic.module + '-o' + (banks[courseId].filter(function (t) {
        return t.module === topic.module;
      }).length + 1);
      banks[courseId].push(topic);
      return topic;
    },

    topics: topics,

    has: function (courseId) { return topics(courseId).length > 0; },

    countTopics: function (courseId) { return topics(courseId).length; },

    countQuestions: function (courseId) {
      return topics(courseId).reduce(function (n, t) { return n + t.questions.length; }, 0);
    },

    /* Modules covered, in order, with their topic counts. */
    modules: function (courseId) {
      var seen = [], byNumber = {};
      topics(courseId).forEach(function (t) {
        if (!byNumber[t.module]) {
          byNumber[t.module] = { number: t.module, topics: [] };
          seen.push(byNumber[t.module]);
        }
        byNumber[t.module].topics.push(t);
      });
      return seen;
    },

    /* Every question, flattened, each one carrying the topic it belongs to. */
    questions: function (courseId) {
      var out = [];
      topics(courseId).forEach(function (t) {
        t.questions.forEach(function (q, i) {
          out.push({ q: q, topic: t, qid: t.id + '-q' + (i + 1) });
        });
      });
      return out;
    }
  };
})();
