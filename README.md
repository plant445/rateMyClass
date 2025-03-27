The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(__TODO__: your project name)

# RateMyClass

## Overview


College students have heard RateMyProfessor, the site where students go to check out a professor rating. Some may have even
heard of RateMyDorm which provides information on university dorms across the nation. Introducing RateMyClass, a site where 
students can creates an account to upload their ratings of individuals classes at NYU.

Students users can create their account to have authorization to upload ratings, but can view ratings without creating an account.
Within the rating section students select a rating for Overall, Difficulty, Engagement, and Take Again? while specifying the course, department, and their professor. They are also required to give comment/description of the class. On the page to view each course, visitors can see an overall rating, for the class and the comments and specialized ratings left by each user


## Data Model

The application will store Users and Courses

* users can have multiple courses (via references)
* each course can have multiple items (by embedding)

An Example User:

```javascript
{
  user_id: "user123",
  username: "collegestudent",
  hash: // a password hash,
  review: // an array of references to review documents
}
```

An Example Review with Embedded Ratings:

```javascript
{
  _id: "review1",
  user_id: "user123",
  course_name: "Introduction to Computer Science",
  course_code: "CS467",
  department: "Applied Internet Technology",
  professor: "Professor Versoza",
  comment: "Great course, but the assignments were tough!",
  ratings: {
    overall: 4.5,
    difficulty: 3,
    engagement: 4,
    take_again: 5
  },
  created_at: "2025-03-18T12:00:00Z"
}
```


## [Link to Commented First Draft Schema](backend/models/user.js) 


## Wireframes


/ - main page

![main](documentation/home.png)

/login - login page

![login](documentation/login.png)

/upload - upload review page

![upload](documentation/upload.png)

/course/slug - course page

![course slug](documentation/course.png)

## Site map

[site map](documentation/sitemap.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as non-registered user, I can search and browse ratings
3. as a user, I can log in to the site
4. as a user, I can create a new rating
5. as a user, I can view all of the ratings I've created in the past
6. as a user, I can add edit and delete my ratings


## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (3 points) jsonwebtoken
    * I want to use JWT to allow users to access certain parts of my site only when they logged in and this module seems to work well with a react.js front-end.
* (2 points) cors
    * I need cors since my backend and frontend will be deployed on different pots 
* (3 points) axios
    * I need axios since it simplifies API requests between frontend and backend as well as automatically attaching authentication tokens(JWT) for protected actions
* (2 points) react.js
    * used react.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 
* (1 point) tailwind
    * I will be using tailwind for css
* (1 point) react-simple-star-rating
    * I want to make a rating using stars for users to rate classes from 1 to 5

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial React Frontend App](frontend/src/App.jsx) 
## [Link to Initial Backend] (backend/)
## [Link to backend app] (backend/app.mjs)

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

