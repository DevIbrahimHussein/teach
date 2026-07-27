/* Programming Fundamentals — Module 2: Conditions */

Curriculum.addModule('fundamentals', {
  number: 2,
  title: 'Conditions',
  summary: 'Making decisions with if, if/else, logical operators, validation, nesting and switch/case.',
  objectives: [

    /* ================= Objective 1 — if ================= */
    {
      title: 'The `if` Statement',
      summary:
        '`if` runs a block of code only when its condition is true. When the condition is false the ' +
        'block is skipped and the program simply carries on — nothing at all is printed.',
      points: [
        'The condition goes in parentheses, the body goes in braces.',
        'Comparison operators: `>`, `<`, `>=`, `<=`, `==`, `!=`.',
        '`=` assigns a value, `==` compares two values. Mixing them up is the most common beginner bug.',
        'With a plain `if` and no `else`, a false condition produces no output whatsoever.',
        'Do not put a semicolon straight after `if (...)` — it ends the statement and the body runs every time.'
      ],
      example: {
        cpp:
          'if (grade >= 50) {\n' +
          '    cout << "Pass" << endl;\n' +
          '}\n' +
          '// nothing is printed when grade is below 50',
        java:
          'if (grade >= 50) {\n' +
          '    System.out.println("Pass");\n' +
          '}\n' +
          '// nothing is printed when grade is below 50'
      },
      exercises: [
        {
          title: 'Passing Grade Notice',
          difficulty: 'Easy',
          description:
            'Read one grade. If the student passed, print a notice. If the student did not pass, the ' +
            'program prints nothing at all and simply ends.',
          input: 'One whole number: the grade.',
          output:
            'If the grade is 50 or more, one line:\n' +
            'Pass\n\n' +
            'Otherwise the program prints nothing.',
          samples: [
            { input: '73', output: 'Pass' },
            { input: '50', output: 'Pass' },
            { input: '41', output: '' }
          ],
          hint:
            'Sample 3 has an empty Output column on purpose — an `if` with a false condition is allowed ' +
            'to print nothing.',
          cpp: {
            notes: [
              'The condition is `grade >= 50`.',
              '`>=` is written as two characters with no space between them.',
              'Print with `cout << "Pass" << endl;` inside the braces.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The condition is `grade >= 50`.',
              '`>=` is written as two characters with no space between them.',
              'Print with `System.out.println("Pass");` inside the braces.'
            ]
          }
        },
        {
          title: 'Positive Number Notice',
          difficulty: 'Easy',
          description:
            'Read one integer and report it only if it is positive. Zero is not positive, so it produces ' +
            'no output.',
          input: 'One whole number, which may be negative.',
          output:
            'If the number is greater than 0, one line:\n' +
            'Positive\n\n' +
            'Otherwise the program prints nothing.',
          samples: [
            { input: '12', output: 'Positive' },
            { input: '0',  output: '' },
            { input: '-3', output: '' }
          ],
          hint:
            'Be careful which comparison you choose: `>= 0` would wrongly accept zero.',
          cpp: {
            notes: [
              'The condition is `number > 0`, not `number >= 0`.',
              'A negative value is read by `cin >> number;` with no extra work.',
              'The body of the `if` is a single `cout` line.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The condition is `number > 0`, not `number >= 0`.',
              'A negative value is read by `sc.nextInt()` with no extra work.',
              'The body of the `if` is a single `System.out.println` line.'
            ]
          }
        },
        {
          title: 'High Salary Notice',
          difficulty: 'Easy',
          description:
            'A report flags employees whose salary is strictly above a threshold. Read the salary and ' +
            'the threshold, and print a notice only when the salary is above it. A salary exactly equal ' +
            'to the threshold is not flagged.',
          input:
            'Two decimal numbers, separated by a space or a new line:\n' +
            '1. the salary\n' +
            '2. the threshold',
          output:
            'If the salary is strictly greater than the threshold, one line:\n' +
            'Above threshold\n\n' +
            'Otherwise the program prints nothing.',
          samples: [
            { input: '7250.5 5000', output: 'Above threshold' },
            { input: '5000 5000',   output: '' },
            { input: '4999.99 5000', output: '' }
          ],
          hint:
            'Samples 2 and 3 exist to check the boundary. The comparison you need excludes the equal case.',
          cpp: {
            notes: [
              'Both variables are `double`; the comparison operators work on `double` the same way.',
              'The condition is `salary > threshold`.',
              'No output formatting is needed — the program prints fixed text, not a number.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read both with `sc.nextDouble()`.',
              'The condition is `salary > threshold`.',
              'No output formatting is needed — the program prints fixed text, not a number.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 2 — if / else ================= */
    {
      title: '`if` / `else`',
      summary:
        '`else` supplies the alternative. Exactly one of the two blocks always runs, so the program ' +
        'always produces output — there is no silent third path.',
      points: [
        '`else` has no condition of its own; it catches everything the `if` did not.',
        'Every input follows exactly one of the two branches, never both.',
        'The two branches are alternatives, so a value handled by one is never re-tested by the other.',
        'Braces keep the branches readable even when a branch holds a single statement.'
      ],
      example: {
        cpp:
          'if (n % 2 == 0) {\n' +
          '    cout << "Even" << endl;\n' +
          '} else {\n' +
          '    cout << "Odd" << endl;\n' +
          '}',
        java:
          'if (n % 2 == 0) {\n' +
          '    System.out.println("Even");\n' +
          '} else {\n' +
          '    System.out.println("Odd");\n' +
          '}'
      },
      exercises: [
        {
          title: 'Even or Odd',
          difficulty: 'Easy',
          description:
            'Read one integer and report whether it is even or odd. The program always prints exactly ' +
            'one line.',
          input: 'One whole number, which may be negative.',
          output:
            'One line, either:\n' +
            'Even\n' +
            'or:\n' +
            'Odd',
          samples: [
            { input: '8',  output: 'Even' },
            { input: '7',  output: 'Odd' },
            { input: '-4', output: 'Even' }
          ],
          hint:
            'For a negative number the remainder can itself be negative, so test for even rather than ' +
            'for odd and let `else` handle the rest.',
          cpp: {
            notes: [
              'The condition is `n % 2 == 0`.',
              'In C++, `-7 % 2` is `-1`, so a test written as `n % 2 == 1` would fail for negative odd numbers.',
              'Two equals signs compare; one equals sign assigns.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The condition is `n % 2 == 0`.',
              'In Java, `-7 % 2` is `-1`, so a test written as `n % 2 == 1` would fail for negative odd numbers.',
              'Two equals signs compare; one equals sign assigns.'
            ]
          }
        },
        {
          title: 'Passed or Failed',
          difficulty: 'Easy',
          description:
            'Read one grade and print the student\'s result. Unlike the earlier `if`-only exercise, a ' +
            'failing grade must now produce its own message.',
          input: 'One whole number: the grade.',
          output:
            'One line, either:\n' +
            'Passed\n' +
            'or:\n' +
            'Failed',
          samples: [
            { input: '73', output: 'Passed' },
            { input: '50', output: 'Passed' },
            { input: '49', output: 'Failed' }
          ],
          hint:
            'Compare this with Objective 1, Exercise 1. Only the `else` branch is new.',
          cpp: {
            notes: [
              'The condition is `grade >= 50`.',
              'Put the failing message in the `else` branch, not in a second `if`.',
              'The `else` keyword goes after the closing brace of the `if` body.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The condition is `grade >= 50`.',
              'Put the failing message in the `else` branch, not in a second `if`.',
              'The `else` keyword goes after the closing brace of the `if` body.'
            ]
          }
        },
        {
          title: 'Age Eligibility',
          difficulty: 'Easy',
          description:
            'A service is available only to people aged 18 or over. Read an age and print whether the ' +
            'person is eligible.',
          input: 'One whole number: the age in years.',
          output:
            'One line, either:\n' +
            'Eligible\n' +
            'or:\n' +
            'Not eligible',
          samples: [
            { input: '25', output: 'Eligible' },
            { input: '18', output: 'Eligible' },
            { input: '17', output: 'Not eligible' }
          ],
          hint:
            'Get the boundary right first: sample 2 fails if you use `>` instead of `>=`.',
          cpp: {
            notes: [
              'The condition is `age >= 18`.',
              'The two messages differ in spelling and capitalisation — copy them exactly.',
              'One `cout` per branch is enough.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The condition is `age >= 18`.',
              'The two messages differ in spelling and capitalisation — copy them exactly.',
              'One `System.out.println` per branch is enough.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 3 — Logical Operations ================= */
    {
      title: 'Logical Operations in Conditions',
      summary:
        'A single `if` can test more than one thing at a time. `&&` requires both sides to be true, ' +
        '`||` requires at least one, and `!` reverses a condition.',
      points: [
        '`a && b` is true only when `a` and `b` are both true.',
        '`a || b` is true when at least one of them is true.',
        '`!a` is true exactly when `a` is false.',
        'A range test needs two comparisons joined by `&&`: `x >= 50 && x <= 100`.',
        'Mathematical notation like `50 <= x <= 100` compiles in C++ but gives the wrong answer, and does not compile in Java. Never use it.',
        '`&&` binds tighter than `||`, so use parentheses when you mix them.'
      ],
      example: {
        cpp:
          'if (average >= 50 && average <= 100) {\n' +
          '    cout << "In range" << endl;\n' +
          '} else {\n' +
          '    cout << "Out of range" << endl;\n' +
          '}',
        java:
          'if (average >= 50 && average <= 100) {\n' +
          '    System.out.println("In range");\n' +
          '} else {\n' +
          '    System.out.println("Out of range");\n' +
          '}'
      },
      exercises: [
        {
          title: 'Passing Range Check',
          difficulty: 'Easy',
          description:
            'A grade average counts as passing only when it falls between 50 and 100 inclusive. Read an ' +
            'average and report whether it is inside that range. Values below 50 and above 100 are both ' +
            'outside it.',
          input: 'One decimal number: the average.',
          output:
            'One line, either:\n' +
            'In range\n' +
            'or:\n' +
            'Out of range',
          samples: [
            { input: '76.5', output: 'In range' },
            { input: '50',   output: 'In range' },
            { input: '104',  output: 'Out of range' },
            { input: '-2',   output: 'Out of range' }
          ],
          hint:
            'Two comparisons are needed, one for each end of the range, joined by `&&`.',
          cpp: {
            notes: [
              'Store the average as a `double`.',
              'Write the range as `average >= 50 && average <= 100`.',
              '`50 <= average <= 100` compiles in C++ but is always true — the first comparison produces `0` or `1`, which is then compared with 100.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read the average with `sc.nextDouble()`.',
              'Write the range as `average >= 50 && average <= 100`.',
              '`50 <= average <= 100` does not compile in Java, because the second `<=` receives a `boolean`.'
            ]
          }
        },
        {
          title: 'Registration Age Range',
          difficulty: 'Easy',
          description:
            'Registration is open only to applicants aged 18 to 25 inclusive. Read an age and decide ' +
            'whether the application is accepted.',
          input: 'One whole number: the applicant\'s age.',
          output:
            'One line, either:\n' +
            'Accepted\n' +
            'or:\n' +
            'Rejected',
          samples: [
            { input: '20', output: 'Accepted' },
            { input: '18', output: 'Accepted' },
            { input: '25', output: 'Accepted' },
            { input: '26', output: 'Rejected' }
          ],
          hint:
            'The rejecting condition `age < 18 || age > 25` is the exact opposite of the accepting one. ' +
            'Try writing it both ways and confirm they agree on all four samples.',
          cpp: {
            notes: [
              'Accepting form: `age >= 18 && age <= 25`.',
              'Rejecting form: `age < 18 || age > 25`.',
              '`!(age >= 18 && age <= 25)` is a third correct way to write the rejecting form.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Accepting form: `age >= 18 && age <= 25`.',
              'Rejecting form: `age < 18 || age > 25`.',
              '`!(age >= 18 && age <= 25)` is a third correct way to write the rejecting form.'
            ]
          }
        },
        {
          title: 'Qualified Student',
          difficulty: 'Medium',
          description:
            'A student qualifies for a certificate only if the average is at least 60 **and** attendance ' +
            'is at least 75 percent. Failing either requirement disqualifies the student.',
          input:
            'Two values, separated by a space or a new line:\n' +
            '1. the average (a decimal number)\n' +
            '2. the attendance percentage (a whole number)',
          output:
            'One line, either:\n' +
            'Qualified\n' +
            'or:\n' +
            'Not qualified',
          samples: [
            { input: '82.5 90', output: 'Qualified' },
            { input: '60 75',   output: 'Qualified' },
            { input: '95 60',   output: 'Not qualified' },
            { input: '48 100',  output: 'Not qualified' }
          ],
          hint:
            'Samples 3 and 4 each fail on a different requirement. A correct solution rejects both.',
          cpp: {
            notes: [
              'The average is a `double` and the attendance is an `int` — mixing types in one condition is fine.',
              'The condition is `average >= 60 && attendance >= 75`.',
              'A single `if` / `else` handles both outcomes.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read with `sc.nextDouble()` then `sc.nextInt()`, in that order.',
              'The condition is `average >= 60 && attendance >= 75`.',
              'A single `if` / `else` handles both outcomes.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 4 — Validation and Exit ================= */
    {
      title: 'Validation and Program Exit',
      summary:
        'Check the input before you use it. When it is invalid, print one clear message and stop the ' +
        'program immediately, instead of continuing with a meaningless value.',
      points: [
        'Validate first, calculate second. The check comes right after reading the value.',
        'An invalid input produces the error message and nothing else — no partial results.',
        'C++: `return 0;` inside `main` ends the program at that point.',
        'Java: `return;` inside `main` ends the program at that point.',
        'The error message text is part of the expected output, so copy it exactly.'
      ],
      example: {
        cpp:
          'if (grade < 0) {\n' +
          '    cout << "Invalid grade" << endl;\n' +
          '    return 0;              // stop here\n' +
          '}\n' +
          'cout << "Grade: " << grade << endl;',
        java:
          'if (grade < 0) {\n' +
          '    System.out.println("Invalid grade");\n' +
          '    return;                // stop here\n' +
          '}\n' +
          'System.out.println("Grade: " + grade);'
      },
      exercises: [
        {
          title: 'Reject a Negative Grade',
          difficulty: 'Easy',
          description:
            'Read a grade. A negative grade is impossible, so reject it with a message and stop. ' +
            'Otherwise print the grade.',
          input: 'One whole number: the grade.',
          output:
            'If the grade is negative, one line:\n' +
            'Invalid grade\n\n' +
            'Otherwise, one line:\n' +
            'Grade: <grade>',
          samples: [
            { input: '88', output: 'Grade: 88' },
            { input: '0',  output: 'Grade: 0' },
            { input: '-5', output: 'Invalid grade' }
          ],
          hint:
            'If your program prints both lines for `-5`, the `return` after the error message is missing.',
          cpp: {
            notes: [
              'The invalid condition is `grade < 0`.',
              'End the program with `return 0;` immediately after printing the error message.',
              'An `else` around the normal case also works, but stopping early keeps the code flatter.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The invalid condition is `grade < 0`.',
              'End the program with a plain `return;` — `main` returns `void`, so it takes no value.',
              '`System.exit(0);` also stops the program and is worth knowing, but `return;` is enough here.'
            ]
          }
        },
        {
          title: 'Reject an Age Out of Range',
          difficulty: 'Easy',
          description:
            'Read an age and accept it only when it falls between 1 and 120 inclusive. Anything else is ' +
            'rejected and the program stops.',
          input: 'One whole number: the age.',
          output:
            'If the age is outside 1 to 120, one line:\n' +
            'Invalid age\n\n' +
            'Otherwise, one line:\n' +
            'Age: <age>',
          samples: [
            { input: '30',  output: 'Age: 30' },
            { input: '120', output: 'Age: 120' },
            { input: '0',   output: 'Invalid age' },
            { input: '150', output: 'Invalid age' }
          ],
          hint:
            'The invalid case has two separate causes, so the condition needs `||` — or write the valid ' +
            'range with `&&` and put the error in the `else`.',
          cpp: {
            notes: [
              'Invalid condition: `age < 1 || age > 120`.',
              'Print the message, then `return 0;` before anything else runs.',
              'Test both ends of the range before you consider the exercise finished.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Invalid condition: `age < 1 || age > 120`.',
              'Print the message, then `return;` before anything else runs.',
              'Test both ends of the range before you consider the exercise finished.'
            ]
          }
        },
        {
          title: 'Reject a Non-positive Salary',
          difficulty: 'Easy',
          description:
            'Read a salary. A salary of zero or less is meaningless, so reject it and stop. Otherwise ' +
            'print the salary formatted to two decimal places.',
          input: 'One decimal number: the salary.',
          output:
            'If the salary is 0 or less, one line:\n' +
            'Invalid salary\n\n' +
            'Otherwise, one line:\n' +
            'Salary: <salary>\n\n' +
            'The salary is printed with exactly two digits after the decimal point.',
          samples: [
            { input: '4500.5', output: 'Salary: 4500.50' },
            { input: '0',      output: 'Invalid salary' },
            { input: '-120',   output: 'Invalid salary' }
          ],
          hint:
            'Sample 2 is the one that catches the wrong comparison operator.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Invalid condition: `salary <= 0`.',
              'Apply `fixed` and `setprecision(2)` only in the valid branch — the error message has no number in it.',
              'Print the message, then `return 0;`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Invalid condition: `salary <= 0`.',
              'Print the valid case with `System.out.printf("Salary: %.2f%n", salary);`',
              'Print the message, then `return;`.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 5 — Percentages, Discounts, Raises ================= */
    {
      title: 'Percentages, Discounts and Raises',
      summary:
        'A percentage is a fraction of an amount: `amount * percent / 100`. Conditions decide which ' +
        'percentage applies, and the arithmetic then follows the rules you already know.',
      points: [
        '10% of an amount is `amount * 10 / 100`, which is the same as `amount * 0.10`.',
        'To subtract a 10% discount you can either subtract the discount, or multiply by `0.90`.',
        'To add a 15% raise you can either add the raise, or multiply by `1.15`.',
        'Keep the amounts in `double` — `/ 100` on whole numbers throws the fraction away.',
        'Decide the percentage in the condition, then do the arithmetic once, after the `if`.'
      ],
      example: {
        cpp:
          'double rate = 0;\n' +
          'if (amount >= 500) {\n' +
          '    rate = 10;                       // percent\n' +
          '}\n' +
          'double final_price = amount - amount * rate / 100;',
        java:
          'double rate = 0;\n' +
          'if (amount >= 500) {\n' +
          '    rate = 10;                       // percent\n' +
          '}\n' +
          'double finalPrice = amount - amount * rate / 100;'
      },
      exercises: [
        {
          title: 'Threshold Discount',
          difficulty: 'Easy',
          description:
            'A shop gives a 10 percent discount on any purchase of 500 or more. Read the purchase ' +
            'amount and print what the customer actually pays.',
          input: 'One decimal number: the purchase amount.',
          output:
            'One line:\n' +
            'Final: <amount>\n\n' +
            'Printed with exactly two digits after the decimal point.',
          samples: [
            { input: '600',    output: 'Final: 540.00' },
            { input: '500',    output: 'Final: 450.00' },
            { input: '499.99', output: 'Final: 499.99' }
          ],
          hint:
            'Sample 3 checks that no discount leaks into amounts just under the threshold.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'The condition is `amount >= 500`.',
              'Discounted price: `amount - amount * 10 / 100`, or simply `amount * 0.9`.',
              'Print with `fixed` and `setprecision(2)`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The condition is `amount >= 500`.',
              'Discounted price: `amount - amount * 10 / 100`, or simply `amount * 0.9`.',
              'Print with `System.out.printf("Final: %.2f%n", finalAmount);`'
            ]
          }
        },
        {
          title: 'Salary Raise by Category',
          difficulty: 'Medium',
          description:
            'Every employee belongs to a category that determines the size of their annual raise: ' +
            'category `A` gets 15 percent, category `B` gets 10 percent, and any other category gets ' +
            '5 percent. Read a salary and a category letter, then print the new salary.',
          input:
            'Two values, separated by a space or a new line:\n' +
            '1. the current salary (a decimal number)\n' +
            '2. the category (a single uppercase letter)',
          output:
            'One line:\n' +
            'New salary: <salary>\n\n' +
            'Printed with exactly two digits after the decimal point.',
          samples: [
            { input: '5000 A', output: 'New salary: 5750.00' },
            { input: '5000 B', output: 'New salary: 5500.00' },
            { input: '4000 C', output: 'New salary: 4200.00' },
            { input: '4000 Z', output: 'New salary: 4200.00' }
          ],
          hint:
            'Pick the percentage in the conditions, store it in a variable, and do the arithmetic once ' +
            'afterwards. That way the formula appears in your program only a single time.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Compare a `char` against a letter with single quotes: `category == \'A\'`.',
              'Double quotes make a string, so `category == "A"` does not compile for a `char`.',
              'New salary: `salary + salary * rate / 100`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read the letter with `char category = sc.next().charAt(0);`',
              'Compare a `char` against a letter with single quotes: `category == \'A\'`.',
              'New salary: `salary + salary * rate / 100`.'
            ]
          }
        },
        {
          title: 'Tiered Purchase Discount',
          difficulty: 'Medium',
          description:
            'The discount grows with the size of the purchase: under 200 there is no discount, from 200 ' +
            'up to 499.99 it is 5 percent, from 500 up to 999.99 it is 10 percent, and from 1000 upward ' +
            'it is 15 percent. Read the purchase amount and print the final price.',
          input: 'One decimal number: the purchase amount.',
          output:
            'One line:\n' +
            'Final: <amount>\n\n' +
            'Printed with exactly two digits after the decimal point.',
          samples: [
            { input: '150',  output: 'Final: 150.00' },
            { input: '300',  output: 'Final: 285.00' },
            { input: '500',  output: 'Final: 450.00' },
            { input: '1200', output: 'Final: 1020.00' }
          ],
          hint:
            'An `if` / `else if` chain tested from the largest tier downward needs only one comparison ' +
            'per branch, because reaching a branch already proves the larger ones were false.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Store the chosen percentage in a `double rate`, then apply it once after the chain.',
              'Testing from the top down — `>= 1000`, then `>= 500`, then `>= 200` — avoids writing ranges.',
              'Print with `fixed` and `setprecision(2)`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Store the chosen percentage in a `double rate`, then apply it once after the chain.',
              'Testing from the top down — `>= 1000`, then `>= 500`, then `>= 200` — avoids writing ranges.',
              'Print with `System.out.printf("Final: %.2f%n", finalAmount);`'
            ]
          }
        }
      ]
    },

    /* ================= Objective 6 — Nested if / else ================= */
    {
      title: 'Nested `if` / `else`',
      summary:
        'An `if` may contain another `if`. The inner test runs only when the outer one already ' +
        'succeeded, which lets you narrow a decision down in stages.',
      points: [
        'The inner condition can rely on everything the outer condition established.',
        'Indentation shows the nesting — each level moves one step to the right.',
        'A long `if` / `else if` chain is a flat alternative to nesting, and is often clearer.',
        'An `else` always belongs to the nearest unmatched `if` above it. Braces remove the doubt.',
        'Independent questions about the same value should be separate `if` statements, not nested ones.'
      ],
      example: {
        cpp:
          'if (salary < 5000) {\n' +
          '    if (years >= 5) { rate = 15; }\n' +
          '    else            { rate = 10; }\n' +
          '} else {\n' +
          '    if (years >= 5) { rate = 10; }\n' +
          '    else            { rate = 5;  }\n' +
          '}',
        java:
          'if (salary < 5000) {\n' +
          '    if (years >= 5) { rate = 15; }\n' +
          '    else            { rate = 10; }\n' +
          '} else {\n' +
          '    if (years >= 5) { rate = 10; }\n' +
          '    else            { rate = 5;  }\n' +
          '}'
      },
      exercises: [
        {
          title: 'Numeric Grade to Letter Grade',
          difficulty: 'Medium',
          description:
            'Convert a numeric grade into a letter grade: 90 and above is `A`, 80 to 89 is `B`, 70 to 79 ' +
            'is `C`, 60 to 69 is `D`, and anything below 60 is `F`.',
          input: 'One whole number: the grade.',
          output:
            'One line containing the letter only:\n' +
            '<letter>',
          samples: [
            { input: '95', output: 'A' },
            { input: '83', output: 'B' },
            { input: '60', output: 'D' },
            { input: '41', output: 'F' }
          ],
          hint:
            'Test from the highest band downward. Once `>= 90` has failed, a branch reached later already ' +
            'knows the grade is below 90, so it needs only one comparison.',
          cpp: {
            notes: [
              'An `if` / `else if` / `else` chain of five branches is enough.',
              'Print a letter as a string, `cout << "A"`, or as a `char`, `cout << \'A\'` — both are fine.',
              'Testing bottom-up instead would require writing both ends of every range.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'An `if` / `else if` / `else` chain of five branches is enough.',
              'Print with `System.out.println("A");`',
              'Testing bottom-up instead would require writing both ends of every range.'
            ]
          }
        },
        {
          title: 'Employee Bonus Percentage',
          difficulty: 'Medium',
          description:
            'The bonus percentage depends on two things at once. Employees earning less than 5000 receive ' +
            '15 percent when they have 5 or more years of service and 10 percent otherwise. Employees ' +
            'earning 5000 or more receive 10 percent with 5 or more years of service and 5 percent ' +
            'otherwise. Read the salary and the years of service and print the bonus percentage.',
          input:
            'Two values, separated by a space or a new line:\n' +
            '1. the salary (a decimal number)\n' +
            '2. the years of service (a whole number)',
          output:
            'One line:\n' +
            'Bonus: <percentage>%\n\n' +
            'The percentage is a whole number and the `%` sign is printed straight after it, with no space.',
          samples: [
            { input: '4000 7', output: 'Bonus: 15%' },
            { input: '4000 2', output: 'Bonus: 10%' },
            { input: '8000 6', output: 'Bonus: 10%' },
            { input: '8000 2', output: 'Bonus: 5%' }
          ],
          hint:
            'Two questions, four answers. Decide on the salary first, then ask about the years inside ' +
            'each branch. Note that 10 percent is reached along two different paths.',
          cpp: {
            notes: [
              'The outer condition is `salary < 5000`; the inner condition is `years >= 5`.',
              'Store the result in an `int rate` and print it once after the nesting.',
              'The `%` sign has no special meaning inside a C++ string: `cout << "Bonus: " << rate << "%" << endl;`'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The outer condition is `salary < 5000`; the inner condition is `years >= 5`.',
              'Store the result in an `int rate` and print it once after the nesting.',
              'With `println` the `%` sign is ordinary text. With `printf` you would have to write it as `%%`.'
            ]
          }
        },
        {
          title: 'Classify a Number Twice',
          difficulty: 'Medium',
          description:
            'Read one integer and describe it in two ways: first its sign, then whether it is even or ' +
            'odd. The two descriptions are independent of each other.',
          input: 'One whole number, which may be negative.',
          output:
            'Two lines. The first is `Positive`, `Negative` or `Zero`. The second is `Even` or `Odd`.',
          samples: [
            { input: '7',  output: 'Positive\nOdd' },
            { input: '-4', output: 'Negative\nEven' },
            { input: '0',  output: 'Zero\nEven' },
            { input: '-9', output: 'Negative\nOdd' }
          ],
          hint:
            'The sign and the parity are two separate questions about the same value. Nesting the second ' +
            'inside the first forces you to repeat it in every branch — think about which structure ' +
            'avoids that.',
          cpp: {
            notes: [
              'The sign needs a three-branch chain: `> 0`, `< 0`, otherwise zero.',
              'The parity needs the familiar `n % 2 == 0` test.',
              'Remember that `-9 % 2` is `-1` in C++, so test for even and let `else` cover odd.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The sign needs a three-branch chain: `> 0`, `< 0`, otherwise zero.',
              'The parity needs the familiar `n % 2 == 0` test.',
              'Remember that `-9 % 2` is `-1` in Java, so test for even and let `else` cover odd.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 7 — switch / case ================= */
    {
      title: 'Simple `switch` / `case`',
      summary:
        '`switch` compares one value against a list of fixed options. It replaces a long chain of ' +
        '`if (x == 1) ... else if (x == 2) ...` with something easier to read.',
      points: [
        'The value in `switch (...)` must be a whole number or a character. Java also allows `String`; C++ does not.',
        'Each `case` label is followed by a constant and a colon: `case 1:`.',
        'A `case` label cannot hold a range or a comparison — `case x > 5:` is not valid.',
        'Every `case` body ends with `break;` so that execution leaves the switch.',
        'Use `switch` when you are testing one value for equality against several known options.'
      ],
      example: {
        cpp:
          'switch (day) {\n' +
          '    case 1: cout << "Sunday" << endl; break;\n' +
          '    case 2: cout << "Monday" << endl; break;\n' +
          '    case 3: cout << "Tuesday" << endl; break;\n' +
          '}',
        java:
          'switch (day) {\n' +
          '    case 1: System.out.println("Sunday"); break;\n' +
          '    case 2: System.out.println("Monday"); break;\n' +
          '    case 3: System.out.println("Tuesday"); break;\n' +
          '}'
      },
      exercises: [
        {
          title: 'Weekday from 1 to 3',
          difficulty: 'Easy',
          description:
            'Read a number from 1 to 3 and print the matching day name, where 1 is Sunday, 2 is Monday ' +
            'and 3 is Tuesday. Use a `switch` rather than a chain of `if` statements.',
          input: 'One whole number between 1 and 3.',
          output: 'One line: the day name.',
          samples: [
            { input: '1', output: 'Sunday' },
            { input: '2', output: 'Monday' },
            { input: '3', output: 'Tuesday' }
          ],
          hint:
            'Three cases, one for each number, each ending with `break;`.',
          cpp: {
            notes: [
              'The switch value is an `int`, which is allowed directly.',
              'Case labels are plain numbers: `case 1:`.',
              'Each case body is a `cout` line followed by `break;`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The switch value is an `int`, which is allowed directly.',
              'Case labels are plain numbers: `case 1:`.',
              'Each case body is a `System.out.println` line followed by `break;`.'
            ]
          }
        },
        {
          title: 'Month Name',
          difficulty: 'Easy',
          description:
            'Read a month number from 1 to 12 and print the name of that month.',
          input: 'One whole number between 1 and 12.',
          output: 'One line: the month name.',
          samples: [
            { input: '1',  output: 'January' },
            { input: '7',  output: 'July' },
            { input: '12', output: 'December' }
          ],
          hint:
            'Twelve cases is a lot of typing but no new ideas. Keep each one on a single line so the ' +
            'whole switch stays readable.',
          cpp: {
            notes: [
              'Twelve `case` labels, each with its own `break;`.',
              'Writing the whole case on one line — `case 1: cout << "January" << endl; break;` — keeps it compact.',
              'A missing `break` makes the program print several month names at once.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Twelve `case` labels, each with its own `break;`.',
              'Writing the whole case on one line — `case 1: System.out.println("January"); break;` — keeps it compact.',
              'A missing `break` makes the program print several month names at once.'
            ]
          }
        },
        {
          title: 'Course Title from Code',
          difficulty: 'Easy',
          description:
            'Each course has a numeric code. Read a code and print the matching course title: 101 is ' +
            '`Programming Fundamentals`, 102 is `Object-Oriented Programming`, and 103 is ' +
            '`Data Structures`.',
          input: 'One whole number: the course code.',
          output: 'One line: the course title.',
          samples: [
            { input: '101', output: 'Programming Fundamentals' },
            { input: '102', output: 'Object-Oriented Programming' },
            { input: '103', output: 'Data Structures' }
          ],
          hint:
            'Case labels do not have to be small numbers or start at 1 — any constant of the right type ' +
            'works.',
          cpp: {
            notes: [
              '`case 101:` is perfectly valid; the labels need not be consecutive.',
              'Each case body prints its title and then breaks.',
              'The titles contain spaces and a hyphen, so they must be printed as strings in double quotes.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              '`case 101:` is perfectly valid; the labels need not be consecutive.',
              'Each case body prints its title and then breaks.',
              'Java also allows switching on a `String`, but this exercise switches on the numeric code.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 8 — break in switch ================= */
    {
      title: '`break` in `switch` / `case`',
      summary:
        'Without `break`, execution falls through into the next case and keeps running. `break` is what ' +
        'makes each case behave as a separate alternative.',
      points: [
        'A `case` label is an entry point, not a boundary. Execution enters there and continues downward.',
        '`break` jumps out of the whole `switch`, straight to the code after the closing brace.',
        'A forgotten `break` is a silent bug: the program compiles and prints too much.',
        'The last case still deserves a `break`, so that adding a new case later cannot break it.',
        'Two labels stacked with no code between them deliberately share one body — that is the one useful fall-through.'
      ],
      example: {
        cpp:
          'switch (op) {\n' +
          '    case \'+\': result = a + b; break;   // without break, the next line would also run\n' +
          '    case \'-\': result = a - b; break;\n' +
          '    case \'*\': result = a * b; break;\n' +
          '    case \'/\': result = a / b; break;\n' +
          '}',
        java:
          'switch (op) {\n' +
          '    case \'+\': result = a + b; break;   // without break, the next line would also run\n' +
          '    case \'-\': result = a - b; break;\n' +
          '    case \'*\': result = a * b; break;\n' +
          '    case \'/\': result = a / b; break;\n' +
          '}'
      },
      exercises: [
        {
          title: 'Simple Calculator',
          difficulty: 'Medium',
          description:
            'Read two numbers with an operator between them and print the result. The four operators are ' +
            '`+`, `-`, `*` and `/`. Each case must produce exactly one result, which is what the `break` ' +
            'statements guarantee.',
          input:
            'Three values, separated by spaces or new lines:\n' +
            '1. the first number (a decimal number)\n' +
            '2. the operator (one of the characters `+`, `-`, `*`, `/`)\n' +
            '3. the second number (a decimal number)',
          output:
            'One line:\n' +
            'Result: <value>\n\n' +
            'Printed with exactly two digits after the decimal point.',
          samples: [
            { input: '12 + 5', output: 'Result: 17.00' },
            { input: '9 / 2',  output: 'Result: 4.50' },
            { input: '6 * 7',  output: 'Result: 42.00' },
            { input: '4 - 10', output: 'Result: -6.00' }
          ],
          hint:
            'Try deleting one `break` and running sample 1 again. Seeing the wrong answer appear is the ' +
            'fastest way to remember what `break` does.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Read with `cin >> a >> op >> b;` where `op` is a `char`.',
              'Character labels use single quotes: `case \'+\':`.',
              'Because both operands are `double`, `a / b` is decimal division — no cast is needed.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read the operator with `char op = sc.next().charAt(0);` between the two `sc.nextDouble()` calls.',
              'Character labels use single quotes: `case \'+\':`.',
              'Because both operands are `double`, `a / b` is decimal division — no cast is needed.'
            ]
          }
        },
        {
          title: 'Raise Percentage by Category',
          difficulty: 'Easy',
          description:
            'Read an employee category letter and print the raise percentage attached to it: `A` gets ' +
            '15 percent, `B` gets 10 percent and `C` gets 5 percent. Solve it with a `switch`, and make ' +
            'sure each case stops after printing its own answer.',
          input: 'One uppercase letter: the category.',
          output:
            'One line:\n' +
            'Raise: <percentage>%\n\n' +
            'The `%` sign follows the number with no space between them.',
          samples: [
            { input: 'A', output: 'Raise: 15%' },
            { input: 'B', output: 'Raise: 10%' },
            { input: 'C', output: 'Raise: 5%' }
          ],
          hint:
            'If the input `A` makes your program print three lines, the `break` statements are missing.',
          cpp: {
            notes: [
              'Switch on a `char`, with labels such as `case \'A\':`.',
              'Compare this with the `if` / `else if` version in Objective 5 — the switch is shorter here because every test is an equality.',
              'Each case prints its line and then breaks.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read with `char category = sc.next().charAt(0);` then switch on it.',
              'Compare this with the `if` / `else if` version in Objective 5 — the switch is shorter here because every test is an equality.',
              'Each case prints its line and then breaks.'
            ]
          }
        },
        {
          title: 'Service Fee',
          difficulty: 'Easy',
          description:
            'A workshop offers three services with fixed fees: 1 is a consultation at 50, 2 is ' +
            'maintenance at 120, and 3 is installation at 300. Read the chosen service number and print ' +
            'its fee.',
          input: 'One whole number between 1 and 3.',
          output:
            'One line:\n' +
            'Fee: <amount>\n\n' +
            'Printed with exactly two digits after the decimal point.',
          samples: [
            { input: '1', output: 'Fee: 50.00' },
            { input: '2', output: 'Fee: 120.00' },
            { input: '3', output: 'Fee: 300.00' }
          ],
          hint:
            'Assign the fee to a `double` variable inside each case and print it once after the switch. ' +
            'The formatting is then written only once.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Declare `double fee = 0;` before the switch, then set it inside each case.',
              'Print after the switch with `fixed` and `setprecision(2)`.',
              'Setting the value in the case and printing outside keeps the switch small.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Declare `double fee = 0;` before the switch, then set it inside each case.',
              'Java requires the variable to be initialised before it is read, which is why `= 0` is there.',
              'Print after the switch with `System.out.printf("Fee: %.2f%n", fee);`'
            ]
          }
        }
      ]
    },

    /* ================= Objective 9 — default in switch ================= */
    {
      title: '`default` in `switch` / `case`',
      summary:
        '`default` is the branch that runs when the value matches none of the listed cases. It is the ' +
        '`else` of a `switch`, and it is what makes a switch safe against unexpected input.',
      points: [
        '`default` may appear anywhere in the switch, but putting it last is the readable convention.',
        'Without a `default`, an unmatched value simply falls out of the switch and nothing happens.',
        '`default` still needs a `break` when it is not the last branch.',
        'A switch with a `default` covers every possible input, which is exactly what validation needs.',
        'Once `default` exists, the earlier cases no longer have to guarantee valid input.'
      ],
      example: {
        cpp:
          'switch (choice) {\n' +
          '    case 1:  cout << "Deposit" << endl;        break;\n' +
          '    case 2:  cout << "Withdraw" << endl;       break;\n' +
          '    default: cout << "Invalid choice" << endl; break;\n' +
          '}',
        java:
          'switch (choice) {\n' +
          '    case 1:  System.out.println("Deposit");        break;\n' +
          '    case 2:  System.out.println("Withdraw");       break;\n' +
          '    default: System.out.println("Invalid choice"); break;\n' +
          '}'
      },
      exercises: [
        {
          title: 'Menu Choice',
          difficulty: 'Easy',
          description:
            'A banking menu offers three options: 1 is Deposit, 2 is Withdraw and 3 is Balance. Read the ' +
            'user\'s choice and print the matching option name, or an error message when the choice is ' +
            'not on the menu.',
          input: 'One whole number.',
          output:
            'One line: `Deposit`, `Withdraw`, `Balance`, or `Invalid choice` when the number is not 1, 2 or 3.',
          samples: [
            { input: '1', output: 'Deposit' },
            { input: '3', output: 'Balance' },
            { input: '9', output: 'Invalid choice' },
            { input: '0', output: 'Invalid choice' }
          ],
          hint:
            'You cannot list every invalid number as a case. That is exactly the gap `default` fills.',
          cpp: {
            notes: [
              'Three `case` labels plus one `default`.',
              '`default:` is written without a value and without parentheses.',
              'Keep a `break;` in the default branch as a habit.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Three `case` labels plus one `default`.',
              '`default:` is written without a value and without parentheses.',
              'Keep a `break;` in the default branch as a habit.'
            ]
          }
        },
        {
          title: 'Weekday or Invalid Day',
          difficulty: 'Easy',
          description:
            'Read a number and print the matching day name, where 1 is Sunday through to 7 is Saturday. ' +
            'Any number outside 1 to 7 produces an error message instead.',
          input: 'One whole number.',
          output:
            'One line: the day name, or `Invalid day` when the number is outside 1 to 7.',
          samples: [
            { input: '1', output: 'Sunday' },
            { input: '6', output: 'Friday' },
            { input: '7', output: 'Saturday' },
            { input: '8', output: 'Invalid day' }
          ],
          hint:
            'This is the earlier weekday exercise extended in two ways: four more cases, and a `default` ' +
            'that no longer assumes the input is valid.',
          cpp: {
            notes: [
              'Seven `case` labels plus one `default`.',
              'Each case ends with `break;` so only one day name is printed.',
              'The `default` branch prints `Invalid day`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Seven `case` labels plus one `default`.',
              'Each case ends with `break;` so only one day name is printed.',
              'The `default` branch prints `Invalid day`.'
            ]
          }
        },
        {
          title: 'Grade Letter Description',
          difficulty: 'Medium',
          description:
            'Read a grade letter and print what it means: `A` is Excellent, `B` is Very good, `C` is ' +
            'Good, `D` is Pass and `F` is Fail. Any other letter is rejected.',
          input: 'One letter.',
          output:
            'One line: the description, or `Invalid grade` when the letter is not one of `A`, `B`, `C`, ' +
            '`D` or `F`.',
          samples: [
            { input: 'A', output: 'Excellent' },
            { input: 'C', output: 'Good' },
            { input: 'F', output: 'Fail' },
            { input: 'E', output: 'Invalid grade' }
          ],
          hint:
            'The grade letters are not consecutive — `E` is missing between `D` and `F`. Listing each ' +
            'valid letter as its own case handles that naturally.',
          cpp: {
            notes: [
              'Switch on a `char`, with labels such as `case \'A\':`.',
              'A lowercase `a` is a different character from `A`, so it falls into `default`.',
              'Five `case` labels plus one `default`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read with `char grade = sc.next().charAt(0);` then switch on it.',
              'A lowercase `a` is a different character from `A`, so it falls into `default`.',
              'Five `case` labels plus one `default`.'
            ]
          }
        }
      ]
    }
  ]
});
