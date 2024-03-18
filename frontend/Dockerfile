FROM node:20-alpine

RUN apk add --no-cache python3

RUN mkdir -p /ui
COPY ./ui /ui
COPY ./bin /bin
RUN ls -la /ui

EXPOSE 3001
ENV NODE_OPTIONS=--max-old-space-size=16384
#ENV NEXTJS_PATH=/ui
#WORKDIR /ui
#CMD ["/bin/sh", "../bin/run.sh"]
WORKDIR /ui
RUN npm cache clean --force
RUN npm i

CMD ["npm", "run", "dev"]
