(function () {
	'use strict';

	angular.module('app.dashboard').factory('dashboard', dashboardFactory);

	function dashboardFactory(Restangular, URL, logger, $state) {
		return {

            registerUser: registerUser,
            listUser: listUser,
			listInterviewer: listInterviewer,
			scheduleInterview: scheduleInterview,
			rejectCandidate: rejectCandidate,
			addInterviewer: addInterviewer,
			dataSharing: dataSharing
		};

		var dataSharing = {};
		function addSuccess(data) {
			if (data != '0') {
				logger.info('Welcome ' + data);
				$state.go('dashboard');
			} else {
				logger.info('User does not Exist');
			}
		}

		function scheduleSuccess(data) {

			console.log('data' + data[0]);

		}

		function addFailed(error) {
			logger.error(error);
		}
		function registerUser(user) {
			return Restangular.all(URL.ADD_CANDIDATE).post({ user }).then(addedSuccess, addFailed);

		}

		function addInterviewer(user) {
			return Restangular.all(URL.ADD_INTERVIEWER).post({ user });

		}

		function addedSuccess(data) {
			logger.info(data);
		}
		function scheduleInterview(user) {
			logger.info("Successfully Scheduled");
			return Restangular.all(URL.SCHEDULE_INTERVIEW).post({ user }).then(scheduleSuccess, addFailed);
		}

		function rejectCandidate(user) {
			logger.info("Successfully Rejected");
			return Restangular.all(URL.REJECT_CANDIDATE).post({ user }).then(rejectSuccess, rejectFailed);
		}
		function rejectSuccess(data) {

			console.log('data' + data[0]);

		}
		function rejectFailed(error) {
			logger.error(error);
		}
		function listSuccess(data) {
			return data;
		}

		function listFailed(error) {
			logger.error(error);
		}
		function listUser() {
			return Restangular.all(URL.LIST).post().then(listSuccess, listFailed);
		}


		function listInterviewer() {
			console.log("inside factory");
			return Restangular.all(URL.LIST_INTERVIEWER).post();
		}

	}

} ());