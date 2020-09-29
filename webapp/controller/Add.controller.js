sap.ui.define([
	"spiderman/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/SelectDialog",
	"sap/ui/model/json/JSONModel"
], function(Controller, MsgBox, MsgToast, SelectDialog, JSONModel) {
	"use strict";
	return Controller.extend("spiderman.controller.Add", {
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			//Whenever the route (end point, hash tag), trigger this method
			this.oRouter.attachRouteMatched(this.herculis, this);
			var oItab = new JSONModel();
			oItab.setData({
				"product": {
					"ProductId": "",
			        "TypeCode": "PR",
			        "Category": "Notebooks",
			        "Name": "",
			        "Description": "Laptop with Supersonic Speed",
			        "SupplierId": "100000046",
			        "SupplierName": "SAP",
			        "TaxTarifCode": 1,
			        "MeasureUnit": "EA",
			        "WeightMeasure": "4.200",
			        "WeightUnit": "KG",
			        "Price": "0",
			        "CurrencyCode": "INR",
			        "Width": "30.000",
			        "Depth": "18.000",
			        "Height": "3.000",
			        "DimUnit": "CM"
				}
			});
			this.getView().setModel(oItab,"india");
			
		},
		herculis: function(oEvent){
			
		},
		onBack: function() {
			this.getView().getParent().to("idView1");
		},
		fieldId: "",
		onF4Help: function(oEvent){
			this.fieldId = oEvent.getSource().getId();
			var that = this;
			
			var oDialog = new SelectDialog({
				title: "Products",
				items: {
					path: "/ProductSet",
					template: new sap.m.DisplayListItem({
						label: "{Name}",
						value: "{ProductId}"
					})
				},
				confirm: function(oEvent){
					sap.ui.getCore().byId(that.fieldId).setValue(oEvent.getParameter("selectedItem").getValue());
					oDialog.destroy();
				}
			});
			this.getView().addDependent(oDialog);
			oDialog.open();
		},
		onSave: function() {
			var that = this;
				MsgBox.confirm("Would like to save the object.", {
					title: "Confirmation",
					onClose: function(choice) {
						if (choice === "OK") {
							
							var oDataModel = that.getView().getModel();
							var oProductData = that.getView().getModel("india").getProperty("/product");
							oDataModel.create("/ProductSet", oProductData,{
								success: function(){
									MsgToast.show("Your object have been saved successfully!");
								},
								error: function(oErr){
									MsgBox.error("Sorry Some error occurred : Reason --> "+ JSON.parse(oErr.responseText).error.message.value );
								}
							});
							
						}
					}
				});
			}
	});
});