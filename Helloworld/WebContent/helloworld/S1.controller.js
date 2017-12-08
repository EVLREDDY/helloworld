sap.ui.controller("helloworld.S1", {
	onInit : function() {
		var obj = {name:"linga"};
		var data = [];
		for(var i=0;i<20;i++){
			data.push(obj);
		}
		this.byId("tableId").setModel(new sap.ui.model.json.JSONModel(data));
	},
});
