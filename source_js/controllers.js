app.controller('homeController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        console.log(data);
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
        $(document).ready(function() {
            $('#fullpage').fullpage({
                css3:true,
                scrollBar:true,
                normalScrollElements: '.modal',
                afterRender: function () {
                    //on page load, start the slideshow
                    slideTimeout = setInterval(function () {
                        $.fn.fullpage.moveSlideRight();
                    }, 5000);
                }

            });
        });  // end fullpage
    });
    $.fn.fullpage.destroy('all');
    $(".scrollTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
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
    $http.get('/api/offers').success(function(res) {
        console.log(res);
        $scope.offers = res.data;
        /*for(var i=0; i<$scope.offers.length; i++) {
            console.log($scope.offers[i]);
            var offer_uid = $scope.offers[i].driverId;
            $http.get('/api/users/'+offer_uid).success((function(idx) {
                return function(res) {
                    $scope.offers[idx].driverPicUrl = res.data.local.userPicUrl;
                }
            })(i));
        }*/
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
    $scope.offerPosted = false;
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

    $scope.postOffer = function(driverId, name, email, origin, destination, departureDate, departureTime, carType){
        var reqBody = {
            driverId : driverId,
            name : name, email : email,
            origin : origin,
            destination : destination,
            departureDate : departureDate,
            departureTime : departureTime,
            carType : carType
        };
        $http.post('/api/offers', reqBody).success(function(data){
            $scope.retVals = data.data;
            $scope.offerPosted = true;
        }).error(function(data){
            $scope.retVals = data.data;
            $scope.offerPosted = false;
        });
    };

}]);

app.controller('profileController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        //console.log(data);
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
    });
    $scope.deleteUser = function(userId){
        console.log('delete User called');
        console.log(userId);
        $http.delete('/api/users/' + userId).success(function(data){
            console.log(data);
            $location.path('/home');
        }).error(function(data){
            console.log(data);
        })
    }
}]);
