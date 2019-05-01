#!/bin/bash

if [ $# -eq 1 ]; then
    if [ $1 = "p" ]; then
        #Clone rep
        git clone https://github.com/jcm300/Musike.git

        echo "Change the url in variable app.locals.url and root password in app.js, change the private and public key in the folder auth, change the port in bin/www. When done press some letter to continue."
        read -n 1 -p "Continue?";

        #start mongoDB
        mongod &

        #Install packages dependencies
        cd ..
        npm install

        #Start
        npm start
    elif [ $1 = "i" ]; then
        #start mongoDB
        mongod &

        #Install packages dependencies
        cd ..
        npm install

        #Start
        npm start
    elif [ $1 = "r" ]; then
        #start mongoDB
        mongod  & 
        
        #wait to mongoDB start
        sleep 5

        #Start
        npm start
    elif []; then
        echo "Wrong Parameter"
        echo "Please insert a paramenter:"
        echo "p --> Production"
        echo "i --> Install"
        echo "r --> Run"
   
    fi
elif [ 1 ]; then
    echo "Please insert a paramenter:"
    echo "p --> Production"
    echo "i --> Install"
    echo "r --> Run"
fi
