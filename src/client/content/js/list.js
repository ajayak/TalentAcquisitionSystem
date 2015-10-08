var app = angular.module('list', ['ngMaterial', 'md.data.table']);
app.controller('IconCtrl', function($scope) {}).config(function($mdIconProvider) {
    $mdIconProvider
       .iconSet('social', 'imges/add-icon.svg', 24)
       .defaultIconSet('imges/add-icon.svg', 24);
   });
app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
  
  // Toolbar search toggle
  $scope.toggleSearch = function(element) {
    $scope.showSearch = !$scope.showSearch;
  };
  
  // Sidenav toggle
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
  // Menu items
 	$scope.menu = [
    {
      link : '',
      title: 'Dashboard',
      icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
    },
    {
      link : '',
      title: 'Candidates',
      icon: 'social:ic_group_24px'
    },
    {
      link : '',
      title: 'History',
      icon: 'communication:ic_message_24px'
    }
  ];
  $scope.admin = [
    {
      link : 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'action:ic_settings_24px'
    }
  ];
  
  
  // Mock activity
  $scope.activity = [
      {
        what: 'Brunch this weekend?',
        who: 'Ali Conners',
        avatar: 'svg-1',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Summer BBQ',
        who: 'to Alex, Scott, Jennifer',
        avatar: 'svg-2',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend"
      },
      {
        what: 'Oui Oui',
        who: 'Sandra Adams',
        avatar: 'svg-3',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?"
      },
      {
        what: 'Birthday Gift',
        who: 'Trevor Hansen',
        avatar: 'svg-4',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?"
      },
      {
        what: 'Recipe to try',
        who: 'Brian Holt',
        avatar: 'svg-5',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
      },
    ];
  
  // Bottomsheet & Modal Dialogs
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Form" > <md-content class="md-padding"><form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> &nbsp;&nbsp;&nbsp;<md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container></div><div layout layout-sm="column"> <md-input-container flex> <label>Email</label> <input ng-model="user.email"> </md-input-container>&nbsp;&nbsp;&nbsp; <md-input-container flex> <label>Contact Number</label> <input ng-model="user.contact"> </md-input-container></div> <div layout layout-sm="column"> <md-input-container flex> <label>Domin</label> <input ng-model="user.domain"> </md-input-container> <md-input-container flex> <label>Experience</label> <input ng-model="user.experience"> </md-input-container></div><div><md-input-container flex><div layout layout-sm="column" class="file-field input-field"><input class="file-path validate" type="text"/><div class="btn" style="width:6rem;"><span>File</span><input type="file" /></div></div></md-input-container></div><md-input-container flex> <label>Comments</label> <textarea ng-model="user.comments" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row" style="min-width:75px;"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
  $scope.showSchedule = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Form" > <md-content class="md-padding" id="popupContainer" ><p class="insert"></p><form name="userForm"><div layout layout-sm="row" > &nbsp;&nbsp;&nbsp;<md-select ng-model="dessert.type" placeholder="Manager" style="width:275px;"><md-option ng-value="type" ng-repeat="type in getTypes()">{{type}}</md-option></md-select> &nbsp; &nbsp; &nbsp;<md-input-container flex> <label>Date</label> <input type="date" class="datepicker"> </md-input-container>&nbsp; &nbsp; &nbsp;<md-input-container flex> <label>Time</label> <input ng-model="user.time"> </md-input-container>&nbsp;</div></form> </md-content> <div class="md-actions" layout="row"> <span flex flex-md="100"></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Schedule </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
  $scope.showOnHold = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Form" > <md-content class="md-padding"><br/> <div layout layout-sm="row" class="dialog-demo-content"><form name="userForm">&nbsp;&nbsp;&nbsp;<md-input-container flex > <label>Comments</label> <textarea ng-model="user.comments" columns="7" md-maxlength="500" style="width:575px;"></textarea> </md-input-container> &nbsp;&nbsp;&nbsp;</form></div> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> On-Hold </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
  $scope.showReject = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Form" > <md-content class="md-padding"><br/><form  name="userForm"><br/><br/><div layout="column" style="text-align:center" flex> <label style="width:275px;"> Rejecting Application </label></form> </md-content> </div><br/><br/><div class="md-actions" layout="row" > <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Confirm </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Upload', icon: 'file:ic_cloud_upload_24px' },
    { name: 'Copy', icon: 'content:ic_content_copy_24px' },
    { name: 'Print this page', icon: 'action:ic_print_24px' },
  ];
  
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

app.controller('DemoCtrl', DemoCtrl);
  function DemoCtrl ($timeout, $q) {
    var self = this;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : [];
      return results;
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Ali Conners, Alex, Scott, Jennifer, \
              Sandra Adams, Brian Holt, \
              Trevor Hansen';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  };

app.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});

app.config(function($mdIconProvider) {
    $mdIconProvider
      // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
      // 
      .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
      .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
      .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
      .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
      .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
      .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
      .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
      .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
      .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
      .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
      .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
      .iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
      .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
      .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
      .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)
    
      // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
      .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
      .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
});

app.controller('nutritionController', ['$q', '$scope', '$timeout', function ($q, $scope, $timeout, dashboard) {
  
  $scope.selected = [];
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  
  $scope.desserts = {
    "count": 9,
    "data": [
      {
        "id": "1",
		"name": "User 1",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 4.0 },
        "sodium": { "value": 87.0 },
        "calcium": { "value": 14.0 },
        "iron": { "value": 1.0 }
      }, {
		"id": "2",
        "name": "User 2",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 129.0 },
        "calcium": { "value": 8.0 },
        "iron": { "value": 1.0 }
      }, {
		"id": "3",
        "name": "User 3",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value":  6.0 },
        "sodium": { "value": 337.0 },
        "calcium": { "value":  6.0 },
        "iron": { "value": 7.0 }
      }, {
		"id": "4",
        "name": "User 4",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 413.0 },
        "calcium": { "value": 3.0 },
        "iron": { "value": 8.0 }
      }, {
		"id": "5",
        "name": "User 5",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 50.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 0.0 }
      }, {
		"id": "6",
        "name": "User 6",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 38.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 2.0 }
      }, {
		"id": "7",
        "name": "User 7",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 6.5 },
        "sodium": { "value": 562.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 45.0 }
      }, {
		"id": "8",
        "name": "User 8",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 4.9 },
        "sodium": { "value": 326.0 },
        "calcium": { "value": 2.0 },
        "iron": { "value": 22.0 }
      }, {
		"id": "9",
        "name": "User 9",
        "type": "abc@test.com",
        "calories": { "value": 1234567890 },
        "fat": "Java",
        "carbs": { "value": 5 },
        "protein": { "value": 7.0 },
        "sodium": { "value": 54.0 },
        "calcium": { "value": 12.0 },
        "iron": { "value": 6.0 }
      }
    ]
  };
  
  $scope.getTypes = function () {
    return ['email', 'email', 'email', 'email'];
  };
  
  $scope.onpagechange = function(page, limit) {
    var deferred = $q.defer();
    
    $timeout(function () {
      deferred.resolve();
    }, 2000);
    
    return deferred.promise;
  };
  
  $scope.onorderchange = function(order) {
    var deferred = $q.defer();
    
    $timeout(function () {
      deferred.resolve();
    }, 2000);
    
    return deferred.promise;
  };
}]);
