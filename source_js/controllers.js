app.controller('homeController', ['$scope', '$http', function($scope, $http) {
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
        console.log(data);
        if(!data.error) {
            $scope.profile = true;
            $scope.user = data.user;
        }
        $(document).ready(function() {
            console.log($scope.profile, "second");
        $('#fullpage').fullpage({
            css3:true,
            scrollBar:true,
            afterRender: function () {
            //on page load, start the slideshow
             slideTimeout = setInterval(function () {
                    $.fn.fullpage.moveSlideRight();
                }, 3000);
            }
        
        });
        });  // end fullpage
    });
    console.log($scope.profile);
    $.fn.fullpage.destroy('all');
    /*
    $(document).ready(function() {
    $('#fullpage').fullpage({
        css3:true,
        scrollBar:true,
        afterRender: function () {
        //on page load, start the slideshow
         slideTimeout = setInterval(function () {
                $.fn.fullpage.moveSlideRight();
            }, 3000);
        }
    
    });
    });  // end fullpage
*/
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