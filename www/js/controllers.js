angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

  helper.log('this is DashCtrl.'); // <-- log

})

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

.controller('ContactsCtrl', ['$scope', 'LocalData', 'Contacts', '$ionicPlatform', function($scope, LocalData, Contacts, $ionicPlatform) {

  helper.log('this is ContactsCtrl.'); // <-- log

  if(LocalData.get('contacts')) {

    helper.log('get contacts from localStorage.'); // <-- log
    helper.log(LocalData.get('contacts')); // <-- log

    $scope.contacts = LocalData.getObject('contacts'); // <-- localStorage

  } else {
    $ionicPlatform.ready(function() {
      $scope.findContact = function() {
        Contacts.find().then(function(contacts) {
          $arr = [];
          var contactCountLimit = 20;
          var contactCount = contacts.length > contactCountLimit ? contactCountLimit : contacts.length;
          for (var i = 0; i < contactCount; i++) {
            $arr.push({
              id: contacts[i].id,
              name: contacts[i].name.formatted,
              displayName: contacts[i].displayName,
              photo: (contacts[i].photos && contacts[i].photos.length > 0) ? contacts[i].photos[0].value : '',
              phone: contacts[i].phoneNumbers[0].value
            })
          }
          $scope.contacts = $arr;

          helper.log(JSON.stringify($scope.contacts), 1); // <-- log
          helper.log('set contacts into localStorage.'); // <-- log

          LocalData.setObject('contacts', $scope.contacts); // <-- localStorage

        });
      };

      $scope.findContact();

    });
  }

}])

.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {

  helper.log('this is ContactDetailCtrl.'); // <-- log

  $scope.contact = Contacts.get($stateParams.contactId);
})

.controller('AccountCtrl', function($scope) {

  helper.log('this is AccountCtrl.'); // <-- log

  $scope.settings = {
    enableFriends: true
  };
});
