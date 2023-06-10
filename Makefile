# This file contains the commands to run the server and client, as well as install all dependencies.

# This is the name of the project.
PROJECT_NAME = textsync

# This installs all dependencies and runs the server and client.
all: 
	clear;
	dependencies;
	run_server;
	run_client;

# This runs the server.
run_server:
	clear;
	cd server && npm start

# This runs the client.
run_client:
	clear;
	cd client && npm start

# Add rule to install everything, node, npm, react, etc on windows, linux and mac
dependencies:
	clear;
	cd client && npm install
	cd ../server && npm install

# This creates a new react app named the value of PROJECT_NAME.
new_project:
	npx create-react-app $(PROJECT_NAME)

# This initializes a new npm project, creating a package.json file.
init:
	npm init -y

# This avoids the npx command to interpret the "create-react-app" as a folder, if it exists.
.PHONY: create-react-app