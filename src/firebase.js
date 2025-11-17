import 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js';
import 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js';
import 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js';
import 'https://www.gstatic.com/firebasejs/9.22.1/firebase-storage-compat.js';


let firebaseLoaded = false;


export async function initFirebase(){
if(firebaseLoaded) return;
const res = await fetch('/.netlify/functions/firebaseKey');
if(!res.ok) throw new Error('Gagal fetch config');
const cfg = await res.json();
firebase.initializeApp(cfg);
window.db = firebase.firestore();
window.auth = firebase.auth();
window.storage = firebase.storage();
firebaseLoaded = true;
}


// small helper to check admin role
export async function isAdmin(uid){
if(!uid) return false;
const doc = await window.db.collection('users').doc(uid).get();
return doc.exists && doc.data().role === 'admin';
}
