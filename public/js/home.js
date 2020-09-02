// navbar scrolled change

$(document).ready(function () {
    $('nav.navbar').toggleClass('scrolled', $(this).scrollTop() > 1);
});

document.getElementById("navCollapse").addEventListener("click", function () {
    $('nav.navbar').toggleClass('scrolled', $(this).scrollTop() < 1);
});



$(window).scroll(function () {
    $('nav.navbar').toggleClass('scrolled', $(this).scrollTop() > 1);
});

//Theme Change

function changeToEvening() {
    $("#layer-0").css("background-image", "url(css/media/evening/shadow/bg.png)");
    $("#layer-1").css("background-image", "url(css/media/evening/shadow/Mountains4.png)");
    $("#layer-2").css("background-image", "url(css/media/evening/shadow/Mountains3.png)");
    $("#layer-4").css("background-image", "url(css/media/evening/shadow/Mountains2.png)");
    $("#layer-5").css("background-image", "url(css/media/evening/shadow/Mountains1.png)");
    $("#layer-6").css("background-image", "url(css/media/evening/shadow/Trees3.png)");
    $("#layer-7").css("background-image", "url(css/media/evening/shadow/Trees2.png)");
    $("#layer-8").css("background-image", "url(css/media/evening/shadow/Trees1.png)");

    $("#transition-arrow").css("border-top", "100px solid #210306");
}

function changeToNight() {
    $("#layer-0").css("background-image", "url(css/media/night/shadow/bg.png)");
    $("#layer-1").css("background-image", "url(css/media/night/shadow/Mountains4.png)");
    $("#layer-2").css("background-image", "url(css/media/night/shadow/Mountains3.png)");
    $("#layer-4").css("background-image", "url(css/media/night/shadow/Mountains2.png)");
    $("#layer-5").css("background-image", "url(css/media/night/shadow/Mountains1.png)");
    $("#layer-6").css("background-image", "url(css/media/night/shadow/Trees3.png)");
    $("#layer-7").css("background-image", "url(css/media/night/shadow/Trees2.png)");
    $("#layer-8").css("background-image", "url(css/media/night/shadow/Trees1.png)");

    $("#transition-arrow").css("border-top", "100px solid #0f302b");
}



$(document).ready(function () {
    if ($(document).width() < 900) {
        $('.plax-container').hide();
        $('.nonplax-container').show();
    }

    $(window).resize(function () {
        if($(document).width() < 900) {
            $('.plax-container').hide();
            $('.nonplax-container').show();
        }
        else{
            $('.plax-container').show();
            $('.nonplax-container').hide();
        }
    });
    

    //3D PARALLAX SCROLLING

    window.addEventListener("scroll", function(event){

        var top = this.pageYOffset;
    
        var layers = document.getElementsByClassName("parallax");
        var layer, speed, yPos;
        for (var i = 0; i < layers.length; i++) {
            layer = layers[i];
            speed = layer.getAttribute('data-speed');
            var yPos = -(top * speed / 100);
            $(layer).css('transform', 'translate3d(0px, ' + yPos + 'px, 0px)');
    
        }

    }); 


    const visitsCounter = firebase.firestore().collection('counters').doc('visits');
    const videosWatchedCounter = firebase.firestore().collection('counters').doc('videos-watched');
    const linesRunCounter = firebase.firestore().collection('counters').doc('lines-run');

    // listeners for updates

    let visitsObserver = visitsCounter.onSnapshot(docSnapshot => {
        $("#visits-counter").text(docSnapshot.get("count"));
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

/*
    const visistsObserver = firebase.database().ref("counters").child("visits")

    visistsObserver.on('value', value => {
        if (value.val() && value.val() != 1) {
            $("#visits-counter").text(value.val());
        }
    });
*/
    let videosWatchedObserver = videosWatchedCounter.onSnapshot(docSnapshot => {
        $("#videos-watched-counter").text(docSnapshot.get("count"));
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    let linesRunObserver = linesRunCounter.onSnapshot(docSnapshot => {
        $("#lines-run-counter").text(docSnapshot.get("count"));
    }, err => {
        console.log(`Encountered error: ${err}`);
    });


    /*
    var visits = "1";
    var videosWatched = "1";
    var linesRun = "1"

    var visitsOptions = {
        strings: ["", ""],
        typeSpeed: 500,
        backSpeed: 500,
        backDelay: 1000,
        smartBackspace: true,
        loop: true,
        showCursor: true,

        onStringTyped: function (i, self) {
            if(i == 0 && visits != self.strings[0] && visits != "1"){
                self.strings[0] = visits;
                self.strings[1] = visits;
            }
            if (i == 1 && self.strings[0] == visits) {
                self.stop();
                $('#visits-counter + .typed-cursor').hide();
            }
        },
    }

    var videosWatchedOptions = {
        strings: ["", ""],
        typeSpeed: 500,
        backSpeed: 500,
        backDelay: 1000,
        smartBackspace: true,
        loop: true,
        showCursor: true,

        onStringTyped: function (i, self) {
            if (i == 0 && videosWatched != self.strings[0] && videosWatched != "1") {
                self.strings[0] = videosWatched;
                self.strings[1] = videosWatched;
            }
            if (i == 1 && self.strings[0] == videosWatched) {
                self.stop();
                $('#videos-watched-counter + .typed-cursor').hide();
            }
        },
    }

    var linesRunOptions = {
        strings: ["", ""],
        typeSpeed: 500,
        backSpeed: 500,
        backDelay: 1000,
        smartBackspace: true,
        loop: true,
        showCursor: true,

        onStringTyped: function (i, self) {
            if (i == 0 && linesRun != self.strings[0] && linesRun != "1") {
                self.strings[0] = linesRun;
                self.strings[1] = linesRun;
            }
            if (i == 1 && self.strings[0] == linesRun) {
                self.stop();
                $('#lines-run-counter + .typed-cursor').hide();
            }
        },
    }

    var visitsTyped = new Typed("#visits-counter", visitsOptions);
    var videosWatchedTyped = new Typed("#videos-watched-counter", videosWatchedOptions);
    var linesRunTyped = new Typed("#lines-run-counter", linesRunOptions);

    const visitsCounter = firebase.firestore().collection('counters').doc('visits');
    const videosWatchedCounter = firebase.firestore().collection('counters').doc('videos-watched');
    const linesRunCounter = firebase.firestore().collection('counters').doc('lines-run');

    // listeners for updates

    let visitsObserver = visitsCounter.onSnapshot(docSnapshot => {
        visits = docSnapshot.get("count").toString()
        $('#visits-counter + .typed-cursor').show();
        visitsTyped.start();
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    let videosWatchedObserver = videosWatchedCounter.onSnapshot(docSnapshot => {
        videosWatched = docSnapshot.get("count").toString()
        $('#videos-watched-counter + .typed-cursor').show();
        videosWatchedTyped.start();
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    let linesRunObserver = linesRunCounter.onSnapshot(docSnapshot => {
        linesRun = docSnapshot.get("count").toString()
        $('#lines-run-counter + .typed-cursor').show();
        linesRunTyped.start();
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

*/

/*
    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    var list = ['Bienvenidos',
        'Bienvenue',
        'أهلًا وسهلًا',
        '欢迎',
        'ようこそ',
        '환영',
        'स्वागत',
        'добро пожаловать',
        'Hoşgeldiniz',
        'خوش آمدید',
        'ยินดีต้อนรับ',
        'Welkom',
        'Velkommen',
        'Aloha',
        'ברוך הבא',];
    list.unshift("Welcome");

    for (i = 0; i < list.length; i++) {
        list[i] = "print(\"" + list[i] + "\")";
    }

    var options = {
        strings: list,
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1000,
        smartBackspace: true,
        loop: true,
        showCursor: true,
    }

    var typed = new Typed("#typed", options);
*/
});




