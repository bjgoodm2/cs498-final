app.controller("homeController",["$scope","$http",function($scope,$http){$scope.profile=!1,$http.get("/profile").success(function(data){console.log(data),data.error||($scope.profile=!0,$scope.user=data.user),$(document).ready(function(){$("#fullpage").fullpage({css3:!0,scrollBar:!0,afterRender:function(){slideTimeout=setInterval(function(){$.fn.fullpage.moveSlideRight()},3e3)}})})}),$.fn.fullpage.destroy("all"),$(".scrollTop").click(function(){return $("html, body").animate({scrollTop:0},"slow"),!1})}]),app.controller("findController",["$scope","$http",function($scope,$http){$scope.profile=!1,$http.get("/profile").success(function(data){console.log(data),data.error||($scope.profile=!0,$scope.user=data.user)}),$scope.getLocation=function(val){return $http.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:val,sensor:!1}}).then(function(response){return response.data.results.map(function(item){return item.formatted_address})})}}]),app.controller("driveController",["$scope","$http",function($scope,$http){$scope.profile=!1,$scope.offerPosted=!1,$http.get("/profile").success(function(data){console.log(data),data.error||($scope.profile=!0,$scope.user=data.user)}),$scope.getLocation=function(val){return $http.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:val,sensor:!1}}).then(function(response){return response.data.results.map(function(item){return item.formatted_address})})},$scope.postOffer=function(driverId,name,email,origin,destination,departureDate,carType){var reqBody={driverId:driverId,name:name,email:email,origin:origin,destination:destination,departureDate:departureDate,carType:carType};$http.post("/api/offers",reqBody).success(function(data){$scope.retVals=data.data,$scope.offerPosted=!0}).error(function(data){$scope.retVals=data.data,$scope.offerPosted=!1})}}]),app.controller("profileController",["$scope","$http",function($scope,$http){$scope.profile=!1,$http.get("/profile").success(function(data){console.log(data),data.error||($scope.profile=!0,$scope.user=data.user)})}]);