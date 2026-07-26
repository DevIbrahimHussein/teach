/* Object-Oriented Programming — Modules 1 to 10.

   teach.md gives a suggested module sequence for this course but leaves the detailed
   objectives to be defined with the instructor before exercise content is generated.
   Every module therefore renders as "Syllabus pending" for now.

   To publish a module: replace its entry here with a full module file in the style of
   data/fundamentals/m1.js — objectives, each with summary, points, example and three
   exercises — and add a <script> tag for it in index.html. */

[
  {
    number: 1,
    title: 'OOP Concepts and Classes',
    plannedTopics: [
      'Why objects: grouping related data and behaviour together',
      'Declaring a class and its members',
      'The difference between a class and an object',
      'Access specifiers at a first glance'
    ]
  },
  {
    number: 2,
    title: 'Objects, Attributes and Methods',
    plannedTopics: [
      'Creating objects and setting their attributes',
      'Writing methods that use the object\'s own data',
      'Methods that return a value versus methods that only act',
      'Several objects of the same class living side by side'
    ]
  },
  {
    number: 3,
    title: 'Constructors and Encapsulation',
    plannedTopics: [
      'Default and parameterised constructors',
      'Private attributes with public getters and setters',
      'Validation inside a setter or a constructor',
      'Why direct access to attributes is avoided'
    ]
  },
  {
    number: 4,
    title: 'Arrays and Lists of Objects',
    plannedTopics: [
      'An array of objects and how it is filled',
      'Looping over objects to search and to total',
      'Reporting on a collection of student or employee objects',
      'Finding the object with the largest or smallest value'
    ]
  },
  {
    number: 5,
    title: 'Inheritance',
    plannedTopics: [
      'Base and derived classes',
      'What a derived class inherits and what it adds',
      'Calling the base constructor',
      'A Person base class with Student and Employee derived from it'
    ]
  },
  {
    number: 6,
    title: 'Method Overriding and Polymorphism',
    plannedTopics: [
      'Redefining an inherited method in a derived class',
      'Calling the right version through a base-class reference',
      'C++ virtual functions versus Java\'s default overriding',
      'One loop that treats different object types uniformly'
    ]
  },
  {
    number: 7,
    title: 'Abstract Classes and Interfaces',
    plannedTopics: [
      'Abstract classes and abstract methods',
      'Java interfaces, and the closest C++ equivalent',
      'Designing to a common contract',
      'A Shape hierarchy and a Payable contract'
    ]
  },
  {
    number: 8,
    title: 'Exception Handling and Validation',
    plannedTopics: [
      'try / catch and what an exception is',
      'Throwing an exception from a setter or a constructor',
      'Catching invalid input instead of stopping the program',
      'C++ exceptions versus Java checked and unchecked exceptions'
    ]
  },
  {
    number: 9,
    title: 'File Handling and Persistence',
    plannedTopics: [
      'Writing an object\'s data to a file',
      'Reading records back and rebuilding objects',
      'Saving and loading a collection of objects',
      'A records manager that survives between runs'
    ]
  },
  {
    number: 10,
    title: 'Final Object-Oriented Mini-Project',
    plannedTopics: [
      'Designing a small class hierarchy from a written brief',
      'Combining encapsulation, inheritance, polymorphism and validation',
      'A library system, a school management system or a payroll system',
      'Presenting and defending the design'
    ]
  }
].forEach(function (m) {
  m.status = 'pending';
  m.note = 'Suggested module from the course outline. Objectives to be agreed before exercises are written.';
  Curriculum.addModule('oop', m);
});
