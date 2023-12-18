First you need to run in your mysql database this query:

```sql
CREATE DATABASE `book-contacts` /*!40100 DEFAULT CHARACTER SET latin1 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

Then you need to create a .env file in the root of the project with the variables shown in the .env.example file.

Then you need to run in the root of the project:

### `npm install`

This will install all the dependencies required for the project to run.

### `npm run dev`

Runs the app in the development mode.\

### `npm run test`

Runs the tests of the project.\
The tests are in the test folder, just uncomment the test that you want to run, changing the body/id of the request if needed.


Open [http://localhost:8000](http://localhost:8000) to test it.

There is a file with examples of the requests that you can make to the api in the root of the project: tests/contacts.mjs




