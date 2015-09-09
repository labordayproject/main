// Install passwordless & save in package.json
// $ npm install passwordless --save
//
// You'll also want to install a TokenStore such as MongoStore and something to deliver the tokens (be it email, SMS or any other means). For example:
// $ npm install passwordless-mongostore --save
// $ npm install emailjs --save

var passwordless = require('passwordless');
var MongoStore = require('passwordless-mongostore'); //TODO: Set this up
var email = require("emailjs"); //TODO: Set this up and figure out an SMTP server

//Require Express
var express = require('express');
var app = express();

// Initialize SMTP server
// TODO: Complete the following with SMTP details
var smtpServer  = email.server.connect({
   user:    yourEmail,
   password: yourPwd,
   host:    yourSmtp,
   ssl:     true
});

// Your MongoDB TokenStore
var pathToMongoDb = 'mongodb://localhost/passwordless-simple-mail'; //TODO: Obviously need to complete with MongoDB info
passwordless.init(new MongoStore(pathToMongoDb));

// Set up a delivery service
passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        var host = 'localhost:3000'; //TODO: Update to appropriate server
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

// TODO: Learn Express & make sense of the following:
/*
sessionSupport() makes the login persistent, so the user will stay logged in while browsing your site. It has to come after your session middleware. Have a look at express-session how to setup sessions if you are unsure.

acceptToken() will accept incoming tokens and authenticate the user (see the URL in step 5). While the option successRedirect is not strictly needed, it is strongly recommended to use it to avoid leaking valid tokens via the referrer header of outgoing HTTP links on your site. When provided, the user will be forwarded to the given URL as soon as she has been authenticated.
*/
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/'}));

// TODO: Express, con't (routers)
/*
The following takes for granted that you've already setup your router var router = express.Router(); as explained in the express docs

You will need at least 2 URLs to:
Display a page asking for the user's email (or phone number, ...)
Receive these details (via POST) and identify the user

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
If you have just a fixed list of users do the following:

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
