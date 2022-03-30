# Web Information Technologies
#### INFO30005 2022 Semester 1 

This repository contains the code and assets for the project components of INFO30005 for Semester 1 2022.

### Group members:
- Aditya Ajit
- Evie Hadlow
- Fane Ye
- Grant Holtes
- Tanay Khandelwal

## Usage:
There are two options for running: Full application (frontend + backend) or frontend only.

### Full application - Running in development mode:
This will run the app in dev mode
```
cd scr
npm run dev 
```

### Front end only
Run with ```ws``` or a web server of your choice
```
cd scr/gui
ws
```

### Deploying:
TBC

## Setup:
How to set up the development enviroment, based on [mozilla express node](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)
1. Install node at https://nodejs.org/en/
2. test node install by typing in terminal ```node -v``` and ```npm -v```.
3. Install all dependancies with ```cd src```, then ```npm install```


## Directory structure:
The code in the repository is organised by **functionality**:
```
src/
	|- static/
	|	|- images/
	|	|- icons/
	|- gui/
	|	|- style/ (CSS)
	|	|- scripts/ (Frontend JS)
	|	|- HTML (organised by user access role: public, clinition, patient)
	|	|- index.html
	|- routes/ (JS files that define the website routes and API routes)
	|- models/ (Contains all data models and object classes)
	|- index.js
```

### Tutorial attendances:

Tutorials missed are listed below:
- Aditya Ajit: 0
- Evie Hadlow: 0
- Fane ye: 0
- Grant Holtes: 0
- Tanay Khandelwal: 0