# Project 1 @cmda-minor-web · 2018-2019
This project is in commision for the Amsterdam Public Library, the OBA. The assignment is to build a concept and prototype within a week. The prototype should help the visitor to find items from the oba's collection.

## My concept
My target audience are children and the concept that goes as follows:

My idea is that the children get a list of icons on a screen. Each icon has its own meaning that belongs to a certain category/genre. When an icon is clicked, all books are shown in a "bookcase". From this list a book can be chosen. See below an example how the screen looks like.

<img width="1280" alt="screenshot 2019-03-07 14 24 35" src="https://user-images.githubusercontent.com/32538678/53959754-d0202700-40e4-11e9-9062-82e35a2900b2.png">

When a book is selected, the user can scroll down further. If the user scrolls down, a list is displayed on the screen. the list contains information and steps that can be followed. If all steps are followed, the user arrives at the chosen book in the OBA building.

<img width="1280" alt="screenshot 2019-03-07 21 48 55" src="https://user-images.githubusercontent.com/32538678/53988065-e77e0500-4122-11e9-8c78-d6c226b82c9e.png">

## The working functions
The application uses the OBA api. From the API, various data is retrieved and stored in the local storage. The only functions that actually work are retrieving the genres per icon. But if you click on other images, you will see that the todo list always remains the same. 

#### The faking part
What I would like to add to the application (if I had more time) is finding the right book in the OBA building through tracing the books and using maps from each floor.

## Download my app
To see the project you can download or clone this document with the following command:

```
git clone https://github.com/Karinliu/project-1-1819.git

cd project-1-1819/app

```

Before the application can be viewed, the app must be on a live server.
