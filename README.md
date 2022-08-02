# Challenge-NestJs-Angular


Server:
-   Nodejs providing CRUD through a REST API


Client:
-  Table (min. 5 columns, 200 records) with the ability to add, modify and delete (confirmation window is required) by opening a pop-up window
-  The content of each cell is arbitrary.
-  The pop-up window must be able to be closed by pressing the ESC or “X” button (in the upper right corner), as well as by clicking on the area outside the pop-up window
-  When opening a pop-up window, the content should not move.
-  The appearance and closing of the pop-up window must be animated
-  It should be possible to transfer the URL address to another user and then open the same state (Pop-up window)
-  Responsive design (Mobile Ready)
-  The solution should not use jQuery

## Backend Tech Stack:
-NestJs
-Express
-Mongodb
-Typescript
-Docker
-Jest
-Mongo Memory Server
-Class validator


## Frontend Tech Stack:
-Angular
-Bootstrap
-Typescript
-RxJs
## Backend 
### Run backend project
For run the backend project you have to:
- go to back-end folder and open a terminal
- npm install
- you need to have installed docker
- run: docker-compose -f stack.yml up
- for running project execute:  npm run start:dev
- if you are using a Unix based operating system, for the test you need to install libcrypto.so.1.1
- for run test execute: npm run test:cov


## Frontend
### Run frontend project


For run frontend project you have to:
- go to front-end folder
- open a console and write npm i
- for run the proyect execute: ng serve --o 