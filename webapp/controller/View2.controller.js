sap.ui.define([
	"spiderman/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/SelectDialog"
], function(Controller, MsgBox, MsgToast, SelectDialog) {
	"use strict";
	return Controller.extend("spiderman.controller.View2", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf spiderman.view.View2
		 */
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			//Whenever the route (end point, hash tag), trigger this method
			this.oRouter.attachRouteMatched(this.herculis, this);
		},
		herculis: function(oEvent){
			//Get the index of the selected item
			var index = oEvent.getParameter("arguments").anubhav;
			//Reconstruct the path for binding - element wwhich was selected
			var sPath = "/" + index;
			//Binding with current view as elementBinding
			this.getView().bindElement(sPath);
		},
		onBack: function() {
			this.getView().getParent().to("idView1");
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf spiderman.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		idOfTableField: null,
		onConfirm: function(oEvent) {
			var title = oEvent.getSource().getTitle();
			if(title === "Supplier"){
				return;
			}
			var valueItem = oEvent.getParameter("selectedItem").getLabel();
			sap.ui.getCore().byId(this.idOfTableField).setValue(valueItem);
		},
		supplierPopup: null,
		cityPopup: null,
		onF4Help: function(oEvent) {
			console.log("you have prssed F4 on field inside table : ", oEvent.getSource().getId());
			this.idOfTableField = oEvent.getSource().getId();
			
			if(!this.cityPopup){
				this.cityPopup = new sap.ui.xmlfragment("idCity","spiderman.fragments.myPopup", this);
				
				this.cityPopup.bindAggregation("items",{
					path: "/Cities",
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{state}"
					})
				});
				this.cityPopup.setMultiSelect(false);
				this.getView().addDependent(this.cityPopup);
			}
			this.cityPopup.open();
			
			// var oSelectDialog = new SelectDialog({
			// 	title: "Cities",
			// 	items: {
			// 		path: "/Cities",
			// 		template: new sap.m.DisplayListItem({
			// 			label: "{name}",
			// 			value: "{state}"
			// 		})
			// 	},
			// 	confirm: [
			// 		this.onConfirm,
			// 		this
			// 	]
			// });
			//It makes the select dialog which is a foreign entity accessible for view and now
			//select dialog can access the model @ view level easily
			// this.getView().addDependent(oSelectDialog);
			// oSelectDialog.open();
		},
		onSave: function() {
				MsgBox.confirm("Would like to save the object.", {
					title: "Confirmation",
					onClose: function(choice) {
						if (choice === "OK") {
							MsgToast.show("Your object have been saved successfully!");
						}
					}
				});
			}
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf spiderman.view.View2
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf spiderman.view.View2
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf spiderman.controller.View2
		 */
		onFilter: function(oEvent) {
			if(!this.supplierPopup){
				this.supplierPopup = new sap.ui.xmlfragment("spiderman.fragments.myPopup", this);
				this.supplierPopup.setTitle("Supplier");
				this.supplierPopup.bindAggregation("items",{
					path: "/Suppliers",
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{sinceWhen}"
					})
				});
				this.getView().addDependent(this.supplierPopup);
			}
			this.supplierPopup.open();
			
			// //This code was generated by the layout editor.
			// var oSelectDialog = new SelectDialog({
			// 	title: "Suppliers",
			// 	items: {
			// 		path: "/Suppliers",
			// 		template: new sap.m.DisplayListItem({
			// 			label: "{name}",
			// 			value: "{sinceWhen}"
			// 		})
			// 	}
			// });
			// //It makes the select dialog which is a foreign entity accessible for view and now
			// //select dialog can access the model @ view level easily
			// this.getView().addDependent(oSelectDialog);
			// oSelectDialog.open();
		}
	});
});