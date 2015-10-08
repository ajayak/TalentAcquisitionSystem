(function () {

    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('URL', {
            'BASE_URL': 'http://localhost:7200/',
            'PING': 'ping',
            'VALIDATE_USER' : 'validate',
            'ADD_CANDIDATE' : 'addcandidate',
            'LIST' : 'listcandidate',
           'LIST_INTERVIEWER':'listinterviewer' ,
            'SCHEDULE_INTERVIEW': 'scheduleinterview',
            'CANDIDATE_UPDATE': 'candidateupdate',
            'SCHEDULED': 'scheduled',
            'UNSCHEDULED': 'unscheduled',
           'REJECT_CANDIDATE':'rejected',
           'ADD_INTERVIEWER':'addinterviewer'

        });
}());