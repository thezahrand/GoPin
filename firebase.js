const firebaseConfig = {
apiKey: "AIzaSyAyid18j6ylh3cYWJcTXhzVO0oZJz5COUY",
authDomain: "gopin-incen.firebaseapp.com",
projectId: "gopin-incen",
storageBucket: "gopin-incen.firebasestorage.app",
messagingSenderId: "334708169738",
appId: "1:334708169738:web:b89e56d663411049a293f3",
measurementId: "G-6LXXQE0ZDL"
};


// init (compat libs used in HTML)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


// helper: check role
async function getUserProfile(uid){
const doc = await db.collection('user').doc(uid).get();
return doc.exists ? doc.data() : null;
}


// helper: require admin, used in admin.js
async function requireAdmin(){
const u = auth.currentUser;
if(!u) throw
