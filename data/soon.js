/* Announced courses — named, not yet published.

   Each entry gets a standalone page at #/<id>, and the whole page is the
   announcement. They are deliberately not courses in data/courses.js: there are no
   modules and no exercises to render yet, and a course with nothing behind it would
   count zeroes into the home-page stats. When a syllabus is agreed, that entry
   becomes a real course and its page here goes away.

   No topic lists on purpose. Nothing is published on this platform before the
   exercises behind it exist, and that applies to a syllabus too.

   Add another announcement by pushing a third object with the same shape, then add
   its nav link in index.html. The route follows the id. */

window.SoonCourses = [
  {
    id: 'arduino',
    eyebrow: 'Coming soon',
    title: 'Arduino',
    titleAccent: '& ESP32',

    lede: 'Electronics and embedded programming, taught the same way as the rest of ' +
          'this platform — you wire the circuit and write the code yourself.',

    note: 'The course is being prepared now, and sessions open once it is ready. ' +
          'Message me to be told when it starts.',

    cta: {
      label: 'Ask about Arduino & ESP32',
      message: 'Hello, I am interested in the Arduino & ESP32 course. When does it start?'
    }
  },

  {
    id: 'ai',
    eyebrow: 'Coming soon',
    title: 'AI',
    titleAccent: '& Machine Learning',

    lede: 'How machines learn, from the mathematics up — taught the same way as the ' +
          'rest of this platform, with problems you solve yourself.',

    note: 'The course is being prepared now, and sessions open once it is ready. ' +
          'Message me to be told when it starts.',

    cta: {
      label: 'Ask about AI',
      message: 'Hello, I am interested in the AI course. When does it start?'
    }
  }
];
