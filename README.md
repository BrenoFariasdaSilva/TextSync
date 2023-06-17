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
- ***<span style="color:#297deb"> Client </span>***: The client is created using [React](https://react.dev/) that is responsible for sending the requests to the server and receiving the responses from the server. The client contains a web interface for the document visualization.  As for the UI, it uses [Quill](https://github.com/zenoamaro/react-quill), which is a React component wrapping [Quill](https://quilljs.com/), a powerful and extensible rich text editor. The client will send requests to the server, which will be composed of commands like `insert(position, string_to_insert)` or `delete(position, string_to_delete)`, along with managing the concurrency of the requests. When the client request is processed, the client web interface will be updated. Futhermore, the server will send a response which updates the client web interface.
- ***`Server`***: The server is made in [NodeJS](https://nodejs.org/en/docs) in which is the most complex element of the system, that is responsible for holding a list of current active documents sessions, along with the basic server purpose that is receiving the client's messages, which will be composed of commands like `insert(position, string_to_insert)` or `delete(position, string_to_delete)`, along with managing the concurrency of the requests. When the client request is processed, the client web interface will be updated. Futhermore, the server will send a response which updates the client web interface.  
- ***`Database`***: Lastly, the database used is a [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/), that is a `NoSQL` database who is responsible for storing the text document which will be in the format of a [JSON](https://json-schema.org/learn/getting-started-step-by-step.html), as follows: 
	```json
	{
		"id": "Document ID",
		"data": "Document Text"
	}
	```
This was a quick overview of the system architecture, but if there is also a more detailed explanation of the system architecture in the `assets` folder, in the `English` and `Portuguese` folders, which contains the DrawIO files for the System Architecture, as well as the exported images in `PNG` format, just like the one below:
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

- **<span style="color:#64fccc"> disconnect</span>***: This event is used to send a request to the server to remove the user from the document session, due to the fact that the user has closed the tab or the browser.
  - ***`Parameters`***:
    - ***`none`***;
  - ***`Return`***:
    - ***`none`***;

## <span style="color:#297deb"> Project Dependencies: </span>
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
## <span style="color:#297deb"> Useful Documentation: </span>
- [Fly Steps Guide](https://fly.io/docs/hands-on/install-flyctl/)

## <span style="color:#297deb"> Q&A: </span>
- ***What is the purpose of the project?***: The purpose of the project is to create a collaborative text editor, that is, a text editor that can be used by multiple users at the same time, where each user can see the changes made by the other users in real time.
- ***Ẁhy aren't the client handling the collisions from the generated UUIDs?***: The client isn't handling the collisions from the generated UUIDs because the probability of a collision is so low that it is not worth the effort to handle it. The probability of a collision is 1 in 2<sup>¹²²</sup>. For more information, see [this](https://en.wikipedia.org/wiki/Universally_unique_identifier#Random_UUID_probability_of_duplicates). 
