# ReelViu
A self made project of an online movie database which not only provides with the information about the selected movie but also critically analyses the movie and also issues an audience rating for a specific movie.

This project has been developed using Node.JS and Bootstrap and `npm` is the package manager. You need to have these on your local machine as prerequisites to start development. Follow the links below to install the requirements and read the documentation.

- [Yarn](https://yarnpkg.com/lang/en/)
- [Node](https://nodejs.org/en/)

## Demo
Here is a working live demo :  https://reelviu.herokuapp.com/ (since it is free version of heroku it is little slower)


## Landing Page

![](Landing.png)

## Instructions to Run

1. `npm install --production=false` to install the dependencies and dev dependencies. You need to be in the project root for this.

2. `npm run` to start the development server or `nodemon app.js` to start a local development server.

  ## Instructions for contributors

  1. Fork this repository
  2. Clone it to your local machine, and work on your fork
  3. Resolve an issue/introduce a feature and open a pull request
  4. The PR must be opened to the `develop` branch of this repository. **Do not make direct PRs to the master branch.**
  5. Please handle dependency versions cautiously. Do not install updated versions of dependencies in `package.json` while setting up your project. Try to use the `--exact` flag wherever possible. Read the docs for more info.

  ### Syncing your Fork

  When you clone your fork to your machine, it gets manifested as `origin`. So now you can update the changes in your local repo to your fork. But what if someone else in this entire while made a PR to the parent repo (from which you forked your repo) and it was merged? Now the parent repo has some code which you do not have. Here, if you try to make a PR to the parent repo without updating the changes just made by someone else, you will encounter merge conflicts. Here's what you have to do:

  1. `git remote add <name> <url>` where 'name' is the name you want to give to the remote. For example, your fork is named 'origin'. The 'url' is the url of the parent repository, i.e this repo in your case. The general convention for name is 'upstream'. Now 'upstream' is set as the parent remote.

  2. Every time you sit down to work, remember to update your fork with potential changes that might have been made in the parent repo by running

  ```
  git fetch upstream
  git pull upstream develop
  ```
  This has now pulled the changes in the `develop` branch of the parent repo to the current branch of your remote. Now you can simply make your additional changes, push the code to your fork and make a PR.

  3. Remember to execute step 2 before you start working every time, or be ready to face some nasty merge conflicts!

  4. Conflicts occur when the same piece of code has been modified in one way by you, and in some other way in the parent repo, and you obviously don't have those modifications updated in your fork. In case of merge conflicts, your editor will give you two choices in the same piece of code which you will have to manually resolve by choosing what you want to keep and you don't. Just delete the code snippet you don't want, and keep the one you do. Once you do this for every conflict, simply commit the changes and push them to your fork.

## Built with 

- [NodeJs](https://nodejs.org/en/) -As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.
- [MongoDB](https://www.mongodb.com/) -MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema.
- [ExpressJs](https://expressjs.com/) -Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
