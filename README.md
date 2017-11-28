# CS4436
Selected Topics - Game Audio Development


This Repository is for the group project for CS 4436. 

Members: 
1. Jason Lee
2. Jake Schindler
3. Hannah Russwurm
4. Kennedy KJ

**Features** 

MmmDot is an innovative game that merges creativity and problem solving as users complete puzzles by connecting dots to recreate the music they hear. It is an interactive sound platform, where players will need to replicate musical tracks with visual cues/patterns.

**How To Play**

1) Use the keyboard numbers 1, 2, or 3 to switch between instruments.
2) To draw the line, click on one point and drag to another point.
3) To delete the line, click on one point of the line, and press 'tab'.
4) To play what you have, press the 'Play What I Have' button
5) To listen to what you are supposed to recreate, press the 'Play What I Am Supposed To' button
6) At any time you need to see the instructions again, press the question/answer icon on the navigation bar, this will take you back to the front page where you can scroll down to the instructions on the website. 

**To Run locally:**

0) Since the game was designed and developed in Javascript using the P5 framework, your main requirements of running this game locally is the latest version of any web browser. 
1) Open up your terminal 
2) Switch to your desired directory location
3) Run `git clone git@github.com:wlee367/CS4436.git` 
4) Run `cd CS4436`
5) The game needs a local server to run locally, to do this, you can use any commands that will start up a local server on your machine, but the command this group has been using is shown below:
```php
php -S localhost:8000
```
7) On the browser of your choice, please visit `localhost:8000`


**Notable Sources**
1) [P5.js](https://p5js.org/) is the library that we used heavily to implement the graphics, audio, and the game logic

2) [p5.collide2D libraries](https://github.com/bmoren/p5.collide2D). p5.collide2D contains some versions of, and references to, the functions in [Jeffrey Thompson's Collision Detection Book](http://www.jeffreythompson.org/collision-detection/). 

3)[His code is CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), so this is too! 

4) The image on index.html is from [here](https://icons8.com/icon/13369/paint-palette).

**In case you have trouble with the terminal command** using the [Brackets](http://brackets.io/) editor to open up our project makes it easy to open the final project, as the Brackets Editor comes with a button that launches a server for you on your behalf. 
