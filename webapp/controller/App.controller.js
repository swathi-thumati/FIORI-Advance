sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("spiderman.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf spiderman.view.App
		 */
		onInit: function() {
			
			// //Create both the view objects
			// var oView1 = new sap.ui.view({
			// 	id:"idView1",
			// 	viewName:"spiderman.view.View1",
			// 	type:"XML"
			// });
			// var oView2 = new sap.ui.view({
			// 	id:"idView2",
			// 	viewName:"spiderman.view.View2",
			// 	type:"XML"
			// });
			// var oEmpty = new sap.ui.view({
			// 	id:"idEmpty",
			// 	viewName:"spiderman.view.Empty",
			// 	type:"XML"
			// });
			// //Add the view objects inside pages aggregation 
			// var oAppContainer = this.getView().byId("myApp");
			// oAppContainer.addMasterPage(oView1);
			// //firstly add empty - 0 
			// oAppContainer.addDetailPage(oEmpty);
			// //firstly add second - 1
			// oAppContainer.addDetailPage(oView2);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf spiderman.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf spiderman.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf spiderman.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});