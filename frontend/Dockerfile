FROM node:20-alpine

RUN apk add --no-cache python3

RUN mkdir -p /ui
COPY ./ui /ui
COPY ./bin /bin

EXPOSE 3004
ENV NODE_OPTIONS=--max-old-space-size=16384
WORKDIR /ui
CMD ["/bin/sh", "/bin/run.sh"]