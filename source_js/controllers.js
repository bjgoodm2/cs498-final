app.controller('homeController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
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

app.controller('findController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.profile = false;
    $scope.search = {};
    $http.get('/profile').success(function(data) {
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
    });

    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false,
                types: ['(cities)'],
                components: 'country:US'
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
        });
    };

    $scope.searchOffers = function() {
        $scope.offers = [];
        if(!$scope.search.asyncOriginSelected || $scope.search.asyncOriginSelected === "") {
            $http.get('/api/offers').success(function(res) {
                $scope.offers = res.data;
            })
        }
        else {
            $http.get('/api/offers?where={'+
                    'departureDate: {$gte: new Date("'+ $scope.search.startDate.toISOString()+'"), $lt: new Date("'+$scope.search.endDate.toISOString()+'")},'+
                    'origin: "'+$scope.search.asyncOriginSelected+'", destination: "'+$scope.search.asyncDestSelected+'"}')
                .success(function(res) {
                    $scope.offers.push.apply($scope.offers, res.data);

                    $http.get('/api/offers?where={'+
                            'departureDate: {$gte: new Date("'+ $scope.search.startDate.toISOString()+'"), $lt: new Date("'+$scope.search.endDate.toISOString()+'")},'+
                            'origin: "'+$scope.search.asyncOriginSelected+'", destination: { $ne: "'+$scope.search.asyncDestSelected+'"}}')
                        .success(function(res) {
                            $scope.offers.push.apply($scope.offers, res.data);
                        });
                });
        }
    };

    $scope.gotoDriverProfile = function(driverId) {
        $location.path('/profile/'+driverId);
    }
}]);

app.controller('driveController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $scope.offerPosted = false;
    $http.get('/profile').success(function(data) {
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
            name : name,
            email : email,
            origin : origin,
            destination : destination,
            departureDate : departureDate,
            departureTime : departureTime,
            carType : carType
        };
        $http.post('/api/offers', reqBody).success(function(data){
            $scope.retVals = data.data;
            $scope.offerPosted = true;
            var nextReqBody = {
                driveOffer : data.data._id
            };
            $http.put('/api/users/' + driverId, nextReqBody).success(function(data){
                console.log(data);
            }).error(function(data){
                //do something
                console.log(data);
            });
        }).error(function(data){
            $scope.retVals = data.data;
            $scope.offerPosted = false;
        });
    };

}]);

app.controller('profileController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        $http.get('/api/offers?where={"driverId": "'+ data.user._id +'"}').success(function(data){
            $scope.offers = data.data;
        });
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
    });

    $scope.editProfile = function() {
        $http.post('/api/users/'+$scope.user._id, $scope.user.local).success(function(res) {
            console.log(res);
            $('#editModal').modal('hide')
        })
    };

    $scope.deleteUser = function(userId){
        console.log('delete User called');
        console.log(userId);
        $http.delete('/api/users/' + userId).success(function(data){
            console.log(data);
            $location.path('/home');
        }).error(function(data){
            console.log(data);
        })
    };
}]);

app.controller('otherProfileController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var userId = $routeParams.id;
    $scope.profile = false;
    $http.get('/api/users/'+userId).success(function(res) {
        $http.get('/api/offers?where={"driverId": "'+ res.data._id +'"}').success(function(res){
            $scope.currOffers = res.data;
        });
        if(!res.error) {
            $scope.profile = true;
            $scope.currUser = res.data;
        }
    });

}]);
