#!/bin/bash

if [ $# -eq 1 ]; then
    if [ $1 = "i" ]; then
        mkdir mongoDB
        #start mongoDB
        mongod --dbpath ./mongoDB/ &

        #start graphDB in server mode
        graphdb-free-8.9.0/bin/graphdb -s &

        cd APIserver
        npm install
        npm start "127.0.0.1:27017" "localhost:7200" &

        cd ../interface
        npm install -g @vue/cli
        npm install
        npm run serve
    elif [ $1 = "r" ]; then
        mkdir mongoDB
        #start mongoDB
        mongod --dbpath ./mongoDB/ & 
        
        #start graphDB in server mode
        graphdb-free-8.9.0/bin/graphdb -s &

        #wait
        sleep 10

        cd APIserver
        npm start "127.0.0.1:27017" "localhost:7200" &

        cd ../interface
        npm run serve
    elif []; then
        echo "Wrong Parameter"
        echo "Please insert a paramenter:"
        echo "i --> Install"
        echo "r --> Run"
    fi
elif [ 1 ]; then
    echo "Please insert a paramenter:"
    echo "i --> Install"
    echo "r --> Run"
fi
