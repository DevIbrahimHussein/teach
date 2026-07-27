/* Programming Fundamentals — Module 4: Arrays */

Curriculum.addModule('fundamentals', {
  number: 4,
  title: 'Arrays',
  summary: 'Storing many values in one variable: initialising, filling, displaying and analysing arrays.',
  objectives: [

    /* ================= Objective 1 — initialisation ================= */
    {
      title: 'Array Initialisation',
      summary:
        'An array is one variable holding many values of the same type. Each value sits at a numbered ' +
        'position, and the numbering always starts at 0.',
      points: [
        'An array of size `n` has positions `0` to `n - 1`. There is no position `n`.',
        'The size is fixed when the array is created and cannot change afterwards.',
        'A list of starting values in braces sets both the contents and the size.',
        'Reading or writing outside the valid positions is a serious bug — C++ gives no warning, Java throws an exception.',
        'C++ finds the length with `sizeof(a) / sizeof(a[0])`; Java uses `a.length`.'
      ],
      example: {
        cpp:
          'int numbers[5] = {4, 8, 15, 16, 23};\n' +
          'cout << numbers[0] << endl;   // 4  — the first value\n' +
          'cout << numbers[4] << endl;   // 23 — the last value\n' +
          '// numbers[5] does not exist',
        java:
          'int[] numbers = {4, 8, 15, 16, 23};\n' +
          'System.out.println(numbers[0]);              // 4  — the first value\n' +
          'System.out.println(numbers[numbers.length - 1]); // 23 — the last value\n' +
          '// numbers[5] throws ArrayIndexOutOfBoundsException'
      },
      exercises: [
        {
          title: 'Display a Predefined Array',
          difficulty: 'Easy',
          description:
            'Create an array that already holds the six values 4, 8, 15, 16, 23 and 42, then print each ' +
            'of them on its own line. The program reads nothing from the keyboard.',
          input: 'None. The values are written directly in the program.',
          output: 'Six lines, one value per line, in the order the array holds them.',
          samples: [
            { input: '-', output: '4\n8\n15\n16\n23\n42' }
          ],
          hint:
            'The loop counter and the array position are the same number. Start it at 0 and stop before ' +
            'the size, not at it.',
          cpp: {
            notes: [
              'Declare and fill in one step: `int a[6] = {4, 8, 15, 16, 23, 42};`',
              'You may leave the size out — `int a[] = {...}` — and C++ counts the values for you.',
              'Loop with `for (int i = 0; i < 6; i++)` and print `a[i]`.'
            ]
          },
          java: {
            notes: [
              'Declare and fill in one step: `int[] a = {4, 8, 15, 16, 23, 42};`',
              'The size is available as `a.length`, which is a field with no parentheses after it.',
              'Loop with `for (int i = 0; i < a.length; i++)` and print `a[i]`.'
            ]
          }
        },
        {
          title: 'First and Last Grade',
          difficulty: 'Easy',
          description:
            'Create an array holding the five grades 88, 72, 95, 60 and 79, then print the first and the ' +
            'last value it contains.',
          input: 'None. The values are written directly in the program.',
          output:
            'Two lines:\n' +
            'First: <first value>\n' +
            'Last: <last value>',
          samples: [
            { input: '-', output: 'First: 88\nLast: 79' }
          ],
          hint:
            'Writing the last position as `size - 1` rather than as the number 4 means the program still ' +
            'works if you later add a grade.',
          cpp: {
            notes: [
              'The first value is `a[0]`.',
              'The last value is `a[4]`, or better `a[5 - 1]` expressed in terms of the size.',
              'No loop is required for this exercise.'
            ]
          },
          java: {
            notes: [
              'The first value is `a[0]`.',
              'The last value is `a[a.length - 1]`, which adapts automatically if the array changes.',
              'No loop is required for this exercise.'
            ]
          }
        },
        {
          title: 'Total of Predefined Salaries',
          difficulty: 'Easy',
          description:
            'Create an array holding the four salaries 3200.50, 4100.00, 2750.75 and 5300.25, then print ' +
            'their total.',
          input: 'None. The values are written directly in the program.',
          output:
            'One line:\n' +
            'Total: <total>\n\n' +
            'Printed with exactly two digits after the decimal point.',
          samples: [
            { input: '-', output: 'Total: 15351.50' }
          ],
          hint:
            'This is the running-total pattern from the loops module, with the values coming from an ' +
            'array instead of from the keyboard.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Declare as `double salaries[4] = {3200.50, 4100.00, 2750.75, 5300.25};`',
              'Declare the total before the loop and add `salaries[i]` inside it.',
              'Print with `fixed` and `setprecision(2)`.'
            ]
          },
          java: {
            notes: [
              'Declare as `double[] salaries = {3200.50, 4100.00, 2750.75, 5300.25};`',
              'Declare the total before the loop and add `salaries[i]` inside it.',
              'Print with `System.out.printf("Total: %.2f%n", total);`'
            ]
          }
        }
      ]
    },

    /* ================= Objective 2 — input with a for loop ================= */
    {
      title: 'Filling an Array with a `for` Loop',
      summary:
        'The loop counter and the array position are the same number, which is what lets one short loop ' +
        'fill an array of any size.',
      points: [
        'Read the size first, then create the array, then fill it.',
        'The filling loop runs `for (int i = 0; i < n; i++)` and reads into `a[i]`.',
        'C++ needs a fixed maximum size at compile time unless you use a vector, so declare the array large enough.',
        'Java creates the array at run time with `new`, so the size may come from the input.',
        'Validation inside the filling loop works exactly as it did with single values.'
      ],
      example: {
        cpp:
          'const int MAX = 100;\n' +
          'int a[MAX];\n' +
          'int n;\n' +
          'cin >> n;\n' +
          'for (int i = 0; i < n; i++) {\n' +
          '    cin >> a[i];\n' +
          '}',
        java:
          'int n = sc.nextInt();\n' +
          'int[] a = new int[n];\n' +
          'for (int i = 0; i < n; i++) {\n' +
          '    a[i] = sc.nextInt();\n' +
          '}'
      },
      exercises: [
        {
          title: 'Read n Integers',
          difficulty: 'Easy',
          description:
            'Read a count and then that many integers into an array. Confirm the result by printing how ' +
            'many values were stored and what the last one was.',
          input: 'First a whole number `n`, then `n` whole numbers.',
          output:
            'Two lines:\n' +
            'Count: <n>\n' +
            'Last: <last value stored>',
          samples: [
            { input: '5\n3 1 4 1 9', output: 'Count: 5\nLast: 9' },
            { input: '1\n42',        output: 'Count: 1\nLast: 42' },
            { input: '3\n-5 0 7',    output: 'Count: 3\nLast: 7' }
          ],
          hint:
            'If your program prints a strange number for `Last`, you probably read position `n` instead ' +
            'of position `n - 1`.',
          cpp: {
            notes: [
              'Declare the array with a fixed maximum, such as `int a[100];`, before reading `n`.',
              'C++ does not check array bounds, so a wrong position gives a meaningless value rather than an error.',
              'The last stored value is `a[n - 1]`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Create the array after reading `n`: `int[] a = new int[n];`',
              'The last stored value is `a[n - 1]`, which is also `a[a.length - 1]` here.',
              'Reading `a[n]` would throw `ArrayIndexOutOfBoundsException` at run time.'
            ]
          }
        },
        {
          title: 'Read a List of Grades',
          difficulty: 'Easy',
          description:
            'Read a count and then that many grades into an array, and report the first and the last ' +
            'grade stored.',
          input: 'First a whole number `n`, then `n` whole numbers: the grades.',
          output:
            'Two lines:\n' +
            'First: <first grade>\n' +
            'Last: <last grade>',
          samples: [
            { input: '5\n88 72 95 60 79', output: 'First: 88\nLast: 79' },
            { input: '2\n100 0',          output: 'First: 100\nLast: 0' },
            { input: '1\n55',             output: 'First: 55\nLast: 55' }
          ],
          hint:
            'Sample 3 is worth checking. A solution that assumes there are at least two grades will get ' +
            'it wrong.',
          cpp: {
            notes: [
              'Fill the array with the standard `for (int i = 0; i < n; i++) cin >> a[i];` loop.',
              'The first grade is `a[0]` and the last is `a[n - 1]`.',
              'When `n` is 1, both expressions refer to the same element, which is correct.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Fill the array with the standard `for (int i = 0; i < n; i++) a[i] = sc.nextInt();` loop.',
              'The first grade is `a[0]` and the last is `a[a.length - 1]`.',
              'When `n` is 1, both expressions refer to the same element, which is correct.'
            ]
          }
        },
        {
          title: 'Read Salaries with Validation',
          difficulty: 'Medium',
          description:
            'Read a count and then that many salaries into an array. Every salary must be greater than ' +
            'zero. As soon as an invalid salary appears, print an error message and stop the program ' +
            'without reading any further.',
          input: 'First a whole number `n`, then `n` decimal numbers: the salaries.',
          output:
            'If every salary is greater than 0, one line:\n' +
            'All salaries accepted\n\n' +
            'Otherwise, one line:\n' +
            'Invalid salary',
          samples: [
            { input: '3\n5000 4200.5 3100',  output: 'All salaries accepted' },
            { input: '3\n5000 -20 3100',     output: 'Invalid salary' },
            { input: '2\n0 1000',            output: 'Invalid salary' }
          ],
          hint:
            'This combines two things you already know: the filling loop from this objective and the ' +
            'validate-then-stop pattern from Module 2.',
          cpp: {
            notes: [
              'Check the value right after reading it, inside the loop.',
              'Print the message and `return 0;` to leave the program from inside the loop.',
              'The array is `double a[100];` with a fixed maximum size.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Check the value right after reading it, inside the loop.',
              'Print the message and `return;` to leave the program from inside the loop.',
              'Create the array with `double[] a = new double[n];` after reading `n`.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 3 — display with a for loop ================= */
    {
      title: 'Displaying an Array with a `for` Loop',
      summary:
        'Printing an array uses the same loop shape as filling it. The only difference is that the ' +
        'position is often shown to the user as a number starting from 1 rather than from 0.',
      points: [
        'The array position starts at 0, but people count from 1.',
        'Print `i + 1` when the user should see a position number, while still reading `a[i]`.',
        'Filling and printing are usually two separate loops, one after the other.',
        'One print statement inside the loop produces one line per element.',
        'Formatting set before the loop, such as two decimal digits, applies to every line it prints.'
      ],
      example: {
        cpp:
          'for (int i = 0; i < n; i++) {\n' +
          '    cout << i + 1 << ": " << a[i] << endl;\n' +
          '}\n' +
          '// position shown to the user is i + 1, element read is a[i]',
        java:
          'for (int i = 0; i < n; i++) {\n' +
          '    System.out.println((i + 1) + ": " + a[i]);\n' +
          '}\n' +
          '// position shown to the user is i + 1, element read is a[i]'
      },
      exercises: [
        {
          title: 'Display All Entered Integers',
          difficulty: 'Easy',
          description:
            'Read a count and then that many integers into an array. After all of them have been read, ' +
            'print them back, one per line, in the same order.',
          input: 'First a whole number `n`, then `n` whole numbers.',
          output: '`n` lines, each holding one value, in the order they were read.',
          samples: [
            { input: '4\n7 2 9 4', output: '7\n2\n9\n4' },
            { input: '1\n-8',      output: '-8' },
            { input: '3\n0 0 5',   output: '0\n0\n5' }
          ],
          hint:
            'Two loops in sequence: one to fill, one to print. Printing inside the filling loop would ' +
            'also produce the right output here, but it would not for the next exercises.',
          cpp: {
            notes: [
              'The two loops share the same shape but use separate counters, each declared in its own `for`.',
              'Print with `cout << a[i] << endl;`',
              'This is the moment the array actually earns its place — the values must survive until after the reading is over.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'The two loops share the same shape but use separate counters, each declared in its own `for`.',
              'Print with `System.out.println(a[i]);`',
              'This is the moment the array actually earns its place — the values must survive until after the reading is over.'
            ]
          }
        },
        {
          title: 'Display Grades with Position Numbers',
          difficulty: 'Easy',
          description:
            'Read a count and then that many grades. Print each grade next to its position in the list, ' +
            'counting from 1.',
          input: 'First a whole number `n`, then `n` whole numbers: the grades.',
          output:
            '`n` lines, each in the form:\n' +
            '<position>: <grade>\n\n' +
            'Positions start at 1.',
          samples: [
            { input: '3\n88 72 95', output: '1: 88\n2: 72\n3: 95' },
            { input: '1\n60',       output: '1: 60' },
            { input: '2\n100 0',    output: '1: 100\n2: 0' }
          ],
          hint:
            'The number you print and the position you read from differ by one. Do not change the loop ' +
            'to start at 1 — that would skip the first element.',
          cpp: {
            notes: [
              'Keep the loop as `for (int i = 0; i < n; i++)` and print `i + 1`.',
              'The whole line is `cout << i + 1 << ": " << a[i] << endl;`',
              'Starting the loop at 1 instead would miss `a[0]` entirely.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Keep the loop as `for (int i = 0; i < n; i++)` and print `i + 1`.',
              'With `+` joining, wrap the arithmetic in parentheses: `(i + 1) + ": " + a[i]`.',
              '`System.out.printf("%d: %d%n", i + 1, a[i]);` avoids the parentheses problem entirely.'
            ]
          }
        },
        {
          title: 'Salary Report',
          difficulty: 'Easy',
          description:
            'Read a count and then that many salaries. Print a report with one line per employee, ' +
            'showing the employee number and the salary.',
          input: 'First a whole number `n`, then `n` decimal numbers: the salaries.',
          output:
            '`n` lines, each in the form:\n' +
            'Employee <number>: <salary>\n\n' +
            'Employee numbers start at 1 and each salary is printed with exactly two digits after the ' +
            'decimal point.',
          samples: [
            {
              input: '3\n3200.5 4100 2750.75',
              output: 'Employee 1: 3200.50\nEmployee 2: 4100.00\nEmployee 3: 2750.75'
            },
            {
              input: '1\n9999.99',
              output: 'Employee 1: 9999.99'
            },
            {
              input: '2\n1000 1000',
              output: 'Employee 1: 1000.00\nEmployee 2: 1000.00'
            }
          ],
          hint:
            'The decimal formatting can be set once, before the loop, rather than repeated on every line.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              '`cout << fixed << setprecision(2);` written once before the loop covers every line.',
              'The line is `cout << "Employee " << i + 1 << ": " << a[i] << endl;`',
              'The employee number is an `int`, so the formatting does not affect it.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              '`System.out.printf("Employee %d: %.2f%n", i + 1, a[i]);` handles the number and the formatting together.',
              '`%d` takes a whole number and `%.2f` takes a decimal one, in the order the arguments are given.',
              'Passing them the wrong way round throws an `IllegalFormatConversionException`.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 4 — analysis ================= */
    {
      title: 'Array Analysis',
      summary:
        'Once the values are in an array you can walk through them and answer questions about the whole ' +
        'set: how many, how much, the largest and the smallest.',
      points: [
        'Counting, totalling and searching are all the same loop with a different body.',
        'One pass can answer several questions at once — there is no need for a loop per question.',
        'To find the largest value, start from the first element and replace it whenever a bigger one appears.',
        'Starting a maximum at 0 is a bug whenever the data can be entirely negative.',
        'An average must be calculated after the loop, from the total and the count.'
      ],
      example: {
        cpp:
          'double highest = a[0];              // start from a real element\n' +
          'for (int i = 1; i < n; i++) {\n' +
          '    if (a[i] > highest) {\n' +
          '        highest = a[i];\n' +
          '    }\n' +
          '}',
        java:
          'double highest = a[0];              // start from a real element\n' +
          'for (int i = 1; i < n; i++) {\n' +
          '    if (a[i] > highest) {\n' +
          '        highest = a[i];\n' +
          '    }\n' +
          '}'
      },
      exercises: [
        {
          title: 'Grade Analysis',
          difficulty: 'Medium',
          description:
            'Read a count and then that many grades into an array. Report how many students passed, how ' +
            'many failed, and the average grade. The passing mark is 50.',
          input: 'First a whole number `n`, then `n` whole numbers: the grades.',
          output:
            'Three lines:\n' +
            'Passed: <count>\n' +
            'Failed: <count>\n' +
            'Average: <average>\n\n' +
            'The average is printed with exactly two digits after the decimal point.',
          samples: [
            { input: '5\n88 42 67 95 30', output: 'Passed: 3\nFailed: 2\nAverage: 64.40' },
            { input: '3\n50 49 51',       output: 'Passed: 2\nFailed: 1\nAverage: 50.00' },
            { input: '2\n0 100',          output: 'Passed: 1\nFailed: 1\nAverage: 50.00' }
          ],
          hint:
            'You solved this in Module 3 without an array. Try it again here and notice that the array ' +
            'lets you separate reading the data from analysing it.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Fill the array first, then analyse it in a second loop.',
              'One analysis loop can update all three variables — a pass counter, a fail counter and a total.',
              'Cast before dividing: `(double)sum / n`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Fill the array first, then analyse it in a second loop.',
              'One analysis loop can update all three variables — a pass counter, a fail counter and a total.',
              'Cast before dividing: `(double) sum / n`.'
            ]
          }
        },
        {
          title: 'Salary Statistics',
          difficulty: 'Medium',
          description:
            'Read a count and then that many salaries into an array. Report the total, the average, the ' +
            'highest and the lowest salary.',
          input: 'First a whole number `n`, then `n` decimal numbers: the salaries.',
          output:
            'Four lines:\n' +
            'Total: <total>\n' +
            'Average: <average>\n' +
            'Highest: <highest>\n' +
            'Lowest: <lowest>\n\n' +
            'All four values are printed with exactly two digits after the decimal point.',
          samples: [
            {
              input: '5\n3000 4500 2800 6200 5100',
              output: 'Total: 21600.00\nAverage: 4320.00\nHighest: 6200.00\nLowest: 2800.00'
            },
            {
              input: '1\n7250.5',
              output: 'Total: 7250.50\nAverage: 7250.50\nHighest: 7250.50\nLowest: 7250.50'
            },
            {
              input: '3\n1200.25 1200.25 999.75',
              output: 'Total: 3400.25\nAverage: 1133.42\nHighest: 1200.25\nLowest: 999.75'
            }
          ],
          hint:
            'Start the highest and the lowest at the first element of the array, then compare from the ' +
            'second element onward. Starting them at 0 would make the lowest wrong for every input here.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Initialise both `highest` and `lowest` to `a[0]` before the comparison loop.',
              'The comparison loop can start at `i = 1`, since element 0 is already accounted for.',
              'Set `fixed` and `setprecision(2)` once, before printing any of the four lines.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Initialise both `highest` and `lowest` to `a[0]` before the comparison loop.',
              'The comparison loop can start at `i = 1`, since element 0 is already accounted for.',
              '`Math.max` and `Math.min` are a neat alternative to the `if`, and take two values at a time.'
            ]
          }
        },
        {
          title: 'Number Classification',
          difficulty: 'Medium',
          description:
            'Read a count and then that many integers into an array. Report four counts: how many are ' +
            'positive, how many are negative, how many are even and how many are odd.',
          input: 'First a whole number `n`, then `n` whole numbers.',
          output:
            'Four lines:\n' +
            'Positive: <count>\n' +
            'Negative: <count>\n' +
            'Even: <count>\n' +
            'Odd: <count>',
          samples: [
            { input: '6\n4 -7 0 9 -2 6',  output: 'Positive: 3\nNegative: 2\nEven: 4\nOdd: 2' },
            { input: '3\n1 3 5',          output: 'Positive: 3\nNegative: 0\nEven: 0\nOdd: 3' },
            { input: '2\n0 0',            output: 'Positive: 0\nNegative: 0\nEven: 2\nOdd: 0' }
          ],
          hint:
            'Sign and parity are two separate questions about each value. Sample 3 shows why zero must ' +
            'be excluded from both the positive and the negative count while still counting as even.',
          cpp: {
            notes: [
              'Four counters, all declared before the loop and set to 0.',
              'Two independent `if` statements per element: one for the sign, one for the parity.',
              'Use `a[i] % 2 == 0` for even, which is correct for negative values too.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Four counters, all declared before the loop and set to 0.',
              'Two independent `if` statements per element: one for the sign, one for the parity.',
              'Use `a[i] % 2 == 0` for even, which is correct for negative values too.'
            ]
          }
        }
      ]
    }
  ]
});
