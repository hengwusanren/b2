angular.module('starter.controllers', [])

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
})

.controller('ContactsCtrl', ['$scope', 'ContactsService', function($scope, ContactsService) {

  /*
  $scope.data = {
    selectedContacts: []
  };

  $scope.pickContact = function() {

    ContactsService.pickContact().then(
      function(contact) {
        $scope.data.selectedContacts.push(contact);
        console.log("Selected contacts=");
        console.log($scope.data.selectedContacts);

      },
      function(failure) {
        console.log("Bummer.  Failed to pick a contact");
      }
    );

  }
  */

  $scope.getContacts = function() {
    $scope.phoneContacts = [];

    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
    };

    function onError(contactError) {
      alert(contactError);
    };
    var options = {};
    options.multiple = true;
    $cordovaContacts.find(options).then(onSuccess, onError);
  };

}]);
