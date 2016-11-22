## Word Puzzle Game
User receives an magled word and is asked to introduce the correct, unmagled word. If the word to unmagle is "pizza", the application may present the word as 'z p a i z' and the user must enter 'p i z z a'  in this order for the solution to be accepted.

##The scoring is as follows:
- The maximum score for an word is: max_word_score = (1.95 ^ (n / 3)), where n represents the length of the word
- For each deleted character in the input, -1 is subtracted from the word_score
- The score for an word cannot be negative: max_word_score >= word_score >= 0
- A game round consists of unmaggling how many words as we can in 40 seconds.

##The user:
- is logged with only a username (no need for registration form/password): after writing the username, the user should click on 'Play game!' button or press the 'enter' key in order to be able to play the game
- can see the highscore list with the top 10 best scores
- can see his best score until the current moment
- can improve his score if he gets a better score after a round
- can click on 'Next word' button to get the next word, without affecting his score (the deletions will not be taken into consideration if he clicks next); an alternative to the 'Next word' is to press the 'arrow right' key, it will have the same effect
- can end a game by clicking on 'End Game' button
- to check if the word is correct, the user should click on 'Submit' button or press 'enter' key

##Implementation
This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

The client side of the application is developed using Yeoman 1.8.5, Grunt (grunt-cli v1.5.80.1.13, grunt 0.4.5), Angular 1.5.8, Bootstrap 3. For the backend side, I used Firebase REST API (https://www.firebase.com/docs/rest/api).

## Build & development
To be able to play the game in the browser, please follow the next steps:

1. clone this repository to your local directory: git clone https://vivianagosa@bitbucket.org/vivianagosa/wordpuzzlegame.git

2. install grunt: "npm install grunt"

3. install bower: "npm install bower"

4. install bower_components: "bower install"

5. install dependencies: "npm install"

6. run build with grunt: "grunt build"

7. run application in browser: "grunt serve"