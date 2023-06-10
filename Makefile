projectName = "textsync"

run_server:
	clear;
	cd server && npm start

run_client:
	clear;
	cd client && npm start

# Add rule to install everything, node, npm, react, etc.
dependencies:
	clear;
	cd client && npm install
	cd ../server && npm install

new_project:
	npx create-react-app projectName