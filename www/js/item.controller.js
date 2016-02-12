(function() {

	angular.module('app')
		   .controller('ItemController', ['$ionicFilterBar', ItemController]);

	function ItemController($ionicFilterBar) {
		var vm = this,
			items = [];

		for (var i = 1; i < 300; i++) {
			var itemDate = moment().add(i, 'days');

			var item = {
				description: 'Description for item ' + i,
				date: itemDate.toDate()
			};
			items.push(item);
		}

		vm.items = items;

		vm.showFilterBar = function() {
			filterBarInstance = $ionicFilterBar.show({
				items: vm.items,
				update: function(filteredItems) {
					vm.items = filteredItems;
				},
				filteredProperties: 'description'
			});
		};


		vm.refreshItems = function () {
			if (filterBarInstance) {
				filterBarInstance();
				filterBarInstance = null;
			}

			$timeout(function () {
				getItems();
				$scope.$broadcast('scroll.refreshComplete');
			}, 1000);
		};

		return vm;
	}

})();
