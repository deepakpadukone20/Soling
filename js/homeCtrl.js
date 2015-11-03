app.controller('homeCtrl', function ($scope,Data) {
	Chart.defaults.global.responsive = true;
		$scope.title = "month"
		$scope.ctx = document.getElementById("saleChart").getContext("2d");
		var data = {};
		data.data2 = {
		    labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
		    datasets: [
		        {
		            label: "No of Sales",
		            fillColor: "rgba(249,172,12,0.2)",
		            strokeColor: "rgba(249,172,12,1)",
		            pointColor: "rgba(249,172,12,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 81, 56, 55, 1],

		        }
		    ]
		};
		 data.data1 = {
		    labels: ["Week1", "Week2", "Week3", "Week4"],
		    datasets: [
		        {
		            label: "No of Sales",
		            fillColor: "rgba(151,3,216,0.2)",
		            strokeColor: "rgba(151,3,216,1)",
		            pointColor: "rgba(151,3,216,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 90],

		        }
		    ]
		};
		$scope.myLineChart = new Chart($scope.ctx).Line(data["data1"], {scaleShowGridLines :false,bezierCurve : false});

		$scope.changeGraph = function(){
			$scope.title = $scope.type == 1 ? "month" : "week"
			var type = $scope.type >= 2 ? 2:1;
			$scope.myLineChart.destroy();
			$scope.myLineChart = new Chart($scope.ctx).Line(data["data"+type], {scaleShowGridLines :false,bezierCurve : false});
		};
		$scope.change = function(type){
			$scope.type = type;
			$scope.changeGraph();
			$scope.getOrderCount();
		}
		$scope.getOrderCount = function(){
			Data.get('orders?type='+$scope.type).then(function (results) {
            if(results.status == "success"){
               $scope.orderCount = results.data;
            }
        });
		}
		$scope.change(3);
});
