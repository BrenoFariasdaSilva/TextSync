# Welcome to `TextSync` - A Real-Time Distributed-Text-Editor Application!

### `Project Status: Under Development`

#### `Project TO-DO List:`
- TODO: Add a project build status badge, see [here](https://docs.github.com/en/actions/managing-workflow-runs/adding-a-workflow-status-badge)

#### `Project New Fatures to implement:`
- TODO: Add read and write permissions for each file.  

## `Project Description:`
This is a distributed text editor application, which means that you can edit a text file with your friends, in real time. It is based on the [Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) algorithm, which is used by Google Docs, Etherpad and other collaborative editors.
The purpose of this project is to learn about distributed systems and the challenges of building them, such as `concurrency`, `consistency`, `availability`, `partition tolerance`, etc.

## `System Architecture:`
The system is composed of three main components: the `server`, the `client` and the `database`.  
- ***`Client`***: The client is created using [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) that is responsible for sending the requests to the server and receiving the responses from the server. The client contains a web interface for the document visualization.  
- ***`Server`***: The server is made in [NodeJS](https://nodejs.org/en/docs) in which is the most complex element of the system, that is responsible for holding a list of current active users, as well as storing information of which client(s) is accessing which document, along with the basic server purpose that is receiving the client's messages, which will be composed of commands like `insert(position, string_to_insert)` or `delete(position, string_to_delete)`, along with managing the concurrency of the requests. When the client request is processed, the client web interface will be updated. Futhermore, the server will send a response which updates the client web interface. Also, the server has a `local storage`, which is responsible for storing the text document in a file, so if the server crashes, the document will not be lost and will, later on, be recovered and updated in the database. The process of the server updating it's latest version of the document in the database is called `data-synchronization` and will occur periodically.  
- ***`Database`***: Lastly, the database used is a [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/), that is a `NoSQL` database who is responsible for storing the text document which will be in the format of a [JSON](https://json-schema.org/learn/getting-started-step-by-step.html), as follows: 
```json
{
	 "title": "Document Title",
	 "creator": "Document Creator",
	 "text": "Document Text",
	 "other_creators": "Other Document Creator",
}
```
This was a quick overview of the system architecture, but if there is also a more detailed explanation of the system architecture in the `assets` folder, in the `English` and `Portuguese` folders, which contains the DrawIO files for the System Architecture, as well as the exported images in `PNG` format, just like the one below:
![System Architecture](https://github.com/BrenoFariasdaSilva/TextSync/blob/main/assets/English/TextSync-EN.png)

## `Project Dependencies:`
- [NodeJS](https://nodejs.org/en/docs), which is a JavaScript runtime environment that executes JavaScript code outside a web browser, that we will use to create the server.
- [Nodemon](https://www.npmjs.com/package/nodemon), which is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [Express](https://expressjs.com/pt-br/), which is a framework for Node.js that provides a robust set of features for web and mobile applications. It's advantages are providing a full routing table, managing different HTTP requests, etc.
- [Socket.io](https://socket.io/docs/v4), which is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.
The `package.json` file contains all the dependencies of the project, so you can install them by running the following command in the terminal:
```bash
npm install
```