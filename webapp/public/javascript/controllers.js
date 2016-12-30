//add logout later to clear localstorageservice vars
angular.module('voteControllers', ["chart.js","LocalStorageModule"]) //for now empty maybe replace later to manage get parameter
	.controller('voteResCtrl', function($scope, $routeParams, $http, accessFac){
		$scope.a="AZERTY";
		$http.get('/voteresults/'+$routeParams.v)
		.then(function(data){
			accessFac.getPermission();
			console.log(data);
			$scope.results = data.data;
			$scope.chartLabels = [];
  		$scope.chartData = [];
			for (var i=0; (i<(data.data).length) ;i++)
				{
					$scope.chartLabels.push((data.data)[i][0]);
					$scope.chartData.push((data.data)[i][1]);

				}
		});


	})
	.controller('voteListCtrl', function($scope,$http, adminFac, accessFac,localStorageService ){
		$http.get('/listvotes')
		.then(function(data){
			accessFac.getPermission();
			console.log(data);
			$scope.votes = data.data;
			$scope.showcreatevotebtn = localStorageService.get('isMrTokunawa')=='MrOgre';
		});
	})
	.controller('voteCastCtrl', function($scope,$routeParams, $http, $location, $timeout,adminFac, accessFac,localStorageService){
		console.log('controller called');

		$http.get('/castvote/'+$routeParams.voteId)
		.then(function(data){
			$scope.showminer = localStorageService.get('isMrTokunawa')=='MrOgre';
			console.log($scope.showminer);

			//$scope.showminer = adminFac.getPermission();
			//$scope.choice={};
			//console.log('accessFac value is set to : ' + accessFac.getPermission());
			$scope.voteId=$routeParams.voteId;
			console.log(data.data);
			$scope.votename = data.data[0];
			$scope.candidatenames = data.data[1];
			$scope.voteIdurl = data.data[2];
		});
		$scope.minevotes = function(){
			$http.post('/minevotes')
			.then(function(data){
				$scope.mininglog = data.data;
			});
		};
		$scope.throwvote = function(){
			console.log($scope);
			console.log($scope.choice);
			var datatosend={
				//"userid":1, no more need for this, using req.session.user instead
				"choice":$scope.choice,
				"voteId":$scope.voteId
			};
			$http.post('/vote',datatosend)
			.then(function(data){
				//console.log($scope.choice);
				//console.log('requested permission to vote from server');
				//console.log(data.data);
				$scope.aftervoteparagraph = data.data[0]+' Going back to votes now';
				$scope.colordolor = data.data[1];
				$timeout(function(){ $location.path('/listvotes'); }, 2780);

			});
		};
	})
	.controller('newVoteCtrl',function($scope,$routeParams,$http,$location,adminFac){

		console.log(adminFac);
		$scope.vote = {
			 votename: '',
			 candidates: [ { text: '' }, { text: '' }, { text: '' }]
		 };
		 $scope.addChoice = function() {
			 $scope.vote.candidates.push({ text: '' });
		 };
		 $scope.createVote = function() {
			 console.log('called createvote');
			 var vote = $scope.vote;
			 if(vote.votename.length > 0) {
				 var choiceCount = 0;
				 for(var i = 0, ln = vote.candidates.length; i < ln; i++) {
					 var candidate = vote.candidates[i];
					 if(candidate.text.length > 0) {
						 choiceCount++
					 }
				 }
				 if(choiceCount > 1) {
					 $http.post('/createvote', vote)
						 .success(function(){
							 $location.path('/listvotes');
						 })
						 .error(function(err){
							 alert('Could not create vote');
							 console.log(err);
						 });

				 } else {
					 alert('You must enter at least two choices');
				 }
			 } else {
				 alert('You must enter a question');
			 }
		 };
		console.log('new vote from client');

	})
	.controller('HeaderController',function($scope,$location){

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
	})
	.controller('loginCtrl', function($scope,$http, $location, $timeout ,accessFac, adminFac, localStorageService ){
		$http.get('/login')
		.then(function(data){
			console.log(data);
		});
		$scope.register = function(){
			$location.path('/register');
		};
		$scope.login = function(){
			$http.post('/login',$scope.user)
			.then(function(data){
				console.log(data.data);
				$scope.loginparagraph = data.data;

				if (data.data == "welcome admin")
					{adminFac.getPermission();
						accessFac.getPermission();
						localStorageService.set('isLoggedIn','Hell_yeah!');
						localStorageService.set('isMrTokunawa','MrOgre');
						$scope.loginparagraph+="..redirecting to votelist";
					$timeout(function(){ $location.path('/listvotes'); }, 2000);}
				else if (data.data == "logged in successfully!")
					{ accessFac.getPermission();
						adminFac.destroyPermission();
						localStorageService.set('isLoggedIn','Hell_yeah!');
						//redirect to /listvotes put in a settimeout
						$scope.loginparagraph+="..redirecting to votelist";
						$timeout(function(){ $location.path('/listvotes'); }, 2000);};



			});
		};
		//define the post later
	})
	.controller('registerCtrl', function($scope,$http,$location ){
		$http.get('/register')
		.then(function(data){
			console.log(data);
		});
		$scope.register = function(){
			$http.post('/register',$scope.user)
			.success(function(){
				$location.path('/login');
			});
		};
	})

	.controller('testCtrl', function($scope,$http, $location,$timeout ){
		$http.get('/test')
		.then(function(data){
			//if (data.data=="this is the login page")
			 $timeout(function(){ $location.path('/listvotes'); }, 1500);
			console.log(data.data);

		});
	})
	.factory('accessFac',function(){
		var obj = {}
		this.access = false;
		obj.getPermission = function(){
				this.access = true;
		}
		obj.checkPermission = function(){
				return this.access;
		}
		return obj;
})
.factory('adminFac',function(){
	var obj = {}
	this.access = false;
	obj.getPermission = function(){
			this.access = true;
	}
	obj.checkPermission = function(){
			return this.access;
	}
	obj.destroyPermission = function(){
			this.access = false;
	}
	return obj;
})
;
