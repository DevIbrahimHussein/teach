/* Programming Fundamentals — evaluation test.

   Three questions per objective, in curriculum order. A question may carry
   `{ cpp: ..., java: ... }` on `ask`, `code`, `options`, `answer` or `why`
   whenever the two languages differ; anything else is shared.

   Every question is answerable from the objective's own explanation and
   example — nothing here needs a concept introduced later in the course. */

/* ======================= Module 1 — Basics ======================= */

Quiz.addTopic('fundamentals', {
  module: 1,
  objective: 'Data Types',
  questions: [
    {
      ask: 'A program stores the number of students in a class. Which data type fits the value best?',
      options: ['`double`', '`int`', '`char`', '`string`'],
      answer: 1,
      why: 'A head count is a whole number, so `int` is the right box. `double` would still ' +
           'calculate, but it says the value may have a fractional part, and half a student ' +
           'does not exist.'
    },
    {
      ask: 'A student average of `88.5` has to be kept exactly. Which declaration is correct?',
      options: [
        '`int average = 88.5;`',
        '`char average = 88.5;`',
        '`double average = 88.5;`',
        '`double average = "88.5";`'
      ],
      answer: 2,
      why: '`double` is the type for numbers with a fractional part. An `int` would keep only ' +
           '`88`, and double quotes would turn the number into text.'
    },
    {
      ask: 'Which declaration stores the full name `Sara Ahmed`?',
      options: {
        cpp: [
          '`char name = "Sara Ahmed";`',
          '`string name = \'Sara Ahmed\';`',
          '`string name = "Sara Ahmed";`',
          '`int name = "Sara Ahmed";`'
        ],
        java: [
          '`string name = "Sara Ahmed";`',
          '`String name = "Sara Ahmed";`',
          '`String name = \'Sara Ahmed\';`',
          '`char name = "Sara Ahmed";`'
        ]
      },
      answer: { cpp: 2, java: 1 },
      why: {
        cpp: 'Text of any length is a `string`, written between double quotes. A `char` holds ' +
             'one character only, and single quotes are what mark a `char`.',
        java: 'Text is a `String` in Java — capital S — written between double quotes. Single ' +
              'quotes are for `char`, which holds one character only.'
      }
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 1,
  objective: 'Input and Output',
  questions: [
    {
      ask: 'The user types `Sara Ahmed` and presses Enter. What does `first` hold?',
      code: {
        cpp: 'string first;\ncin >> first;',
        java: 'String first = sc.next();'
      },
      options: ['`Sara Ahmed`', '`Ahmed`', 'nothing — the read fails', '`Sara`'],
      answer: 3,
      why: 'Reading a word stops at the first space, so only `Sara` is taken. `Ahmed` stays ' +
           'waiting to be picked up by the next read.'
    },
    {
      ask: 'The variable `total` holds `15`. Which line prints exactly `Total: 15`?',
      options: {
        cpp: [
          '`cout << "Total: " << total << endl;`',
          '`cout << "Total: " + total << endl;`',
          '`cout << "Total: total" << endl;`',
          '`cout << "Total: ", total << endl;`'
        ],
        java: [
          '`System.out.println("Total: " << total);`',
          '`System.out.println("Total: " + total);`',
          '`System.out.println("Total: total");`',
          '`System.out.println("Total: ", total);`'
        ]
      },
      answer: { cpp: 0, java: 1 },
      why: {
        cpp: 'C++ chains text and values onto the output with `<<`. Quoting `total` would print ' +
             'the word, not the value.',
        java: 'Java joins text and values with `+` inside one `println`. Quoting `total` would ' +
              'print the word, not the value.'
      }
    },
    {
      ask: 'The Output section asks for the line `Age: 20`. Which program output is accepted?',
      options: ['`Enter your age: Age: 20`', '`age: 20`', '`Age: 20`', '`Age:20`'],
      answer: 2,
      why: 'The label, its capitalisation, the colon and the single space are all part of the ' +
           'answer — and prompts are never printed unless the exercise asks for them.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 1,
  objective: 'Operations',
  questions: [
    {
      ask: 'What does `a / b` produce?',
      code: { cpp: 'int a = 7, b = 2;', java: 'int a = 7, b = 2;' },
      options: ['`3`', '`3.5`', '`4`', '`1`'],
      answer: 0,
      why: 'Both sides are `int`, so this is whole-number division: the fraction is thrown ' +
           'away and `3` is left. Nothing is rounded up.'
    },
    {
      ask: 'What is the value of `17 % 5`?',
      options: ['`3.4`', '`3`', '`2`', '`12`'],
      answer: 2,
      why: '`%` gives the remainder of whole-number division. `5` fits into `17` three times, ' +
           'and `2` is left over.'
    },
    {
      ask: 'With `int a = 7, b = 2;`, which expression produces `3.5`?',
      options: {
        cpp: ['`a / b`', '`(double)(a / b)`', '`a % b`', '`(double)a / b`'],
        java: ['`a / b`', '`(double) (a / b)`', '`a % b`', '`(double) a / b`']
      },
      answer: 3,
      why: 'One side has to become a decimal *before* the division runs. Converting the result ' +
           'instead divides first, so the fraction is already gone and the answer is `3.0`.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 1,
  objective: 'Order of Precedence',
  questions: [
    {
      ask: 'What does `2 + 3 * 4` evaluate to?',
      options: ['`20`', '`14`', '`24`', '`9`'],
      answer: 1,
      why: '`*` runs before `+`, so it is `2 + 12`. Writing `(2 + 3) * 4` is what gives `20`.'
    },
    {
      ask: 'What does `20 / 5 * 2` evaluate to?',
      options: ['`2`', '`50`', '`8`', '`0`'],
      answer: 2,
      why: '`/` and `*` have equal priority, so they run left to right: `20 / 5` is `4`, then ' +
           '`4 * 2` is `8`.'
    },
    {
      ask: 'Three grades are in `g1`, `g2` and `g3`. Which expression is their average?',
      options: [
        '`g1 + g2 + g3 / 3.0`',
        '`(g1 + g2 + g3) / 3.0`',
        '`g1 + g2 + (g3 / 3.0)`',
        '`(g1 + g2 + g3) / 3` with all three stored as `int`'
      ],
      answer: 1,
      why: 'Without parentheses only `g3` is divided. And dividing an `int` sum by `3` throws ' +
           'the fraction away — `3.0` is what keeps it.'
    }
  ]
});

/* ======================= Module 2 — Conditions ======================= */

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: 'The `if` Statement',
  questions: [
    {
      ask: 'What does this print when `grade` is `40`?',
      code: {
        cpp: 'if (grade >= 50) {\n    cout << "Pass" << endl;\n}',
        java: 'if (grade >= 50) {\n    System.out.println("Pass");\n}'
      },
      options: ['`Pass`', '`Fail`', 'nothing at all', '`0`'],
      answer: 2,
      why: 'A plain `if` with no `else` simply skips its body when the condition is false. ' +
           'There is no hidden second branch.'
    },
    {
      ask: 'Which condition tests whether `x` is equal to `5`?',
      options: ['`if (x = 5)`', '`if (x == 5)`', '`if (x := 5)`', '`if (x equals 5)`'],
      answer: 1,
      why: '`=` assigns a value, `==` compares two values. Mixing them up is the most common ' +
           'beginner bug.'
    },
    {
      ask: 'What is wrong with this code?',
      code: {
        cpp: 'if (n > 0);\n{\n    cout << "Positive" << endl;\n}',
        java: 'if (n > 0);\n{\n    System.out.println("Positive");\n}'
      },
      options: [
        'Nothing — it is correct.',
        'The braces must be removed when the body is a single statement.',
        '`n > 0` should be written `n >= 1`.',
        'The semicolon ends the `if`, so `Positive` is printed for every value of `n`.'
      ],
      answer: 3,
      why: 'The semicolon becomes the whole body of the `if`. The block that follows is then an ' +
           'ordinary block, and it runs every time.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: '`if` / `else`',
  questions: [
    {
      ask: 'What does this print when `n` is `7`?',
      code: {
        cpp: 'if (n % 2 == 0) {\n    cout << "Even" << endl;\n} else {\n    cout << "Odd" << endl;\n}',
        java: 'if (n % 2 == 0) {\n    System.out.println("Even");\n} else {\n    System.out.println("Odd");\n}'
      },
      options: ['`Even`', '`Odd`', 'both lines', 'nothing'],
      answer: 1,
      why: '`7 % 2` is `1`, not `0`, so the condition is false and the `else` branch runs.'
    },
    {
      ask: 'For one input value, how many of the two blocks of an `if` / `else` run?',
      options: [
        'Exactly one, always.',
        'Both, one after the other.',
        'One, or neither, depending on the value.',
        'Neither, unless the condition is true.'
      ],
      answer: 0,
      why: '`else` catches everything the `if` did not, so there is no silent third path and ' +
           'the program always produces output.'
    },
    {
      ask: 'Which statement about `else` is true?',
      options: [
        'It needs its own condition in parentheses.',
        'It runs after the `if` block whenever the condition was true.',
        'It carries no condition of its own and catches every value the `if` did not.',
        'It may be written without a matching `if`.'
      ],
      answer: 2,
      why: 'A value handled by the `if` branch is never re-tested by the `else` branch — they ' +
           'are alternatives.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: 'Logical Operations in Conditions',
  questions: [
    {
      ask: 'Which condition is true exactly when `x` is between `50` and `100`, both included?',
      options: [
        '`50 <= x <= 100`',
        '`x >= 50 || x <= 100`',
        '`x > 50 && x < 100`',
        '`x >= 50 && x <= 100`'
      ],
      answer: 3,
      why: 'A range needs two comparisons joined by `&&`. The mathematical form gives the wrong ' +
           'answer in C++ and does not compile in Java, and the `||` version is true for every ' +
           'number.'
    },
    {
      ask: 'What does this print when `age` is `20` and `average` is `45`?',
      code: {
        cpp: 'if (age >= 18 && average >= 50) {\n    cout << "Accepted" << endl;\n} else {\n    cout << "Rejected" << endl;\n}',
        java: 'if (age >= 18 && average >= 50) {\n    System.out.println("Accepted");\n} else {\n    System.out.println("Rejected");\n}'
      },
      options: ['`Accepted`', '`Rejected`', 'both lines', 'nothing'],
      answer: 1,
      why: '`&&` is true only when both sides are true. The age passes, the average does not, ' +
           'so the whole condition is false.'
    },
    {
      ask: 'Which condition means the same as `!(x > 10)`?',
      options: ['`x < 10`', '`x <= 10`', '`x != 10`', '`x > 10`'],
      answer: 1,
      why: '`!` reverses the condition. The opposite of *greater than 10* includes `10` itself.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: 'Validation and Program Exit',
  questions: [
    {
      ask: 'The grade is invalid and the error message has been printed. Which line stops the ' +
           'program right there?',
      options: {
        cpp: ['`break;`', '`return 0;`', '`return;`', '`stop;`'],
        java: ['`break;`', '`return 0;`', '`return;`', '`stop;`']
      },
      answer: { cpp: 1, java: 2 },
      why: {
        cpp: 'Inside `main`, `return 0;` ends the program at that point. `break` only leaves a ' +
             'loop or a `switch`.',
        java: '`main` returns nothing in Java, so a bare `return;` ends the program at that ' +
              'point. `break` only leaves a loop or a `switch`.'
      }
    },
    {
      ask: 'Where does the validation check belong?',
      options: [
        'Right after the value is read, before any calculation uses it.',
        'At the very end, after the results have been printed.',
        'Inside the same statement that prints the result.',
        'Before the value is read.'
      ],
      answer: 0,
      why: 'Validate first, calculate second. Checking afterwards means the program has already ' +
           'worked with a meaningless value.'
    },
    {
      ask: 'The exercise says: print `Invalid grade` and stop when the grade is negative. The ' +
           'input is `-5`. What should the program print?',
      options: [
        'the grade line only',
        '`Invalid grade`, then the grade line',
        'nothing',
        '`Invalid grade` and nothing else'
      ],
      answer: 3,
      why: 'An invalid input produces the error message and no partial results at all.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: 'Percentages, Discounts and Raises',
  questions: [
    {
      ask: '`amount` holds `200.0` and `rate` holds `10`. What does ' +
           '`amount - amount * rate / 100` give?',
      options: ['`190`', '`180`', '`20`', '`220`'],
      answer: 1,
      why: '`amount * rate / 100` is the discount, `20`. Subtracting it from `200` leaves `180` ' +
           '— the same as `amount * 0.90`.'
    },
    {
      ask: 'A salary is raised by 15%. Which expression is the new salary?',
      options: ['`salary * 0.15`', '`salary * 15 / 100`', '`salary + 15`', '`salary * 1.15`'],
      answer: 3,
      why: '`salary * 15 / 100` is the raise itself. The new salary is the old one plus the ' +
           'raise, which is the same as multiplying by `1.15`.'
    },
    {
      ask: '`total` is an `int` holding `45`. The expression `total / 100 * 10` prints `0`. Why?',
      options: [
        '`total / 100` is whole-number division, so it is `0` before the multiplication happens.',
        '`10` must be written `10.0` for a multiplication to work.',
        '`%` should have been used instead of `/`.',
        '`45` is too small for a percentage to be calculated.'
      ],
      answer: 0,
      why: 'Keep the amount in a `double`, or write the expression as `total * 10 / 100.0`, and ' +
           'the answer is `4.5`.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: 'Nested `if` / `else`',
  questions: [
    {
      ask: 'What is `rate` when `salary` is `4000` and `years` is `3`?',
      code: {
        cpp: 'if (salary < 5000) {\n    if (years >= 5) { rate = 15; }\n    else            { rate = 10; }\n} else {\n    if (years >= 5) { rate = 10; }\n    else            { rate = 5;  }\n}',
        java: 'if (salary < 5000) {\n    if (years >= 5) { rate = 15; }\n    else            { rate = 10; }\n} else {\n    if (years >= 5) { rate = 10; }\n    else            { rate = 5;  }\n}'
      },
      options: ['`15`', '`10`', '`5`', '`0`'],
      answer: 1,
      why: '`4000 < 5000` is true, so the outer `if` is taken. Inside it, `3 >= 5` is false, so ' +
           'the inner `else` sets `10`.'
    },
    {
      ask: 'An `else` with no braces to guide it belongs to which `if`?',
      options: [
        'The first `if` in the block.',
        'The outermost `if`.',
        'Whichever `if` sits at the same indentation.',
        'The nearest `if` above it that does not already have an `else`.'
      ],
      answer: 3,
      why: 'Indentation means nothing to the compiler. Braces are what remove the doubt.'
    },
    {
      ask: 'Two independent questions are asked about the same number: is it positive, and is ' +
           'it even. How should they be written?',
      options: [
        'As two separate `if` statements.',
        'As an `if` nested inside another `if`.',
        'As one `if` joined with `&&`.',
        'As a `switch`.'
      ],
      answer: 0,
      why: 'Nesting says the inner question only matters when the outer one succeeded. These ' +
           'two questions are independent, so both must be answered for every input.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: 'Simple `switch` / `case`',
  questions: [
    {
      ask: 'What may the value in `switch (...)` be?',
      options: {
        cpp: [
          'a `double`',
          'a `string`',
          'an `int` or a `char`',
          'any comparison, such as `x > 5`'
        ],
        java: [
          'a `double`',
          'an `int`, a `char` or a `String`',
          'any comparison, such as `x > 5`',
          'only a `boolean`'
        ]
      },
      answer: { cpp: 2, java: 1 },
      why: {
        cpp: 'C++ switches on whole numbers and characters. A `string` is not allowed — that is ' +
             'a Java-only extension — and a condition belongs in an `if`.',
        java: 'Java switches on whole numbers, characters and `String`. A condition belongs in ' +
              'an `if`, not in a `switch`.'
      }
    },
    {
      ask: 'Which `case` label is valid?',
      options: ['`case x > 5:`', '`case 1 to 5:`', '`case (n % 2 == 0):`', '`case 3:`'],
      answer: 3,
      why: 'A `case` label is a single constant value. Ranges and comparisons belong in an ' +
           '`if` / `else if` chain.'
    },
    {
      ask: 'When is a `switch` the better choice over a chain of `if` / `else if`?',
      options: [
        'When one value is compared for equality against several known constants.',
        'When several different variables have to be tested.',
        'When the tests are ranges, such as `grade >= 90`.',
        'When the condition combines `&&` and `||`.'
      ],
      answer: 0,
      why: 'That is exactly the shape `switch` replaces: `if (x == 1) ... else if (x == 2) ...`.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: '`break` in `switch` / `case`',
  questions: [
    {
      ask: 'What is printed when `n` is `1`?',
      code: {
        cpp: 'switch (n) {\n    case 1: cout << "One" << endl;\n    case 2: cout << "Two" << endl;\n    case 3: cout << "Three" << endl; break;\n}',
        java: 'switch (n) {\n    case 1: System.out.println("One");\n    case 2: System.out.println("Two");\n    case 3: System.out.println("Three"); break;\n}'
      },
      options: ['`One`', '`One` then `Two`', '`One`, `Two` and `Three`', 'nothing'],
      answer: 2,
      why: 'A `case` label is an entry point, not a boundary. Execution enters at `case 1:` and ' +
           'keeps running downward until it meets a `break` — the one on `case 3:`.'
    },
    {
      ask: 'What does `break` do inside a `switch`?',
      options: [
        'It skips ahead to the next `case` label.',
        'It jumps out of the whole `switch`, to the code after its closing brace.',
        'It ends the program.',
        'It repeats the current case.'
      ],
      answer: 1,
      why: 'That is what makes each case behave as a separate alternative. A forgotten `break` ' +
           'still compiles, and prints too much.'
    },
    {
      ask: 'What does this shape do?',
      code: {
        cpp: 'case 6:\ncase 7:\n    cout << "Weekend" << endl;\n    break;',
        java: 'case 6:\ncase 7:\n    System.out.println("Weekend");\n    break;'
      },
      options: [
        'It is a mistake — `case 6:` needs its own `break`.',
        'Only `7` prints `Weekend`.',
        '`6` and `7` share one body: the deliberate use of fall-through.',
        'It does not compile.'
      ],
      answer: 2,
      why: 'Two labels stacked with no code between them is the one useful fall-through: both ' +
           'values run the same body.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 2,
  objective: '`default` in `switch` / `case`',
  questions: [
    {
      ask: 'A `switch` lists `case 1:` and `case 2:` and has no `default`. The value is `9`. ' +
           'What happens?',
      options: [
        'The program stops with an error.',
        'The first case runs.',
        'The last case runs.',
        'Nothing is printed; execution continues after the `switch`.'
      ],
      answer: 3,
      why: 'An unmatched value simply falls out of the switch. That silence is exactly what ' +
           '`default` exists to prevent.'
    },
    {
      ask: 'What is `default` in a `switch`?',
      options: [
        'The branch that runs when no `case` matches — the `else` of a `switch`.',
        'The case that always runs first.',
        'A label that every `switch` is required to have.',
        'The value used when the variable is empty.'
      ],
      answer: 0,
      why: 'A switch with a `default` covers every possible input, which is what validation needs.'
    },
    {
      ask: 'Which statement about `default` is true?',
      options: [
        'It must be the first label in the switch.',
        'It never needs a `break`.',
        'It may appear anywhere, but the readable convention is last — and it still needs a ' +
          '`break` when it is not last.',
        'It is only allowed once there are at least three cases.'
      ],
      answer: 2,
      why: '`default` obeys the same fall-through rules as any other label.'
    }
  ]
});

/* ======================= Module 3 — Loops ======================= */

Quiz.addTopic('fundamentals', {
  module: 3,
  objective: '`do ... while` for Validation',
  questions: [
    {
      ask: 'How many times does the body of a `do ... while` run at the very least?',
      options: [
        'Zero times, when the condition is false.',
        'Once — the condition is tested only after the body has run.',
        'Twice.',
        'It cannot be known without seeing the condition.'
      ],
      answer: 1,
      why: 'The condition is written at the bottom, so the body always runs before it is ' +
           'tested. That is what makes the loop right for *ask, check, ask again*.'
    },
    {
      ask: 'A grade must end up between `0` and `100`. Which condition keeps the loop asking ' +
           'until the value is valid?',
      options: [
        '`while (grade >= 0 && grade <= 100);`',
        '`while (grade < 0 && grade > 100);`',
        '`while (grade != 0);`',
        '`while (grade < 0 || grade > 100);`'
      ],
      answer: 3,
      why: 'The condition says when to keep going, so it describes the *invalid* case. The ' +
           '`&&` version can never be true — no number is both below `0` and above `100`.'
    },
    {
      ask: 'Where must the input be read in a validation loop?',
      options: [
        'Inside the loop body, so a new value is tested on every pass.',
        'Before the loop, once.',
        'After the loop, when the value is known to be valid.',
        'Both before and inside the loop.'
      ],
      answer: 0,
      why: 'Read it before the loop only and the same value is tested forever — the loop never ' +
           'ends.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 3,
  objective: 'The `while` Loop',
  questions: [
    {
      ask: 'What happens when this runs with `n` set to `5`?',
      code: {
        cpp: 'int i = 1;\nwhile (i <= n) {\n    cout << i << endl;\n}',
        java: 'int i = 1;\nwhile (i <= n) {\n    System.out.println(i);\n}'
      },
      options: [
        'It prints `1` to `5`.',
        'It prints `1` once.',
        'It never ends — `i` is never changed.',
        'It prints nothing.'
      ],
      answer: 2,
      why: 'A loop needs a starting value, a condition and a change that moves towards ending ' +
           'it. The change is missing, so `i` stays `1` and the condition stays true.'
    },
    {
      ask: 'Which pair peels the digits off a positive number `n`?',
      options: [
        '`n / 10` gives the last digit, `n % 10` removes it.',
        '`n % 10` gives the last digit, `n / 10` removes it.',
        '`n % 2` gives the last digit, `n / 2` removes it.',
        '`n - 10` gives the last digit, `n + 10` removes it.'
      ],
      answer: 1,
      why: 'For `n = 253`: `253 % 10` is `3`, and `253 / 10` is `25`. Repeating that empties ' +
           'the number, which is why `while (n > 0)` is the natural condition.'
    },
    {
      ask: 'How many times does the body run?',
      code: {
        cpp: 'int i = 5;\nwhile (i < 5) {\n    cout << i << endl;\n    i++;\n}',
        java: 'int i = 5;\nwhile (i < 5) {\n    System.out.println(i);\n    i++;\n}'
      },
      options: ['Zero — `while` tests before the first pass.', 'Once.', 'Five times.', 'It never ends.'],
      answer: 0,
      why: 'A `while` may run zero times. A `do ... while` is the one that always runs at least ' +
           'once.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 3,
  objective: 'The `for` Loop',
  questions: [
    {
      ask: 'With `n` set to `5`, how many passes does `for (int i = 0; i < n; i++)` make, and ' +
           'what values does `i` take?',
      options: [
        '5 passes; `i` is 1, 2, 3, 4, 5.',
        '6 passes; `i` is 0 to 5.',
        '5 passes; `i` is 0, 1, 2, 3, 4.',
        '4 passes; `i` is 1 to 4.'
      ],
      answer: 2,
      why: 'The counter starts at `0` and the condition stops it before `n`, so the body runs ' +
           'exactly `n` times.'
    },
    {
      ask: 'A loop reads `n` numbers and keeps a running total. Where is the total declared?',
      options: [
        'Before the loop.',
        'Inside the loop body.',
        'In the `for` header, beside the counter.',
        'After the loop.'
      ],
      answer: 0,
      why: 'Declared inside, it would be created fresh and reset to `0` on every pass, and the ' +
           'total would only ever hold the last value.'
    },
    {
      ask: 'When is the average of the values calculated?',
      options: [
        'Inside the loop, on every pass.',
        'Once, after the loop, from the total and the count.',
        'Before the loop.',
        'It cannot be calculated from a running total.'
      ],
      answer: 1,
      why: 'The total is only complete once the loop has ended — and the division needs a ' +
           'decimal on one side to keep the fraction.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 3,
  objective: 'Number Algorithms with `for`',
  questions: [
    {
      ask: 'A loop multiplies the numbers `1` to `n` together. What must the running product ' +
           'start at?',
      options: ['`0`', '`1`', '`n`', '`-1`'],
      answer: 1,
      why: 'Starting at `0` makes every product `0`. A running *total*, by contrast, starts ' +
           'at `0`.'
    },
    {
      ask: 'How does the program test whether `i` divides `n` exactly?',
      options: ['`n / i == 0`', '`n % i == 1`', '`i % n == 0`', '`n % i == 0`'],
      answer: 3,
      why: 'A remainder of zero is what *divides exactly* means. `n / i` is the quotient, not ' +
           'the remainder.'
    },
    {
      ask: 'A flag variable records that the loop found a divisor. When is the flag checked?',
      options: [
        'After the loop has ended.',
        'Before the loop starts.',
        'On every pass, inside the loop.',
        'It is never checked — the loop prints directly.'
      ],
      answer: 0,
      why: 'The loop has to finish before the answer is known: only then is it certain that ' +
           'no divisor exists.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 3,
  objective: 'Nested `for` Loops',
  questions: [
    {
      ask: 'The outer loop runs 3 times, and the inner loop runs 4 times on each pass. How many ' +
           'times does the inner body run in total?',
      options: ['`7`', '`4`', '`12`', '`3`'],
      answer: 2,
      why: 'The inner loop runs completely for every single pass of the outer loop: 3 × 4.'
    },
    {
      ask: 'Each student has their own total. Where is that total set back to `0`?',
      options: [
        'Before the outer loop, once.',
        'At the top of the outer loop body, once per student.',
        'Inside the inner loop, once per grade.',
        'After both loops have finished.'
      ],
      answer: 1,
      why: 'Anything accumulated per entity is reset at the top of the outer body; anything ' +
           'accumulated across all entities is declared before the outer loop.'
    },
    {
      ask: 'The inner loop reuses the outer loop\'s counter instead of having its own. What ' +
           'goes wrong?',
      options: [
        'The inner loop leaves the counter at its end value, so the outer loop stops after one pass.',
        'Nothing — each loop keeps its own copy.',
        'The rows are printed in reverse order.',
        'The inner loop runs only once.'
      ],
      answer: 0,
      why: 'The outer loop is counting with the same variable the inner loop just ran to its ' +
           'limit, so its own condition is already finished. Each loop needs its own counter.'
    }
  ]
});

/* ======================= Module 4 — Arrays ======================= */

Quiz.addTopic('fundamentals', {
  module: 4,
  objective: 'Array Initialisation',
  questions: [
    {
      ask: 'An array is created with room for 5 values. Which positions may be used?',
      options: ['`1` to `5`', '`0` to `5`', '`1` to `4`', '`0` to `4`'],
      answer: 3,
      why: 'Numbering starts at `0`, so an array of size `n` has positions `0` to `n - 1`. ' +
           'There is no position `n`.'
    },
    {
      ask: 'What is `numbers[2]`?',
      code: {
        cpp: 'int numbers[5] = {4, 8, 15, 16, 23};',
        java: 'int[] numbers = {4, 8, 15, 16, 23};'
      },
      options: ['`8`', '`15`', '`16`', '`2`'],
      answer: 1,
      why: 'Position `0` holds `4`, position `1` holds `8`, position `2` holds `15`. The list ' +
           'in braces sets both the contents and the size.'
    },
    {
      ask: 'How does the program find how many elements the array holds?',
      options: {
        cpp: [
          '`numbers.length`',
          '`numbers.size()`',
          '`sizeof(numbers) / sizeof(numbers[0])`',
          '`count(numbers)`'
        ],
        java: [
          '`numbers.length`',
          '`numbers.length()`',
          '`sizeof(numbers) / sizeof(numbers[0])`',
          '`numbers.size()`'
        ]
      },
      answer: { cpp: 2, java: 0 },
      why: {
        cpp: 'C++ divides the total size of the array by the size of one element. `.length` is ' +
             'Java\'s way, not C++\'s.',
        java: '`length` is a field on the array, so it takes no parentheses — unlike ' +
              '`length()` on a `String`.'
      }
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 4,
  objective: 'Filling an Array with a `for` Loop',
  questions: [
    {
      ask: 'The number of values, `n`, is typed by the user. What is the order of steps?',
      options: [
        'Create the array, then read `n`, then fill it.',
        'Read `n`, create the array, then fill it in a loop.',
        'Fill the array, then read `n`.',
        'Read `n` and all the values in one statement.'
      ],
      answer: 1,
      why: 'The size has to be known before there is anywhere to put the values.'
    },
    {
      ask: 'Which loop fills the first `n` positions correctly?',
      options: {
        cpp: [
          '`for (int i = 0; i <= n; i++) cin >> a[i];`',
          '`for (int i = 1; i <= n; i++) cin >> a[i];`',
          '`for (int i = 0; i < n; i++) cin >> a[i];`',
          '`for (int i = 0; i < n; i++) cin >> a[i + 1];`'
        ],
        java: [
          '`for (int i = 0; i <= n; i++) a[i] = sc.nextInt();`',
          '`for (int i = 1; i <= n; i++) a[i] = sc.nextInt();`',
          '`for (int i = 0; i < n; i++) a[i] = sc.nextInt();`',
          '`for (int i = 0; i < n; i++) a[i + 1] = sc.nextInt();`'
        ]
      },
      answer: 2,
      why: 'The counter and the position are the same number, running `0` to `n - 1`. Both ' +
           '`i <= n` and `a[i + 1]` step one past the end, and starting at `1` leaves position ' +
           '`0` empty.'
    },
    {
      ask: 'The size comes from the input. How is the array created?',
      options: {
        cpp: [
          'Declare it with a constant maximum, such as `int a[100];`, and use only the first `n` positions.',
          'Read `n` first, then write `int a[n];` — the portable way to size it from the input.',
          'Write `int a[];` and let the array grow as values arrive.',
          'The array must be written out value by value in braces.'
        ],
        java: [
          'Declare it with a constant maximum, such as `int[] a = new int[100];`, and use only the first `n`.',
          'Read `n` first, then write `int[] a = new int[n];`.',
          'Write `int[] a;` alone — Java grows it as values arrive.',
          'The array must be written out value by value in braces.'
        ]
      },
      answer: { cpp: 0, java: 1 },
      why: {
        cpp: 'C++ needs a fixed maximum size at compile time unless a vector is used, so the ' +
             'array is declared large enough and only part of it is filled.',
        java: 'Java creates the array at run time with `new`, so the size may come straight ' +
              'from the input.'
      }
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 4,
  objective: 'Displaying an Array with a `for` Loop',
  questions: [
    {
      ask: 'The user should see the positions numbered from 1. What does the loop print?',
      options: [
        '`i` as the position, with `a[i]` as the value.',
        '`i + 1` as the position, with `a[i + 1]` as the value.',
        '`i + 1` as the position, with `a[i]` as the value.',
        '`i` as the position, with `a[i + 1]` as the value.'
      ],
      answer: 2,
      why: 'The array position still starts at `0`; only the number shown to the user is ' +
           'shifted by one.'
    },
    {
      ask: 'The array holds `{10, 20, 30}`. What is the first line printed?',
      code: {
        cpp: 'for (int i = 0; i < n; i++) {\n    cout << i + 1 << ": " << a[i] << endl;\n}',
        java: 'for (int i = 0; i < n; i++) {\n    System.out.println((i + 1) + ": " + a[i]);\n}'
      },
      options: ['`0: 10`', '`1: 20`', '`10: 1`', '`1: 10`'],
      answer: 3,
      why: 'On the first pass `i` is `0`, so the printed position is `1` and the value read is ' +
           '`a[0]`, which is `10`.'
    },
    {
      ask: 'The array holds `n` values and there is one print statement inside the loop. How ' +
           'many lines appear?',
      options: [
        '`n` lines, one per element.',
        'One line holding all the values.',
        '`n + 1` lines.',
        'It depends on the values.'
      ],
      answer: 0,
      why: 'One print statement inside the loop produces one line per element — and any ' +
           'formatting set before the loop applies to all of them.'
    }
  ]
});

Quiz.addTopic('fundamentals', {
  module: 4,
  objective: 'Array Analysis',
  questions: [
    {
      ask: 'A loop searches for the largest value in the array. What should the maximum start at?',
      options: [
        '`0`',
        '`a[0]`, with the loop starting at `i = 1`.',
        '`n`',
        'the last element, with the loop running backwards'
      ],
      answer: 1,
      why: 'Start from a real element and replace it whenever a bigger one appears. Then the ' +
           'answer is always a value that is actually in the array.'
    },
    {
      ask: 'Why is starting the maximum at `0` a bug?',
      options: [
        'Because `0` might also be one of the values.',
        'Because the loop then has to start at `i = 1`.',
        'When every value is negative, the answer stays `0` — a value the array never held.',
        'It is not a bug; `0` is always safe.'
      ],
      answer: 2,
      why: 'Temperatures, balances and differences can all be entirely negative, and then no ' +
           'element is ever bigger than the starting `0`.'
    },
    {
      ask: 'A report needs the total, the number of passing grades and the highest grade. How ' +
           'many loops does that take?',
      options: [
        'Three, one per question.',
        'Two: one for the total, one for the rest.',
        'One — a single pass can answer all three.',
        'None; each answer needs its own array.'
      ],
      answer: 2,
      why: 'Counting, totalling and searching are the same loop with different bodies, so they ' +
           'can share one pass over the array.'
    }
  ]
});
