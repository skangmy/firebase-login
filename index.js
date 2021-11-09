const CONFIG = process.argv[2];
const user = process.argv[3];
const pwd = process.argv[4];

if (!CONFIG || !user || !pwd) {
  console.log(
    "Missing arguments! Usage: node index.js <config file> <username> <password>"
  );
  process.exit(1);
}

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const config = require('./config/' + CONFIG);

const app = initializeApp(config);

const auth = getAuth(app);

signInWithEmailAndPassword(auth, user, pwd)
  .then(() => {
    console.log("Login successful");
    auth.currentUser.getIdToken(false)
      .then(token => {
        console.log(token);
      });
  })
  .catch(e => {
    console.error("Failed to login", e);
  });


