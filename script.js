/* Script för scroll av navigation */
$(document).ready(function() {
  // Transitions effekt header 
  $(window).scroll(function() {
    // kollar när fönster scrollas efter 50 px, lägger till och tar bort solid class.
    if($(this).scrollTop() > 20) { 
        $('.header').addClass('solid');
        $('nav ul li a').addClass('color');
    } else {
        $('.header').removeClass('solid');
        $('nav ul li a').removeClass('color');
    }
  });
});
/* END */

/////////////////////////////////////////////////////////////////

/* Script för hide and show div */
var specifiedElement = document.getElementById('welcomeDiv');
var specifiedElement2 = document.getElementById('loginButton')
document.addEventListener('click', function(event) {
  var isClickInside = specifiedElement.contains(event.target) || specifiedElement2.contains(event.target);
  if(specifiedElement.style.display === "block")
  {
    if(!isClickInside)
    {
      specifiedElement.style.display = "none";
    }
  }
});

function showDiv() {
  var theDiv = document.getElementById("welcomeDiv");
  if(theDiv.style.display === 'none')
  {
    theDiv.style.display = "block";
  }
  else
  {
    theDiv.style.display = "none";
  }
}
/* END */

/////////////////////////////////////////////////////////////////

/* Script för login */

/**
 * Handles the sign in button press.
 */
const btnLogin = document.getElementById('btnLogin');
//const btnLogout = document.getElementById('quickstart-sign-out');
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    var _uid = user.uid;
    // var firebaseRef = firebase.database().ref();
    // firebaseRef.child("hej2").set({   
    //     hej3:
    //     {
    //         bla1: "ett",
    //         bla2: "tva"   
    //     }
    // });
    
    var firebaseRef = firebase.database().ref();
    // firebaseRef.child("Students").set({   
    //     [_uid]:
    //     {
    //       bla1: "null"  
    //     }
    // }); 


    // var ref = firebase.database().ref().child("/Students/hej3/");
    // ref.update({ "bla2": "" });

    
    firebaseRef.child("Students").update({   
        [_uid]:
        {
          bla1: "test"  
        }
    });
    //window.location = 'minasidor.html';
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);

    // [END_EXCLUDE]
  });
  window.location = 'minasidor.html';
  // [END createwithemail]
}
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}
function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {

    // [START_EXCLUDE silent]
    document.getElementById('quickstart-verify-email').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      //window.location = 'minasidor.html'; /// Detta skickar vidare till ny sida
      //document.cookie = "user=john";
      document.cookie = user.uid;
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      //window.location.href = 'minasidor.html'; /// Detta skickar vidare till ny sida
      //window.open('minasidor.html');
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    //window.location = 'minasidor.html';
    // [END_EXCLUDE]
  });

  // [END authstatelistener]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function() {
  initApp();
};





/* End */

/////////////////////////////////////////////////////////////////



/* skriver till databas */

// function registreraFunc()
// {
//   //window.alert("Hej");
//   var firebaseRef = firebase.database().ref();
//   firebaseRef.set(
//   {
//     hej3:
//         {
//             bla1: "ett",
//             bla2: "tva"   
//         }
//   })
//   /// retrivar fran databas // 
//   var retrive = firebase.database().ref().child("hej3/bla1/");
//   var retrive2 = firebase.database().ref().child("hej3/bla2/");
//   var text = '';
//   retrive.on('value', function(databasesnapshot)
//   {
//     text += databasesnapshot.val();
    
//   });

//   retrive2.on('value', function(databasesnapshot)
//   {
//     text += ' '+ databasesnapshot.val();
//   })
//   window.alert(text);
// }
/* END */


/////////////////////////////////////////////////////////////////
