'use strict';
(function(){

    var _user_roles = [
        {
            id : 1,
            type : 'Admin'
        },
        {
            id : 2,
            type : 'User'
        },
        {
            id : 3,
            type : 'Guest'
        }
    ];

    angular
        .module('app.constants.module')
        .constant('app.constants.userRoles', _user_roles)
})();