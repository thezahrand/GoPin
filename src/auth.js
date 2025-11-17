// SIGNUP
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const room = document.getElementById("signupRoom").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.firestore().collection("users").doc(user.user.uid).set({
      name, room, email, role: "user"
    });

    alert("Signup berhasil!");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;

    const doc = await firebase.firestore().collection("users").doc(uid).get();

    if (doc.data().role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "shop.html";
    }
  });
}
