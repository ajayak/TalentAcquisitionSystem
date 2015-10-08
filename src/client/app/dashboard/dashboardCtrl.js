(function () {
  'use strict';

  angular.module('app.dashboard').controller('dashboardCtrl', dashboardController);

  function dashboardController(dashboard, logger, $mdDialog, $scope, $state, $filter) {

    var vm = this;
    vm.message = 'Hello there!';
    vm.showAdd = showAdd;
    vm.listAllUser = listAllUser;
    vm.showSchedule = showSchedule;
    vm.goToHome = goToHome;
    vm.showOnHold = showOnHold;
    vm.showRejected = showRejected;
    vm.viewResume = viewResume;
    vm.addInterviewer = addInterviewer;
    function goToHome() {
      $state.go('login');
    }

    function addInterviewer($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'app/dashboard/addInterviewer.html',
        locals: {
          items: $scope.items
        },
        controller: InterviewerController
      });
      function InterviewerController(scope, $mdDialog, items) {
        scope.items = items;
        scope.closeDialog = function () {
          $mdDialog.hide();
        },
        scope.addInterviewer = function () {
        	 dashboard.addInterviewer(scope.user);

        	 $mdDialog.hide();
        }
      }
    }


    

     
    //vm.dessert = listUser;
    dashboard.listUser().then(candidateRecieved, dataError);

    function dataRecieved(data) {
      //$stateProvider.go('hr-dashboard');
      listAllUser();
    }
    function listAllUser() {
      dashboard.listUser().then(candidateRecieved, dataError);
		  }

    function showAdd($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'app/dashboard/addCandidate.html',
        locals: {
          items: $scope.items
        },
        controller: DialogController
      });
      function DialogController(scope, $mdDialog, items) {
        scope.items = items;
        scope.closeDialog = function () {
          $mdDialog.hide();
        },
        scope.registerCandidate = function () {
        	 dashboard.registerUser(scope.user).then(dataRecieved, dataError);
        	 listAllUser();
        	 $mdDialog.hide();
        }
      }
    }

    function showSchedule($event, id) {
      var parentEl = angular.element(document.body);
      console.log("inside show schedule before calling the list");
      dashboard.listInterviewer().then(interviewerRecieved, dataError);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'app/dashboard/scheduleInterview.html',
        locals: {
          items: $scope.items,
          rid: id

        },

        controller: ScheduleController
      });
      function interviewerRecieved(data) {
        dashboard.dataSharing = data;
      }

      function ScheduleController(scope, $mdDialog, items, rid, dashboard) {
        scope.items = items;
        scope.interviewer = _.uniq(_.pluck(dashboard.dataSharing, 'InterviewerName'));
        scope.closeDialog = function () {
          $mdDialog.hide();
        };
        scope.ScheduleCandidate = function () {
          scope.user.email = rid;
          //scope.user.manager=scope.interviewer;
          dashboard.scheduleInterview(scope.user).then(dataRecieved, dataError);
          $mdDialog.hide();
        }
      }
    }

    function showOnHold($event, email) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'app/dashboard/showOnHold.html',
        locals: {
          items: $scope.items
        },

        controller: OnHoldController
      });
      function OnHoldController(scope, $mdDialog, items) {
        scope.items = items;
        scope.closeDialog = function () {
          $mdDialog.hide();
        },
        scope.OnHoldCandidate = function () {
        	 //dashboard.registerUser(scope.user).then(dataRecieved, dataError);
        	 listAllUser();
          logger.info('Candidate is Onhold');
        	 $mdDialog.hide();
        }
      }
    }

    function showRejected($event, id) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'app/dashboard/showRejected.html',
        locals: {
          items: $scope.items,
          rid: id
        },
        controller: RejectedController
      });
      function RejectedController(scope, $mdDialog, items, rid) {

        scope.items = items;
        scope.closeDialog = function () {
          $mdDialog.hide();
        },
        scope.rejectedCandidate = function () {
          scope.user.email = rid;
          dashboard.rejectCandidate(scope.user).then(dataRecieved, dataError);
          logger.info('Candidate is Rejected');
          $mdDialog.hide();
        }
      }
    }


    function viewResume($event, email) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'app/dashboard/showResume.html',
        locals: {
          items: $scope.items
        },
        controller: OnHoldController
      });
      function OnHoldController(scope, $mdDialog, items) {
        scope.items = items;
        scope.closeDialog = function () {
          $mdDialog.hide();
        },
        scope.OnHoldCandidate = function () {
        	 //dashboard.registerUser(scope.user).then(dataRecieved, dataError);
       
          logger.info('Candidate is Onhold');
        	 $mdDialog.hide();
        }
      }
    }

    function dataError(error) {
      logger.error(error);
    }



    function candidateRecieved(data) {
      vm.candidates = data;
      vm.unscheduled = $filter('filter')(data, { status: "Registered" });
      vm.scheduled = $filter('filter')(data, { status: "Scheduled" });
      vm.selected = $filter('filter')(data, { status: "Selected" });
      vm.onhold = $filter('filter')(data, { status: "OnHold" });
      vm.rejected = $filter('filter')(data, { status: "Rejected" });
    }

    var selected = [];

    vm.query = {
      order: 'name',
      limit: 50,
      page: 1
    };


    vm.tableCardIsEnabled = true;
    vm.tableIsSelectable = true;
    vm.tableIsSortable = true;


    var getTypes = function () {
      return ['email', 'email', 'email', 'email'];
    };

    var onpagechange = function (page, limit) {
      var deferred = $q.defer();

      $timeout(function () {
        deferred.resolve();
      }, 2000);

      return deferred.promise;
    };

    var onorderchange = function (order) {
      var deferred = $q.defer();

      $timeout(function () {
        deferred.resolve();
      }, 2000);

      return deferred.promise;
    };
  }

} ());