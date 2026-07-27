/* Programming Fundamentals — Module 5: Functions */

/* The generated starter templates put every line inside `main`, which is exactly what
   this module moves away from. These two helpers place the required functions above
   `main` in C++, and beside `main` — always `static` — in Java. Each exercise passes
   the signatures it asks for, so the student sees where the code goes, never what
   goes in it. */
(function () {

  function cppStarter(signatures, includes) {
    var lines = ['<iostream>'].concat(includes || []).map(function (h) {
      return '#include ' + h;
    });
    lines.push('using namespace std;', '');
    (signatures || []).forEach(function (s) {
      lines.push(s + ' {', '    // your code here', '}', '');
    });
    lines.push('int main() {', '    // your code here', '', '    return 0;', '}');
    return lines.join('\n');
  }

  /* `scanner` is false, true, or 'field' — the last one when a function other than
     main does the reading and so needs the Scanner to exist outside main. */
  function javaStarter(signatures, scanner) {
    var lines = [];
    if (scanner) lines.push('import java.util.Scanner;', '');
    lines.push('public class Main {', '');
    if (scanner === 'field') lines.push('    static Scanner sc = new Scanner(System.in);', '');
    (signatures || []).forEach(function (s) {
      lines.push('    ' + s + ' {', '        // your code here', '    }', '');
    });
    lines.push('    public static void main(String[] args) {');
    if (scanner === true) lines.push('        Scanner sc = new Scanner(System.in);');
    lines.push('        // your code here', '    }', '}');
    return lines.join('\n');
  }

  Curriculum.addModule('fundamentals', {
    number: 5,
    title: 'Functions',
    summary:
      'Splitting a program into named blocks: returning values, acting without returning, ' +
      'passing arrays, and functions that call themselves.',
    objectives: [

      /* ================= Objective 1 — functions that return a value ================= */
      {
        title: 'Functions That Return a Value',
        summary:
          'A function is a named piece of code that takes some values, works on them, and hands one ' +
          'answer back. Writing it once means calling it as often as you like.',
        points: [
          'The header states three things: the type of the answer, the name, and the values expected.',
          '`return` hands the answer back and ends the function immediately — nothing after it runs.',
          'Parameters are ordinary variables that exist only inside the function.',
          'The function computes; the caller decides what to do with the answer, usually printing it.',
          'In C++ the function must appear above `main`, or be announced above it by a prototype.',
          'In Java a method called from `main` must be marked `static`, because `main` itself is static.'
        ],
        example: {
          cpp:
            'int square(int x) {        // returns int, is named square, expects one int\n' +
            '    return x * x;          // the answer goes back to the caller\n' +
            '}\n' +
            '\n' +
            'int main() {\n' +
            '    int result = square(6);   // result is 36\n' +
            '    cout << result << endl;\n' +
            '    return 0;\n' +
            '}',
          java:
            'static int square(int x) {    // returns int, is named square, expects one int\n' +
            '    return x * x;             // the answer goes back to the caller\n' +
            '}\n' +
            '\n' +
            'public static void main(String[] args) {\n' +
            '    int result = square(6);   // result is 36\n' +
            '    System.out.println(result);\n' +
            '}'
        },
        exercises: [
          {
            title: 'Sum of Two Numbers',
            difficulty: 'Easy',
            description:
              'Write a function `sum` that takes two whole numbers and returns their total. Read two ' +
              'whole numbers in `main`, call the function once, and print the answer it returns.',
            input: 'Two whole numbers on one line, separated by a space.',
            output:
              'One line:\n' +
              'Sum: <total>',
            samples: [
              { input: '7 5',     output: 'Sum: 12' },
              { input: '-4 4',    output: 'Sum: 0' },
              { input: '100 250', output: 'Sum: 350' }
            ],
            constraints: [
              'Both values are whole numbers and may be negative.',
              'The function returns the total — it must not print anything.',
              'All printing happens in `main`.',
              'The function is called exactly once.'
            ],
            hint:
              'Two jobs, two places. The function knows how to add; only `main` knows how the answer ' +
              'should look on screen.',
            cpp: {
              starter: cppStarter(['int sum(int a, int b)']),
              notes: [
                'The header is `int sum(int a, int b)` — the first `int` is the type of the answer.',
                'The whole body is one line: `return a + b;`',
                'The function must sit above `main`, otherwise `main` does not know it exists.'
              ]
            },
            java: {
              starter: javaStarter(['static int sum(int a, int b)'], true),
              scanner: true,
              notes: [
                'The header is `static int sum(int a, int b)` — the first `int` is the type of the answer.',
                'The whole body is one line: `return a + b;`',
                'Leaving out `static` gives "non-static method cannot be referenced from a static context".'
              ]
            }
          },
          {
            title: 'The Larger of Two Numbers',
            difficulty: 'Easy',
            description:
              'Write a function `larger` that takes two whole numbers and returns the bigger one. Read ' +
              'two numbers in `main` and print what the function returns.',
            input: 'Two whole numbers on one line, separated by a space.',
            output:
              'One line:\n' +
              'Larger: <value>',
            samples: [
              { input: '9 4',   output: 'Larger: 9' },
              { input: '3 12',  output: 'Larger: 12' },
              { input: '5 5',   output: 'Larger: 5' }
            ],
            constraints: [
              'Both values are whole numbers and may be negative.',
              'When the two values are equal, that value is the answer, as sample 3 shows.',
              'The function returns the value — it must not print anything.'
            ],
            hint:
              'The condition you wrote in Module 2 does not change. It simply moves inside a function ' +
              'and ends with `return` instead of a print statement.',
            cpp: {
              starter: cppStarter(['int larger(int a, int b)']),
              notes: [
                'A function may hold more than one `return`; the first one reached ends it.',
                'An `if` / `else` with a `return` in each branch is enough.',
                '`max(a, b)` exists in C++, but write the comparison yourself here.'
              ]
            },
            java: {
              starter: javaStarter(['static int larger(int a, int b)'], true),
              scanner: true,
              notes: [
                'A method may hold more than one `return`; the first one reached ends it.',
                'An `if` / `else` with a `return` in each branch is enough.',
                '`Math.max(a, b)` exists, but write the comparison yourself here.'
              ]
            }
          },
          {
            title: 'Net Salary',
            difficulty: 'Medium',
            description:
              'Write a function `netSalary` that takes a gross salary and a deduction rate given as a ' +
              'percentage, and returns the salary left after the deduction. Read both values in `main` ' +
              'and print the result.',
            input: 'Two decimal numbers on one line: the gross salary, then the deduction rate.',
            output:
              'One line:\n' +
              'Net: <amount>\n\n' +
              'Printed with exactly two digits after the decimal point.',
            samples: [
              { input: '5000 10',     output: 'Net: 4500.00' },
              { input: '3200.50 0',   output: 'Net: 3200.50' },
              { input: '4000 12.5',   output: 'Net: 3500.00' }
            ],
            constraints: [
              'The gross salary is greater than 0.',
              'The rate is between 0 and 100 and may have a fraction.',
              'A rate of 0 leaves the salary unchanged, as sample 2 shows.',
              'The function returns a decimal number; the formatting is done in `main`.'
            ],
            hint:
              'The rate arrives as 10, not as 0.10. Convert it inside the function, and the caller ' +
              'never has to think about it.',
            cpp: {
              starter: cppStarter(['double netSalary(double gross, double rate)'], ['<iomanip>']),
              notes: [
                'Both parameters and the return type are `double`, since money and rates carry fractions.',
                'Dividing by `100` in a `double` expression is safe; the values are already decimal.',
                'Print in `main` with `fixed` and `setprecision(2)`.'
              ]
            },
            java: {
              starter: javaStarter(['static double netSalary(double gross, double rate)'], true),
              scanner: true,
              notes: [
                'Both parameters and the return type are `double`, since money and rates carry fractions.',
                'Read decimals with `sc.nextDouble()`.',
                'Print in `main` with `System.out.printf("Net: %.2f%n", value);`'
              ]
            }
          }
        ]
      },

      /* ================= Objective 2 — void functions ================= */
      {
        title: '`void` Functions',
        summary:
          'Some functions do not answer a question, they perform an action — usually printing. Their ' +
          'return type is `void`, which means "no answer".',
        points: [
          '`void` means the function gives nothing back, so a call is a statement on its own line.',
          'A `void` function may still take parameters, and often prints something built from them.',
          '`return;` with no value can leave a `void` function early, but it is not required at the end.',
          'Storing the result of a `void` call — `int x = printLine(5);` — is an error: there is no result.',
          'Decide for each function whether it computes or displays. A function that does both is harder to reuse.'
        ],
        example: {
          cpp:
            'void printSeparator() {          // no answer, no parameters\n' +
            '    cout << "==============" << endl;\n' +
            '}\n' +
            '\n' +
            'int main() {\n' +
            '    printSeparator();            // a call on its own, not part of an expression\n' +
            '    cout << "Report" << endl;\n' +
            '    printSeparator();\n' +
            '    return 0;\n' +
            '}',
          java:
            'static void printSeparator() {   // no answer, no parameters\n' +
            '    System.out.println("==============");\n' +
            '}\n' +
            '\n' +
            'public static void main(String[] args) {\n' +
            '    printSeparator();            // a call on its own, not part of an expression\n' +
            '    System.out.println("Report");\n' +
            '    printSeparator();\n' +
            '}'
        },
        exercises: [
          {
            title: 'A Line of Stars',
            difficulty: 'Easy',
            description:
              'Write a `void` function `printStars` that takes a count and prints that many `*` ' +
              'characters on one line. Read the count in `main` and call the function once.',
            input: 'One whole number: how many stars to print.',
            output: 'One line holding exactly that many `*` characters.',
            samples: [
              { input: '5', output: '*****' },
              { input: '1', output: '*' },
              { input: '3', output: '***' }
            ],
            constraints: [
              'The count is a whole number between 1 and 60.',
              'The stars are printed with no spaces between them.',
              'The line ends after the last star.',
              'The function prints; it returns nothing.'
            ],
            hint:
              'Print the stars one at a time inside the loop, and move to the next line once, after the ' +
              'loop has finished.',
            cpp: {
              starter: cppStarter(['void printStars(int n)'], null),
              notes: [
                'The header is `void printStars(int n)` — `void` is where a return type would normally go.',
                'Inside the loop print `"*"` with no `endl`, then print `endl` once after the loop.',
                'The call is simply `printStars(n);` on a line of its own.'
              ]
            },
            java: {
              starter: javaStarter(['static void printStars(int n)'], true),
              scanner: true,
              notes: [
                'The header is `static void printStars(int n)` — `void` replaces the return type.',
                '`System.out.print` stays on the same line; `System.out.println()` ends it.',
                'The call is simply `printStars(n);` on a line of its own.'
              ]
            }
          },
          {
            title: 'Display a Numbered Grade',
            difficulty: 'Easy',
            description:
              'Write a `void` function `showGrade` that takes a student number and a grade, and prints ' +
              'them as one labelled line. In `main`, read how many students there are, then read each ' +
              'grade and call the function for it.',
            input: 'First a whole number `n`, then `n` whole numbers: the grades.',
            output:
              '`n` lines, each in the form:\n' +
              'Student <number>: <grade>\n\n' +
              'Student numbers start at 1.',
            samples: [
              { input: '3\n88 72 95', output: 'Student 1: 88\nStudent 2: 72\nStudent 3: 95' },
              { input: '1\n60',       output: 'Student 1: 60' },
              { input: '2\n100 0',    output: 'Student 1: 100\nStudent 2: 0' }
            ],
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'Each grade is a whole number between 0 and 100.',
              'The student number is followed by a colon and a single space.',
              'The function is called once per student, from inside the loop.'
            ],
            hint:
              'The loop lives in `main` and the printing lives in the function. Which of the two ' +
              'numbers the function receives — the counter or the counter plus one — is your decision ' +
              'to make and to keep consistent.',
            cpp: {
              starter: cppStarter(['void showGrade(int number, int grade)']),
              notes: [
                'A `void` function can take as many parameters as it needs; here it takes two.',
                'The whole body is one line: `cout << "Student " << number << ": " << grade << endl;`',
                'Call it inside the reading loop, once per grade.'
              ]
            },
            java: {
              starter: javaStarter(['static void showGrade(int number, int grade)'], true),
              scanner: true,
              notes: [
                'A `static void` method can take as many parameters as it needs; here it takes two.',
                'The whole body is one line: `System.out.printf("Student %d: %d%n", number, grade);`',
                'Call it inside the reading loop, once per grade.'
              ]
            }
          },
          {
            title: 'Receipt with a Header and a Total',
            difficulty: 'Medium',
            description:
              'Write two `void` functions: `printHeader`, which takes nothing and prints the receipt ' +
              'title, and `printTotal`, which takes an amount and prints the total line. In `main`, ' +
              'read a count and that many prices, print the header, print one line per item, and ' +
              'finish by printing the total.',
            input: 'First a whole number `n`, then `n` decimal numbers: the prices.',
            output:
              'The header line:\n' +
              '--- RECEIPT ---\n\n' +
              'then `n` item lines, each in the form:\n' +
              'Item <number>: <price>\n\n' +
              'then the total line:\n' +
              'Total: <sum of the prices>\n\n' +
              'Item numbers start at 1. Every amount is printed with exactly two digits after the ' +
              'decimal point.',
            samples: [
              {
                input: '2\n3.5 10',
                output: '--- RECEIPT ---\nItem 1: 3.50\nItem 2: 10.00\nTotal: 13.50'
              },
              {
                input: '1\n99.99',
                output: '--- RECEIPT ---\nItem 1: 99.99\nTotal: 99.99'
              },
              {
                input: '3\n1 2 3',
                output: '--- RECEIPT ---\nItem 1: 1.00\nItem 2: 2.00\nItem 3: 3.00\nTotal: 6.00'
              }
            ],
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'Each price is greater than 0.',
              'The header is printed once, before any item line.',
              'The running total is kept in `main`; `printTotal` only displays the amount it is given.'
            ],
            hint:
              '`printTotal` does not add anything up. It receives a finished number and prints it — ' +
              'which is why it can be reused anywhere a total needs displaying.',
            cpp: {
              starter: cppStarter(['void printHeader()', 'void printTotal(double amount)'], ['<iomanip>']),
              notes: [
                'A function with no parameters still needs the empty brackets, in the header and in the call.',
                '`cout << fixed << setprecision(2);` written once in `main` covers every amount printed afterwards.',
                'Two small functions are easier to read than one function that does everything.'
              ]
            },
            java: {
              starter: javaStarter(['static void printHeader()', 'static void printTotal(double amount)'], true),
              scanner: true,
              notes: [
                'A method with no parameters still needs the empty brackets, in the header and in the call.',
                '`System.out.printf("Total: %.2f%n", amount);` handles the formatting inside `printTotal`.',
                'Two small methods are easier to read than one method that does everything.'
              ]
            }
          }
        ]
      },

      /* ================= Objective 3 — passing arrays to functions ================= */
      {
        title: 'Passing Arrays to Functions',
        summary:
          'An array can be given to a function like any other value — with one important difference: ' +
          'it is not copied. The function works on the caller’s array itself.',
        points: [
          'An array parameter does not carry its size, so the number of values travels as a second parameter.',
          'Because the array is not copied, changes made inside the function are visible in `main` afterwards.',
          'C++ writes the parameter as `int a[]`, Java as `int[] a`. The call passes only the name: `fill(a, n);`',
          'A function that fills an array returns nothing — the array *is* the result.',
          'Passing a size larger than the number of stored values makes the function read meaningless data.'
        ],
        example: {
          cpp:
            'void doubleAll(int a[], int n) {\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        a[i] = a[i] * 2;\n' +
            '    }\n' +
            '}\n' +
            '// after doubleAll(a, n); the array in main holds the doubled values',
          java:
            'static void doubleAll(int[] a, int n) {\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        a[i] = a[i] * 2;\n' +
            '    }\n' +
            '}\n' +
            '// after doubleAll(a, n); the array in main holds the doubled values'
        },
        exercises: [
          {
            title: 'Read an Array in a Function',
            difficulty: 'Easy',
            description:
              'Write a `void` function `readArray` that takes an array and a count, and reads that many ' +
              'whole numbers into it. In `main`, read the count, call the function, then print how many ' +
              'values were stored and what the last one was.',
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
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'The values may be negative or zero.',
              'The reading loop is inside the function, not in `main`.',
              'The two lines are printed in `main`, reading from the array the function filled.'
            ],
            hint:
              'If both lines print correctly, you have proved the point of this objective: the function ' +
              'did not work on a copy.',
            cpp: {
              starter: cppStarter(['void readArray(int a[], int n)']),
              notes: [
                'Declare the array in `main` with a fixed maximum, such as `int a[100];`',
                'The parameter is written `int a[]` — the size is deliberately left out of the brackets.',
                'The call passes the name only: `readArray(a, n);`'
              ]
            },
            java: {
              starter: javaStarter(['static void readArray(int[] a, int n)'], 'field'),
              scanner: true,
              notes: [
                'Create the array in `main` after reading `n`: `int[] a = new int[n];`',
                'The `Scanner` must be usable inside the method too, so it is declared once above ' +
                  '`main` as a `static` field rather than inside `main`.',
                'The call passes the name only: `readArray(a, n);`'
              ]
            }
          },
          {
            title: 'Display an Array in a Function',
            difficulty: 'Easy',
            description:
              'Write a `void` function `displayArray` that takes an array and a count and prints the ' +
              'values, one per line. In `main`, read the count and the values, then call the function.',
            input: 'First a whole number `n`, then `n` whole numbers.',
            output: '`n` lines, each holding one value, in the order they were read.',
            samples: [
              { input: '4\n7 2 9 4', output: '7\n2\n9\n4' },
              { input: '1\n-8',      output: '-8' },
              { input: '3\n0 0 5',   output: '0\n0\n5' }
            ],
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'Nothing is printed until every value has been read.',
              'No labels and no position numbers — the values alone.',
              'The printing loop is inside the function.'
            ],
            hint:
              'The function does not know or care where the values came from. That is exactly why it ' +
              'can be reused with any array of any size.',
            cpp: {
              starter: cppStarter(['void displayArray(int a[], int n)']),
              notes: [
                'Reading stays in `main` for this exercise; only the printing moves into the function.',
                'The parameter list mirrors the previous exercise: the array, then the count.',
                'A function that only reads the array still receives the real array, not a copy.'
              ]
            },
            java: {
              starter: javaStarter(['static void displayArray(int[] a, int n)'], true),
              scanner: true,
              notes: [
                'Reading stays in `main` for this exercise; only the printing moves into the method.',
                '`a.length` would also work here, but keep `n` so both languages match.',
                'A method that only reads the array still receives the real array, not a copy.'
              ]
            }
          },
          {
            title: 'Salary Report from Two Functions',
            difficulty: 'Medium',
            description:
              'Write two `void` functions: `readSalaries`, which fills an array with a given number of ' +
              'salaries, and `displaySalaries`, which prints one report line per employee. `main` reads ' +
              'the count and does nothing else but call the two functions.',
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
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'Each salary is greater than 0.',
              'A whole-number salary in the input is still printed with two decimal digits.',
              'Apart from reading `n`, `main` contains only the two calls — no loops.'
            ],
            hint:
              'You wrote this report in Module 4 as one long `main`. Splitting it in two changes nothing ' +
              'the user sees, and everything about how easy the program is to read.',
            cpp: {
              starter: cppStarter(
                ['void readSalaries(double a[], int n)', 'void displaySalaries(double a[], int n)'],
                ['<iomanip>']
              ),
              notes: [
                'The array is `double a[100];` in `main`, and `double a[]` in both parameter lists.',
                'Set `fixed` and `setprecision(2)` inside `displaySalaries`, before its loop.',
                '`main` becomes three lines: read `n`, call one function, call the other.'
              ]
            },
            java: {
              starter: javaStarter(
                ['static void readSalaries(double[] a, int n)', 'static void displaySalaries(double[] a, int n)'],
                'field'
              ),
              scanner: true,
              notes: [
                'Create the array in `main` with `double[] a = new double[n];` and pass it to both methods.',
                'The `Scanner` is declared once above `main` as a `static` field, so `readSalaries` can use it.',
                '`System.out.printf("Employee %d: %.2f%n", i + 1, a[i]);` prints one report line.'
              ]
            }
          }
        ]
      },

      /* ================= Objective 4 — returning a result from an array ================= */
      {
        title: 'Returning a Result Calculated from an Array',
        summary:
          'The most useful array functions take the whole array and give back a single answer: a ' +
          'count, a total, an average, the largest value.',
        points: [
          'The return type follows the answer: a count is `int`, an average or a total of decimals is `double`.',
          'The array and its size go in; one value comes out.',
          'Build the answer through the loop and `return` after it — returning inside the loop would stop at the first element.',
          'An average of whole numbers must be divided in `double`, and the cast belongs inside the function.',
          'Several small functions can be called one after another from `main`, each answering one question.'
        ],
        example: {
          cpp:
            'int countAbove(int a[], int n, int limit) {\n' +
            '    int count = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        if (a[i] > limit) {\n' +
            '            count++;\n' +
            '        }\n' +
            '    }\n' +
            '    return count;              // one answer, after the loop\n' +
            '}',
          java:
            'static int countAbove(int[] a, int n, int limit) {\n' +
            '    int count = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        if (a[i] > limit) {\n' +
            '            count++;\n' +
            '        }\n' +
            '    }\n' +
            '    return count;              // one answer, after the loop\n' +
            '}'
        },
        exercises: [
          {
            title: 'Average of an Array',
            difficulty: 'Easy',
            description:
              'Write a function `average` that takes an array of grades and a count, and returns their ' +
              'average as a decimal number. Read the values in `main` and print the returned average.',
            input: 'First a whole number `n`, then `n` whole numbers: the grades.',
            output:
              'One line:\n' +
              'Average: <average>\n\n' +
              'Printed with exactly two digits after the decimal point.',
            samples: [
              { input: '5\n88 42 67 95 30', output: 'Average: 64.40' },
              { input: '3\n50 49 51',       output: 'Average: 50.00' },
              { input: '1\n7',              output: 'Average: 7.00' }
            ],
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'Each grade is a whole number between 0 and 100.',
              'The grades are whole numbers but the average is not — the return type is `double`.',
              'The average covers every grade in the array.'
            ],
            hint:
              'If every average comes out with `.00` after it, the division happened between two whole ' +
              'numbers and the fraction was thrown away before the answer was returned.',
            cpp: {
              starter: cppStarter(['double average(int a[], int n)'], ['<iomanip>']),
              notes: [
                'The return type is `double` even though the parameter array is `int`.',
                'Keep the total in an `int` and cast when dividing: `return (double)sum / n;`',
                'Print in `main` with `fixed` and `setprecision(2)`.'
              ]
            },
            java: {
              starter: javaStarter(['static double average(int[] a, int n)'], true),
              scanner: true,
              notes: [
                'The return type is `double` even though the parameter array is `int[]`.',
                'Keep the total in an `int` and cast when dividing: `return (double) sum / n;`',
                'Print in `main` with `System.out.printf("Average: %.2f%n", value);`'
              ]
            }
          },
          {
            title: 'Highest Salary',
            difficulty: 'Easy',
            description:
              'Write a function `highest` that takes an array of salaries and a count, and returns the ' +
              'largest one. Read the values in `main` and print the returned salary.',
            input: 'First a whole number `n`, then `n` decimal numbers: the salaries.',
            output:
              'One line:\n' +
              'Highest: <salary>\n\n' +
              'Printed with exactly two digits after the decimal point.',
            samples: [
              { input: '5\n3000 4500 2800 6200 5100', output: 'Highest: 6200.00' },
              { input: '1\n7250.5',                   output: 'Highest: 7250.50' },
              { input: '3\n1200.25 1200.25 999.75',   output: 'Highest: 1200.25' }
            ],
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'Each salary is greater than 0.',
              'When `n` is 1, that single salary is the answer.',
              'When the largest value appears more than once, it is still reported once.'
            ],
            hint:
              'Start from the first element of the array rather than from 0, and the function stays ' +
              'correct for any data it is ever given.',
            cpp: {
              starter: cppStarter(['double highest(double a[], int n)'], ['<iomanip>']),
              notes: [
                'Initialise the answer to `a[0]` and compare from `i = 1` onward.',
                'The variable holding the answer is declared before the loop, so it still exists at the `return`.',
                'A variable declared inside the loop would vanish at the closing brace.'
              ]
            },
            java: {
              starter: javaStarter(['static double highest(double[] a, int n)'], true),
              scanner: true,
              notes: [
                'Initialise the answer to `a[0]` and compare from `i = 1` onward.',
                'The variable holding the answer is declared before the loop, so it still exists at the `return`.',
                '`Math.max` is a neat alternative to the `if`, and takes two values at a time.'
              ]
            }
          },
          {
            title: 'Class Report from Two Functions',
            difficulty: 'Medium',
            description:
              'Write two functions over an array of grades: `countPassing`, which returns how many ' +
              'grades are 50 or above, and `average`, which returns the average grade. Read the values ' +
              'in `main` and print both answers.',
            input: 'First a whole number `n`, then `n` whole numbers: the grades.',
            output:
              'Two lines:\n' +
              'Passed: <count>\n' +
              'Average: <average>\n\n' +
              'The average is printed with exactly two digits after the decimal point.',
            samples: [
              { input: '5\n88 42 67 95 30', output: 'Passed: 3\nAverage: 64.40' },
              { input: '3\n50 49 51',       output: 'Passed: 2\nAverage: 50.00' },
              { input: '2\n0 100',          output: 'Passed: 1\nAverage: 50.00' }
            ],
            constraints: [
              '`n` is a whole number between 1 and 100.',
              'Each grade is a whole number between 0 and 100.',
              'A grade of exactly 50 passes.',
              'The average covers every grade, not only the passing ones.',
              'Each function walks the array once and returns one value; neither prints anything.'
            ],
            hint:
              'Two questions, two functions, two return types. Trying to answer both in one function ' +
              'is where this exercise goes wrong, because a function can return only one value.',
            cpp: {
              starter: cppStarter(
                ['int countPassing(int a[], int n)', 'double average(int a[], int n)'],
                ['<iomanip>']
              ),
              notes: [
                '`countPassing` returns `int`; `average` returns `double`. The types follow the answers.',
                'The array is passed to both functions unchanged — neither of them modifies it.',
                '`average` can be the same function you wrote in exercise 1 of this objective.'
              ]
            },
            java: {
              starter: javaStarter(
                ['static int countPassing(int[] a, int n)', 'static double average(int[] a, int n)'],
                true
              ),
              scanner: true,
              notes: [
                '`countPassing` returns `int`; `average` returns `double`. The types follow the answers.',
                'The array is passed to both methods unchanged — neither of them modifies it.',
                '`average` can be the same method you wrote in exercise 1 of this objective.'
              ]
            }
          }
        ]
      },

      /* ================= Objective 5 — number algorithms as functions ================= */
      {
        title: 'Number Algorithms as Functions',
        summary:
          'The algorithms from Module 3 become reusable the moment they live inside a function: read ' +
          'the input once in `main`, then call the function as often as you need.',
        points: [
          'Reading input stays in `main`; the function receives the value it needs as a parameter.',
          'A yes/no question is best answered by a function returning `bool` in C++ or `boolean` in Java.',
          'A `bool` result reads naturally at the call site: `if (isPrime(n))`.',
          'Returning from inside the loop is right when the answer is already certain — one divisor is enough.',
          'Changing a parameter inside the function does not affect the caller’s variable; the number was copied.',
          'Factorials outgrow `int` quickly: use `long long` in C++ and `long` in Java.'
        ],
        example: {
          cpp:
            'int countDigits(int n) {\n' +
            '    int count = 0;\n' +
            '    while (n > 0) {\n' +
            '        count++;\n' +
            '        n = n / 10;            // n is a copy; main’s variable is untouched\n' +
            '    }\n' +
            '    return count;\n' +
            '}\n' +
            '// countDigits(4071) is 4',
          java:
            'static int countDigits(int n) {\n' +
            '    int count = 0;\n' +
            '    while (n > 0) {\n' +
            '        count++;\n' +
            '        n = n / 10;            // n is a copy; main’s variable is untouched\n' +
            '    }\n' +
            '    return count;\n' +
            '}\n' +
            '// countDigits(4071) is 4'
        },
        exercises: [
          {
            title: 'Factorial Function',
            difficulty: 'Easy',
            description:
              'Write a function `factorial` that takes a whole number and returns its factorial — the ' +
              'product of every whole number from 1 up to it. Read the number in `main` and print the ' +
              'returned value.',
            input: 'One whole number.',
            output:
              'One line:\n' +
              'Factorial: <value>',
            samples: [
              { input: '5',  output: 'Factorial: 120' },
              { input: '0',  output: 'Factorial: 1' },
              { input: '10', output: 'Factorial: 3628800' }
            ],
            constraints: [
              'The number is a whole number between 0 and 20.',
              'The factorial of 0 is 1, as sample 2 shows.',
              'The answer for 20 does not fit in an `int`, so use a wider whole-number type.',
              'The function returns the value; `main` prints it.'
            ],
            hint:
              'A running product starts at 1, not at 0. Starting it at 0 makes every answer 0, and ' +
              'also happens to make the factorial of 0 come out wrong.',
            cpp: {
              starter: cppStarter(['long long factorial(int n)']),
              notes: [
                'The parameter is `int` but the answer is `long long` — the value grows far faster than the input.',
                'The loop is the one from Module 3; only the last line changes, from printing to `return`.',
                'A loop that never runs, because `n` is 0, leaves the product at its starting value of 1.'
              ]
            },
            java: {
              starter: javaStarter(['static long factorial(int n)'], true),
              scanner: true,
              notes: [
                'The parameter is `int` but the answer is `long` — the value grows far faster than the input.',
                'The loop is the one from Module 3; only the last line changes, from printing to `return`.',
                'A loop that never runs, because `n` is 0, leaves the product at its starting value of 1.'
              ]
            }
          },
          {
            title: 'Prime Check Function',
            difficulty: 'Medium',
            description:
              'Write a function `isPrime` that takes a positive whole number and returns whether it is ' +
              'prime. Read the number in `main`, call the function, and print the matching message.',
            input: 'One positive whole number.',
            output:
              'One line, either:\n' +
              'Prime\n\n' +
              'or:\n' +
              'Not prime',
            samples: [
              { input: '7', output: 'Prime' },
              { input: '9', output: 'Not prime' },
              { input: '1', output: 'Not prime' }
            ],
            constraints: [
              'The number is a whole number between 1 and 100000.',
              '1 is not prime, as sample 3 shows.',
              '2 is prime — it is the only even number that is.',
              'The function returns true or false; the message is chosen and printed in `main`.'
            ],
            hint:
              'Deciding and reporting are two different jobs. Keep `Prime` and `Not prime` out of the ' +
              'function entirely, and it can be reused in a program that prints nothing at all.',
            cpp: {
              starter: cppStarter(['bool isPrime(int n)']),
              notes: [
                'The return type is `bool`, and the values returned are `true` and `false`.',
                'Handle `n < 2` first and return `false` straight away.',
                'As soon as a divisor is found the answer is settled — `return false;` from inside the loop.'
              ]
            },
            java: {
              starter: javaStarter(['static boolean isPrime(int n)'], true),
              scanner: true,
              notes: [
                'The return type is `boolean`, and the values returned are `true` and `false`.',
                'Handle `n < 2` first and return `false` straight away.',
                'At the call site write `if (isPrime(n))` — comparing to `true` adds nothing.'
              ]
            }
          },
          {
            title: 'Fibonacci Function',
            difficulty: 'Medium',
            description:
              'The Fibonacci sequence starts 0, 1, and every term after that is the sum of the two ' +
              'before it. Write a function `fibonacci` that takes a position and returns the term at ' +
              'that position, counting the first term as position 1. In `main`, read a count `n` and ' +
              'print the first `n` terms, one per line, by calling the function once for each position.',
            input: 'One whole number `n`: how many terms to print.',
            output: '`n` lines, each holding one term, starting from the first.',
            samples: [
              { input: '5', output: '0\n1\n1\n2\n3' },
              { input: '1', output: '0' },
              { input: '8', output: '0\n1\n1\n2\n3\n5\n8\n13' }
            ],
            constraints: [
              '`n` is a whole number between 1 and 40.',
              'Position 1 holds 0 and position 2 holds 1.',
              'The function returns one term — it does not print and does not loop over positions.',
              'The loop over the positions is in `main`.'
            ],
            hint:
              'Inside the function, keep the two previous terms in two variables and move them along ' +
              'once per step. Positions 1 and 2 have no two previous terms, so they are answered ' +
              'directly.',
            cpp: {
              starter: cppStarter(['long long fibonacci(int position)']),
              notes: [
                'Return the answers for positions 1 and 2 before the loop starts.',
                'Two variables hold the previous pair; a third holds their sum while the pair moves along.',
                'Position 40 still fits comfortably in `long long`.'
              ]
            },
            java: {
              starter: javaStarter(['static long fibonacci(int position)'], true),
              scanner: true,
              notes: [
                'Return the answers for positions 1 and 2 before the loop starts.',
                'Two variables hold the previous pair; a third holds their sum while the pair moves along.',
                'Position 40 still fits comfortably in `long`.'
              ]
            }
          }
        ]
      },

      /* ================= Objective 6 — recursion ================= */
      {
        title: 'Recursion',
        summary:
          'A function is allowed to call itself. Each call works on a smaller version of the same ' +
          'problem, until a version arrives that can be answered without calling anything.',
        points: [
          'Every recursive function needs a base case: the smallest input, answered directly.',
          'The recursive case must move towards the base case, or the calls never stop.',
          'Without a base case the program crashes with a stack overflow, not with a wrong answer.',
          'Each call keeps its own copy of the parameters, so the calls do not interfere with one another.',
          'Anything recursive can also be written with a loop. Recursion is chosen when it states the problem more clearly.'
        ],
        example: {
          cpp:
            'void countdown(int n) {\n' +
            '    if (n == 0) {\n' +
            '        return;                // base case: nothing left to print\n' +
            '    }\n' +
            '    cout << n << endl;\n' +
            '    countdown(n - 1);          // the same problem, one step smaller\n' +
            '}\n' +
            '// countdown(3) prints 3, 2, 1',
          java:
            'static void countdown(int n) {\n' +
            '    if (n == 0) {\n' +
            '        return;                // base case: nothing left to print\n' +
            '    }\n' +
            '    System.out.println(n);\n' +
            '    countdown(n - 1);          // the same problem, one step smaller\n' +
            '}\n' +
            '// countdown(3) prints 3, 2, 1'
        },
        exercises: [
          {
            title: 'Recursive Factorial',
            difficulty: 'Medium',
            description:
              'Write the factorial function again, this time without any loop: the function must call ' +
              'itself. Read the number in `main` and print the returned value.',
            input: 'One whole number.',
            output:
              'One line:\n' +
              'Factorial: <value>',
            samples: [
              { input: '5', output: 'Factorial: 120' },
              { input: '0', output: 'Factorial: 1' },
              { input: '8', output: 'Factorial: 40320' }
            ],
            constraints: [
              'The number is a whole number between 0 and 20.',
              'The function contains no loop of any kind.',
              'The factorial of 0 is 1 — this is the base case.',
              'Every other case is the number multiplied by the factorial of the number below it.'
            ],
            hint:
              'Write the rule in words first: the factorial of `n` is `n` times the factorial of `n - 1`, ' +
              'and the factorial of 0 is 1. Those two sentences are the two branches of the function.',
            cpp: {
              starter: cppStarter(['long long factorial(int n)']),
              notes: [
                'The base case is checked first, before any call is made.',
                'The recursive case is a single `return` holding a multiplication and a call.',
                'Compare it with your looped version from objective 5: same answers, different shape.'
              ]
            },
            java: {
              starter: javaStarter(['static long factorial(int n)'], true),
              scanner: true,
              notes: [
                'The base case is checked first, before any call is made.',
                'The recursive case is a single `return` holding a multiplication and a call.',
                'Compare it with your looped version from objective 5: same answers, different shape.'
              ]
            }
          },
          {
            title: 'Recursive Sum of Digits',
            difficulty: 'Medium',
            description:
              'Write a recursive function `digitSum` that takes a whole number and returns the sum of ' +
              'its digits. Read the number in `main` and print the returned sum.',
            input: 'One whole number, zero or greater.',
            output:
              'One line:\n' +
              'Sum: <sum of the digits>',
            samples: [
              { input: '1234', output: 'Sum: 10' },
              { input: '7',    output: 'Sum: 7' },
              { input: '9080', output: 'Sum: 17' }
            ],
            constraints: [
              'The number is a whole number between 0 and 2000000000.',
              'The digit sum of 0 is 0 — this is the base case.',
              'The function contains no loop.',
              'Zeros inside the number contribute nothing but must not stop the recursion early, as ' +
                'sample 3 shows.'
            ],
            hint:
              '`% 10` gives the last digit and `/ 10` removes it. The sum of the digits of a number is ' +
              'its last digit plus the sum of the digits of what is left.',
            cpp: {
              starter: cppStarter(['int digitSum(int n)']),
              notes: [
                'The base case is `n == 0`, which returns 0.',
                'The recursive case adds `n % 10` to the result of a call on `n / 10`.',
                'Each call removes exactly one digit, so the base case is always reached.'
              ]
            },
            java: {
              starter: javaStarter(['static int digitSum(int n)'], true),
              scanner: true,
              notes: [
                'The base case is `n == 0`, which returns 0.',
                'The recursive case adds `n % 10` to the result of a call on `n / 10`.',
                'Each call removes exactly one digit, so the base case is always reached.'
              ]
            }
          },
          {
            title: 'Recursive Fibonacci',
            difficulty: 'Hard',
            description:
              'Write the Fibonacci function again, this time recursively: the term at a position is the ' +
              'sum of the terms at the two positions before it. Read a position in `main` and print the ' +
              'term the function returns. The first term, at position 1, is 0.',
            input: 'One whole number: the position.',
            output:
              'One line:\n' +
              'Fibonacci: <term at that position>',
            samples: [
              { input: '7',  output: 'Fibonacci: 8' },
              { input: '1',  output: 'Fibonacci: 0' },
              { input: '10', output: 'Fibonacci: 34' }
            ],
            constraints: [
              'The position is a whole number between 1 and 30.',
              'Position 1 holds 0 and position 2 holds 1 — these are the two base cases.',
              'The function contains no loop.',
              'The upper limit of 30 is there for a reason: the number of calls grows very quickly.'
            ],
            hint:
              'This one needs two base cases, not one, because the recursive rule reaches two positions ' +
              'back and would otherwise step past the start of the sequence.',
            cpp: {
              starter: cppStarter(['long long fibonacci(int position)']),
              notes: [
                'Check both base cases before the recursive case.',
                'The recursive case is one `return` containing two calls added together.',
                'Try position 40 once, and notice how long it takes compared with your looped version.'
              ]
            },
            java: {
              starter: javaStarter(['static long fibonacci(int position)'], true),
              scanner: true,
              notes: [
                'Check both base cases before the recursive case.',
                'The recursive case is one `return` containing two calls added together.',
                'Try position 40 once, and notice how long it takes compared with your looped version.'
              ]
            }
          }
        ]
      }
    ]
  });

})();
