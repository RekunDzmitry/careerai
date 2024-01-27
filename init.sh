#!/bin/bash
echo "restarting docker-compose..."
echo "current directory: $(pwd)"
docker-compose down
docker-compose up -d --build