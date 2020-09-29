sap.ui.define([
	"spiderman/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MsgBox, MsgToast) {
	"use strict";

	return Controller.extend("spiderman.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf spiderman.view.View1
		 */
		onInit: function() {
			var oList = this.getView().byId("idList");
			// oList.bindItems({
			// 	path: "/fruits",
			// 	template: new sap.m.ObjectListItem({
			// 		title: "{name}",
			// 		intro:"{healthBenfit}",
			// 		icon:"{image}",
			// 		number:"{price}",
			// 		numberUnit:"{unit}"
			// 	})                 
			// });
			
			oList.bindAggregation("items",{
				path: "/ProductSet",
				template: new sap.m.ObjectListItem({
					//type: "Navigation",
					title: "{Name}",
					intro:"{ProductId}",
					icon:"{ProductPicUrl}",
					number:"{Price}",
					numberUnit:"{CurrencyCode}"
				}) 
			});
			
			this.oRouter = this.getOwnerComponent().getRouter();
			
		},
		onAdd: function(){
			this.oRouter.navTo("add");
		},
		onDelete: function(oEvent){
			var itemToBeDeleted = oEvent.getParameter("listItem");
			oEvent.getSource().removeItem(itemToBeDeleted);
		},
		onLoad: function(oEvent){
			var that = this;
			setInterval(function(){
										var oDataModel = that.getView().getModel();
										oDataModel.callFunction("/GetMostExpensiveProduct",{
											method: "GET",
											success: function(data){
												var oDialog = new sap.m.Dialog({
													content: [
														new sap.ui.layout.form.SimpleForm({
															content: [
																new sap.m.Label({text: "Product Id"}),
																new sap.m.Text({text: data.ProductId}),
																new sap.m.Label({text: "Name"}),
																new sap.m.Text({text: data.Name}),
																new sap.m.Label({text: "Price"}),
																new sap.m.Input({value: data.Price}),
																new sap.m.Label({text: "Currency"}),
																new sap.m.Text({text: data.CurrencyCode})
															]
														})
													],
													beginButton: new sap.m.Button({
														text: "Save",
														press: function(oEvent){
															var val = oDialog.getContent()[0].getContent()[5].getValue();
															alert(val);
															//todo: update the price of this product
															//odataModel.update("/ProductSet('prodid')", {patload},);
														}
													}),
													endButton: new sap.m.Button({
														text: "Close",
														press: function(){
															oDialog.close();
														}
													})
												});
												oDialog.open();
											},
											error: function(oError){
												debugger;
											}
										});
			}, 15000);
		},
		onItemPress: function(oEvent){
			// //when user clicks on any item, navigate to next screen
			var listItemSelected = oEvent.getParameter("listItem");
			// //get the address of the element which was selected
			var sPath = listItemSelected.getBindingContextPath();
			var myIndex = sPath.split("/")[sPath.split("/").length - 1];
			// //get the second view object and bind this path (element Binding) with second view 
			// var oView2 = this.getView().getParent().getParent().getDetailPages()[1];
			// oView2.bindElement(sPath);
			this.onNext(myIndex);
			
		},
		onSearch: function(oEvent){
			//Step 1: get the value of search what user entered in search field
			// var oSearchField = oEvent.getSource();
			// var searchVal = oSearchField.getValue();
			var srchVal = oEvent.getParameter("query");
			if(!srchVal){
				srchVal = oEvent.getParameter("newValue");
			}
			//Step 2: based on the value what user enters, we need to filter list items
			var aFilter = [];
			var oFilter = new sap.ui.model.Filter("Category", 
												  sap.ui.model.FilterOperator.Contains, 
												  srchVal);
			// var oFilterType = new sap.ui.model.Filter("type",
			// 										  sap.ui.model.FilterOperator.Contains,
			// 										  srchVal);
			// var oMainFilter = new sap.ui.model.Filter({
			// 	filters: [oFilter, oFilterType],
			// 	and:false
			// });
			aFilter.push(oFilter);
			///AND - Both Condition must fulfill ( name = Alk AND type = alk )
			//aFilter.push(oFilterType);
			this.getView().byId("idList").getBinding("items").filter(aFilter);
		},
		onNext: function(myIndex){
			// var oView = this.getView();
			// //App Container Object
			// var oApp = oView.getParent().getParent();
			// //App has an API called to in order to navigate
			// oApp.toDetail("idView2");
			this.oRouter.navTo("detail",{
				anubhav: myIndex
			});
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf spiderman.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf spiderman.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf spiderman.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});