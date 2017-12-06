sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",'sap/m/Dialog','sap/m/Button','sap/m/Label',"ZMEDICAL_CLAIM_CREATE/util/formatter"], function(Controller, JSONModel,Dialog,Button,Label,formatter) {
    "use strict";
    return Controller.extend("ZMEDICAL_CLAIM_CREATE.controller.Home", {
        onInit: function() {
            this.busy_Dialog = new sap.m.BusyDialog();
         //   this.busy_Dialog.open();
            this.oModel = this.getOwnerComponent().getModel();
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           // this.filterLabels = formatter.getSearchData();
            this.AddFiscalYears();
            this.bindMasterList();  
        },
        
        AddFiscalYears:function(){
        	var jsonYears = [{"year":new Date().getFullYear()-1},{"year":new Date().getFullYear()}]
        	this.byId("yearFieldId").setModel(new JSONModel(jsonYears));
        },
        
        // function to bind the list in the master.
        bindMasterList: function() {
            var that = this; 
            this.byId("masterList").setModel(new JSONModel(this.getClaimTypes()));
        },
        
        listFactoryFn:function(sId,oContext){
        	var claimType = oContext.getProperty().claimType;
        	var template = '';
        	if(claimType == "Summary"){
        		template = new sap.m.ObjectListItem({
        			press:[this.onSelectClaimType,this],
        			type:'Active',
        			title:'{claimType}',
        			icon:'{icon}'
        		}); 
        	}else{
        		template = new sap.m.ObjectListItem({
        			press:[this.onSelectClaimType,this],
        			type:'Active',
        			title:'{claimType}',
        			number:'{claimAmount}',
        			numberUnit:'INR',
        			icon:'{icon}',
        			attributes:[
        				new sap.m.ObjectAttribute({
        					text:'Eligibility Amt :{eligibilityAmount} '
        				})
        			]
        		});
        	}
        	return template;
        },
        
        claimType:function(data){
        	if(data == "Dental"){
        		return "Success";
        	}else if(data == "Spectacles"){
        		return "Warning";
        	}else if(data == "Domiciliary"){
        		return "Error";
        	}
        },
        
        // function to change the title and description of the message page depending on the master list data.
        showNoDataDetailPage: function(title, desc) {
            this.byId("messagePageId").setText(title);
            this.byId("messagePageId").setDescription(desc);
        },
        
        onSelectClaimType: function(oEvent) {
        	debugger;
        	var selObj = oEvent.oSource.getBindingContext().getObject();
            // this.busy_Dialog.open();        	
        	if(selObj.claimType == "Summary"){
                this.getSplitContObj().toDetail(this.createId("vizPage"));
                this.bindGraph();
        	}else{
        		this.byId("secondMaster").setTitle(selObj.claimType);
        		this.getSplitContObj().toMaster(this.createId("secondMaster"));
        	}
         // this.bindDetailData();
        },
        
        bindGraph:function(){
        	var dataModel = new JSONModel(this.getData());
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setModel(dataModel);
        },
        backToMaster:function(){
        	this.getSplitContObj().backMaster();
        },
        // search functionality for the master list to search Claims
        onSearch: function(oEvt) {
            var aFilters = [];
            var sQuery = oEvt.getSource().getValue();
            if (sQuery.length > 0) {
                if (!isNaN(sQuery)) {
                    var filter1 = new sap.ui.model.Filter("claimNo", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter1);
                }
            }
            var list = this.getView().byId("masterList");
            var binding = list.getBinding("items");
            binding.filter(aFilters);
        },
        
        // it binds the detail page by taking the PO number.
        bindDetailData: function() {
            var that = this;
            var params = {
                "$expand": "Nav_family_data,Nav_header_item",
                "$filter": "Claim_no eq '2307796100008' and Claim_typ eq 'SPEC'"
            };
            this.oModel.read("/expense_headerSet", {
                urlParameters: params,
                success: function (oData, oResponce) {
                	if(oData.results.length>0){
                		that.backend_Data = oData;
                		that.bindForm_Function(oData);
                		that.bindBillTable_Function(oData, that.claimNum);
                		that.calculateTotalAmount(oData.results[0].Nav_header_item.results);
                	}
                	that.busy_Dialog.close();
                },
                error: function (oError) {
                	 that.busy_Dialog.close();
                    debugger;
                }
            });
        },
        
        calculateTotalAmount: function (data) {
            var modelData = data;
            var tableModel = this.getView().getModel("BillData");
            this.totalBillAmount = 0;
            for (var i = 0; i < data.length; i++) {
                tableModel.getData()[i].approvedAmount = data[i].Amount;
                this.totalBillAmount += parseFloat(data[i].Amount);
            }
            tableModel.refresh();
            this.byId("billAmount").setNumber(this.totalBillAmount + " (INR)");
            this.byId("totalAmount").setNumber(this.totalBillAmount + " (INR)");
        },
        
        // Binding of Simple form
        bindForm_Function: function (data) {
            this.byId("sfId").setModel(new JSONModel(data.results[0]), "sfData");
            this.byId("sfId").bindElement("sfData>/");
        },

        // Binding of Table

        bindBillTable_Function: function (data,claimNo) {
            var aBillData = data.results[0].Nav_header_item.results;
            for (var i = 0; i < aBillData.length; i++) {
               // aBillData[i].
            	aBillData[i].Claim_no = claimNo;
            //	aBillData[i].l_Bill_Date = oDateFormat.format(aBillData[i].Billing_date!=null?")
            	
            }
            this.getView().setModel(new JSONModel(aBillData), "BillData");
        },
        
        // it returns the split container object.
        getSplitContObj: function() {
            var result = this.byId("SS_split");
            if (!result) {
                jQuery.sap.log.error("SplitApp object can't be found");
            }
            return result;
        },
        
        onNavBack:function(e){
        	this.getSplitContObj().backMaster();
        },
        
        onSearchBtnPress:function(e){
			if(!this.popOver){
				this.popOver = sap.ui.xmlfragment("ZMEDICAL_CLAIM_CREATE.fragments.search",this);
				this.getView().addDependent(this.popOver);
				this.searchModel = new JSONModel(this.filterLabels);
			}
			sap.ui.getCore().byId("panelId").setPlacement(formatter.deviceDetails().placementPopOver);
			this.popOver.openBy(e.getSource());
		},
		
		onMonthPanelPress:function(e){
			if(e.mParameters.expand){
				if(sap.ui.getCore().byId("monthList").getModel().getData() == null){
					sap.ui.getCore().byId("monthList").setModel(new JSONModel(this.searchModel.getData()[0].months));
				}
				this.closePanels(e);
			}
		},
		
		onYearPanelPress:function(e){
			if(e.mParameters.expand){
				if(sap.ui.getCore().byId("yearsList").getModel().getData() == null){
					sap.ui.getCore().byId("yearsList").setModel(new JSONModel(this.searchModel.getData()[1].years));
				}
				this.closePanels(e);
			}
		},
		
		onTypePanelPress:function(e){
			if(e.mParameters.expand){
				if(sap.ui.getCore().byId("typeList").getModel().getData() == null){
					sap.ui.getCore().byId("typeList").setModel(new JSONModel(this.searchModel.getData()[2].types));
				}
				this.closePanels(e);
			}
		},
		/*onSearch:function(){
			this.popOver.close();
		},
		*/
		// on Selection of months in the panel
		onMonthSelect:function(e){
			
			sap.ui.getCore().byId("monthHeaderid").setText(e.oSource.getSelectedItem().getTitle());
		//	e.oSource.oParent.mAggregations.headerToolbar.mAggregations.content[2].setText("-"+e.oSource.getSelectedItem().getTitle());
			//monthHeaderid
		},
		onTypeSelect:function(e){
			
			sap.ui.getCore().byId("typeHeaderid").setText(e.oSource.getSelectedItem().getTitle());
		},
		onYearSelect:function(e){
			
			sap.ui.getCore().byId("yearHeaderid").setText(e.oSource.getSelectedItem().getTitle());
		},
		
		closePanels:function(e){
			var panels =  e.oSource.oParent.mAggregations.content;//[1].getExpanded();
			
			for(var i=0;i<panels.length;i++){
				if(panels[i].sId !== e.oSource.sId){
					panels[i].setExpanded(false);
				}
			}
		},
		onBeforePopoverClose:function(e){
			var panels = e.oSource.mAggregations.content;//[1].getExpanded();
			for(var i=0;i<panels.length;i++){
					panels[i].setExpanded(false);
			}
		},
		onClearFilters:function(){
			this.byId("resetBtnId").setVisible(false);
			var core = sap.ui.getCore();
			if(core.byId("monthHeaderid")){
				core.byId("monthHeaderid").setText("");
				core.byId("yearHeaderid").setText("");
				core.byId("typeHeaderid").setText("");
				
				core.byId("monthList").removeSelections();
				core.byId("yearsList").removeSelections();
				core.byId("typeList").removeSelections();	
			}
			var bItems = this.byId("masterList").getBinding("items");
			bItems.filter([]);
			this.popOver.close();
		},
		showClaimDetails: function (e) {
			var indexOfItem = e.oSource.oParent.oParent.indexOfItem(e.oSource.oParent);
			var familyData = this.backend_Data.results[0].Nav_family_data.results[indexOfItem];
            if (!this.popOverDetails) {
                this.popOverDetails = sap.ui.xmlfragment("ZMEDICAL_CLAIM_CREATE.fragments.personDetails", this);
                this.getView().addDependent(this.popOverDetails);
                sap.ui.getCore().byId("personalDetId").bindElement("/");
                sap.ui.getCore().byId("personalDetId").setModel(new JSONModel(familyData));
            }
            this.popOverDetails.openBy(e.getSource());
        },
        onResetFilters:function(e){
        	this.onClearFilters();        	
        },
        onFilter:function(){
        	this.byId("resetBtnId").setVisible(true);
        	this.popOver.close();
        },
        
        onExit:function(){
        	if(this.popOverDetails){
        		this.popOverDetails.destroy();
        	}
        	if(this.popOver){
        		this.popOver.destroy();
        	}
        },
        
        getClaimTypes:function(){
        	return [{
        				"claimType" : "Summary",
        				"eligibilityAmount":"",
        				"claimAmount" : "",
        				"icon":"util/graph64.png"
        			},{
        				"claimType" : "Domiciliary",
        				"eligibilityAmount":"5000",
        				"claimAmount" : "2000",
        				"icon":"util/pills24.png"
        			},{
        				"claimType" : "Spectacles",
        				"eligibilityAmount":"4000",
        				"claimAmount" : "1000",
        				"icon":"util/eye32.png"
        			},{
        				"claimType" : "Dental",
        				"eligibilityAmount":"7000",
        				"claimAmount" : "5000",
        				"icon":"util/tooth24.png"
        			}]
        },
        getData : function() {
			return [ {
				"Consumption" : "76855.15368",
				"Cost" : "94383.52",
				"Revenue" : 2,
				"Store Name" : "24-Seven"
			},{
				"Consumption" : "76855.15368",
				"Cost" : "94383.52",
				"Revenue" : 4,
				"Store Name" : "reddy"
			},{
				"Consumption" : "76855.15368",
				"Cost" : "94383.52",
				"Revenue" : 3,
				"Store Name" : "linga"
			}/*, {
				Consumption : 310292.22,
				Cost : 274735.17,
				Revenue : 3,
				StoreName : "A&A"
			}, {
				Consumption : 143432.18,
				Cost : 233160.58,
				Revenue : 4,
				StoreName : "Alexei's Specialities"
			}, {
				Consumption : 487910.26,
				Cost : 235072.19,
				Revenue : 5,
				StoreName : "BC Market"
			}*/ ]
		}
    });
});
