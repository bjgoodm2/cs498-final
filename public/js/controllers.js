app.controller("homeController",["$scope","$http",function($scope,$http){}]),app.controller("findController",["$scope","$http",function($scope,$http){$scope.getLocation=function(val){return $http.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:val,sensor:!1}}).then(function(response){return response.data.results.map(function(item){return item.formatted_address})})}}]),app.controller("driveController",["$scope","$http",function($scope,$http){$scope.getLocation=function(val){return $http.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:val,sensor:!1}}).then(function(response){return response.data.results.map(function(item){return item.formatted_address})})}}]),app.controller("profileController",["$scope","$http",function($scope,$http){}]);