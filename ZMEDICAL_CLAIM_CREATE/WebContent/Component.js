sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/odata/ODataModel",
    "sap/m/routing/RouteMatchedHandler"
], function(UIComponent, oModel, RouteMatched) {
    "use strict";
    return UIComponent.extend("ZMEDICAL_CLAIM_CREATE.Component", {
        metadata: {
            _version: "1.0",
            library: "ZMEDICAL_CLAIM_CREATE",
            includes: ["css/style.css"],
            dependencies: {
                libs: ["sap.m"]
            },
            config: {
                resourceBundle: "",
                serviceConfig: [{
                    name: "Purchase Order Approval",
                    serviceUrl: "../ZMEDICAL_CLAIM_CREATE/proxy/sap/opu/odata/sap/ZHR_MEDICLAIM_SRV/"
                }],
            },
            //serviceUrl: "../ZMEDICAL_CLAIM_CREATE/proxy/sap/opu/odata/sap/ZPO_APPROVAL_SRV/"
            rootView: "ZMEDICAL_CLAIM_CREATE.view.App",
            routing: {
                config: {
                    viewType: "XML",
                    viewPath: "ZMEDICAL_CLAIM_CREATE.view",
                    targetControl: "app",
                    transistion: "flip"
                },
                routes: [{
                        pattern: "",
                        name: "Home",
                        view: "Home",
                        targetAggregation: "pages"
                    }
                ]
            }
        },
        init: function() {
            UIComponent.prototype.init.apply(this, arguments);
            var mConfig = this.getMetadata().getConfig();
            var sServiceUrl = mConfig.serviceConfig[0].serviceUrl;
            var oDataModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
            oDataModel.setDefaultCountMode();
            this.setModel(oDataModel);
            var router = this.getRouter();
            this._oRouteMatchedHandler = new RouteMatched(router);
            this.getRouter().initialize();
        }
    });
});