sap.ui.controller("helloworld.S1", {
	onInit : function() {
		var obj = {name:"linga"};
		var data = [];
		for(var i=0;i<20;i++){
			data.push(obj);
		}
		this.byId("tableId").setModel(new sap.ui.model.json.JSONModel(data));
		this.byId("productInput").setModel(new sap.ui.model.json.JSONModel(this.getData()));
	},
	
	getData:function(){
		return [{
			name:"Linga"
		},{
			name:"Linga 1"
		},{
			name:"Linga 2"
		},{
			name:"abdkj ldkf"
		},{
			name:"bbbbbb"
		},{
			name:"kllliw uyiuyiu"
		}]
	},
});
