# Welcome to [`TextSync`](https://github.com/BrenoFariasdaSilva/TextSync) - A Real-Time Distributed-Text-Editor Application!

#### `Project Status: Under Development`

#### `Project TO-DO List:`
- TODO: Add a project build status badge, see [here](https://docs.github.com/en/actions/managing-workflow-runs/adding-a-workflow-status-badge)
- TODO: Use [fly](https://fly.io/) to deploy the application, as an alternative to [Heroku](https://www.heroku.com/)
- TODO: MongoDB replication, see [here](https://docs.mongodb.com/manual/replication/)

#### `Project New Fatures to implement:`
- TODO: Add read and write permissions for each file.  

## `Project Description:`
This is a distributed text editor application, which means that you can edit a text file with your friends, in real time.
The purpose of this project is to learn about distributed systems and the challenges of building them, such as `concurrency`, `consistency`, `availability`, `partition tolerance`, etc.

## `System Architecture:`
The system is composed of three main components: the `server`, the `client` and the `database`.  
- ***`Client`***: The client is created using [React](https://react.dev/) that is responsible for sending the requests to the server and receiving the responses from the server. The client contains a web interface for the document visualization.  As for the UI, it uses [Quill](https://github.com/zenoamaro/react-quill), which is a React component wrapping [Quill](https://quilljs.com/), a powerful and extensible rich text editor. The client will send requests to the server, which will be composed of commands like `insert(position, string_to_insert)` or `delete(position, string_to_delete)`, along with managing the concurrency of the requests. When the client request is processed, the client web interface will be updated. Futhermore, the server will send a response which updates the client web interface.
- ***`Server`***: The server is made in [NodeJS](https://nodejs.org/en/docs) in which is the most complex element of the system, that is responsible for holding a list of current active documents sessions, along with the basic server purpose that is receiving the client's messages, which will be composed of commands like `insert(position, string_to_insert)` or `delete(position, string_to_delete)`, along with managing the concurrency of the requests. When the client request is processed, the client web interface will be updated. Futhermore, the server will send a response which updates the client web interface.  
- ***`Database`***: Lastly, the database used is a [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/), that is a `NoSQL` database who is responsible for storing the text document which will be in the format of a [JSON](https://json-schema.org/learn/getting-started-step-by-step.html), as follows: 
```json
{
	 "id": "Document ID",
	 "datat": "Document Text"
}
```
This was a quick overview of the system architecture, but if there is also a more detailed explanation of the system architecture in the `assets` folder, in the `English` and `Portuguese` folders, which contains the DrawIO files for the System Architecture, as well as the exported images in `PNG` format, just like the one below:
![System Architecture](https://github.com/BrenoFariasdaSilva/TextSync/blob/main/assets/English/TextSync-EN.png)

## `Project Dependencies:`
- [NodeJS](https://nodejs.org/en/docs), which is a JavaScript runtime environment that executes JavaScript code outside a web browser, that we will use to create the server.
- [Nodemon](https://www.npmjs.com/package/nodemon), which is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [Mongoose](https://mongoosejs.com/docs/guide.html), which is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [React](https://reactjs.org/docs/getting-started.html), which is a JavaScript library for building user interfaces.
- [Quill](https://quilljs.com/docs/quickstart/), which is a powerful, free, open-source WYSIWYG editor built for the modern web.
- [Socket.io](https://socket.io/docs/v4), which is a library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.
- [dotenv](https://www.npmjs.com/package/dotenv), which is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.
This are just the most importante dependecies of this project, but the `package.json` file contains all the dependencies of the project, so you can install them by running the following command in the terminal:
```bash
make dependencies
```
This command will simply open the `client` and `server` folders and run the `npm install` command, which will install all the dependencies of the project.
## Useful Documentation:
- [Fly Steps Guide](https://fly.io/docs/hands-on/install-flyctl/)