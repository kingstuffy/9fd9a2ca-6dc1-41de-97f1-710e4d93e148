FROM node:lts-alpine as build-stage

RUN apk add -U tzdata \
	&& cp /usr/share/zoneinfo/Africa/Lagos /etc/localtime \
	&& echo "Africa/Lagos" > /etc/timezone \
	&& apk del tzdata \
	&& mkdir -p /www

WORKDIR /www

ADD package.json package-lock.json /www/
RUN npm install \
	&& npm cache clean;

ADD . /www


ARG PORT
ENV PORT=${PORT}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL}

ARG DATA_ENCRYPTION_KEYS
ENV DATA_ENCRYPTION_KEYS=${DATA_ENCRYPTION_KEYS}

ARG PUSHER_KEY
ENV PUSHER_KEY=${PUSHER_KEY}

ARG PUSHER_SECRET
ENV PUSHER_SECRET=${PUSHER_SECRET}

ARG PUSHER_APP_ID
ENV PUSHER_APP_ID=${PUSHER_APP_ID}

ARG PUSHER_CLUSTER
ENV PUSHER_CLUSTER=${PUSHER_CLUSTER}

ARG PN_NEW_REVIEW_CHANNEL
ENV PN_NEW_REVIEW_CHANNEL=${PN_NEW_REVIEW_CHANNEL}

CMD ["npm", "start"]
