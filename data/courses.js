/* ==========================================================================
   Curriculum registry.
   Loaded before every data file. Plain script, no modules, works from file://
   ========================================================================== */

window.Curriculum = (function () {
  var courses = [];
  var byId = {};

  return {
    addCourse: function (course) {
      course.modules = [];
      courses.push(course);
      byId[course.id] = course;
      return course;
    },

    addModule: function (courseId, mod) {
      var course = byId[courseId];
      if (!course) throw new Error('Unknown course: ' + courseId);
      course.modules.push(mod);
      course.modules.sort(function (a, b) { return a.number - b.number; });
      return mod;
    },

    allCourses: function () { return courses; },

    getCourse: function (id) { return byId[id] || null; },

    getModule: function (courseId, number) {
      var course = byId[courseId];
      if (!course) return null;
      for (var i = 0; i < course.modules.length; i++) {
        if (course.modules[i].number === Number(number)) return course.modules[i];
      }
      return null;
    },

    /* Counts only modules that actually carry exercises. */
    countExercises: function (course) {
      var total = 0;
      (course.modules || []).forEach(function (m) {
        (m.objectives || []).forEach(function (o) {
          total += (o.exercises || []).length;
        });
      });
      return total;
    }
  };
})();

/* --------------------------------------------------------------------------
   Starter-code templates.
   An exercise declares what it needs; the renderer builds the skeleton.
     cpp:  { includes: ['<iomanip>'], notes: [...] }
     java: { scanner: true, notes: [...] }
   Either side may supply `starter` to override the generated skeleton.
   -------------------------------------------------------------------------- */

window.starterCpp = function (includes) {
  var headers = ['<iostream>'].concat(includes || []);
  var lines = headers.map(function (h) { return '#include ' + h; });
  lines.push('using namespace std;');
  lines.push('');
  lines.push('int main() {');
  lines.push('    // your code here');
  lines.push('');
  lines.push('    return 0;');
  lines.push('}');
  return lines.join('\n');
};

window.starterJava = function (scanner) {
  var lines = [];
  if (scanner) { lines.push('import java.util.Scanner;'); lines.push(''); }
  lines.push('public class Main {');
  lines.push('    public static void main(String[] args) {');
  if (scanner) lines.push('        Scanner sc = new Scanner(System.in);');
  lines.push('        // your code here');
  lines.push('    }');
  lines.push('}');
  return lines.join('\n');
};

/* --------------------------------------------------------------------------
   Courses
   -------------------------------------------------------------------------- */

Curriculum.addCourse({
  id: 'fundamentals',
  title: 'Programming Fundamentals',
  subtitle: 'Course 1',
  description:
    'Variables, input and output, conditions, loops and arrays. Every objective is ' +
    'followed by three exercises that reuse the same concept in a different scenario.',
  rules: [
    'Read the input values in exactly the order the exercise states.',
    'Do not print prompt messages such as "Enter a number". The sample output shows every line your program is expected to print, and nothing else.',
    'Match labels, spacing and punctuation exactly as written in the Output section.',
    'Assume the input is valid unless the exercise explicitly asks you to validate it.',
    'Solve each exercise on your own. This platform gives requirements, examples and rules, never solutions.'
  ]
});

Curriculum.addCourse({
  id: 'oop',
  title: 'Object-Oriented Programming',
  subtitle: 'Course 2',
  description:
    'Classes, objects, encapsulation, inheritance, polymorphism and abstraction, ' +
    'built on top of Programming Fundamentals.',
  rules: [
    'Programming Fundamentals is a prerequisite for this course.',
    'Read the input values in exactly the order the exercise states.',
    'Match labels, spacing and punctuation exactly as written in the Output section.',
    'Solve each exercise on your own. This platform gives requirements, examples and rules, never solutions.'
  ]
});
