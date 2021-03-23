# Tello-Recon 🎯

Project for COMP-361: A drone recon automation system built for the DJI Tello Drone

### Warning

This software is provided "as is"- use this software at your own risk.
Drones can be dangerous so be sure to test from a safe disatance and with safety precautions in place.

## Project Goals

**This is the term project for COMP-361**
The goal of this project is to create an automated drone "recon" system that can survey and record a given area on a regular basis.

This has a number of practical applications:

1. **Automated property security** : the tello has a large enough range that it's practical to use it as a
2. **Site surveying for progress** : construction contractor's could use this to take visual snapshots of progress over time.
3. TBD

## Getting Started

Tello-Recon requires you to run both the frotend and backend simultaneously.

- The frontend acts as a control system and provides a livestream from the drone's camera
- The backend acts as a bridge between the frontend and the drone

With that in mind, to get this running you'll need to do the following:

0. make sure that `ffmpeg` is installed on your system
1. `npm install` && `npm run start` in both the `/frontend` and `/backend` folders
2. turn on your drone
3. connect to the Tello's wifi network from your computer
4. open the frotnend in your browser (if everything works you should see a "connected to drone" status message in the web app
5. Start using your Tello!

## To-do's

- [ ] Basic Connection & Controls (make sure they work)
  - [x] Base our backend on [this repo](https://github.com/csscottc/drone-ctrl) (Josh)
  - [x] Setup basic client that can talk with the backend (Mykal)
  - [x] Setup API based on the Backend (Mykal)
  - [x] Setup video streaming (Mykal)
  - [x] Setup flight log exporting (Mykal)
  - [ ] Code cleanup / docs (Josh)
- [x] Main Features & Extras
  - [x] Setup Drone controls in frontend (Josh)
  - [x] Setup live video feed in browser (Josh)
- [x] AI / Pathfinding
  - [x] Literature review on pathfinding for drones
