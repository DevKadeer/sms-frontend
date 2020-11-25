
# Code Assignment

## Problem statement

1. Setup a database of your choice and seed it from the `data.json`.
2. Write a backend that provides a RESTful interface to interact with this data
(CRUD).
3. Create a frontend that displays a table with the columns
**city**, **start date**, **end date**, **price**, **status**, **color**.
All columns should be sortable. The data is requested from the backend.
4. Above the grid, please add two date pickers to filter the object by date
range.

Though this is a small app, please pay attention to your application structure.
Host your code on github or bitbucket and include a README with instructions on
how to install and run your application. Bonus-points for providing a
docker-compose file to run your project :)

# Assignment Approach:

I have distributed the code challenge into two parts:
 
 1) SMS_REST_API : This includes the REST API for the requested resource.
 2) SMS-FrontEnd: This is a front end of the challenge. It consumes `SMS_REST_API` endpoints to meet the resource requests.

# Installation pre-requisites

IMPORTANT: Please use NPM 5 or above, to make sure the package-lock.json is used.

For running this project we need npm installed on our machine. 

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli


# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/angular-university/sms-frontend.git

    cd sms-frontend
    npm install

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start

The application is visible at port 4200, [http://localhost:4200]

