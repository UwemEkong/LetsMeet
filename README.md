# LetsMeet
Submission To HackMerced 2021

Uses the GraphQL MeetUp API in order to find groups and events in your area that are
tailored to categories that you're interested in.

## Deploying with Docker

```sh
$ docker run --env PORT=80 -p 80:80 gcr.io/hackmerced-307615/letsmeet
```

## Front end setup

Node.js with NPM/yarn required

Our front end is written with React. Webpack bundles our JavaScript to a single
file that is distributed via our Python (Quart) server.

### Installation

```sh
$ cd frontend  # This assumes you cloned the repository and have entered the root folder.
$ npm install  # Installs all of the required node modules.
$ npm run build  # Bundles the JS for distribution.
```

## Back end Setup

Python 3.7+ required

### Installation

```sh
$ cd frontend  # This assumes you cloned the repository and have entered the root folder.
$ python -m venv .venv  # Sets up a new virtual environment in the backend folder.
$ .venv\Scripts\activate  # Puts you into the new virtual environment.
$ pip install -r requirements.txt  # Installs the requirements for running.
```

### Running

```sh
$ .venv\Scripts\activate  # If the virtual environment is not already active.
$ python -m backend  # Starts the backend.
$ deactivate  # This exits you out of the virtual environment.
```