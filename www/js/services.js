angular.module('starter.services', [])

.factory('LocalData', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    remove: function(key) {
      $window.localStorage.removeItem(key);
    }
  }
}])

.factory('Minds', function($sce) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var minds = [{
    id: 0,
    ownerName: 'Ke Shen',
    ownerPhoto: 'http://tp2.sinaimg.cn/1669395577/180/5729521328/1',
    displayTime: 'July 28, 2015',
    content: $sce.trustAsHtml('<p>B2 or 2b, this is a question... Everyone has some individual sides. So let\'s record them, give them to AI. We will also get something and somebody interesting.</p>')
  }, {
    id: 1,
    ownerName: 'Ke Shen',
    ownerPhoto: 'http://tp2.sinaimg.cn/1669395577/180/5729521328/1',
    displayTime: 'July 25, 2015',
    content: $sce.trustAsHtml('<p>I design and develop B2 because: I like to record a mind which is much smaller than a blog but of more value than a “friend-circle” to myself. I don’t like twitter/weibo because social network is not my point. I just wish to concentrate on man’s mind, thoughts, and interests, little of any serious business but much of my life.</p>')
  }];

  return {
    all: function() {
      return minds;
    },
    remove: function(mind) {
      minds.splice(minds.indexOf(mind), 1);
    },
    get: function(mindId) {
      for (var i = 0; i < minds.length; i++) {
        if (minds[i].id === parseInt(mindId)) {
          return minds[i];
        }
      }
      return null;
    }
  };
})

.factory('Finds', function($sce) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var finds = [{
    id: 0,
    ownerName: 'Ben Sparrow',
    ownerPhoto: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    displayTime: '1 day ago',
    content: $sce.trustAsHtml('<img class="full-image" src="img/postimg.jpg"><p>Erupting volcanoes can pose many hazards, not only in the immediate vicinity of the eruption.</p>')
  }, {
    id: 1,
    ownerName: 'Anthony',
    ownerPhoto: 'http://tp2.sinaimg.cn/1669395577/180/5729521328/1',
    displayTime: 'July 20, 2015',
    content: $sce.trustAsHtml('<p>This is a "Facebook" styled Card. The header is created from a Thumbnail List item, the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer.</p>')
  }];

  return {
    all: function() {
      return finds;
    },
    remove: function(find) {
      finds.splice(finds.indexOf(find), 1);
    },
    get: function(findId) {
      for (var i = 0; i < finds.length; i++) {
        if (finds[i].id === parseInt(findId)) {
          return finds[i];
        }
      }
      return null;
    }
  };
})

.factory("Binds", ['$q', 'LocalData', function($q, LocalData) {
  
  helper.log('this is Binds.'); // <-- log

  var binds = [];

  if(LocalData.get('binds')) {
    binds = LocalData.getObject('binds'); // <-- localStorage
    //LocalData.remove('binds');
  }

  return {
    find: function() {
      if(binds.length > 0) return binds; // if localStorage has binds, return them.

      var deferred = $q.defer(); // asynchronous
      var options = new ContactFindOptions();
      options.multiple = true;
      var fields = ["id", "name", "displayName", "photos", "phoneNumbers"];

      navigator.contacts.find(fields,
        function(allbinds) {
          binds = allbinds;

          helper.log(JSON.stringify(binds), 1); // <-- log

          deferred.resolve(allbinds);
        }, // onsuccess
        function(error) {
          deferred.reject(error);
        }, // onerror
        options);
      return deferred.promise;
    },
    all: function() {
      return binds;
    },
    remove: function(binds) {
      binds.splice(binds.indexOf(bind), 1);
    },
    get: function(bindId) {
      if(binds.length == 0 && LocalData.get('binds')) {
        binds = LocalData.getObject('binds'); // <-- localStorage
      }
      for (var i = 0; i < binds.length; i++) {
        if (binds[i].id == bindId) {
          return binds[i];
        }
      }
      return null;
    }
  };
}]);