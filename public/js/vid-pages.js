// increments videos watched counter
const videosWatchedCounter = firebase.firestore().collection('counters').doc('videos-watched');
videosWatchedCounter.update({ count: firebase.firestore.FieldValue.increment(1) });