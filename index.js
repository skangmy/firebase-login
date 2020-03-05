const firebase = require("firebase");

const CONFIG = process.argv[2];
const user = process.argv[3];
const pwd = process.argv[4];

if (!CONFIG || !user || !pwd) {
  console.log(
    "Missing arguments! Usage: node index.js <config file> <username> <password>"
  );
  process.exit(1);
}

const config = require("./" + CONFIG);

firebase.initializeApp(config);

firebase
  .auth()
  .signInWithEmailAndPassword(user, pwd)
  .then(user => {
    console.log("Login successful");
    firebase
      .auth()
      .currentUser.getIdToken(false)
      .then(token => {
        console.log(token);
      });
  })
  .catch(e => {
    console.error("Failed to login", e);
  });
