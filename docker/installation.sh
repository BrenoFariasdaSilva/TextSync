#!/bin/bash

# Download the Docker Image
docker pull mongo

# Run the Docker Image
docker run --name MongoDB --restart unless-stopped -d -p 3010:3010 mongo