run_server:
	clear;
	cd server && npm start

# Add rule to install everything, node, npm, react, etc.
dependencies:
	clear;
	cd server && npm install
	npm i ngx-quill

new_project:
	npx create-react-app projectNameHere