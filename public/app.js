(function() {
    
  const config = {
    apiKey: "AIzaSyBlhtZ49gNv1BemJKs5qs_UN3IHcV5ZOIU",
    authDomain: "web-quickstart-dc5bd.firebaseapp.com",
    databaseURL: "https://web-quickstart-dc5bd.firebaseio.com",
    storageBucket: "web-quickstart-dc5bd.appspot.com",
    messagingSenderId: "228256543689"
  };
  firebase.initializeApp(config);

const userDiv = document.getElementById('user');
const jobsList = document.getElementById('jobsList');


const dbObjRef = firebase.database().ref().child('object');
const dbJobRef = dbObjRef.child('job');


dbObjRef.on('value', snapshot => {
  userDiv.innerText = JSON.stringify(snapshot.val(), null, 2);
});

dbJobRef.on('child_added', snapshot => {
  const jobElem = document.createElement('li');
  jobElem.innerText = snapshot.val();
  jobElem.id = snapshot.key;
  jobsList.appendChild(jobElem);
});

dbJobRef.on('child_changed', snapshot => {
  const jobChanged = document.getElementById(snapshot.key);
  jobChanged.innerText = snapshot.val();
  console.log(snapshot.key);
});

dbJobRef.on('child_removed', snapshot => {
  const jobToRemove = document.getElementById(snapshot.key);
  jobToRemove.remove();
  console.log(snapshot.key);
});


// Authentication

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e));
});

btnSignUp.addEventListener('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e));
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => toggleButtons(firebaseUser));

const toggleButtons = function(firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser);
    btnLogin.classList.add('hide');
    btnSignUp.classList.add('hide');
    btnLogout.classList.remove('hide');
  } else {
    console.log('not logged in');
    btnLogin.classList.remove('hide');
    btnSignUp.classList.remove('hide');
    btnLogout.classList.add('hide');
  }
};


})();