# [Welcome to TextSync - A Real-Time Distributed-Text-Editor Application!](https://github.com/BrenoFariasdaSilva/TextSync)

### <span style="color:#297deb"> Project Status: </span><span style="color:#64fccc">Under Development.</span>

### <span style="color:#297deb"> Project TO-DO List:</span>
- TODO: Add a project build status badge, see [here](https://docs.github.com/en/actions/managing-workflow-runs/adding-a-workflow-status-badge).
- TODO: MongoDB replication, see [here](https://docs.mongodb.com/manual/replication/).
- TODO: Use [fly](https://fly.io/) to deploy the application, as an alternative to [Heroku](https://www.heroku.com/).

### <span style="color:#297deb"> Project New Fatures to implement:</span>
- TODO: Add the option to name the documents, so that each user can have multiple documents and use them without the need to be decorating it's UUIDs.

## <span style="color:#297deb"> Project Description: </span>
This is a distributed text editor application, which means that you can edit a text file with your friends, in real time.
The purpose of this project is to learn about distributed systems and the challenges of building them, such as `concurrency`, `consistency`, `availability`, `partition tolerance`, etc.

## <span style="color:#297deb"> System Architecture: </span>
The system is composed of three main components: the `server`, the `client` and the `database`.  
- ***<span style="color:#297deb"> Client </span>***: The client is created using [React](https://react.dev/) that is responsible for sending the requests to the server and receiving the responses from it. The client contains a web interface for the document visualization.  As for the UI, it uses [Quill](https://github.com/zenoamaro/react-quill), which is a React component wrapping [Quill](https://quilljs.com/), a powerful and extensible rich text editor. The request that the client sends is defined in the section named `Service Interface`. The communication between the client and the server is made using [Socket.IO](https://socket.io/docs/v4/index.html), which is a library that enables real-time, bidirectional and event-based communication between the browser and the server.
- ***<span style="color:#297deb"> Server </span>***: The server is made in [NodeJS](https://nodejs.org/en/docs) in which is the most complex element of the system, that is responsible for holding a list of current active documents sessions, along with the basic server purpose that is receiving the client's messages. Just like in the client When the client request is processed, the client web interface will be updated. Futhermore, the server will send a response which updates the client web interface. Just like in the client, the server uses (obviously) [Socket.IO](https://socket.io/docs/v4/index.html) to communicate with the client. The messages that the server can send are also defined in the `Service Interface` section of this README. The communication between the server and the database is made using [Mongoose](https://mongoosejs.com/docs/guide.html), which is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
- ***<span style="color:#297deb"> Database </span>***: Lastly, the database used is a [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/), that is a `NoSQL` database who is responsible for storing the text document which will be in the format of a [JSON](https://json-schema.org/learn/getting-started-step-by-step.html), as follows: 
	```json
	{
		"id": "Document ID",
		"data": "Document Text"
	}
	```
This was a quick overview of the system architecture, but there is also a more detailed explanation of the system architecture in the `assets` folder, in the `English` and `Portuguese` folders, which contains the DrawIO files for the System Architecture, as well as the exported images in `PNG` format, just like the one below:
![System Architecture](https://github.com/BrenoFariasdaSilva/TextSync/blob/main/assets/English/TextSync-EN.png)

## <span style="color:#297deb"> Service Interface: </span>
The service interface is composed of the following commands:
- ***<span style="color:#64fccc"> get-document </span>***: This event is used to sent a request to the server to get the document from the database and return the document data to the client.  
  - ***`Parameters`***:
    - ***`id`***: The document ID.
  - ***`Return`***:
    - ***`load-document`***: The event that will be sent to the client, so that it can update the text editor UI with the document data. 
  
- ***<span style="color:#64fccc"> load-document</span>***: This event is a response of the server from a `get-document` request, which is used to update the text editor UI with the document data.
  - ***`Parameters`***:
    - ***`document`***: The document data.
  - ***`Return`***:
    - ***`none`***;

- ***<span style="color:#64fccc"> send-changes </span>***: This event is used to send a request to the server to update the document in the database, due to the fact that the user updated the document in the text editor UI and it's return is the broadcast of the changes to the other users that are in the same document session.
  - ***`Parameters`***:
    - ***`delta`***: The document changes made by the user. 
  - ***`Return`***:
    - ***`delta`***: The document changes that will be broadcasted to the other users, so that they can update their text editor UI.
  

- ***<span style="color:#64fccc"> receive-changes </span>***: This event is used to receive the changes froom the server that were made by the other user(s) that are in the same document session.
  - ***`Parameters`***:
    - ***`delta`***: The document changes made by the other user(s).
  - ***`Return`***:
    - ***`none`***;

- ***<span style="color:#64fccc"> save-document</span>***: This event is used to send a request to the server to save the document in the database, due to the fact that thhe timer defined in the client (***const SAVE_INTERVAL_MS = 1000;***)has reached the end.
  - ***`Parameters`***:
  - - ***`documentID`***: The document ID.
    - ***`data`***: The document data.
  - ***`Return`***:
    - ***`none`***;

- ***<span style="color:#64fccc"> disconnect</span>***: This event is used to send a request to the server to remove the user from the document session, due to the fact that the user has closed the tab or the browser.
  - ***`Parameters`***:
    - ***`none`***;
  - ***`Return`***:
    - ***`none`***;

## <span style="color:#297deb"> How to run: </span>
To run the project, you will need to have [NodeJS](https://nodejs.org/en/docs) installed on your machine, as well as [Nodemon](https://www.npmjs.com/package/nodemon) and [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). After installing all the dependencies, you will need to run the following command in the terminal:
```bash
  make dependencies
```
Why this command? Because it will install all the dependencies of the project, which will open the client and server folders and install the dependencies of each one, which are defined in the `package.json` file. After installing all the dependencies, you will need to create the `.env` file in the `client` and `server` folders, which will contain the following variables:  
The client `.env` file will contain the following variables:
```bash
  REACT_APP_SERVER_ADDRESS=http://localhost
  REACT_APP_SERVER_PORT=3001
```
The server `.env` file will contain the following variables:  
```bash
  SERVER_ADDRESS=http://localhost
  SERVER_PORT=3001
  CLIENT_ADDRESS=http://localhost
  CLIENT_PORT=3000
  DATABASE_URI=insert your mongodb database uri here
```
After creating the `.env` file, you will need to create two terminals, one for the client and one for the server.   
In the server terminal, you will need to run the following command:
  ```bash
    make run_server
  ```
In the client terminal, you will need to run the following command:
  ```bash
    make run_client
  ```
In the case you get the connection denied in the database, if you are using the online database, you will need to add your IP address to the database whitelist.


## <span style="color:#297deb"> Client Directory Explained: </span>
The client folder is located in `TextSync/client`.
- ***`public`***: This folder contains the `index.html` file, which is the HTML file that is rendered by the browser, and the `favicon.ico` file, which is the icon that is displayed in the browser tab.
- ***`src`***: This folder contains the `App.js`, `index.js`, `styles.css` and `TextEditor.js`.
  - `App.js`: This file contains the `App` component, which is the main component of the application, which is responsible for rendering the `TextEditor` component.
  - `index.js`: This file is responsible for rendering the `App` component in the `index.html` file.
  - `styles.css`: This file contains the styles of the `index.html` file.
  - `TextEditor.js`: This file contains the `TextEditor` component, which is the component responsible for rendering the text editor, which contains the `Quill` component, which is the component responsible for rendering the text editor itself, and the `Toolbar` component, which is the component responsible for rendering the toolbar of the text editor. Futhermore, this file is also responsible for sending event messages to the server, such as `load-document`, `save-document` and `disconnect`. Moreover, it is also responsible for receiving event messages from the server, such as `load-document` or `receive-changes`.
  - `package.json`: This file contains all the dependencies of the project.
  - `package-lock.json`: This file contains the version of the dependencies of the project.
- ***`node_modules`***: This folder contains all the dependencies of the project.
- ***`.env`***: This file contains the environment variables of the application, such as the server address and the server port.

## <span style="color:#297deb"> Server Directory Explained: </span>
The server folder is located in `TextSync/server`.
- ***`server.js`***: This file contains the `server` function, which is the function responsible for creating the server, which is responsible for listening to the requests made by the client, such as `save-document` or `disconnect`. This file is also responsible for connecting to the database, which is where the document data is stored. Moreover, this file is also responsible for sending event messages to the client, such as `load-document` or `receive-changes`.
- ***`Document.js`***: This file contains the `Document` model, which is the model responsible for defining the document schema, which is the schema that defines the structure of the document data in the mongodb database.
- ***`package.json`***: This file contains all the dependencies of the project.
- ***`package-lock.json`***: This file contains the version of the dependencies of the project.
- ***`.env`***: This file contains the environment variables of the application, such as the server address, server port and the database uri.
- ***`node_modules`***: This folder contains all the dependencies of the project.

## <span style="color:#297deb"> Project Dependencies: </span>
- [NodeJS](https://nodejs.org/en/docs), which is a JavaScript runtime environment that executes JavaScript code outside a web browser, that we will use to create the server.
- [Nodemon](https://www.npmjs.com/package/nodemon), which is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [Mongoose](https://mongoosejs.com/docs/guide.html), which is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [React](https://reactjs.org/docs/getting-started.html), which is a JavaScript library for building user interfaces.
- [Quill](https://quilljs.com/docs/quickstart/), which is a powerful, free, open-source WYSIWYG editor built for the modern web.
- [Socket.io](https://socket.io/docs/v4), which is a library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.
- [dotenv](https://www.npmjs.com/package/dotenv), which is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.
  
This are just the most importante dependecies of this project, but the `package.json` file contains all the dependencies of the project.

## <span style="color:#297deb"> Q&A: </span>
- ***What is the purpose of the project?*** The purpose of the project is to create a collaborative text editor, that is, a text editor that can be used by multiple users at the same time, where each user can see the changes made by the other users in real time.

- ***Ẁhy aren't the client handling the collisions from the generated UUIDs?*** The client isn't handling the collisions from the generated UUIDs because the probability of a collision is so low that it is not worth the effort to handle it. The probability of a collision is 1 in 2<sup>¹²²</sup>. For more information, see [this](https://en.wikipedia.org/wiki/Universally_unique_identifier#Random_UUID_probability_of_duplicates). 

- ***Why is the client sending the document data to the server every second?***: The client is sending the document data to the server every second because the server is saving the document data in the database every second, so that if the server crashes, the document data will not be lost.

- ***Why the use of WebSockets?*** The use of WebSockets is due to the fact that they are a communication protocol that allows the client and the server to communicate in real time, that is, the client and the server can send messages to each other at any time, without the need for the client to send a request to the server and wait for the server to respond.

## <span style="color:#297deb"> Useful Documentation: </span>
- [Fly Steps Guide](https://fly.io/docs/hands-on/install-flyctl/)