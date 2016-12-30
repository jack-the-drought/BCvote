//dah/voteresults
angular.module('vote', ['ngRoute','voteControllers'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
				.when('/', {
							templateUrl: '/templates/index.html',
							resolve:{
							"check":function(accessFac,$location,localStorageService){
								if((accessFac.checkPermission())||(localStorageService.get('isLoggedIn')=='Hell_yeah!')){

								}else{
										$location.path('/login');
										}
									}
								},

				})
		    .when('/voteresults/:v', {
	            templateUrl: '/templates/results.html',
							resolve:{
							"check":function(accessFac,$location,localStorageService){
								if((accessFac.checkPermission())||(localStorageService.get('isLoggedIn')=='Hell_yeah!')){
								}else{
										$location.path('/login');
										}
									}
								},
	            controller: 'voteResCtrl'
		    })
				.when('/listvotes',{
						templateUrl: '/templates/index.html',
						resolve:{
						"check":function(accessFac,$location,localStorageService){
							if((accessFac.checkPermission())||(localStorageService.get('isLoggedIn')=='Hell_yeah!')){

							}else{
									$location.path('/login');

									}
								}
							},
						controller: 'voteListCtrl'
				})
				.when('/castvote/:voteId', {
				templateUrl: '/templates/castvote.html',
				resolve:{
				"check":function(accessFac,$location,localStorageService){
					if((accessFac.checkPermission())||(localStorageService.get('isLoggedIn')=='Hell_yeah!')){
//'isLoggedIn','Hell_yeah!'      'isMrTokunawa','MrOgre' ||(localStorageService.get('isMrTokunawa')=='MrOgre'
					}else{
							$location.path('/login');
							}
						}
					},
				controller: 'voteCastCtrl'
			})
				.when('/createvote',{//add the isAdmin factory
					templateUrl: '/templates/newvote.html',
					resolve:{
					"check":function(adminFac,$location){
						if((adminFac.checkPermission())||(localStorageService.get('isMrTokunawa')=='MrOgre')){

						}else{
								$location.path('/test');

								}
							}
						},
					controller: 'newVoteCtrl'
				})
				.when('/login',{
					templateUrl: '/templates/login.html',
					controller: 'loginCtrl'
				})
				.when('/register',{
					templateUrl: '/templates/register.html',
					controller: 'registerCtrl'
				})
				.when('/test',{
					templateUrl: '/templates/test.html',
					resolve:{
        	"check":function(accessFac,$location){
            if(accessFac.checkPermission()){

            }else{
                $location.path('/login');

            		}
        			}
    				},
					controller: 'testCtrl'
				})

		    .otherwise({redirectTo:'/'});
	}])
;
