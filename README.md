# ERUDITION LABS CHANGELOG

All notable changes to this project will be documented in this file.

## [1.2.2] -  2018-10-02
### Added
- Markdown abilities to post news
- Forgot password/ Reset Password

### Changes
- OIC selection displays user by "lastName, firstName"
- Http request to API retries up to 3 times in case of weak or bad internet connections
- Summary text wraps instead of scrolling forever
- Using regular expressions to make viewing news posts in small size better

### Bug Fixes
- OIC can view signed up users
- Fixed events randomly closing
- Moved date from top to bottom of a news post


## [1.1.1] - 2018-09-19
### Added
- Event User tracking. Event System now keeps track of what events users signup for. Making this data available on a per user basis.
- Event System keeps track of who the original author of an event is.
- Event System now has the ability to set a max number of spots available for signups, an unlimited number of spots allowed, or close signups altogether. Once the spots are filled, signups are closed and user's can no longer request to signup until more spots are available. Once spots are available again, signups automatically reopen.
- Assigned OIC and Admins can remove signed up users.
- Change log is shown once every time there is a new release with new changes
- News System can now edit and delete specific posts
- Admin access link on old Wordpress website (ca782.org)
### Changes
- Only Admins and the assigned OIC can view who is signed up for an event.
- Registration form now uses select drop-down menus for Rank, Flight, and Team options
- Add Post on News system now launches its own page, giving the Admin a full page writing experience
- Side Navigation Bar on 'light' and 'cosmic' themes now feature a support us button linking to Erudition Labs LinkedIn
- Title of 'Updates System' to 'News System' to avoid confusion with users
- Footer LinkedIn Icon now directs to the Erudition LinkedIn page
- OIC selection goes by last names instead of first names for now. Eventually will use both
### Bug Fixes
- Rank jumbled mess because of special characters.
- Cannot read property 'toDateString' of null. Page broke when creating a new event without setting one of the dates.
- Similar to above, upon creation of new event without one of the dates, the date defaulted to 1969 if page was refreshed.
- TypeError Cannot read property 'password' of null  at postAuthenticate. When user tries to login with an email that doesn't exist in the database.
- Users of 'user' role can still see who is signed up for an event. Now only Admins and the assigned OIC can view.
 

## [1.0.0] - 2018-09-14
### Added
- Events System
- Updates System
- Authentication System
- User management System


# MEAN stack Rest API.
- Using Mongoose as a mapper (Object Document Mapper ODM) to mongodb http://mongoosejs.com/
- Backend express server and API for registration/login and get a json web token when authenticated
- Authentication using passport and JWT -- allows us to specify which routes and endpoints the user will need a token for.

# Express Middleware Used
- CORS-- https://www.npmjs.com/package/cors -- becuase backend server and frontend angular server are on different ports.

- passport-JTW strategy -- https://www.npmjs.com/package/passport-jwt

- Angular2-JWT -- https://github.com/auth0/angular2-jwt for managing tokens in the frontend

- express-validator -- https://express-validator.github.io/docs/ for validation/sanitation of incoming client input

 -mongoose-unique-validator -- https://www.npmjs.com/package/mongoose-unique-validator nice mongoose way of validating uniqueness of fields

- passwords hashed with bcryptjs

- Run "npm install" to install packages. Need to do it in angular-src as well

- Reccomend getting nodemon to auto detect changes to server and auto-reload. run "sudo npm install -g nodemon"




DELETE api/users/delete/{id} //deletes a user by id

# must edit email-verification module dependency
node-rand-token package.json ----update to version  0.4.0 to work with node 9+ until the original developers fix it
https://github.com/sehrope/node-rand-token/issues/9
https://github.com/whitef0x0/node-email-verification/issues/78

Also possibly have to manually update nodemailer to latest version


