angular.module('starter.controllers', [])

.controller('MindsCtrl', ['$scope', 'LocalData', 'Finds', function($scope, LocalData, Minds) {

  helper.log('this is MindsCtrl.'); // <-- log

  $scope.minds = Minds.all();
}])

.controller('BindsCtrl', ['$scope', 'LocalData', 'Binds', '$ionicPlatform', function($scope, LocalData, Binds, $ionicPlatform) {

  helper.log('this is BindsCtrl.'); // <-- log

  if(LocalData.get('binds')) {

    helper.log('get binds from localStorage.'); // <-- log
    helper.log(LocalData.get('binds')); // <-- log

    $arr = [];
    var localBinds = LocalData.getObject('binds');
    for(var i in localBinds) {
      if(localBinds[i].photo == '') continue;
      $arr.push(localBinds[i]);
    }
    $scope.binds = $arr; // <-- localStorage

  } else {
    $ionicPlatform.ready(function() {
      $scope.findBind = function() {
        Binds.find().then(function(binds) {

          helper.log('find, then:'); // <-- log

          $arr = [];
          var bindCountLimit = 100;
          var bindCount = binds.length > bindCountLimit ? bindCountLimit : binds.length;
          for (var i = 0; i < bindCount; i++) {
            var photoUrl = (binds[i].photos && binds[i].photos.length > 0) ? binds[i].photos[0].value : '';
            if(photoUrl == '') continue;
            $arr.push({
              id: binds[i].id,
              name: binds[i].name.formatted,
              displayName: binds[i].displayName,
              photo: (binds[i].photos && binds[i].photos.length > 0) ? binds[i].photos[0].value : '',
              phone: binds[i].phoneNumbers[0].value
            })
          }
          $scope.binds = $arr;

          helper.log(JSON.stringify($scope.binds), 1); // <-- log
          helper.log('set binds into localStorage.'); // <-- log

          LocalData.setObject('binds', $scope.binds); // <-- localStorage

        });
      };

      $scope.findBind();

    });
  }

}])

.controller('BindDetailCtrl', function($scope, $stateParams, Binds) {

  helper.log('this is BindDetailCtrl.'); // <-- log

  $scope.bindInstance = Binds.get($stateParams.bindId);
})

.controller('FindsCtrl', ['$scope', 'LocalData', 'Finds', function($scope, LocalData, Finds) {

  helper.log('this is FindsCtrl.'); // <-- log

  $scope.settings = {
    enableBinds: true
  };
  $scope.finds = Finds.all();
}]);
