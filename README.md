# Tello-Recon 🎯
Project for COMP-361: A drone recon automation system built for the DJU Tello Drone

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

## To-do's
- [ ] Basic Connection & Controls (make sure they work) 
  - [ ] Setup UDP connection to the tello
  - [ ] Setup programmatic control systems (height, pitch, acceleration, etc)
  - [ ] Setup video streaming / recording for review
  - [ ] Setup possible manual override system
- [ ] Frontend / Clientside
  - [ ] Setup basic client that can talk with the backend
  - [ ] Setup manual override mode with basic controls
  - [ ] Setup live video feed in browser
  - [ ] Setup video review system
  - [ ] TBD
- [ ] Backend 
  - [ ] Setup UDP connection
  - [ ] Setup websocket streaming of video
  - [ ] Setup secure login system for access to the drone
  - [ ] Setup cloud storage backup of videos
- [ ] AI / Pathfinding
  - [ ] Literature review on pathfinding for drones
  - [ ] TBD
