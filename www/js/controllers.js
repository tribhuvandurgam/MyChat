angular.module('starter.controllers', [])



//MYCONTROLLER
.controller('LoginCtrl', function($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, Auth,Database) {
  console.log('Login Controller Initialized');

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createUser = function(user) {
    console.log("Create User Function called");
            if (user && user.email && user.password && user.displayname) {
                $ionicLoading.show({
                    template: 'Signing Up...'
                });

Auth.createUserWithEmailAndPassword(user.email,user.password).then(function (userData) {
    alert("User created successfully!");
    Database.ref().child("users").child(userData.uid).set({
        email: user.email,
        displayName: user.displayname
    });
    $ionicLoading.hide();
    $scope.modal.hide();
}).catch(function (error) {
  if(error.code === "auth/email-already-in-use"){
    alert(error);
    $ionicLoading.hide();
    $scope.modal.hide();
  }else {
    alert(error);
    $ionicLoading.hide();
  }

});
            } else
    alert("Please fill all details");
  }

  $scope.signIn = function(user) {
    console.log("Sign In Clicked");
      if (user && user.email && user.pwdForLogin) {
      $ionicLoading.show({
        template: 'Signing In...'
      });
      Auth.signInWithEmailAndPassword(user.email, user.pwdForLogin).then(function(authData) {
        $ionicLoading.hide();
        $state.go('tab.chats');
      }).catch(function(error) {
        alert("Authentication failed:" + error.message);
        $ionicLoading.hide();
      });
    } else
      alert("Please enter email and password both");

    //$state.go('tab.chats');
  }
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
