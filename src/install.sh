#!/bin/bash

if [ $# -eq 1 ]; then
    if [ $1 = "p" ]; then
        #Clone rep
        git clone https://github.com/jcm300/Musike.git

        echo "Change the private and public key in the folder auth, change the port in bin/www. When done press some letter to continue."
        read -n 1 -p "Continue?";

        cd Musike/src
        mkdir mongoDB
        #start mongoDB
        mongod --dbpath ./mongoDB/ &

        #start graphDB
        graphdb -Xmx5g  &

        cd APIserver
        npm install
        npm start &

        cd ../interface
        npm install -g @vue/cli
        npm install
        npm run serve
    elif [ $1 = "i" ]; then
        mkdir mongoDB
        #start mongoDB
        mongod --dbpath ./mongoDB/ &

        #start graphDB
        graphdb -Xmx5g  &

        cd APIserver
        npm install
        npm start &

        cd ../interface
        npm install -g @vue/cli
        npm install
        npm run serve
    elif [ $1 = "r" ]; then
        mkdir mongoDB
        #start mongoDB
        mongod --dbpath ./mongoDB/ & 
        
        #start graphDB
        graphdb -Xmx5g  &

        #wait
        sleep 10

        cd APIserver
        npm start &

        cd ../interface
        npm run serve
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
