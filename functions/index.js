const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const express = require('express');

// contact form dependecies
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');


// removes escaping from error messages
const stripAnsi = require('strip-ansi');

// converts ANSI escape characters to html
const Convert = require('ansi-to-html');
const convert = new Convert();

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://codeu-b2047.firebaseio.com'
});

const app = express();
app.set('view engine', 'ejs');

app.use("/public", express.static("public"));


app.get('/code-area', (req, res) => {
    res.render('code-area');
});

//Run code helper

function getCode(ref){
    return ref.child('text').once('value').then(snap => snap.val());
}

//Run code function

app.get("/code.json", (req, res) => {

    var ref = admin.database().ref('firepads').child(req.query.id);

    getCode(ref).then(code => {

        var numLines = code.split("\n").length;

        var program = {
            script: code,
            language: "python3",
            versionIndex: "0",
            clientId: "2c9ecb77b66063e3adbc568ce9fc954c",
            clientSecret: "5825b4fc81f045cd841e7cc1ad4361f27dc061590510a027eda18f3744c9ded2"
        };


        var test = {
            "source": code,
            "options": {
                "userArguments": "",
                "compilerOptions": { executorRequest: true },
                "executeParameters": { args: "", stdin: "" },
                "filters": {
                    "execute": true
                },
                "tools": [],
                "libraries": []
            }
        }
    /*
        request({
            url: 'https://api.jdoodle.com/execute',
            method: "POST",
            json: program
        },
        function (error, response, body) {

            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);

            if (error || body.error || body.output.includes("JDoodle")) {
                ref.child("output").set("An unexpected error has occurred, please try again later.\n\nIf your code uses input, please note that Coding Cabin terminal currently does not support input functionality.\n");
                res.send("An unexpected error has occurred, please try again later.\nIf your code uses input, please note that Coding Cabin terminal currently does not support input functionality.");
            }
            else {
                ref.child("output").set(body.output);
                res.send(body.output);
            }
            
        });
    */

        request({
            url: 'http://167.71.255.97:3001/api/compiler/python3/compile',
            method: "POST",
            json: test
        },
        function (error, response, body){
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);

            if(!error){
                if(body.didExecute){
                    output = ""
                    for (var i = 0; i < body.buildResult.stdout.length; i++){
                        output += body.buildResult.stdout[i].text;
                        if (i < body.buildResult.stdout.length - 1){
                            output += "\n";
                        }
                    }
                    ref.child("output").set(output);
                    //res.send(output);
                    res.json({ numLines : numLines });
                }
                else{
                    error = "";
                    for(var i = 0; i < body.buildResult.stderr.length; i++){
                        error += body.buildResult.stderr[i].text;
                        if (i < body.buildResult.stderr.length - 1) {
                            error += "\n";
                        }
                    }
                    //error = stripAnsi(error);
                    error = error.replace(/</g, "&lt;");
                    error = error.replace(/>/g, "&gt;");
                    error = convert.toHtml(error);
                    console.log(error);
                    ref.child("output").set(error);
                    //res.send(error);
                    res.json({ numLines: numLines });
                }
            }
            else{
                ref.child("output").set("An unexpected error has occurred, please try again later.\n\nIf your code uses input, please note that Coding Cabin terminal currently does not support input functionality.\n");
                //res.send("An unexpected error has occurred, please try again later.\nIf your code uses input, please note that Coding Cabin terminal currently does not support input functionality.");
                res.json({ numLines: numLines });
            }
        });

    });
});


//Body Parser Middleware for contact form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/contact', (req, res) => {
    res.render('contact', { msg: "" });
});


app.post('/contact', (req, res) => {

    const output = `
    <h3>Contact Details</h3>
    <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Reason: ${req.body.reason}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'codingcabinmailer@gmail.com', // generated ethereal user
            pass: 'sendcodingcabinmail'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <codingcabinmailer@gmail.com>', // sender address
        to: 'codingcabin@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: "",
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', { msg: true });
    });
});


// HAX THE RAM STUFF

app.get('/followers', (res, req) => {
    request({
        url: 'http://167.71.255.97:3001/api/compiler/python3/compile',
        method: "POST",
        json: test
    });
});


// Redirect to 404 if Cannot Get route

app.get('*', function (req, res) {
    res.redirect('404.html');
});


// export app to use as cloud function
exports.app = functions.https.onRequest(app);
