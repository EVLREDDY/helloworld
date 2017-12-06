sap.ui.define([], function() {
	"use strict";

	return {
		/**
		 * Rounds the currency value to 2 digits
		 * 
		 * @public
		 * @param {string}
		 *            sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		currencyValue : function(sValue) {
			if (!sValue) {
				return "";
			}

			return parseFloat(sValue).toFixed(2);
		},
		getJsonData : function() {
			return [ {
				"claimType" : "Dental",
				"claimAmount" : "25000",
				"claimNo" : "2307796100008",
				"empNo" : "1234",
				"empName" : "Linga",
				"savedAmount" : "0",
				"ApprovedClaims" : [ {
					"category" : "Dental",
					"claimId" : "000000787",
					"amount" : "2000",
					"numberOfTeeth" : "32",
					"relationShip" : "self"
				}, {
					"category" : "Dental",
					"claimId" : "000000888",
					"amount" : "2000",
					"numberOfTeeth" : "32",
					"relationShip" : "spouse"
				} ],
				"pendingClaims" : [],
				"savedClaims" : []
			}, {
				"claimType" : "Domiciliary",
				"claimAmount" : "5000.00",
				"claimNo" : "002113434543",
				"empNo" : "1235",
				"empName" : "Balaji",
				"savedAmount" : "0",
				"pendingClaims" : []
			}, {
				"claimType" : "Spectacles",
				"claimAmount" : "7000.00",
				"claimNo" : "002113434520",
				"empNo" : "1238",
				"empName" : "Test case",
				"savedAmount" : "0",
				"pendingClaims" : []
			},{
				"claimType" : "Spectacles",
				"claimAmount" : "7000.00",
				"claimNo" : "002113434520",
				"empNo" : "1238",
				"empName" : "Test case",
				"savedAmount" : "0",
				"pendingClaims" : []
			},{
				"claimType" : "Spectacles",
				"claimAmount" : "7000.00",
				"claimNo" : "002113434520",
				"empNo" : "1238",
				"empName" : "Test case",
				"savedAmount" : "0",
				"pendingClaims" : []
			},{
				"claimType" : "Spectacles",
				"claimAmount" : "7000.00",
				"claimNo" : "002113434520",
				"empNo" : "1238",
				"empName" : "Test case",
				"savedAmount" : "0",
				"pendingClaims" : []
			},{
				"claimType" : "Spectacles",
				"claimAmount" : "7000.00",
				"claimNo" : "002113434520",
				"empNo" : "1238",
				"empName" : "Test case",
				"savedAmount" : "0",
				"pendingClaims" : []
			}

			];
		},
		getClaimData : function() {
			return [ {
				"Name" : "DRRR",
				"billAmount" : "7000.00",
				"billNo" : "12345",
				"remarks" : "",
				"billDate" : "25.07.2017",
				"approvedAmount" : "",
				"AD" : {
					"name" : "Self"
				}
			}, {
				"Name" : "DRRR",
				"billAmount" : "3000.00",
				"billNo" : "12349",
				"remarks" : "",
				"billDate" : "24.07.2017",
				"approvedAmount" : "",
				"AD" : {
					"name" : "Spouse"
				}
			}, {
				"Name" : "ADFFRR",
				"billAmount" : "100.00",
				"billNo" : "12346",
				"remarks" : "",
				"billDate" : "26.07.2017",
				"approvedAmount" : "",
				"AD" : {
					"name" : "Self"
				}
			} ]
		},
		deviceDetails : function() {
			return {
				expandable : !(sap.ui.Device.system.desktop),
				placementPopOver:(sap.ui.Device.system.phone && sap.ui.Device.orientation.landscape)?"Horizontal":"Left",
				refresh:(sap.ui.Device.system.phone)
			}
		},
		getSearchData : function() {
			return [ {
				name : "By Month",
				key : "m",
				months : [ {
					month : "January",
					key : "jan"
				}, {
					month : "February",
					key : "feb"
				}, {
					month : "March",
					key : "mar"
				}, {
					month : "April",
					key : "apr"
				}, {
					month : "May",
					key : "may"
				}, {
					month : "June",
					key : "jun"
				}, {
					month : "July",
					key : "jul"
				}, {
					month : "August",
					key : "aug"
				}, {
					month : "September",
					key : "sep"
				}, {
					month : "October",
					key : "oct"
				}, {
					month : "November",
					key : "nov"
				}, {
					month : "December",
					key : "dec"
				}]
			}, {
				name : "By Year",
				key : "y",
				years:[{year:"2017"},{year:"2016"}]
			}, {
				name : "By Type",
				key : "t",
				types:[{type:"Spectacles",key:"s"},{type:"Domiciliary",key:"doc"},{type:"Dental",key:"dent"}]
			}, {
				name : "By Claim No.",
				key : "c"
			} ]
		}
	};

});