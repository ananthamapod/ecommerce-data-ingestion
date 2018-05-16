# ecommerce-data-ingestion

>a sample system for scalably ingesting large data files of ecommerce transaction records

## Basic information

The project is build entirely using JavaScript, Node.js and Express for the web server, Sequelize as ORM, Node.js for backend services, client-side bundling with Webpack, and jQuery on the client-side. The project is split up into two parts, the file upload handling and the database loading. These are both written as separate Node servers so that they could possibly be completely decoupled and hosted on separate servers. While currently hosted locally, database information is also configured such that it could be changed to point to an external source instead.

## Setup Instructions

After cloning the repository

1. Ensure Node.js and MySQL (or other Sequelize compatible SQL variant) are installed on the system

2. Make sure to update the config.json file as necessary with the intended database configuration info (note: the database name given should be already created and the database credentials given should have write privileges on this database)

3. Install the node modules necessary by running `npm i` from within the root directory of the project

4. Run the frontend development bundling workflow in production mode by running `npm run feprod`

5. Run the database loading service with `npm run loaderprod`

6. Run the client-facing web server with `npm run webprod`

7. Open up the page in the browser, which, assuming no additional environment variables have been set for the port and host of the application, will be found at [http://localhost:3000](http://localhost:3000)

## Some Steps That Can Be Taken if More Time Was Involved

1. The database loading is currently done with a service that looks at the file stream line by line and does individual line parsing and writes to a database. A better approach would be to segment this work out further into more services, one to handle the parsing into fields and others to construct DTOs from those fields and handle the database writes.

2. Another useful thing to do, since the data has been split into 3 tables, would be to group the multiple database writes into a database transaction to ensure there's no corruption due to failures in between writes.

3. Rather than sending files by posting to the other service over the network, it would be useful instead to pass the data through a messaging system that has message persistence enabled so that there are no files or data lost in transit.

4. If resources are available, an in-memory parallel data processing engine like Apache Spark would be excellent for parsing out the data in the files and sending it to the appropriate places to be written to the database. Especially with a cluster of multiple machines, in memory storage and processing is very viable and probably the ideal solution.

## Dependencies

* Node.js
* MySQL/variant
* A ton of node modules (`npm install` all the things):
  * App
    * jQuery - DOM manipulation and Ajax library
    * nprogress - progressbar module
    * resumable - module that uses the HTML5 File API to reliably handle multipart/chunk file uploads
    * request-stream - wrapper around the low-level http and https modules that exposes the request and response objects as readable/writeable streams
    * event-stream - more full featured wrapper around native Node.js streams
    * sequelize - SQL flavor Node.js ORM
    * cookie-parser, body-parser, connect-multiparty - express middlewares for better handling of cookies, general post data, multipart form input respectively
    * morgan - express middleware for request logging
    * debug - great for debug level logging during development
    * pug, node-sass-middleware - pug templating for webpages and sass/scss support for styling
  * Development/Bundling
    * webpack & related (loaders and additional tools) - module bundling
    * babel & related (polyfills) - crosspiling for advanced ES6/7 features
    * stylelint, eslint. & related - linting
  * Testing
    * mocha & chai - endpoint testing

## Authors

* **Ananth Rao** (@ananthamapod)

## LICENSE
MIT
