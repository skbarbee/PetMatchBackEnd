# PetMatchBackEnd
# Pet Match 
## Overview
This application is a full stack application where users can create profiles for thier pets in hopes of finding matches for play dates. 

## Deployed Link
TBD


## User Stories
As a user I want the ability to...
  - sign in  or register
  - make a profile for each your pets
  - add profile pictures
  - see your pets
  - see all pets
  - update profiles
  - communicate with other pet owners
  - rating system 

## User Stretch	Goals
  - schedule meetings 
  - YOU GOT A MATCH
  
    
## Technology Used
  - HTML
  - CSS
  - Express.js
  - React
  - Mongoose
  - React -Bootstrap
  
  
## Application Wire Frame
![slide](/imageFiles/1.png)
![slide](/imageFiles/2.png)
![slide](/imageFiles/3.png)
![slide](/imageFiles/4.png)
![slide](/imageFiles/5.png)
![slide](/imageFiles/6.png)


## Entity Relationship Diagrams
![slide](/imageFiles/ERDModels.jpg)
![slide](/imageFiles/restfulRoutes.jpg)
![slide](/imageFiles/seedData.jpg)

## Schedule

- Friday 10/28: Pitch idea, Get the back end going
- Saturday 10/29: PetRoutes and Reviews Routes
- Sunday 10/30: Decide whether or not to use Socket-io
- Monday 10/31: Front End
- Tuesday 11/1: Front End React, should be near MVP
- Wednesday 11/2: Goal: MVP status, Work on Front End Styling 
- Thurday 11/3: Polish all details
- Friday 11/4: Presentation Day

## MVP

- An app that looks and functions at least as well as the Pet App we did in class, with a navigation bar, and div boxes that display the users resources and allows the user to edit and delete them as well as make comments on them/leave messages for other users.

## Example Seed Data 

```
const startPets = [
  { name: "Jasmine Pedraza", type: "cat", breed: "Domestic Shorthair", likes: "playing ribbon", availableForPlayDate: true, rating: "3 fish" },
  { name: "Trisca Laghari", type: "dog", breed: "American Husky", likes: "playing fetch", availableForPlayDate: true, rating: "5 bones" },
  { name: "Chun Heu Kim", type: "cat", breed: "Orange Domestic Short hair", likes: "snuggle time", availableForPlayDate: true, rating: "4 fish" },
  { name: "Estelle Darcy", type: "dog", breed: "Wirehaired Terrier", likes: "dog park playtime", availableForPlayDate: true, rating: "3 bones" }, 
  { name: "Jiara Martins", type: "cat", breed: "Domestic Short Hair", likes: "guarding the water fountain", availableForPlayDate: false, rating: "3 fish" },
  { name: "Margarita Perez", type: "dog", breed: "Chihuahua", likes: "spa days", availableForPlayDate: false, rating: "3 fish" }
]

```