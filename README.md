# Tello-Recon 🎯

Project for COMP-361: A drone research toolkit built for the DJI Tello Drone

### Warning

This software is provided "as is"- use this software at your own risk.
Drones can be dangerous so be sure to test from a safe disatance and with safety precautions in place.

## Project Goals

**This is a term project for COMP-361 at UFV**

The Tello-Recon project aims to provide an extensible, and open-source set of tools that enable researchers to get up and running with the DJI Tello in a couple of minutes, with little to no background regardless of the language they use / the technical background they have.

This is achieved by providing two modules: 
1. The `Frontend` Module: this is a web app that enables users to easily connect to, control, and log flights from your Tello Drone.
2. The `Backend` Module: this is a server that provides a simple, comprehensive WebSocket API to communicate with, and ingest video from the Tello Drone. 

## Quick Start Guide

The quickest way to get going with the Tello-Recon project is to run the `frontend` module! 
This requires you to run both the frontend and backend modules simultaneously.

- The frontend acts as a control system and provides a livestream from the drone's camera
- The backend acts as a bridge between the frontend and the drone

With that in mind, to get this running you'll need to do the following:

0. make sure that `ffmpeg` is installed on your system ([more info here: it decodes the drone's videostream](https://www.ffmpeg.org/)) 
1. `npm install` && `npm run start` in both the `/frontend` and `/backend` folders
2. turn on your drone
3. connect to the Tello's wifi network from your computer (this should be called Tello-XXXX, where the x's are numbers)
4. open the frontnend in your browser (this should be at localhost:3000) and click the "connect" button
5. A video feed from your drone should appear in the top right
6. Start using your Tello by hitting the "flight" button

## Comprehensive Documentation
For comprehensive docs / a deeper understanding of how Tello-Recon works, [check out our docs / wiki section here](https://github.com/MykalMachon/Tello-Recon/wiki/Start-Here)
