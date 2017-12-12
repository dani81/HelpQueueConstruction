angular.module('helpQueue', ["firebase"])
.controller('MainCtrl', [
  '$scope','$http', "$firebaseArray",
  function($scope,$http, $firebaseArray){
    $scope.test = 'Hello world!';
  

  $scope.showHelpButton = false;

  $scope.names = [
      {name:'Kit'},
      {name:'Avery'},
      {name:'Eli'},
      {name:'Zoey'},
      {name:'Piper H'},
      {name:'Caleb'},
      {name:'Allison'},
      {name:'Piper K'},
      {name:'Sofie D'},
      {name:'Nikale'},
      {name:'Colton'},
      {name:'Brin'},
      {name:'Jubal'},
      {name:'Paisley'},
      {name:'Dixie'},
      {name:'Kevan'},
      {name:'Jesse'},
      {name:'Sophie T'},
      {name:'Nicolai'},
      {name:'Swazie'},
      {name:'William'},
      {name:'Grace'},
      {name:'Grayson'},
      {name:'Joe'},
      {name:'Gavin'},
      {name:'Bailey'},
      {name:'Saphira'}
    ]; 


    function toggleSignIn() {
      if (!firebase.auth().currentUser) {
 	var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      } else {
        firebase.auth().signOut();
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }


    function initApp() {

      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          var token = result.credential.accessToken;
        }
        var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var uid = user.uid;
console.log(uid);
     	  document.getElementById('test').textContent = displayName;
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
	  $scope.showHelpButton = true;
	  $scope.$apply();
        } else {
          // User is signed out.
	  document.getElementById('test').textContent = 'Please Sign In';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
	  $scope.showHelpButton = false;
	  $scope.$apply();
        }
        document.getElementById('quickstart-sign-in').disabled = false;
      });
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }
    window.onload = function() {
      initApp();
    };


var ref = firebase.database().ref().child("messages");
   $scope.questions = $firebaseArray(ref);
   $scope.update = function(user) {
       var newquestion = {Name:firebase.auth().currentUser.displayName || "anonymous", Question:user.question};
       console.log(newquestion);
       $scope.questions.$add(newquestion);
       user.question = "";
   }

    $scope.getAll = function() {
    console.log("getAll");
    return $http.get('/comments').success(function(data){
      angular.copy(data, $scope.line);
      console.log("getAll success");
    });
  };
  $scope.getAll();

   $scope.create = function(student) {
    return $http.post('/comments', student).success(function(data){
      $scope.line.push(data);
    });
  };
  
   $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };

  $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

  $scope.delete = function(studentID) {
console.log(studentID);
     ref.child(studentID).remove();
  };


  }
]);
