angular.module('rcApp').factory('DataLoader', ['$location', function($location) {
	var dataEntity = [];

	return {
		getEntityInstance : function(type) {
			var entity = dataEntity[type];
			if (entity == undefined) {
				entity = {
					offset : 0,
					limit : 5,
					loadCount : -1,
					totalCount : -1,
					data : [],
					loadData : function(){},
					isEmpty : function(){
						return this.data.length == 0;
					},
					isLoad : function() {
						return this.totalCount == this.loadCount && this.loadCount != -1;
					},
					loadMore : function() {
						this.offset = this.offset + this.limit;
	  					this.loadData();
					}

				}
				dataEntity[type] = entity;
			}
			return entity;
		},

		onDataLoaded : function(type, data) {
			var entity = this.getEntityInstance(type);
			entity.data = entity.data.concat(data.issues);
			entity.loadCount = entity.data.length;
			entity.totalCount = data.total_count;
		}
	}
}]);