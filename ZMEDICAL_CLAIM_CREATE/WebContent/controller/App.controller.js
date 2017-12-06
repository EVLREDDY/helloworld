sap.ui.define([ "sap/ui/core/mvc/Controller" ], function(Controller) {
	"use strict";
	return Controller.extend("ZMEDICAL_CLAIM_CREATE.controller.App", {
		onInit : function() {
			if (sap.ui.Device.system.desktop) {
				this.getView().addStyleClass("sapUiSizeCompact");
			}
		},
	});
});