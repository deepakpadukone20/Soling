app.controller('homeCtrl', function ($scope,Data) {
	Chart.defaults.global.responsive = true;
	
		$scope.ctx = document.getElementById("saleChart").getContext("2d");
		var data = {};
		data.data1 = {
		    labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
		    datasets: [
		        {
		            label: "No of Sales",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 81, 56, 55, 1],

		        }
		    ]
		};
		 data.data2 = {
		    labels: ["Week1", "Week2", "Week3", "Week4"],
		    datasets: [
		        {
		            label: "No of Sales",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 90],

		        }
		    ]
		};
		$scope.myLineChart = new Chart($scope.ctx).Line(data["data1"], {scaleShowGridLines :false,bezierCurve : true});

		$scope.changeGraph = function(type){
			$scope.title = type == 1 ? "week" : "month"
			$scope.myLineChart.destroy();
			$scope.myLineChart = new Chart($scope.ctx).Line(data["data"+type], {scaleShowGridLines :false,bezierCurve : true});
		};
		$scope.getOrderCount = function(type){
			Data.get('orders?type='+type).then(function (results) {
            if(results.status == "success"){
               $scope.orderCount = results.data;
            }
        });
		}
		$scope.getOrderCount(3);
});
