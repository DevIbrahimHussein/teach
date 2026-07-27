/* Programming Fundamentals — Module 1: Basics */

Curriculum.addModule('fundamentals', {
  number: 1,
  title: 'Basics',
  summary: 'Data types, reading input, printing output, arithmetic, and operator precedence.',
  objectives: [

    /* ================= Objective 1 — Data Types ================= */
    {
      title: 'Data Types',
      summary:
        'A variable is a named box in memory. Its type decides what can go inside it and how the ' +
        'value behaves. Choose the type from the meaning of the data, not from habit.',
      points: [
        'Whole numbers — counts, IDs, ages, quantities → `int`.',
        'Numbers with a fractional part — prices, averages, salaries → `double`.',
        'A single character — a section letter, a grade letter, `Y` / `N` → `char`.',
        'Text of any length — names, departments → `string` in C++, `String` in Java.',
        'Declare a variable before using it, and give it a name that says what it holds.',
        'A `char` value is written between single quotes; text is written between double quotes.'
      ],
      example: {
        cpp:
          'int id = 1021;\n' +
          'double average = 88.5;\n' +
          'char section = \'A\';\n' +
          'string name = "Sara Ahmed";',
        java:
          'int id = 1021;\n' +
          'double average = 88.5;\n' +
          'char section = \'A\';\n' +
          'String name = "Sara Ahmed";'
      },
      exercises: [
        {
          title: 'Student Information Card',
          difficulty: 'Easy',
          description:
            'Declare four variables that describe one student and print them. The values are written ' +
            'directly in your code — the program reads nothing from the keyboard. Pick a suitable ' +
            'data type for each piece of information.',
          input: 'None. All values are assigned inside the program.',
          output:
            'Four lines, in this exact order and wording:\n' +
            'ID: <id>\n' +
            'Name: <name>\n' +
            'Average: <average>\n' +
            'Section: <section>\n\n' +
            'Print the average with exactly one digit after the decimal point.',
          samples: [
            { input: '-', output: 'ID: 1021\nName: Sara Ahmed\nAverage: 88.5\nSection: A' },
            { input: '-', output: 'ID: 3407\nName: Omar Khalid\nAverage: 71.0\nSection: C' }
          ],
          hint:
            'Read the shape of each value before choosing its type: whole number, decimal number, ' +
            'one letter, or several letters.',
          cpp: {
            includes: ['<string>', '<iomanip>'],
            notes: [
              'The four types you need are `int`, `string`, `double` and `char`.',
              '`string` requires `#include <string>`.',
              'One digit after the decimal point: `cout << fixed << setprecision(1) << average;` — this needs `#include <iomanip>` and stays in effect for the rest of the program.',
              'End a line with `endl` or with `"\\n"`.'
            ]
          },
          java: {
            notes: [
              'The four types you need are `int`, `String`, `double` and `char`. `String` is built in — nothing to import.',
              'One digit after the decimal point: `System.out.printf("Average: %.1f%n", average);`',
              '`System.out.println(...)` prints a value and moves to the next line; `System.out.print(...)` does not.'
            ]
          }
        },
        {
          title: 'Product Price Tag',
          difficulty: 'Easy',
          description:
            'Read the unit price and the quantity of a product from the keyboard, store each one in a ' +
            'variable of the correct type, and print them back with labels.',
          input:
            'Two values, separated by a space or a new line:\n' +
            '1. the unit price (a decimal number)\n' +
            '2. the quantity (a whole number)',
          output:
            'Two lines:\n' +
            'Price: <price>\n' +
            'Quantity: <quantity>\n\n' +
            'The price is always printed with exactly two digits after the decimal point. ' +
            'The quantity is printed as a whole number, with no decimal point.',
          samples: [
            { input: '12.5\n3',    output: 'Price: 12.50\nQuantity: 3' },
            { input: '0.75\n120',  output: 'Price: 0.75\nQuantity: 120' },
            { input: '1499.9\n1',  output: 'Price: 1499.90\nQuantity: 1' }
          ],
          hint:
            'The two values need different types. Storing the price in a whole-number variable would ' +
            'silently throw the fraction away.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Read with `cin >> price >> quantity;` — one `cin` statement can read several values.',
              'Two decimals: `cout << fixed << setprecision(2);` once, before printing the price.',
              '`fixed`/`setprecision` affect only floating-point values, so the quantity still prints as `3`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read with `sc.nextDouble()` for the price and `sc.nextInt()` for the quantity, in that order.',
              'Two decimals: `System.out.printf("Price: %.2f%n", price);`',
              'Print the quantity with `System.out.println("Quantity: " + quantity);`'
            ]
          }
        },
        {
          title: 'Employee Summary',
          difficulty: 'Easy',
          description:
            'Read three pieces of information about one employee — an ID number, a salary and a ' +
            'performance grade letter — then print a short summary. Each value needs a different type.',
          input:
            'Three values, separated by spaces or new lines:\n' +
            '1. the employee ID (a whole number)\n' +
            '2. the salary (a decimal number)\n' +
            '3. the performance grade (a single uppercase letter)',
          output:
            'Three lines:\n' +
            'Employee ID: <id>\n' +
            'Salary: <salary>\n' +
            'Grade: <grade>\n\n' +
            'The salary is printed with exactly two digits after the decimal point.',
          samples: [
            { input: '4507 8250 B',     output: 'Employee ID: 4507\nSalary: 8250.00\nGrade: B' },
            { input: '1198 12750.5 A',  output: 'Employee ID: 1198\nSalary: 12750.50\nGrade: A' },
            { input: '6002 3400.25 C',  output: 'Employee ID: 6002\nSalary: 3400.25\nGrade: C' }
          ],
          hint:
            'Three values, three different types. The grade is a single letter, so it does not need ' +
            'a text type.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'A `char` is read with `cin >> grade;` just like any other value — `cin` skips the spaces for you.',
              'Set `fixed` and `setprecision(2)` before printing the salary.',
              'Printing a `char` with `cout` shows the letter itself, not a number code.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              '`Scanner` has no `nextChar()`. Read the grade as a one-letter word and take its first character: `char grade = sc.next().charAt(0);`',
              'Read the ID with `sc.nextInt()` and the salary with `sc.nextDouble()`.',
              'Two decimals: `System.out.printf("Salary: %.2f%n", salary);`'
            ]
          }
        }
      ]
    },

    /* ================= Objective 2 — Input and Output ================= */
    {
      title: 'Input and Output',
      summary:
        'Input copies values typed by the user into your variables. Output writes values back to the ' +
        'screen. Read in the order the problem states, and print exactly the text the problem asks for.',
      points: [
        'Values are read one after another, separated by spaces or new lines.',
        'Reading a word stops at the first space, so `Sara Ahmed` would be read as two separate values.',
        'The labels in the Output section are part of the answer — spelling, spaces and punctuation must match.',
        'Do not print prompts such as `Enter your name:` unless the exercise asks for them.',
        'Joining text and numbers: C++ chains them with `<<`, Java joins them with `+`.'
      ],
      example: {
        cpp:
          'string name;\n' +
          'int age;\n' +
          'cin >> name >> age;\n' +
          'cout << "Welcome " << name << ", age " << age << endl;',
        java:
          'Scanner sc = new Scanner(System.in);\n' +
          'String name = sc.next();\n' +
          'int age = sc.nextInt();\n' +
          'System.out.println("Welcome " + name + ", age " + age);'
      },
      exercises: [
        {
          title: 'Welcome Message',
          difficulty: 'Easy',
          description:
            'Read a student\'s first name and age, then greet them in a single sentence.',
          input:
            'Two values, separated by a space or a new line:\n' +
            '1. the first name (one word, no spaces)\n' +
            '2. the age (a whole number)',
          output:
            'One line, exactly:\n' +
            'Welcome <name>! You are <age> years old.',
          samples: [
            { input: 'Sara 19',  output: 'Welcome Sara! You are 19 years old.' },
            { input: 'Omar\n22', output: 'Welcome Omar! You are 22 years old.' },
            { input: 'Layla 7',  output: 'Welcome Layla! You are 7 years old.' }
          ],
          hint:
            'Build the sentence in one print statement. Watch the spaces around the name and the age — ' +
            'they are inside the text, not automatic.',
          cpp: {
            includes: ['<string>'],
            notes: [
              '`cin >> name` reads one word and stops at the first space.',
              'Chain the pieces: `cout << "Welcome " << name << "! You are " << age << " years old." << endl;`',
              'The space before `<< name` must be inside the quotes.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              '`sc.next()` reads one word; `sc.nextInt()` reads the number.',
              'Join with `+`: `System.out.println("Welcome " + name + "! You are " + age + " years old.");`',
              'When one side of `+` is text, Java converts the number to text automatically.'
            ]
          }
        },
        {
          title: 'Two Labeled Numbers',
          difficulty: 'Easy',
          description:
            'Read two decimal numbers and print each one on its own line under a clear label. ' +
            'Nothing is calculated — this exercise is about reading in order and printing exactly.',
          input: 'Two decimal numbers, separated by a space or a new line.',
          output:
            'Two lines:\n' +
            'First: <first>\n' +
            'Second: <second>\n\n' +
            'Both numbers are printed with exactly two digits after the decimal point.',
          samples: [
            { input: '4.5 12.25',   output: 'First: 4.50\nSecond: 12.25' },
            { input: '100\n0.5',    output: 'First: 100.00\nSecond: 0.50' },
            { input: '-3.75 8',     output: 'First: -3.75\nSecond: 8.00' }
          ],
          hint:
            'The order matters. The first value you read is the one printed after `First:`.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Declare both variables as `double`, then read them with a single `cin >> a >> b;`',
              '`cout << fixed << setprecision(2);` written once applies to both numbers.',
              'A negative sign is printed automatically — you do not handle it yourself.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Call `sc.nextDouble()` twice, storing the results in two separate variables.',
              '`System.out.printf("First: %.2f%n", a);` then the same for the second value.',
              '`%n` ends the line; using `\\n` also works.'
            ]
          }
        },
        {
          title: 'Employee Report',
          difficulty: 'Easy',
          description:
            'Read a name, a department code and a salary for one employee, then print a three-line ' +
            'report. The values are read in one order and printed in the same order.',
          input:
            'Three values, separated by spaces or new lines:\n' +
            '1. the employee name (one word, no spaces)\n' +
            '2. the department code (a whole number)\n' +
            '3. the salary (a decimal number)',
          output:
            'Three lines:\n' +
            'Employee: <name>\n' +
            'Department: <code>\n' +
            'Salary: <salary>\n\n' +
            'The salary is printed with exactly two digits after the decimal point.',
          samples: [
            { input: 'Ahmed 12 7300',      output: 'Employee: Ahmed\nDepartment: 12\nSalary: 7300.00' },
            { input: 'Nour\n5\n4850.75',   output: 'Employee: Nour\nDepartment: 5\nSalary: 4850.75' },
            { input: 'Yassin 30 15000.5',  output: 'Employee: Yassin\nDepartment: 30\nSalary: 15000.50' }
          ],
          hint:
            'Three values of three different types, read in the stated order. Print each on its own line.',
          cpp: {
            includes: ['<string>', '<iomanip>'],
            notes: [
              'One statement can read all three: `cin >> name >> code >> salary;` — the types must match the order.',
              'Set `fixed` and `setprecision(2)` before printing the salary.',
              'Each line ends with `endl` or `"\\n"`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Read in order: `sc.next()`, then `sc.nextInt()`, then `sc.nextDouble()`.',
              'Use `System.out.println` for the first two lines and `System.out.printf("Salary: %.2f%n", salary)` for the third.',
              'Calling the wrong `next...` method for a value throws `InputMismatchException` at run time.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 3 — Operations ================= */
    {
      title: 'Operations',
      summary:
        'The five arithmetic operators work on numbers. Division behaves differently for whole numbers ' +
        'and decimals, and the remainder operator works only on whole numbers.',
      points: [
        '`+`, `-` and `*` behave exactly as in mathematics.',
        '`/` between two `int` values throws the fraction away: `7 / 2` is `3`, not `3.5`.',
        '`%` gives the remainder of whole-number division: `7 % 2` is `1`.',
        'To get a decimal result from two integers, turn one of them into a decimal first.',
        'Dividing by zero is an error at run time — never let the divisor reach `0`.'
      ],
      example: {
        cpp:
          'int a = 7, b = 2;\n' +
          'cout << a / b << endl;           // 3   (whole-number division)\n' +
          'cout << a % b << endl;           // 1   (remainder)\n' +
          'cout << (double)a / b << endl;   // 3.5 (one side is decimal)',
        java:
          'int a = 7, b = 2;\n' +
          'System.out.println(a / b);            // 3   (whole-number division)\n' +
          'System.out.println(a % b);            // 1   (remainder)\n' +
          'System.out.println((double) a / b);   // 3.5 (one side is decimal)'
      },
      exercises: [
        {
          title: 'Five Results',
          difficulty: 'Easy',
          description:
            'Read two integers and print the result of all five arithmetic operators applied to them, ' +
            'in the order sum, difference, product, quotient, remainder.',
          input: 'Two whole numbers `a` and `b`, separated by a space or a new line.',
          output:
            'Five lines:\n' +
            'Sum: <a + b>\n' +
            'Difference: <a - b>\n' +
            'Product: <a * b>\n' +
            'Quotient: <a / b>\n' +
            'Remainder: <a % b>\n\n' +
            'The quotient is whole-number division: the fractional part is discarded, not rounded.',
          samples: [
            { input: '7 2',   output: 'Sum: 9\nDifference: 5\nProduct: 14\nQuotient: 3\nRemainder: 1' },
            { input: '20 4',  output: 'Sum: 24\nDifference: 16\nProduct: 80\nQuotient: 5\nRemainder: 0' },
            { input: '5 9',   output: 'Sum: 14\nDifference: -4\nProduct: 45\nQuotient: 0\nRemainder: 5' }
          ],
          hint:
            'Sample 3 is the interesting one: 5 divided by 9 gives a quotient of 0 with a remainder of 5. ' +
            'If your program prints `0.55...`, you used the wrong type.',
          cpp: {
            notes: [
              'Declare both variables as `int` so that `/` performs whole-number division.',
              'You can compute inside the print statement: `cout << "Sum: " << a + b << endl;`',
              '`%` is only defined for whole-number types in C++ — using it on a `double` is a compile error.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Declare both variables as `int` so that `/` performs whole-number division.',
              'You can compute inside the print statement, but wrap the arithmetic in parentheses: `System.out.println("Sum: " + (a + b));` — without them, `+` joins text instead of adding.',
              'Java allows `%` on `double` too, but this exercise uses whole numbers only.'
            ]
          }
        },
        {
          title: 'Invoice Total',
          difficulty: 'Easy',
          description:
            'A customer buys several units of the same product. Read the quantity and the unit price, ' +
            'then print the total amount to pay.',
          input:
            'Two values, separated by a space or a new line:\n' +
            '1. the quantity (a whole number)\n' +
            '2. the unit price (a decimal number)',
          output:
            'One line:\n' +
            'Total: <total>\n\n' +
            'The total is the quantity multiplied by the unit price, printed with exactly two digits ' +
            'after the decimal point.',
          samples: [
            { input: '3 12.5',    output: 'Total: 37.50' },
            { input: '10 0.75',   output: 'Total: 7.50' },
            { input: '1 1499.99', output: 'Total: 1499.99' }
          ],
          hint:
            'Multiplying a whole number by a decimal number gives a decimal result — the variable that ' +
            'stores the total must be able to hold a fraction.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Keep the quantity as `int` and the price as `double`; store the total in a `double`.',
              'C++ converts the `int` to `double` automatically when the two are multiplied.',
              '`cout << fixed << setprecision(2) << total;`'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Keep the quantity as `int` and the price as `double`; store the total in a `double`.',
              'Java converts the `int` to `double` automatically when the two are multiplied.',
              '`System.out.printf("Total: %.2f%n", total);`'
            ]
          }
        },
        {
          title: 'Seconds to Clock Time',
          difficulty: 'Medium',
          description:
            'A stopwatch reports a duration as a single number of seconds. Convert that number into ' +
            'whole hours, whole minutes and remaining seconds.',
          input: 'One whole number: the total number of seconds.',
          output:
            'Three lines:\n' +
            'Hours: <hours>\n' +
            'Minutes: <minutes>\n' +
            'Seconds: <seconds>\n\n' +
            'The minutes and the seconds must each be less than 60 — any full 60 becomes part of the ' +
            'larger unit.',
          samples: [
            { input: '3665',  output: 'Hours: 1\nMinutes: 1\nSeconds: 5' },
            { input: '59',    output: 'Hours: 0\nMinutes: 0\nSeconds: 59' },
            { input: '86399', output: 'Hours: 23\nMinutes: 59\nSeconds: 59' }
          ],
          hint:
            'Whole-number division tells you how many complete units fit; the remainder tells you what ' +
            'is left over for the next unit down.',
          cpp: {
            notes: [
              'Use `int` everywhere — this exercise depends on whole-number division discarding the fraction.',
              '`/` and `%` on the same pair of values give you the two halves of the answer.',
              'Compute the larger unit first, then work with what remains.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Use `int` everywhere — this exercise depends on whole-number division discarding the fraction.',
              '`/` and `%` on the same pair of values give you the two halves of the answer.',
              'Print with `System.out.println("Hours: " + hours);` and so on.'
            ]
          }
        }
      ]
    },

    /* ================= Objective 4 — Order of Precedence ================= */
    {
      title: 'Order of Precedence',
      summary:
        'When one expression contains several operators, the language decides which runs first. ' +
        '`*`, `/` and `%` run before `+` and `-`. Parentheses override that order.',
      points: [
        '`2 + 3 * 4` is `14`, not `20` — the multiplication happens first.',
        '`(2 + 3) * 4` is `20` — parentheses come first.',
        'Operators of equal priority run from left to right: `20 / 5 * 2` is `8`, not `2`.',
        'A sum divided by a count almost always needs parentheses around the sum.',
        'Extra parentheses cost nothing at run time and make the intent obvious.'
      ],
      example: {
        cpp:
          'double avg   = (g1 + g2 + g3) / 3.0;   // correct: the whole sum is divided\n' +
          'double wrong = g1 + g2 + g3 / 3.0;     // only g3 is divided',
        java:
          'double avg   = (g1 + g2 + g3) / 3.0;   // correct: the whole sum is divided\n' +
          'double wrong = g1 + g2 + g3 / 3.0;     // only g3 is divided'
      },
      exercises: [
        {
          title: 'Average of Three Grades',
          difficulty: 'Easy',
          description:
            'Read three grades and print their average. The whole point of this exercise is placing ' +
            'the parentheses correctly — without them the division applies to the last grade only.',
          input: 'Three decimal numbers, separated by spaces or new lines.',
          output:
            'One line:\n' +
            'Average: <average>\n\n' +
            'The average is printed with exactly two digits after the decimal point.',
          samples: [
            { input: '90 80 60',          output: 'Average: 76.67' },
            { input: '100 100 100',       output: 'Average: 100.00' },
            { input: '55.5 60 71.25',     output: 'Average: 62.25' }
          ],
          hint:
            'If your answer for `90 80 60` is `190.00`, the division was applied to the third grade only.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Store the grades as `double` so no fraction is lost.',
              'Wrap the sum: `(g1 + g2 + g3) / 3.0`.',
              'Divide by `3.0` rather than `3` — a habit that saves you when the grades are `int`.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Store the grades as `double` so no fraction is lost.',
              'Wrap the sum: `(g1 + g2 + g3) / 3.0`.',
              'Divide by `3.0` rather than `3` — a habit that saves you when the grades are `int`.'
            ]
          }
        },
        {
          title: 'Rectangle Area and Perimeter',
          difficulty: 'Easy',
          description:
            'Read the length and the width of a rectangle and print both its area and its perimeter. ' +
            'The perimeter formula needs parentheses; the area formula does not.',
          input:
            'Two decimal numbers, separated by a space or a new line:\n' +
            '1. the length\n' +
            '2. the width',
          output:
            'Two lines:\n' +
            'Area: <area>\n' +
            'Perimeter: <perimeter>\n\n' +
            'Both values are printed with exactly two digits after the decimal point.',
          samples: [
            { input: '5 3',    output: 'Area: 15.00\nPerimeter: 16.00' },
            { input: '2.5 4',  output: 'Area: 10.00\nPerimeter: 13.00' },
            { input: '10 10',  output: 'Area: 100.00\nPerimeter: 40.00' }
          ],
          hint:
            'Writing the perimeter as `2 * length + width` multiplies only the length. Compare that with ' +
            '`2 * (length + width)`.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'Both dimensions are `double`, so both results are `double`.',
              '`cout << fixed << setprecision(2);` once covers both lines.',
              'The multiplication sign cannot be left out: `2(a + b)` is not valid C++.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'Both dimensions are `double`, so both results are `double`.',
              'Use `System.out.printf` twice, or once with two `%.2f` placeholders and a `%n` between them.',
              'The multiplication sign cannot be left out: `2(a + b)` is not valid Java.'
            ]
          }
        },
        {
          title: 'Final Price After Tax and Discount',
          difficulty: 'Medium',
          description:
            'A shop adds a tax percentage to the original price of an item, then subtracts a fixed ' +
            'discount amount from the result. Read the three values and print the final price. ' +
            'The order in which the operators run decides whether the answer is right.',
          input:
            'Three decimal numbers, separated by spaces or new lines:\n' +
            '1. the original price\n' +
            '2. the tax percentage\n' +
            '3. the fixed discount amount',
          output:
            'One line:\n' +
            'Final price: <price>\n\n' +
            'Printed with exactly two digits after the decimal point.',
          samples: [
            { input: '200 15 30',   output: 'Final price: 200.00' },
            { input: '99.99 10 0',  output: 'Final price: 109.99' },
            { input: '500 5 75',    output: 'Final price: 450.00' }
          ],
          hint:
            'Check sample 1 by hand: 15% of 200 is 30, so 200 + 30 − 30 = 200. If your program prints ' +
            'something else, look at which values the `/ 100` is attached to.',
          cpp: {
            includes: ['<iomanip>'],
            notes: [
              'All three inputs are `double`, so `/ 100` keeps its fraction.',
              '`price * tax / 100` runs left to right and is already correct, but parentheses make it clearer.',
              'Because `*` and `/` outrank `+` and `-`, the tax part is computed before the addition.'
            ]
          },
          java: {
            scanner: true,
            notes: [
              'All three inputs are `double`, so `/ 100` keeps its fraction.',
              '`price * tax / 100` runs left to right and is already correct, but parentheses make it clearer.',
              'Writing `/ 100` with `int` values would discard the fraction — one reason to keep everything `double`.'
            ]
          }
        }
      ]
    }
  ]
});
