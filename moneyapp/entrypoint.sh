#!/bin/bash

echo "Installing node modules..."
npm install
echo "Installing ionic cli..."
npm i -g @ionic/cli

echo "Serving Ionic..."
ionic serve