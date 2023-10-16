1)nodejs program
file name : productProgram.js
Run command : node productProgram.js


2)REST APIs Project (unitask_APIs)

- REST API is created using the Nestjs framework with Typescript. 
- class-validator dependency is used to validate the request body.
- TypeORM library used to manage data with database.
- JWT authentication Performned.
- Custom auth.middleware.ts is created to access restricted end points.

----------------------------------------------------
Project setup :
1) As you get project from the github first need to install dependancies, run following command
	- npm install

2) Database setup
	- Need wamp/xampp server
	- Need any database tool (mysql workbench)
	- Need to create database "unitask"
	- Table will be auto generated while running project

- In case of need to create table manually database backup file also attached. 
	- Need to import the database file(sql file)
		- For workbench : 
			- Go to Administrative tab 
			- select data Import/Restore
			- Choose option "Import from self-contained File" 
			- select new schema 
			- click "Start Import"
Note : you might need to chnage the database configuration in ".env" file.		
			
3) Project running commands :
you can use any of the following command to run the project
port : 3000

- npm run start:dev
- npm run start
- nest start
- nest start --watch

- All the API request created in postman collection file(Unitask.postman_collection.json).
	- In signup API need to use unique email
	- After login API Need to add access_token in other apis in authorization tab -> select type "Bearer Token"

- User logout
	- User access_token can be valide till 1 hr.
	- User session is managed
-> In both cash if user logged out or token is expired protected API will be not accessible by user.