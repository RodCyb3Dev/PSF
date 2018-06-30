import * as firebase from 'firebase';

const config = {
    apiUrl: 'https://5b37d0026223c40014605888.mockapi.io',
    apiKey: "AIzaSyA6DoaNlc6Nvo07R9KaxQ-d-vefOhSugUU",
    authDomain: "nba-dev-96a72.firebaseapp.com",
    databaseURL: "https://nba-dev-96a72.firebaseio.com",
    projectId: "nba-dev-96a72",
    storageBucket: "nba-dev-96a72.appspot.com",
    messagingSenderId: "132782229000"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data;
}

const googleAuth = new firebase.auth.GoogleAuthProvider();
const twitterAuth = new firebase.auth.TwitterAuthProvider();
const githubAuth = new firebase.auth.GithubAuthProvider();
const facebookAuth = new firebase.auth.FacebookAuthProvider();

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseVideos,
    firebaseTeams,
    firebaseLooper,
    googleAuth,
    twitterAuth,
    githubAuth,
    facebookAuth
}