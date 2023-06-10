PROJECT_NAME = textsync

all: 
	clear;
	dependencies;
	run_server;
	run_client;

run_server:
	clear;
	cd server && npm start

run_client:
	clear;
	cd client && npm start

# Add rule to install everything, node, npm, react, etc on windows, linux and mac
dependencies:
	clear;
	cd client && npm install
	cd ../server && npm install

new_project:
	npx create-react-app $(PROJECT_NAME)

.PHONY: create-react-app