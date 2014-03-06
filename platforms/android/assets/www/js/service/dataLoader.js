angular.module('rcApp').factory('DataLoader', ['$location', function($location) {
	var dataEntity = [];

	return {
		getEntityInstance : function(type) {
			var entity = dataEntity[type];
			if (entity == undefined) {
				entity = {
					offset : 0,
					limit : 20,
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
					},
					onDataLoaded: function(loadData, total_count){
						this.data = this.data.concat(loadData);
						this.loadCount = this.data.length;
						this.totalCount = total_count;		
					}

				}
				dataEntity[type] = entity;
			}
			return entity;
		},


		clearInstance : function(type) {
			var instance = this.getEntityInstance(type);
			instance.offset = 0;
			instance.loadCount = -1;
			instance.totalCount = -1;
			instance.data.length = 0;
		}
	}
}]);