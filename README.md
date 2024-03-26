<div align="center">
  
 # [Welcome to TextSync - A Real-Time Distributed-Text-Editor Application!](https://github.com/BrenoFariasdaSilva/TextSync) <img src="https://github.com/BrenoFariasdaSilva/TextSync/blob/main/.assets/TextSync.svg"  width="3%" height="3%">

</div>

<div align="center">
  
---

This project is being deployed in [Fly.io](https://fly.io/) and can be accessed [here](https://textsync.fly.dev/). Also, there is a video about it [here](https://youtu.be/IIywSNjxo8o).
  
---

</div>

<div align="center">

![GitHub Code Size in Bytes](https://img.shields.io/github/languages/code-size/BrenoFariasdaSilva/TextSync)
![GitHub Last Commit](https://img.shields.io/github/last-commit/BrenoFariasdaSilva/TextSync)
![GitHub](https://img.shields.io/github/license/BrenoFariasdaSilva/TextSync)
![wakatime](https://wakatime.com/badge/github/BrenoFariasdaSilva/TextSync.svg)

</div>

<div align="center">
  
![RepoBeats Statistics](https://repobeats.axiom.co/api/embed/b71df9a5a21e8f4356d06071a8e86504c25e3c1c.svg "Repobeats analytics image")

</div>

## Table of Contents
- [Welcome to TextSync - A Real-Time Distributed-Text-Editor Application! ](#welcome-to-textsync---a-real-time-distributed-text-editor-application-)
  - [Table of Contents](#table-of-contents)
    - [ Project Status: Completed.](#-project-status-completed)
    - [ Project TO-DO List:](#-project-to-do-list)
    - [ Project New Fatures to implement:](#-project-new-fatures-to-implement)
  - [ Project Description: ](#-project-description-)
  - [ System Architecture: ](#-system-architecture-)
  - [ Service Interface: ](#-service-interface-)
  - [ How to run: ](#-how-to-run-)
  - [ Client Directory Explained: ](#-client-directory-explained-)
  - [ Server Directory Explained: ](#-server-directory-explained-)
  - [ Project Dependencies: ](#-project-dependencies-)
  - [ Q\&A: ](#-qa-)
  - [ Useful Documentation: ](#-useful-documentation-)
  - [Contributing](#contributing)
  - [License](#license)

### <span style="color:#297deb"> Project Status: </span><span style="color:#64fccc">Completed.</span>

### <span style="color:#297deb"> Project TO-DO List:</span>
- TODO: Add a project build status badge, see [here](https://docs.github.com/en/actions/managing-workflow-runs/adding-a-workflow-status-badge).

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
		"_id": "Document ID",
		"data": "Document Text"
	}
	```
This was a quick overview of the system architecture, but there is also a more detailed explanation of the system architecture in the [assets folder](https://github.com/BrenoFariasdaSilva/TextSync/tree/main/assets), in the [English](https://github.com/BrenoFariasdaSilva/TextSync/tree/main/assets/English) and [Portuguese](https://github.com/BrenoFariasdaSilva/TextSync/tree/main/assets/Portuguese) folders, which contains the DrawIO files for the System Architecture, as well as the exported images in `PNG` format, just like the one below:
![System Architecture](https://github.com/BrenoFariasdaSilva/TextSync/blob/main/assets/English/TextSync-EN.png)

## <span style="color:#297deb"> Service Interface: </span>
The service interface is composed of the following commands:
- ***<span style="color:#64fccc"> get-document </span>***: This event is used to sent a request to the server to get the document from the database and return the document data to the client.  
  - ***`Parameters`***:
    - ***`documentId`***: The document ID.
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
Why this command? Because it will install all the dependencies of the project, which will open the client and server folders and install the dependencies of each one, which are defined in the `package.json` file.  
After installing all the dependencies, you will need to create the `.env` file in the `client` and `server` folders. There is a `.env.example` inside each directory and they have the following structure.  
The client `.env` file will contain the following variables:
```bash
  REACT_APP_SERVER_ADDRESS=ADDRESS HERE, SUCH AS http://localhost
  REACT_APP_SERVER_PORT=IP HERE, SUCH AS 3001
```
The server `.env` file will contain the following variables:  
```bash
  SERVER_ADDRESS=ADDRESS HERE, SUCH AS http://localhost
  SERVER_PORT=IP HERE, SUCH AS 3001
  CLIENT_ADDRESS=ADDRESS HERE, SUCH AS http://localhost
  CLIENT_PORT=IP HERE, SUCH AS 3000
  DATABASE_URI=mongodb+srv://USERNAME_HERE:PASSWORD_HERE@CLUSTER_HERE
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

- ***Why the use of WebSockets?*** The use of WebSockets is due to the fact that they are a communication protocol that allows the client and the server to communicate in real time, that is, the client and the server can send messages to each other at any time, without the need for the client to send a request to the server and wait for the server to respond. So, unlike traditional HTTP connections that follow a request-response model, WebSockets allow for continuous data transmission in both directions. Here is a quick overview of the WebSocket protocol:
  - Handshake: The client sends an HTTP request to the server, requesting an upgrade to the WebSocket protocol. This request includes specific headers indicating the intention to establish a WebSocket connection.
  - Handshake response: If the server supports WebSockets, it responds with an HTTP 101 status code (Switching Protocols) and upgrades the connection to the WebSocket protocol.
  - WebSocket connection: Once the connection is upgraded, the WebSocket connection is established, and both the client and server can start sending data to each other.
  - Data exchange: The WebSocket connection remains open, allowing data to be sent back and forth between the client and server. Either side can initiate communication at any time, without the need for a new HTTP request. This bidirectional communication enables real-time data transfer.
  - Connection termination: The WebSocket connection remains open until either the client or server explicitly closes it or if a network issue occurs.  
  
So, as we can see, WebSockets are a great choice for real-time communication between the client and the server, just what we need for this project.

- ***Why the use of MongoDB?*** The use of MongoDB is due to the fact that it is a NoSQL database, which means that it is a database that does not use the traditional row-column table database model, but rather a model that allows for more flexible and scalable data storage. Moreover, NoSQL databases are also great for this project because they are very scalable, which means that they can handle a large amount of data, which is also great for this project, since the document data can be very large. Making a connection of the MongoDB with the CAP theorem, we can see that MongoDB is a CP database, which means that it is a database that is consistent and partition tolerant. This means that MongoDB is a database that is consistent, which means that all clients see the same data at the same time, and partition tolerant, which means that the database continues to operate despite network partitions. So, as we can see, MongoDB is a great choice for this project.
- ***So, how does MongoDB provice consistency and partition tolerance?*** MongoDB provides consistency and partition tolerance through the use of a replica set, which is a group of MongoDB servers that maintain the same data set, providing redundancy and increasing data availability. A replica set contains several data bearing nodes and optionally one arbiter node. The primary node receives all write operations, and is responsible for replicating all writes to the secondaries. Secondaries can optionally serve read operations, but that data is only eventually consistent by default. So, in case of a network partition, the primary node will continue to receive all write operations, and will replicate all writes to the secondaries, which will continue to serve read operations, but that data is only eventually consistent by default. So, as we can see, MongoDB provides consistency and partition tolerance through the use of a replica set.

- ***Why not use Redis for local storage?*** The use of Redis for local storage is not necessary because we only have a single server, so we don't need to use Redis for local storage, since we can store the document data in the server memory. If we had multiple servers, then we would need to use Redis for local storage, since we would need to store the document data in a database that is accessible by all servers, and Redis is a great choice for this, since it is a database that is very fast and can handle a large amount of data.

## <span style="color:#297deb"> Useful Documentation: </span>
- [Fly Steps Guide](https://fly.io/docs/hands-on/install-flyctl/)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. If you have suggestions for improving the code, your insights will be highly welcome.
In order to contribute to this project, please follow the guidelines below or read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details on how to contribute to this project, as it contains information about the commit standards and the entire pull request process.
Please follow these guidelines to make your contributions smooth and effective:

1. **Set Up Your Environment**: Ensure you've followed the setup instructions in the [Setup](#setup) section to prepare your development environment.

2. **Make Your Changes**:
   - **Create a Branch**: `git checkout -b feature/YourFeatureName`
   - **Implement Your Changes**: Make sure to test your changes thoroughly.
   - **Commit Your Changes**: Use clear commit messages, for example:
     - For new features: `git commit -m "FEAT: Add some AmazingFeature"`
     - For bug fixes: `git commit -m "FIX: Resolve Issue #123"`
     - For documentation: `git commit -m "DOCS: Update README with new instructions"`
     - For refactors: `git commit -m "REFACTOR: Enhance component for better aspect"`
     - For snapshots: `git commit -m "SNAPSHOT: Temporary commit to save the current state for later reference"`
   - See more about crafting commit messages in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

3. **Submit Your Contribution**:
   - **Push Your Changes**: `git push origin feature/YourFeatureName`
   - **Open a Pull Request (PR)**: Navigate to the repository on GitHub and open a PR with a detailed description of your changes.

4. **Stay Engaged**: Respond to any feedback from the project maintainers and make necessary adjustments to your PR.

5. **Celebrate**: Once your PR is merged, celebrate your contribution to the project!

## License
This project is licensed under the [Creative Commons Zero v1.0 Universal](LICENSE), which allows you to use, modify, distribute, and sublicense this code, even for commercial purposes, as long as you include the original copyright notice and attribute you as the original author for the repository. See the [LICENSE](LICENSE) file for more details.
