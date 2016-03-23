# DamsupeClient
Client app for the damsupe.

1. Install node js and NPM
    https://nodejs.org/en/

2. Install bower globally 
   
    npm install -g bower

    Bower requires node, npm and git.

3. Go to root folder and run bower install.
   This will install the neccessary components.

4. Open index.html in your browser. (Tested with chrome) Haven't bothered to use that many css prefixes so feel free to do so if needed. 

5. To play videos/sound you will have to match the paths set-up in the dashboard application. Only Mp4 videos can be played. Most sound formats should be covered though.

6. The first time the website loads it will run the last sound/video event pushed by the dashboard, so push a stop event before you open the website if you don't want it to do something on load.

7. You should never have to refresh the page after the initial load. Enjoy.



