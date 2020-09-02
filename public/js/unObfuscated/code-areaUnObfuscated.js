console.log("Loaded main.js");

// FIREPAD

var firepad = null, userList = null, codeMirror = null;
var user = null;
var userId = null;
var ignoreExisting = true;

firebase.auth().onAuthStateChanged(function (loggedIn) { //loggedIn technically should be user
  if (loggedIn) {
    user = firebase.auth().currentUser;
    joinFirepadForHash();
    setTimeout(function () {
      $(window).on('hashchange', joinFirepadForHash);
    }, 0);
  }
  else {
    user = null;
    joinFirepadForHash();
    setTimeout(function () {
      $(window).on('hashchange', joinFirepadForHash);
    }, 0);
  }
});


function joinFirepadForHash() {
  if (firepad) {
    // Clean up.
    firepad.dispose();
    userList.dispose();
    $('.CodeMirror').remove();
  }
  var id = window.location.hash.replace(/#/g, '') || randomString(10);
  
  // for setting solutions
  //var id = "introPyS15"

  var url = window.location.toString().replace(/#.*/, '') + '#' + id;

  var deletion = firebase.database().ref('firepads');

  if (user) {
    var firepadRef = firebase.database().ref('firepads').child(id);
    userId = user.uid;
    firepadRef.child(user.uid); //adds a child as the user.uid
    var dateTime = getDateTime(); //gets the current date and time in a string and assigns it to dateTime
    firebase.database().ref('firepadHistory').child(userId).child('name').set(user.displayName);

    firebase.database().ref('firepadHistory').child(userId).child('firepadHashes').child(id).set(dateTime); //creates this in the database (hash:MM/DD/YY H:M)
  } 
  else {
    var firepadRef = firebase.database().ref('firepads').child(id);
    userId = firepadRef.push().key; //Push's random key on the reference while simultaneously obtaining the key
  } 

  codeMirror = CodeMirror(document.getElementById('firepad'), {
    lineWrapping: true,
    lineNumbers: true,
    theme: "monokai",
    mode: "text/x-python",
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 3,
    tabSize: 3,
    indentWithTabs: true
  });

  // checks if the firepad is locked and sets to read-only if it is
  var firepadRef = firebase.database().ref('firepads').child(id);
  firepadRef.once('value').then(function (snapshot) {
    if(snapshot.val().locked && snapshot.val().locked == true){
      lockFirepad();
    }
  });

  firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
    richTextShortcuts: false,
    richTextToolbar: false,
    defaultText: "print(\'Hello, world!\')",
    userId: userId
  });
  if (user) {
    userList = FirepadUserList.fromDiv(firepadRef.child('users'),
      document.getElementById('firepad-userlist'), userId, user.displayName);
  }
  else {
    userList = FirepadUserList.fromDiv(firepadRef.child('users'),
      document.getElementById('firepad-userlist'), userId, null);
  }


  firepad.on('ready', function () {
    if (firepad.isHistoryEmpty()) {
      firepad.setText("print(\'Hello, world!\')");
    }

    if (!user) {
      ensurePadInList(id);
    }
    $('#my-pads-list').empty();
    buildPadList();
  });

  // stores string representation of text
  firepad.on('synced', function (isSynced) {
    firebase.database().ref('firepads').child(id).child('text').set(firepad.getText());
  });

  // Listener for output update
  
  var outputRef = firebase.database().ref('firepads').child(id).child("output");

  // turn off listeners on outputRef before making new ones to prevent multiple listeners
  outputRef.off();
  
  document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;

  outputRef.on('value', value =>{
    if(value.val()){
      console.log(value.val());
      $('#output').append("<pre>" + value.val() + "<br></pre>");
      $('#indicator').appendTo('#terminal');
      document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }
  });

  codeMirror.focus();

  window.location = url;
  $('#url').val(url);
  $("#url").on('click', function (e) {
    $(this).focus().select();
    e.preventDefault();
    return false;
  });

  // clears the terminal when joining a new hash
  clearTerminal();
}

function addZero(i) { //Adds zero to string (used in getDateTime())
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getDateTime() { //Returns the string form of (mm/dd/yy hh:mm:ss)
  var today = new Date();
  var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  var time = addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());
  var dateTime = date + ' ' + time;
  return dateTime;
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  }
  else {
    return (a[0] < b[0]) ? -1 : 1;
  }
}

function padListEnabled() {
  return (typeof localStorage !== 'undefined' && typeof JSON !== 'undefined' && localStorage.setItem &&
    localStorage.getItem && JSON.parse && JSON.stringify);
}

function ensurePadInList(id) {//ngl no idea what this does...

  if (!padListEnabled()) { return; }
  var list = JSON.parse(localStorage.getItem('demo-pad-list') || "{ }");
  if (!(id in list)) {
    var now = new Date();
    var year = now.getFullYear(), month = now.getMonth() + 1, day = now.getDate();
    var hours = now.getHours(), minutes = now.getMinutes();
    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }

    list[id] = [year, month, day].join('/') + ' ' + hours + ':' + minutes;

    localStorage.setItem('demo-pad-list', JSON.stringify(list));
    buildPadList();
  }
}

function buildPadList() {
  if (!padListEnabled()) { return; }
  $('#my-pads-list').empty();

  if (user) { //if user is signed in then the 'my-pads-item' will be filled with the users hashes (located inside of the firebase database)
    var user_list = {};
    var result = [];
    var temp = firebase.database().ref('firepadHistory').child(user.uid).child('firepadHashes');
    temp.once("value")
      .then(function (snapshot) {
        user_list = snapshot.val() || '{}';
        for (var key in user_list) { //creates a 2d array of list
          result.push([user_list[key], key]); //pushes in the form (date time, hash)
        }
        result.sort(sortFunction); //sorts the 2d arrays first column
        for (var i = 0; i < result.length; i++) {
          $('#my-pads-list').prepend(
            $('<div></div>').addClass('my-pads-item').append(
              makePadLink(result[i][1], result[i][0]) //makes the list with the key in result (sorted 2d array)
            ));
        }
      });
  } else { //If user is not signed in then it grabs the data from localstorage to store in 'my-pads-item'
    var list = {};
    list = JSON.parse(localStorage.getItem('demo-pad-list') || '{ }');
    $('#my-pads-list').html("");
    for (var id in list) {
      $('#my-pads-list').prepend(
        $('<div></div>').addClass('my-pads-item').append(
          makePadLink(id, list[id])
        ));
    }
  }
}

function makePadLink(id, name) {
  return $('<a></a>').addClass("dropdown-item").attr("href", "#")
    .text(name)
    .on('click', function () {
      window.location = window.location.toString().replace(/#.*/, '') + '#' + id;
      //$('#my-pads-list').hide();
      return false;
    });
}

function randomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function changeTheme() {
  if ($('#theme-switch').is(":checked")) {
    codeMirror.setOption("theme", "default")
  }
  else {
    codeMirror.setOption("theme", "monokai")
  }
}

function clearStorage() {
  if (user) {
    firebase.database().ref('firepadHistory').child(user.uid).child('firepadHashes').remove();
    console.log("Cleared firebase node");
    location.reload();
  }
  else {
    localStorage.clear();
    console.log("Cleared localStorage");
    location.reload();
  }
}


// Running & Compiling Code - output update listener in joinFirepad function

function getData() {
  var hash = location.hash.slice(1);

  var time = getDateTime().toString();
  time = time.split(' ')[1];
  /*
  TODO: get name value from the userId to ensure that the name always matches whats on the user list
  var nameRef = firebase.database().ref('firepads').child(hash).child("users");
  name = nameRef.once('value', value => { return value.val() });
  console.log(name);
  */
  var outputRef = firebase.database().ref('firepads').child(hash).child("output");

  // for lines run counter
  const linesRunCounter = firebase.firestore().collection('counters').doc('lines-run');
  
  
  if(user){
    outputRef.set(time + " " + user.displayName + " ran the code: \n");
    $.get("/code.json", { id: hash }, data => {
      // increments lines run counter by numLines in code
      linesRunCounter.update({ count: firebase.firestore.FieldValue.increment(data.numLines) });
    });
  }
  else{
    outputRef.set(time + " Guest ran the code: \n");
    $.get("/code.json", { id: hash }, data => {
      // increments lines run counter by numLines in code
      linesRunCounter.update({ count: firebase.firestore.FieldValue.increment(data.numLines) });
    });
  }
};

// lock firepad function

function lockFirepad(){
  var hash = location.hash.slice(1);
  firebase.database().ref('firepads').child(hash).update({ locked: true });
  codeMirror.setOption("readOnly", "nocursor");
  $("#lock-btn").prop('disabled', true);
}


// Resize divider

$(function () {
  $("#firepad").resizable(
    {
      handles: 'e',
      resize: function (e, ui) {
        var parent = ui.element.parent();
        var remainingSpace = parent.width() - ui.element.outerWidth(),
          divTwo = ui.element.next(),
          divTwoWidth = (remainingSpace - (divTwo.outerWidth() - divTwo.width())) / parent.width() * 100 + "%";
        divTwo.width(divTwoWidth);
      },
      stop: function (e, ui) {
        var parent = ui.element.parent();
        ui.element.css({
            width: ui.element.width() / parent.width() * 100 + "%",
          });
      }
    });
});


// Share button/modal

function share(){
  console.log();
}


// Clear terminal output

function clearTerminal(){
  $('#output').empty();
}
