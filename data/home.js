/* Landing-page copy that is not a course and not a service.

   Two blocks, both rendered only on the home page:
     Steps — how a student goes from a first message to a first session.
     FAQ   — the questions that come up before someone books.

   Both are plain lists: reorder, add or delete an entry and the page follows.
   Answers accept `backticks` for inline code, the same as exercise text. */

window.HomeContent = {

  steps: {
    title: 'How sessions work',
    label: 'From first message to first session',
    items: [
      {
        title: 'Send a message',
        body: 'Tell me your major, the subject and where you are stuck. ' +
              'WhatsApp is the fastest way to reach me.'
      },
      {
        title: 'We agree a plan',
        body: 'We settle the topics, the pace and whether the sessions run live ' +
              'in Beirut or online.'
      },
      {
        title: 'Book your slots',
        body: 'Pick the hours that fit your week. Single sessions and full ' +
              'packages are both available.'
      },
      {
        title: 'Start solving',
        body: 'Every session ends with exercises you solve yourself, drawn from ' +
              'the same objectives published on this site.'
      }
    ]
  },

  faq: {
    title: 'Questions before you book',
    label: 'Frequently asked',
    items: [
      {
        q: 'Do you teach C++ or Java?',
        a: 'Both. Every exercise on this site is published in the two languages, and ' +
           'you switch between them at the top-right of any exercise card. The problem ' +
           'never changes — only the syntax notes and the starter template do.'
      },
      {
        q: 'Are sessions live or online?',
        a: 'Either. Live sessions run in Beirut; online sessions run over a screen ' +
           'share and cover exactly the same material at the same price.'
      },
      {
        q: 'Can I book a single session first?',
        a: 'Yes. A single hour of Programming or OOP is $20, and a BT3 IT session ' +
           'is two hours at $30. Take one, then decide whether the full package is ' +
           'worth it.'
      },
      {
        q: 'Do you help with university assignments?',
        a: 'I teach the concept the assignment rests on and work through similar ' +
           'problems with you. I do not hand over solutions to graded work — you ' +
           'write your own code, which is the only way the material sticks.'
      },
      {
        q: 'Which subjects does BT3 IT cover?',
        a: 'All eight: Networking, Assembly, Technology, Access, Mathematics, ' +
           'C Language, Operating Systems and Maintenance.'
      },
      {
        q: 'Do I have to use this site to take sessions?',
        a: 'No. The site is free and open to anyone — the exercises, the objectives ' +
           'and the evaluation test stay available whether or not you book.'
      },
      {
        q: 'What do I need before starting the OOP course?',
        a: 'Programming Fundamentals, or the equivalent from your own coursework: ' +
           'variables, conditions, loops, arrays and functions. Take the evaluation ' +
           'test if you are unsure where you stand.'
      }
    ]
  }
};
