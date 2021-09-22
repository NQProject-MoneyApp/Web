FROM node:16.7

WORKDIR /home/node/app
USER root
RUN rm -r /home/node/app/*

COPY ./moneyapp/package.json /home/node/app

RUN npm install 
RUN npm i -g @ionic/cli

RUN chown -R node /home/node/app

USER node

CMD ionic serve