#!/bin/bash

if ! [[ -d "node_modules" ]]
then
    echo "Installing node modules..."
    npm install
fi

echo "Serving Ionic..."
ionic serve