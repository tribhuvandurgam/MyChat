angular.module('starter.controllers', [])



//MYCONTROLLER
.controller('LoginCtrl', function($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, Auth) {
  console.log('Login Controller Initialized');

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createUser = function(user) {

  }

  $scope.signIn = function(user) {
    console.log("Sign In Clicked");
    debugger;
    if (user && user.email && user.pwdForLogin) {
      $ionicLoading.show({
        template: 'Signing In...'
      });
      debugger;
      // Auth.child("/users").on("value", function(snapshot) {
      //   console.log(snapshot.val());
      // });
      Auth.signInWithEmailAndPassword(user.email, user.pwdForLogin).then(function(authData) {
        console.log("Logged in as:" + authData.uid);
        // ref.child("users").child(authData.uid).once('value', function(snapshot) {
        //   var val = snapshot.val();
        //   // To Update AngularJS $scope either use $apply or $timeout
        //   $scope.$apply(function() {
        //     $rootScope.displayName = val;
        //   });
        // });
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
