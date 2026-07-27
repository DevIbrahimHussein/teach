/* Arduino & ESP32 — announced, not yet published.

   One standalone page at #/arduino. It is deliberately not a course in
   data/courses.js: there are no modules and no exercises to render yet, and a
   course with nothing behind it would count zeroes into the home-page stats.
   When the syllabus is agreed, this becomes a course and the page goes away.

   Everything below is copy. Reorder or reword a topic and the page follows. */

window.EmbeddedCourse = {
  id: 'arduino',
  eyebrow: 'Coming soon',
  title: 'Arduino',
  titleAccent: '& ESP32',
  lede: 'Electronics and embedded programming, taught the same way as the rest of ' +
        'this platform — you wire the circuit and write the code yourself.',

  note: 'The syllabus is being written now, and sessions open once it is agreed — ' +
        'the same rule the programming modules follow: nothing is published before ' +
        'the exercises behind it exist. Message me to be told when it starts.',

  topicsLabel: 'What the course will cover',
  topics: [
    'Electricity, breadboards and reading a circuit',
    'The Arduino board, the IDE and your first sketch',
    'Digital output — LEDs, buzzers and relays',
    'Digital input — buttons, pull-ups and debouncing',
    'Analog input — potentiometers, light and temperature sensors',
    'PWM output — dimming, tone and motor speed',
    'The serial monitor as a debugging tool',
    'Sensors and actuators — ultrasonic, servo and DC motors',
    'LCD and OLED displays',
    'Moving to the ESP32 — more pins, more speed, more memory',
    'Wi-Fi, a web server on the board and control from a phone',
    'A final project you design and build yourself'
  ],

  boardsLabel: 'Boards you will work on',
  boards: ['Arduino Uno', 'Arduino Nano', 'ESP32', 'ESP8266'],

  cta: {
    label: 'Ask about Arduino & ESP32',
    message: 'Hello, I am interested in the Arduino & ESP32 course. When does it start?'
  }
};
