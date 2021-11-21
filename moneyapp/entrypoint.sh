#!/bin/bash

if ! [[ -d "node_modules" ]]
then
    echo "Installing node modules..."
    npm install
    echo "Installing ionic cli..."
    npm i -g @ionic/cli
fi

echo "Serving Ionic..."
ionic serve