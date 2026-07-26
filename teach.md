# أستاذ إبراهيم حسين للتكنولوجيا والبرمجة — Project Guide

## Project Purpose

Build an educational programming platform for **أستاذ إبراهيم حسين للتكنولوجيا والبرمجة**.

The platform contains two courses:

1. **Programming Fundamentals**
2. **Object-Oriented Programming (OOP)**

The courses are informative and exercise-driven. Students solve exercises independently. Do not provide solutions; provide only requirements, examples, validation.

## Core Curriculum Model

- Each course contains **10 modules/sessions**.
- Each module contains multiple learning objectives.
- Each objective contains **3 related exercises**, ordered from simple to more challenging.
- Every exercise must include:
  - A short, clear problem description.
  - Required input and expected output behavior.
  - At least 2–3 sample input/output cases where relevant.
  - Constraints or validation rules when applicable.
  - A difficulty level and optional hint.
- Reuse a concept across the three exercises of one objective, but vary the scenario and data.

## Language Switching

Every exercise has a simple language selector at the **top-right** of the exercise card/page:

- C++
- Java

Switching languages changes only language-specific presentation, syntax notes, starter-code templates, and input/output conventions. The exercise goal, description, sample cases, and expected behavior remain identical.

## Student Experience

1. Student chooses a course.
2. Student opens a module/session.
3. Student reads each objective's compact explanation and examples.
4. Student completes the three exercises independently.

## Exercise Writing Rules

- Use practical, beginner-friendly contexts: grades, salaries, discounts, employee records, student records, counters, and simple numeric problems.
- Keep requirements precise and avoid ambiguous wording.
- State whether input is one value, multiple values, or repeated values.
- State formatting requirements for output exactly.
- Include invalid-input behavior whenever validation is the learning objective.
- Do not introduce concepts that have not yet been taught in the course.

## Course 1: Programming Fundamentals

### Module 1 — Basics

#### Objective 1: Data Types

Cover integers, floating-point values, characters, and basic variable declaration.

- Exercise 1: Store and display basic student information using appropriate data types.
- Exercise 2: Read a product price and quantity, then display their values with correct types.
- Exercise 3: Read employee information (ID, salary, and grade) and print a formatted summary.

#### Objective 2: Input and Output

Cover reading values from the keyboard and displaying clear output.

- Exercise 1: Read a student's name and age, then print a welcome message.
- Exercise 2: Read two numbers and display both values in a labeled format.
- Exercise 3: Read an employee's name, department code, and salary, then print a simple report.

#### Objective 3: Operations

Cover arithmetic operations: addition, subtraction, multiplication, division, and remainder.

- Exercise 1: Read two integers and display their sum, difference, product, quotient, and remainder.
- Exercise 2: Calculate the total price of items using quantity and unit price.
- Exercise 3: Convert a total number of seconds into hours, minutes, and seconds.

#### Objective 4: Order of Precedence

Cover parentheses and the priority of arithmetic operators.

- Exercise 1: Calculate the average of three grades correctly.
- Exercise 2: Calculate a rectangle's area and perimeter from its dimensions.
- Exercise 3: Calculate a final price after applying tax and a fixed discount.

### Module 2 — Conditions

#### Objective 1: `if`

- Exercise 1: Display a message if a grade is passing.
- Exercise 2: Display a message if a number is positive.
- Exercise 3: Display a message if an employee salary is above a specified threshold.

#### Objective 2: `if` / `else`

- Exercise 1: Determine whether a number is even or odd.
- Exercise 2: Determine whether a student passed or failed.
- Exercise 3: Determine whether a person is eligible based on age.

#### Objective 3: Logical Operations in Conditions

Use `&&`, `||`, and `!` with scenarios such as grade averages and range checks.

- Exercise 1: Determine whether a grade average is in the passing range.
- Exercise 2: Determine whether an age is in an allowed registration range.
- Exercise 3: Determine whether a student qualifies based on average and attendance.

#### Objective 4: Validation and Program Exit

Validate input with `if`, display an explanatory message, and stop when data is invalid.

- Exercise 1: Reject a negative grade.
- Exercise 2: Reject an age outside the allowed range.
- Exercise 3: Reject a salary less than or equal to zero.

#### Objective 5: Percentages, Discounts, and Raises

- Exercise 1: Apply a discount when a purchase reaches a threshold.
- Exercise 2: Apply a salary raise based on an employee's category.
- Exercise 3: Calculate final price using tiered purchase discounts.

#### Objective 6: Nested `if` / `else`

- Exercise 1: Convert a numeric grade into a letter grade.
- Exercise 2: Determine employee bonus percentage from salary and years of service.
- Exercise 3: Classify a number as positive/negative and even/odd.

#### Objective 7: Simple `switch` / `case`

Introduce `switch` / `case` for choosing between fixed options.

- Exercise 1: Read a number from 1 to 3 and display the matching weekday name.
- Exercise 2: Read a month number from 1 to 12 and display the month name.
- Exercise 3: Read a course code and display the matching course title.

#### Objective 8: `break` in `switch` / `case`

Focus on using `break` to prevent execution from continuing into the next case.

- Exercise 1: Build a simple calculator for addition, subtraction, multiplication, and division.
- Exercise 2: Read an employee category and display its matching raise percentage.
- Exercise 3: Read a service choice and calculate the corresponding fixed fee.

#### Objective 9: `default` in `switch` / `case`

Focus on handling options that do not match any defined case.

- Exercise 1: Display a message for an invalid menu choice.
- Exercise 2: Convert a number from 1 to 7 to a weekday name, or display an invalid-day message.
- Exercise 3: Read a grade letter and display its description, or display an invalid-grade message.

### Module 3 — Loops

#### Objective 1: `do...while` Validation

- Exercise 1: Keep reading a grade until it is between 0 and 100.
- Exercise 2: Keep reading a positive salary.
- Exercise 3: Keep reading a menu choice until it is valid.

#### Objective 2: `while`

Cover displaying numbers, digit sums, and digit counts.

- Exercise 1: Display numbers from 1 to `n`.
- Exercise 2: Find the sum of digits of a positive integer.
- Exercise 3: Count even and odd digits in a positive integer.

#### Objective 3: `for`

Cover repeated grade processing, averages, counts, and pass/fail results.

- Exercise 1: Read grades and calculate their sum and average.
- Exercise 2: Count even and odd numbers from a list of inputs.
- Exercise 3: Count passing and failing students and display the class average.

#### Objective 4: Number Algorithms with `for`

Cover factorials, prime numbers, and perfect numbers.

- Exercise 1: Calculate the factorial of a non-negative number.
- Exercise 2: Check whether a positive number is prime.
- Exercise 3: Check whether a positive number is perfect.

#### Objective 5: Nested `for` Loops

Process repeated data for multiple entities.

- Exercise 1: Read several students and multiple grades per student; display each average.
- Exercise 2: Read employee salaries for departments; display each department average.
- Exercise 3: Calculate pass/fail counts for each class section.

### Module 4 — Arrays

#### Objective 1: Array Initialization

- Exercise 1: Declare and display a predefined integer array.
- Exercise 2: Initialize an array of grades and display the first and last values.
- Exercise 3: Initialize an array of salaries and calculate the total.

#### Objective 2: Input an Array with a `for` Loop

- Exercise 1: Read `n` integers into an array.
- Exercise 2: Read a list of grades into an array.
- Exercise 3: Read employee salaries into an array with basic validation.

#### Objective 3: Display an Array with a `for` Loop

- Exercise 1: Display all entered integers.
- Exercise 2: Display each grade with its position number.
- Exercise 3: Display salaries in a labeled report.

#### Objective 4: Array Analysis

Analyze grades and salaries using arrays.

- Exercise 1: Read grades; count passes/failures and display the average.
- Exercise 2: Read salaries; display total, average, highest, and lowest salary.
- Exercise 3: Read numbers; count positive, negative, even, and odd values.

### Modules 5–10

Keep the same structure: multiple objectives per module and three progressive exercises per objective. Define the detailed syllabus with the instructor before generating exercise content. Suggested next topics are array searching/sorting, functions, strings, matrices, files, and a final fundamentals review/project.

## Course 2: Object-Oriented Programming

This course also contains 10 modules. Keep it language-aware for C++, Java, and the closest appropriate C equivalent or clearly mark exercises as language-specific when an OOP feature is unavailable in C.

Suggested module sequence:

1. OOP concepts and classes
2. Objects, attributes, and methods
3. Constructors and encapsulation
4. Arrays/lists of objects
5. Inheritance
6. Method overriding and polymorphism
7. Abstract classes and interfaces
8. Exception handling and validation
9. File handling or persistence
10. Final object-oriented mini-project

Each OOP objective follows the same three-exercise progression and independently solvable exercise format used in Programming Fundamentals.

## Content Generation Instruction

When asked to generate lesson content or exercises:

1. Identify the course, module, and objective.
2. Confirm that the concept has already been introduced in the curriculum.
3. Produce exactly three exercises unless a different number is requested.
4. Include concise description, input/output requirements, at least two sample cases, difficulty, and an optional hint for each exercise.
5. Keep C++, and Java versions conceptually equivalent.
6. Do not include full solutions by default.
