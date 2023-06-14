#!/bin/bash

# Download the Docker Image
docker pull mongo

# Create a Docker Container with the Mongo Image
docker run --name MongoDB --restart unless-stopped -d -p 3010:3010 mongo
