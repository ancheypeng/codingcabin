var name, email, photo, uid;
var firebaseConfig = {
    apiKey: "AIzaSyA40pph8u5EobbOtzi4W_0vhCCldrgjWcA",
    authDomain: "codingcabin.org",
    databaseURL: "https://codeu-b2047.firebaseio.com",
    projectId: "codeu-b2047",
    storageBucket: "codeu-b2047.appspot.com",
    messagingSenderId: "219987821609",
    appId: "1:219987821609:web:fa6bf7cff029903e"
};


// FIREBASE AUTHENTICATE

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Increments visits counter
const visitsCounter = firebase.firestore().collection('counters').doc('visits');
visitsCounter.update({ count: firebase.firestore.FieldValue.increment(1) });


$(document).ready(function () {
    // LOADS FOOTER AT ID = FOOTER
    window.setTimeout(function () {
        $("#footer").load("https://codingcabin.org/footer.html")
    }, 10);
});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        $("#signin-btn").hide(0);
        url = user.photoURL
        if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
            url = url + '?sz=150';
        }
        $("#user-icon").attr("src", url);
        $("#user-icon").show(0);
    }
    else {
        $("#signin-btn").show(0);
        $("#user-icon").hide(0);
    }
});

function addToDatabase(user) {
    var database = firebase.database();
    database.ref('users' + user.uid).on('value', function (snapshot) {
        if (snapshot.exists()) {

        }
        else {
            var data = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                photo: user.photoURL
            }
            var ref = database.ref('users').child(user.uid).set(data);
        }
    });
}



// MATCHMAKING CODE

function joinMatchmaking() {
    var paired = false;

    var accepted = false;
    var partnerAccepted = false;
    var link = null;
    var partnerId = null;

    var user = firebase.auth().currentUser;

    if (!user) {
        // DISPLAY MESSAGE THAT USER MUST BE SIGNED IN
        alert("User must be signed in to use Pair Up"); //make this better later;
        console.log("User must be signed in to use Pair Up");
        return false;
    }

    var matchmakingRef = firebase.database().ref("matchmaking");
    var userRef = matchmakingRef.child(user.uid);

    var timeJoined = Date.now();

    userRef.set({
        name: user.displayName,
        startedAt: firebase.database.ServerValue.TIMESTAMP,
        paired: paired,
        link: null,
        partner: null,
        confirmed: accepted
    });

    function leaveMatchmaking() {
        // add something to disable/stop the function
        if (partnerId) {
            matchmakingRef.child(partnerId).child("confirmed").off();
        }
        userRef.off();
        userRef.remove();
        $('#pairup-toast').toast('hide');
        elapsedTimer.stop();
        countdownTimer.stop();
    }

    joinMatchmaking.leave = leaveMatchmaking;

    userRef.onDisconnect().remove();

    userRef.off();
    // listener for someone else pairing with local user
    userRef.on('value', snapshot => {
        var data = snapshot.val();
        if (!data) { // if user leaves matchmaking, return
            return;
        }
        paired = data["paired"];
        if (paired) { // if paired is changed to true, calls joinPair, passing the link
            link = data["link"];
            partnerId = data["partner"];
            joinPair();
        }
    });

    // SHOW MATCHMAKING TOAST
    $("#searching").show();
    $("#found").hide();
    $('#pairup-toast').toast('show');

    // Initializiting timers in a broad scope
    var elapsedTimer = new Timer("#timer", 0, null, 1, null);
    elapsedTimer.start();
    var countdownTimer = new Timer("#countdown", 20, 0, -1, timedOut);

    checkPairs();

    // CHANGE TO SELF EXECUTING ANONYMOUS -- SETTIMEOUT 2 SEC IF !PAIRED
    function checkPairs() {

        if (paired) { // stops this function from running if paired
            //joinPair();
            return;
        }

        var usersList;

        matchmakingRef.once('value').then(snap => {
            // JSON object of all users in matchmaking queue
            usersList = snap.val();

            // if local user is no longer in matchmaking, cancels this function
            if (!usersList || !usersList.hasOwnProperty(user.uid)) {
                return;
            }

            // sets userssearching-counter to number of users in queue
            var numUsers = Object.keys(usersList).length;
            $("#userssearching-counter").text(numUsers);

            // removes local user from list
            delete usersList[user.uid];

            for (let u in usersList) {
                if (determineMatch(timeJoined, usersList[u]["startedAt"])) {
                    if (pairUp(u)) {
                        break;
                    }
                }
            }

            // function calls itself again after 2 secs (checked if paired at the beginning)
            setTimeout(checkPairs, 2000);
        });
    }


    function determineMatch(t1, t2) {
        // seconds elapsed since users joined matchmaking
        var tElapsed1 = Math.abs(Date.now() / 1000 - t1 / 1000);
        var tElapsed2 = Math.abs(Date.now() / 1000 - t2 / 1000);
        // calulate the weight constant
        var a = 0.1749
        var b = 1.456
        var c = -0.5599
        var constant1 = a * Math.pow(tElapsed1, 2) + b * tElapsed1 + c;
        var constant2 = a * Math.pow(tElapsed2, 2) + b * tElapsed2 + c;
        var avg = (constant1 + constant2) / 2;

        var chance = Math.random() * 100;
        // determines if there is a match
        if (avg > chance) {
            return true;
        }
        else {
            return false;
        }
    }

    function pairUp(id) {
        // make sure other user (id) is not matched yet

        matchmakingRef.child(id).once('value').then(snap => {
            otherUser = snap.val();
            if (!otherUser) { // returns false if the other user is not in matchmaking anymore
                return false;
            }
            else if (otherUser["paired"]) { // returns false if the other user is already paired
                return false;
            }
            else {
                if (paired) { // if local user is already paired to some other user, joins that user and returns true
                    //joinPair();
                    return true;
                }
                else { // runs if other user is not paired and local user is not paired
                    var hash = randomString(10);
                    matchmakingRef.child(id).update({
                        paired: true,
                        link: hash,
                        partner: user.uid
                    });
                    userRef.update({
                        paired: true,
                        link: hash,
                        partner: id
                    });
                    //joinPair();
                    return true;
                }
            }
        });

    }

    function joinPair() {
        userRef.off();
        elapsedTimer.stop();
        countdownTimer.start();
        $("#accept-btn").attr("disabled", false);
        $("#searching").hide();
        $("#found").show();

        matchmakingRef.child(partnerId).child("confirmed").on('value', snap => {
            partnerAccepted = snap.val();
            if (accepted && partnerAccepted) {
                window.open("/code-area#" + link);
                leaveMatchmaking();
            }
        });
    }

    function accept() {
        $("#accept-btn").attr("disabled", true);
        accepted = true;
        userRef.update({
            confirmed: accepted
        });
        if (partnerAccepted) {
            window.open("/code-area#" + link);
            leaveMatchmaking();
        }
    }

    function timedOut() {
        if (!accepted) {
            leaveMatchmaking();
        }
        else if (!partnerAccepted) {
            console.log("f")
            leaveMatchmaking();
            setTimeout(joinMatchmaking, 1000);
        }
    }

    joinMatchmaking.accept = accept;
}

// function to generate random string of length "length"
function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

class Timer {
    constructor(tag, start, end, increment, callback) {
        this.t = start;
        this.tag = tag;
        this.startTime = start;
        this.endTime = end;
        this.increment = increment;
        this.callback = callback;
        this.timer;
        this.minutes = 0;
        this.seconds = start;
    }

    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    }

    start() {
        $(this.tag).text("00:00");

        this.timer = setInterval(
            function () {
                this.t += this.increment;

                this.minutes = this.pad(Math.floor(this.t / 60), 2);
                this.seconds = this.pad(this.t % 60, 2);

                var time = this.minutes + ":" + this.seconds;

                $(this.tag).text(time);

                if (this.endTime != null) {
                    if (this.startTime > this.endTime) {
                        if (this.t <= this.endTime) {
                            if (typeof this.callback === "function") {
                                this.callback();
                            }
                            this.stop();
                        }
                    }
                    else {
                        if (this.t >= this.endTime) {
                            if (typeof this.callback === "function") {
                                this.callback();
                            }
                            this.stop();
                        }
                    }
                }
            }.bind(this), 1000);
    }

    stop() {
        clearInterval(this.timer);
    }
}



/*
function googleSignIn() {
    var base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        console.log(result)
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        addToDatabase(user);
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
}
*/

function logout(user) {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
}


$(function () {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
    //$('#pairup-toast').toast('show');
});

$("#user-icon").popover({
    trigger: 'manual',
    animation: true,
    placement: 'bottom',
    html: true,
    content: "<a id=signout-btn>Sign Out</a>"
}).on('mouseenter', function () {
    var _this = this;
    $(this).popover('show');
    $('.popover').on('mouseleave', function () {
        $(_this).popover('hide');
    });
}).on('mouseleave', function () {
    var _this = this;
    setTimeout(function () {
        if (!$('.popover:hover').length) {
            $(_this).popover('hide');
        }
    }, 300);
});

$(document).on('click', '#signout-btn', function () {
    $('#user-icon').popover('hide');
    logout();
});


