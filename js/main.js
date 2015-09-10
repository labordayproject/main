/*
========================================
Initializing
========================================
*/

// Express framework and mock data
var express = require('express'),
		data = require('../mock/trails.json'),
		users = require('../mock/users.json');

// Session and login management
var passwordless = require('passwordless'),
		MongoStore = require('passwordless-mongostore'), // TODO: Implement with actual MongoDB info
		email = require("emailjs");

// Initialize Express and a router
var router = express.Router(), // TODO: Check this implementation. Should create a routing 'mini-app'
		app = express();

// Set express templating to use Jade
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

/*
========================================
Session management
========================================
*/

// Initialize SMTP server to deliver tokens
var smtpServer  = email.server.connect({
		user:   "goodhikes@bonsaimirrors.com", //this is my dummy domain, all valid
		password: "g00dh1k3s",
		host:    "smtp.1and1.com",
		ssl:     true
});

// Set up MongoDB token store
var pathToMongoDb = 'mongodb://localhost/passwordless-simple-mail'; //TODO: Complete with MongoDB info
passwordless.init(new MongoStore(pathToMongoDb));

// Set up delivery of tokens
passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        var host = 'localhost:3000';
        smtpServer.send({
            text:    'Hello!\nAccess your account here: http://' +
            host + '?token=' + tokenToSend + '&uid=' +
            encodeURIComponent(uidToSend),
            from:    yourEmail,
            to:      recipient,
            subject: 'Token for ' + host
        }, function(err, message) {
            if(err) {
                console.log(err);
            }
            callback(err);
        });
});

/*
sessionSupport() makes the login persistent, so the user will stay logged in while browsing your site. It has to come after your session middleware. Have a look at express-session how to setup sessions if you are unsure.

acceptToken() will accept incoming tokens and authenticate the user (see the URL in step 5). While the option successRedirect is not strictly needed, it is strongly recommended to use it to avoid leaking valid tokens via the referrer header of outgoing HTTP links on your site. When provided, the user will be forwarded to the given URL as soon as she has been authenticated.
*/
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/'}));

// You will need at least 2 URLs to:
// Display a page asking for the user's email (or phone number, ...)
// Receive these details (via POST) and identify the user
/* GET login screen. */
router.get('/login', function(req, res) {
   res.render('login');
});

/* POST login details. */
router.post('/sendtoken',
    passwordless.requestToken(
        // Turn the email address into an user ID
        function(user, delivery, callback, req) {
            // usually you would want something like:
            User.find({email: user}, callback(ret) {
               if(ret)
                  callback(null, ret.id);
               else
                  callback(null, null);
          })
        }),
    (function(req, res) {
       // success!
          res.render('sent');
}));
// What happens here? passwordless.requestToken(getUserId) has two tasks: Making sure the email address exists and transforming it into a proper user ID that will become the identifier from now on. For example user@example.com becomes 123 or 'u1002'. You call callback(null, ID) if all is good, callback(null, null) if you don't know this email address, and callback('error', null) if something went wrong. At this stage, please make sure that you've added middleware to parse POST data (such as body-parser.

/*
========================
For fixed list of users:
========================

// GET login as above

var users = [
    { id: 1, email: 'marc@example.com' },
    { id: 2, email: 'alice@example.com' }
];

// POST login details.
router.post('/sendtoken',
    passwordless.requestToken(
        function(user, delivery, callback) {
            for (var i = users.length - 1; i >= 0; i--) {
                if(users[i].email === user.toLowerCase()) {
                    return callback(null, users[i].id);
                }
            }
            callback(null, null);
        }),
        function(req, res) {
            // success!
        res.render('sent');
});
*/

/*
========================================
Express views
========================================
*/

// Landing page on home directory
app.get('/', function(req, res){
	res.render('index'); //TODO: Setup index template with hikes. This refers to the index.jade file in the templates folder.
});

// Passwordless should redirect to /user/[[id number]] with some tweaking
app.get('/user/:id?', function(req, res){ // id is an optional variable in the URL
	var id = req.params.id; //Grabs ID from the URL
  // TODO: Query MongoDB for user data (find hikes they've liked, name and photo)
	if (id === undefined) {
		res.status(503);
		res.send("Please return and log in.");
	} else {
		var name = users[id] || {}; // Doesn't yet work but you get the idea.
		res.render('user'); // TODO: This refers to user.jade file in templates. (It's empty). Pass hike data from MongoDB (line 140) in here, like: res.render('user', { name: name});
	}
});

/*
========================================
Local hosting of site
========================================
*/

/*
To get this up and running, I'd recommend installing nodemon globally with
	$ npm install -g nodemon
and then initializing with
	$ nodemon path/to/main.js

I'd also recommend installing node-inspector globally. Then you can setup nodemon in one terminal tab with
	$ nodemon --debug path/to/main.js
and a separate tab with
	$ node-inspector
That way you can set breakpoints in your code and explore your Express app via the link provided after running node-inspector. Be sure to click the visual interface console, do NOT use your browser's built-in console.
*/

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});
