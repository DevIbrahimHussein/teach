/* Programming Fundamentals — Module 3: Loops */

Curriculum.addModule('fundamentals', {
  number: 3,
  title: 'Loops',
  summary: 'Repeating work with do/while, while and for, then combining loops for number algorithms and nested data.',
  objectives: [

    /* ================= Objective 1 — do...while validation ================= */
    {
      title: '`do ... while` for Validation',
      summary:
        '`do ... while` runs its body once and then repeats while the condition is still true. Because ' +
        'the body always runs at least once, it is the natural loop for input validation: ask, check, ' +
        'ask again.',
      points: [
        'The condition is written at the bottom and is tested after the body has run.',
        'A `do ... while` statement ends with a semicolon after the condition.',
        'The loop condition describes when to keep going, so for validation it describes the *invalid* case.',
        'Read the value inside the loop, never before it, or the loop would test the same value forever.',
        'A `while` loop tests first and may run zero times; a `do ... while` always runs at least once.'
      ],
      example: {
        cpp:
          'int grade;\n' +
          'do {\n' +
          '    cin >> grade;\n' +
          '    if (grade < 0 || grade > 100) {\n' +
          '        cout << "Invalid, try again" << endl;\n' +
          '    }\n' +
          '} while (grade < 0 || grade > 100);',
        java:
          'int grade;\n' +
          'do {\n' +
          '    grade = sc.nextInt();\n' +
          '    if (grade < 0 || grade > 100) {\n' +
          '        System.out.println("Invalid, try again");\n' +
          '    }\n' +
          '} while (grade < 0 || grade > 100);'
      },
      exercises: [
        {
          title: 'Read a Grade Until It Is Valid',
          difficulty: 'Easy',
          description:
            'Keep reading a grade until the value entered is between 0 and 100 inclusive. Every rejected ' +
            'value produces a message, and the program only continues once a valid grade arrives.',
          input:
            'A sequence of whole numbers, one per line. The reading stops at the first value between ' +
            '0 and 100.',
          output:
            'One line reading `Invalid, try again` for each rejected value, then one final line:\n' +
            'Grade accepted: <grade>',
          samples: [
            { input: '88',           output: 'Grade accepted: 88' },
            { input: '150\n-2\n88',  output: 'Invalid, try again\nInvalid, try again\nGrade accepted: 88' },
            { input: '101\n100',     output: 'Invalid, try again\nGrade accepted: 100' }
          ],
          constraints: [
            'Both 0 and 100 are valid.',
            'A valid value on the first attempt produces no `Invalid` line at all, as sample 1 shows.',
            'The input always contains a valid value eventually.'
          ],
          hint:
            'The message must appear only for rejected values, so it belongs inside an `if` inside the ' +
            'loop body, not directly in the body.',
          cpp: {
            notes: [
              'Declare `int grade;` before the loop so it is still in scope in the condition.',
              'The loop condition and the `if` condition describe the same invalid case: `grade < 0 || grade > 100`.',
              'Do not forget the semicolon after `while (...)`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Declare `int grade;` before the loop so it is still in scope in the condition.',
              'Assign inside the loop with `grade = sc.nextInt();` — do not re-declare it each time.',
              'Do not forget the semicolon after `while (...)`.'
            ]
          }
        },
        {
          title: 'Read a Positive Salary',
          difficulty: 'Easy',
          description:
            'Keep reading a salary until a value greater than zero is entered. Zero and negative values ' +
            'are rejected with a message.',
          input:
            'A sequence of decimal numbers, one per line. The reading stops at the first value greater ' +
            'than 0.',
          output:
            'One line reading `Invalid, try again` for each rejected value, then one final line:\n' +
            'Salary accepted: <salary>\n\n' +
            'The accepted salary is printed with exactly two digits after the decimal point.',
          samples: [
            { input: '2500',        output: 'Salary accepted: 2500.00' },
            { input: '0\n-40\n1200.5', output: 'Invalid, try again\nInvalid, try again\nSalary accepted: 1200.50' },
            { input: '-1\n0.01',    output: 'Invalid, try again\nSalary accepted: 0.01' }
          ],
          constraints: [
            'Zero is rejected, so the invalid test is `<= 0`.',
            'Any value above 0 is accepted, however small.',
            'The input always contains a valid value eventually.'
          ],
          hint:
            'This is the previous exercise with a simpler condition and a different type. The loop shape ' +
            'does not change.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Declare `double salary;` before the loop.',
              'The invalid condition is `salary <= 0`.',
              'Apply `fixed` and `setprecision(2)` when printing the accepted value.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Declare `double salary;` before the loop and assign with `salary = sc.nextDouble();` inside it.',
              'The invalid condition is `salary <= 0`.',
              'Print with `System.out.printf("Salary accepted: %.2f%n", salary);`'
            ]
          }
        },
        {
          title: 'Read a Valid Menu Choice',
          difficulty: 'Easy',
          description:
            'A menu offers options 1 to 4. Keep reading until the user enters one of them, rejecting ' +
            'everything else with a message.',
          input:
            'A sequence of whole numbers, one per line. The reading stops at the first value between ' +
            '1 and 4.',
          output:
            'One line reading `Invalid, try again` for each rejected value, then one final line:\n' +
            'Choice accepted: <choice>',
          samples: [
            { input: '3',        output: 'Choice accepted: 3' },
            { input: '0\n7\n1',  output: 'Invalid, try again\nInvalid, try again\nChoice accepted: 1' },
            { input: '5\n4',     output: 'Invalid, try again\nChoice accepted: 4' }
          ],
          constraints: [
            'Both 1 and 4 are valid.',
            'The input may contain negative numbers, which are rejected like any other invalid value.',
            'The input always contains a valid value eventually.'
          ],
          hint:
            'The valid values form a range, so the invalid condition needs `||` — below the range or ' +
            'above it.',
          cpp: {
            notes: [
              'The invalid condition is `choice < 1 || choice > 4`.',
              'The same condition appears twice: once in the `if` and once after `while`.',
              'Writing the condition once in a `bool` variable is a neat alternative once you have met `bool`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The invalid condition is `choice < 1 || choice > 4`.',
              'The same condition appears twice: once in the `if` and once after `while`.',
              'Writing the condition once in a `boolean` variable is a neat alternative once you have met `boolean`.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 2 — while ================= */
    {
      title: 'The `while` Loop',
      summary:
        '`while` tests its condition before every pass, including the first, so the body may run zero ' +
        'times. Use it when you do not know in advance how many repetitions are needed.',
      points: [
        'Three things must exist: a starting value, a condition, and a change that moves toward ending the loop.',
        'Forgetting the change is what causes an infinite loop.',
        'Peeling digits off a number uses `% 10` for the last digit and `/ 10` to remove it.',
        'A counter that grows toward a limit is the most common `while` shape.',
        '`while (n > 0)` naturally stops when the digits of a positive number are exhausted.'
      ],
      example: {
        cpp:
          'int i = 1;\n' +
          'while (i <= n) {\n' +
          '    cout << i << endl;\n' +
          '    i = i + 1;          // without this the loop never ends\n' +
          '}',
        java:
          'int i = 1;\n' +
          'while (i <= n) {\n' +
          '    System.out.println(i);\n' +
          '    i = i + 1;          // without this the loop never ends\n' +
          '}'
      },
      exercises: [
        {
          title: 'Count from 1 to n',
          difficulty: 'Easy',
          description:
            'Read a number `n` and print every whole number from 1 up to `n`, each on its own line.',
          input: 'One whole number `n`.',
          output: '`n` lines, containing the numbers 1, 2, 3 and so on up to `n`.',
          samples: [
            { input: '5', output: '1\n2\n3\n4\n5' },
            { input: '1', output: '1' },
            { input: '3', output: '1\n2\n3' }
          ],
          constraints: [
            'The value of `n` is a whole number between 1 and 100.',
            'The last line printed is `n` itself.',
            'Nothing else is printed — no labels and no separators.'
          ],
          hint:
            'Check the last number carefully. Using `<` instead of `<=` in the condition stops one line ' +
            'too early.',
          cpp: {
            notes: [
              'Start the counter at 1 and loop while it is `<= n`.',
              'Increase the counter with `i++`, which is short for `i = i + 1`.',
              'Placing the increase after the `cout` keeps the printed values starting at 1.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Start the counter at 1 and loop while it is `<= n`.',
              'Increase the counter with `i++`, which is short for `i = i + 1`.',
              'Placing the increase after the `println` keeps the printed values starting at 1.'
            ]
          }
        },
        {
          title: 'Sum of Digits',
          difficulty: 'Medium',
          description:
            'Read a positive integer and print the sum of its digits. For example the digits of 407 are ' +
            '4, 0 and 7, which add up to 11.',
          input: 'One positive whole number.',
          output:
            'One line:\n' +
            'Sum: <sum>',
          samples: [
            { input: '407',  output: 'Sum: 11' },
            { input: '9',    output: 'Sum: 9' },
            { input: '1234', output: 'Sum: 10' }
          ],
          constraints: [
            'The number is a whole number between 1 and 1000000.',
            'A single-digit number has that digit as its sum.',
            'Zero digits contribute nothing, as 407 shows.'
          ],
          hint:
            '`% 10` gives you the last digit and `/ 10` removes it. Repeat until nothing is left.',
          cpp: {
            notes: [
              'Keep a running total that starts at 0 and grows inside the loop.',
              'The loop condition is `n > 0`; each pass does `sum += n % 10;` then `n /= 10;`.',
              'Both operations rely on `int` division discarding the fraction.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Keep a running total that starts at 0 and grows inside the loop.',
              'The loop condition is `n > 0`; each pass does `sum += n % 10;` then `n /= 10;`.',
              'Both operations rely on `int` division discarding the fraction.'
            ]
          }
        },
        {
          title: 'Count Even and Odd Digits',
          difficulty: 'Medium',
          description:
            'Read a positive integer and count how many of its digits are even and how many are odd. ' +
            'The digit 0 counts as even.',
          input: 'One positive whole number.',
          output:
            'Two lines:\n' +
            'Even digits: <count>\n' +
            'Odd digits: <count>',
          samples: [
            { input: '12345', output: 'Even digits: 2\nOdd digits: 3' },
            { input: '2468',  output: 'Even digits: 4\nOdd digits: 0' },
            { input: '7',     output: 'Even digits: 0\nOdd digits: 1' }
          ],
          constraints: [
            'The number is a whole number between 1 and 1000000.',
            'The digit 0 is even.',
            'Both lines are always printed, even when one of the counts is 0.'
          ],
          hint:
            'This is the digit-peeling loop again, with an `if` inside it instead of an addition. Two ' +
            'counters are needed, both starting at 0.',
          cpp: {
            notes: [
              'Extract each digit with `n % 10`, then test it with `digit % 2 == 0`.',
              'Two counters, each starting at 0, and one `if` / `else` per pass.',
              'The number is positive, so the remainders are never negative here.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Extract each digit with `n % 10`, then test it with `digit % 2 == 0`.',
              'Two counters, each starting at 0, and one `if` / `else` per pass.',
              'The number is positive, so the remainders are never negative here.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 3 — for ================= */
    {
      title: 'The `for` Loop',
      summary:
        '`for` gathers the three parts of a counting loop — start, condition and change — onto one ' +
        'line. Use it when the number of repetitions is known before the loop begins.',
      points: [
        '`for (int i = 0; i < n; i++)` runs the body exactly `n` times, with `i` going 0, 1, … n−1.',
        'The counter is usually declared inside the `for`, so it exists only within the loop.',
        'A running total must be declared before the loop, or it would reset on every pass.',
        'Reading `n` values means reading one value per pass, inside the loop.',
        'An average is the total divided by the count — computed once, after the loop ends.'
      ],
      example: {
        cpp:
          'int sum = 0;\n' +
          'for (int i = 0; i < n; i++) {\n' +
          '    int value;\n' +
          '    cin >> value;\n' +
          '    sum += value;\n' +
          '}\n' +
          'double average = (double)sum / n;',
        java:
          'int sum = 0;\n' +
          'for (int i = 0; i < n; i++) {\n' +
          '    int value = sc.nextInt();\n' +
          '    sum += value;\n' +
          '}\n' +
          'double average = (double) sum / n;'
      },
      exercises: [
        {
          title: 'Sum and Average of Grades',
          difficulty: 'Easy',
          description:
            'Read a count and then that many grades, and print their total and their average.',
          input:
            'First a whole number `n`, then `n` whole numbers: the grades.',
          output:
            'Two lines:\n' +
            'Sum: <sum>\n' +
            'Average: <average>\n\n' +
            'The sum is a whole number. The average is printed with exactly two digits after the ' +
            'decimal point.',
          samples: [
            { input: '3\n90 80 60',      output: 'Sum: 230\nAverage: 76.67' },
            { input: '4\n100 50 75 25',  output: 'Sum: 250\nAverage: 62.50' },
            { input: '1\n88',            output: 'Sum: 88\nAverage: 88.00' }
          ],
          constraints: [
            '`n` is a whole number between 1 and 100.',
            'Each grade is a whole number between 0 and 100.',
            'The average is not rounded to a whole number — it keeps two decimal digits.'
          ],
          hint:
            'The total is a whole number but the average is not. Dividing two whole numbers would throw ' +
            'the fraction away — sample 1 would print `76.00`.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Declare `int sum = 0;` before the loop.',
              'Force decimal division with a cast: `(double)sum / n`.',
              'Print the average with `fixed` and `setprecision(2)`; the sum is printed before that, or as an `int`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Declare `int sum = 0;` before the loop.',
              'Force decimal division with a cast: `(double) sum / n`.',
              'Print the sum with `println` and the average with `System.out.printf("Average: %.2f%n", average);`'
            ]
          }
        },
        {
          title: 'Count Even and Odd Numbers',
          difficulty: 'Easy',
          description:
            'Read a count and then that many integers, and report how many of them are even and how ' +
            'many are odd.',
          input: 'First a whole number `n`, then `n` whole numbers.',
          output:
            'Two lines:\n' +
            'Even: <count>\n' +
            'Odd: <count>',
          samples: [
            { input: '5\n4 7 10 3 8',  output: 'Even: 3\nOdd: 2' },
            { input: '3\n1 3 5',       output: 'Even: 0\nOdd: 3' },
            { input: '4\n0 2 -4 -6',   output: 'Even: 4\nOdd: 0' }
          ],
          constraints: [
            '`n` is a whole number between 1 and 100.',
            'The numbers may be negative or zero.',
            'Zero is even.',
            'Both lines are always printed, even when one count is 0.'
          ],
          hint:
            'Sample 3 contains negative numbers on purpose. Test for even with `% 2 == 0` and let `else` ' +
            'handle the rest.',
          cpp: {
            notes: [
              'Two counters declared before the loop, both starting at 0.',
              'Read into the same variable on every pass — you do not need to keep the old values.',
              'The test `value % 2 == 0` works for negative values too; `value % 2 == 1` does not.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Two counters declared before the loop, both starting at 0.',
              'Read into the same variable on every pass — you do not need to keep the old values.',
              'The test `value % 2 == 0` works for negative values too; `value % 2 == 1` does not.'
            ]
          }
        },
        {
          title: 'Class Result Report',
          difficulty: 'Medium',
          description:
            'Read a count and then that many grades. Report how many students passed, how many failed, ' +
            'and the average grade of the whole class. The passing mark is 50.',
          input: 'First a whole number `n`, then `n` whole numbers: the grades.',
          output:
            'Three lines:\n' +
            'Passed: <count>\n' +
            'Failed: <count>\n' +
            'Average: <average>\n\n' +
            'The average is printed with exactly two digits after the decimal point.',
          samples: [
            { input: '5\n90 45 78 30 64', output: 'Passed: 3\nFailed: 2\nAverage: 61.40' },
            { input: '3\n50 49 100',      output: 'Passed: 2\nFailed: 1\nAverage: 66.33' },
            { input: '2\n10 20',          output: 'Passed: 0\nFailed: 2\nAverage: 15.00' }
          ],
          constraints: [
            '`n` is a whole number between 1 and 100.',
            'Each grade is a whole number between 0 and 100.',
            'A grade of exactly 50 passes.',
            'The average is over all grades, not only the passing ones.'
          ],
          hint:
            'Three things are accumulated in the same loop: a pass counter, a fail counter and a running ' +
            'total. The division happens once, after the loop.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'One loop, three variables updated inside it.',
              'The counters can be a single `if` / `else` — every grade either passes or fails.',
              'Cast before dividing: `(double)sum / n`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'One loop, three variables updated inside it.',
              'The counters can be a single `if` / `else` — every grade either passes or fails.',
              'Cast before dividing: `(double) sum / n`.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 4 — number algorithms ================= */
    {
      title: 'Number Algorithms with `for`',
      summary:
        'A loop that tests or multiplies across a range of numbers solves a whole family of classic ' +
        'problems: factorials, primes and perfect numbers.',
      points: [
        'A running product starts at 1, not 0 — starting at 0 would make every product 0.',
        'A running total starts at 0.',
        'A flag variable records something the loop discovered, and is checked after the loop ends.',
        '`i` divides `n` exactly when `n % i == 0`.',
        'A divisor loop for `n` only needs to run from 1 up to `n / 2` when looking for proper divisors.'
      ],
      example: {
        cpp:
          'long long product = 1;\n' +
          'for (int i = 1; i <= n; i++) {\n' +
          '    product *= i;\n' +
          '}\n' +
          '// a flag records what the loop found\n' +
          'bool found = false;',
        java:
          'long product = 1;\n' +
          'for (int i = 1; i <= n; i++) {\n' +
          '    product *= i;\n' +
          '}\n' +
          '// a flag records what the loop found\n' +
          'boolean found = false;'
      },
      exercises: [
        {
          title: 'Factorial',
          difficulty: 'Medium',
          description:
            'Read a non-negative number `n` and print its factorial, which is the product of every ' +
            'whole number from 1 to `n`. By definition the factorial of 0 is 1.',
          input: 'One whole number `n`.',
          output:
            'One line:\n' +
            'Factorial: <value>',
          samples: [
            { input: '5',  output: 'Factorial: 120' },
            { input: '0',  output: 'Factorial: 1' },
            { input: '12', output: 'Factorial: 479001600' }
          ],
          constraints: [
            '`n` is a whole number between 0 and 12.',
            'The upper limit of 12 keeps the answer inside the range of a normal integer.',
            'When `n` is 0 the loop body never runs, and the starting value is the answer.'
          ],
          hint:
            'Sample 2 is the one to think about. If the accumulator starts at the right value, the ' +
            'zero case needs no special handling at all.',
          cpp: {
            notes: [
              'Declare the accumulator as `long long product = 1;` to be safe at `n = 12`.',
              'The loop runs `for (int i = 1; i <= n; i++)` and does `product *= i;`.',
              'When `n` is 0 the condition is false immediately and `product` stays 1.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Declare the accumulator as `long product = 1;` to be safe at `n = 12`.',
              'The loop runs `for (int i = 1; i <= n; i++)` and does `product *= i;`.',
              'When `n` is 0 the condition is false immediately and `product` stays 1.'
            ]
          }
        },
        {
          title: 'Prime Check',
          difficulty: 'Medium',
          description:
            'Read a positive number and decide whether it is prime. A prime number is greater than 1 ' +
            'and has no divisors other than 1 and itself.',
          input: 'One positive whole number.',
          output:
            'One line, either:\n' +
            'Prime\n' +
            'or:\n' +
            'Not prime',
          samples: [
            { input: '7',  output: 'Prime' },
            { input: '1',  output: 'Not prime' },
            { input: '9',  output: 'Not prime' },
            { input: '2',  output: 'Prime' }
          ],
          constraints: [
            'The number is a whole number between 1 and 100000.',
            '1 is not prime, as sample 2 shows.',
            '2 is prime, and it is the only even prime.'
          ],
          hint:
            'Use a flag that starts as "still prime" and is switched off the moment a divisor is found. ' +
            'Check the flag after the loop, not inside it.',
          cpp: {
            notes: [
              'Test divisors with `for (int i = 2; i < n; i++)` and the condition `n % i == 0`.',
              'A `bool isPrime = true;` before the loop, set to `false` inside, is the classic shape.',
              'Handle `n <= 1` separately, before or after the loop — the loop alone would call 1 prime.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Test divisors with `for (int i = 2; i < n; i++)` and the condition `n % i == 0`.',
              'A `boolean isPrime = true;` before the loop, set to `false` inside, is the classic shape.',
              'Handle `n <= 1` separately, before or after the loop — the loop alone would call 1 prime.'
            ]
          }
        },
        {
          title: 'Perfect Number Check',
          difficulty: 'Hard',
          description:
            'Read a positive number and decide whether it is perfect. A perfect number equals the sum of ' +
            'all its proper divisors — the divisors below itself. For example the proper divisors of 6 ' +
            'are 1, 2 and 3, and 1 + 2 + 3 is 6.',
          input: 'One positive whole number.',
          output:
            'One line, either:\n' +
            'Perfect\n' +
            'or:\n' +
            'Not perfect',
          samples: [
            { input: '6',   output: 'Perfect' },
            { input: '28',  output: 'Perfect' },
            { input: '12',  output: 'Not perfect' },
            { input: '1',   output: 'Not perfect' }
          ],
          constraints: [
            'The number is a whole number between 1 and 100000.',
            'The number itself is not counted among its proper divisors.',
            '1 has no proper divisors below itself other than none at all, so its divisor sum is 0 and it is not perfect.'
          ],
          hint:
            'This is the divisor loop again, but it accumulates instead of setting a flag. Compare the ' +
            'total with the original number after the loop finishes.',
          cpp: {
            notes: [
              'Loop `for (int i = 1; i < n; i++)` and add `i` to the total when `n % i == 0`.',
              'Stopping at `n / 2` is faster and still correct, because no divisor above half of `n` exists below `n`.',
              'Compare with `sum == n` after the loop.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Loop `for (int i = 1; i < n; i++)` and add `i` to the total when `n % i == 0`.',
              'Stopping at `n / 2` is faster and still correct, because no divisor above half of `n` exists below `n`.',
              'Compare with `sum == n` after the loop.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 5 — nested for ================= */
    {
      title: 'Nested `for` Loops',
      summary:
        'A loop inside a loop processes repeated data for several entities. The outer loop moves from ' +
        'one entity to the next, and the inner loop handles that entity\'s own values.',
      points: [
        'The inner loop runs completely for every single pass of the outer loop.',
        'Each loop needs its own counter — reusing one name for both breaks the outer loop.',
        'Anything accumulated per entity must be reset at the top of the outer loop body.',
        'Anything accumulated across all entities is declared before the outer loop.',
        'Reading a grid of values row by row is exactly this shape: outer loop for rows, inner loop for columns.'
      ],
      example: {
        cpp:
          'for (int s = 1; s <= students; s++) {\n' +
          '    int sum = 0;                     // reset for each student\n' +
          '    for (int g = 0; g < grades; g++) {\n' +
          '        int value;\n' +
          '        cin >> value;\n' +
          '        sum += value;\n' +
          '    }\n' +
          '    // report this student here\n' +
          '}',
        java:
          'for (int s = 1; s <= students; s++) {\n' +
          '    int sum = 0;                     // reset for each student\n' +
          '    for (int g = 0; g < grades; g++) {\n' +
          '        int value = sc.nextInt();\n' +
          '        sum += value;\n' +
          '    }\n' +
          '    // report this student here\n' +
          '}'
      },
      exercises: [
        {
          title: 'Average per Student',
          difficulty: 'Medium',
          description:
            'Several students each have the same number of grades. Read all the grades and print one ' +
            'average per student, in the order the students were read.',
          input:
            'First two whole numbers on one line: the number of students `s` and the number of grades ' +
            'per student `g`. Then `s` lines, each holding `g` whole numbers.',
          output:
            'One line per student:\n' +
            'Student <number> average: <average>\n\n' +
            'Students are numbered from 1. Each average is printed with exactly two digits after the ' +
            'decimal point.',
          samples: [
            {
              input: '2 3\n90 80 70\n60 65 70',
              output: 'Student 1 average: 80.00\nStudent 2 average: 65.00'
            },
            {
              input: '1 4\n100 90 80 70',
              output: 'Student 1 average: 85.00'
            },
            {
              input: '3 2\n50 50\n0 100\n77 78',
              output: 'Student 1 average: 50.00\nStudent 2 average: 50.00\nStudent 3 average: 77.50'
            }
          ],
          constraints: [
            '`s` and `g` are whole numbers between 1 and 20.',
            'Each grade is a whole number between 0 and 100.',
            'Every student has exactly `g` grades.',
            'A student\'s average is reported before the next student\'s grades are processed.'
          ],
          hint:
            'The running total belongs inside the outer loop, so that it starts again from 0 for each ' +
            'student. Declaring it before the outer loop would keep adding one student\'s grades to the next.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Two counters with different names, for example `s` and `g`.',
              'Reset the total at the top of the outer loop body.',
              'Set `fixed` and `setprecision(2)` once, before the loops, and it applies to every line.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Two counters with different names, for example `s` and `g`.',
              'Reset the total at the top of the outer loop body.',
              'Print with `System.out.printf("Student %d average: %.2f%n", s, average);`'
            ]
          }
        },
        {
          title: 'Average Salary per Department',
          difficulty: 'Medium',
          description:
            'Several departments each employ the same number of people. Read all the salaries and print ' +
            'the average salary of each department.',
          input:
            'First two whole numbers on one line: the number of departments `d` and the number of ' +
            'employees per department `e`. Then `d` lines, each holding `e` decimal numbers.',
          output:
            'One line per department:\n' +
            'Department <number> average: <average>\n\n' +
            'Departments are numbered from 1. Each average is printed with exactly two digits after the ' +
            'decimal point.',
          samples: [
            {
              input: '2 2\n5000 6000\n3000 3500',
              output: 'Department 1 average: 5500.00\nDepartment 2 average: 3250.00'
            },
            {
              input: '1 3\n4000 4500 5000',
              output: 'Department 1 average: 4500.00'
            },
            {
              input: '2 3\n1000 2000 3000\n7250.5 7250.5 7250.5',
              output: 'Department 1 average: 2000.00\nDepartment 2 average: 7250.50'
            }
          ],
          constraints: [
            '`d` and `e` are whole numbers between 1 and 20.',
            'Each salary is greater than 0.',
            'Every department has exactly `e` employees.'
          ],
          hint:
            'This is the previous exercise with decimal values. The one thing that changes is the type ' +
            'of the running total.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'The running total is a `double`, so no cast is needed before dividing.',
              'Reset the total at the top of the outer loop body.',
              '`e` is an `int`, and dividing a `double` by an `int` already gives a `double`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The running total is a `double`, so no cast is needed before dividing.',
              'Reset the total at the top of the outer loop body.',
              'Read each salary with `sc.nextDouble()`.'
            ]
          }
        },
        {
          title: 'Pass and Fail per Section',
          difficulty: 'Hard',
          description:
            'A year is divided into sections, and every section has the same number of students. Read ' +
            'every grade and report, for each section, how many students passed and how many failed. ' +
            'The passing mark is 50.',
          input:
            'First two whole numbers on one line: the number of sections `k` and the number of students ' +
            'per section `m`. Then `k` lines, each holding `m` whole numbers.',
          output:
            'One line per section:\n' +
            'Section <number>: Passed <count>, Failed <count>\n\n' +
            'Sections are numbered from 1. Note the colon after the section number and the comma before ' +
            '`Failed`.',
          samples: [
            {
              input: '2 3\n90 40 55\n30 20 80',
              output: 'Section 1: Passed 2, Failed 1\nSection 2: Passed 1, Failed 2'
            },
            {
              input: '1 4\n50 49 100 0',
              output: 'Section 1: Passed 2, Failed 2'
            },
            {
              input: '3 2\n60 70\n10 20\n50 50',
              output: 'Section 1: Passed 2, Failed 0\nSection 2: Passed 0, Failed 2\nSection 3: Passed 2, Failed 0'
            }
          ],
          constraints: [
            '`k` and `m` are whole numbers between 1 and 20.',
            'Each grade is a whole number between 0 and 100.',
            'A grade of exactly 50 passes.',
            'The two counts on each line always add up to `m`.'
          ],
          hint:
            'Two counters must be reset for every section, not just one. Forgetting to reset the second ' +
            'one produces totals that only ever grow.',
          cpp: {
            notes: [
              'Both counters are declared and set to 0 inside the outer loop body.',
              'The inner loop reads one grade and updates exactly one counter.',
              'Build the line with several `<<` steps: `cout << "Section " << k << ": Passed " << passed << ", Failed " << failed << endl;`'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Both counters are declared and set to 0 inside the outer loop body.',
              'The inner loop reads one grade and updates exactly one counter.',
              '`System.out.printf("Section %d: Passed %d, Failed %d%n", section, passed, failed);` builds the line in one call.'
            ]
          }
        }
      ]
    }
  ]
});
