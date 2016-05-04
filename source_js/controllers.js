app.controller('homeController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        console.log(data);
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
    });
}]);

app.controller('findController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        console.log(data);
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
    });
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
        });
    };
}]);

app.controller('driveController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        console.log(data);
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
    });
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
        });
    };

    $scope.postOffer = function(driverId, name, email, origin, destination, departureDate, carType){
        var reqBody = {driverId : driverId, name : name, email : email, origin : origin, destination : destination, departureDate : departureDate, carType : carType};
	$scope.etc = reqBody;
        $http.post('/api/offers', {'destination' : 'Space'}).success(function(data){
            $scope.retVals = data;
        }).error(function(data){
            $scope.retVals = data;
        });
    };

}]);

app.controller('profileController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        console.log(data);
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
    });
}]);
