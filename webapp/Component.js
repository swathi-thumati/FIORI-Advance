sap.ui.define(
	["sap/ui/core/UIComponent",
	"spiderman/model/models"],
	
	function(UIComp, models){
		return UIComp.extend("spiderman.Component",{
			//Contains all the properties, dependencies, models,
			//views, themes, devices, libs, etc...
			metadata:{
				"manifest": "json"
			},
			//will be used to initialize our component and its properties
			//it will also helps us to call the base class contrcutor
			init: function(){
				///super->constructor();
				//This statement is calling the base class constructor
				//The purpose is to initialize the super class object
				//A router object is activated in base class and now can be used here
				sap.ui.core.UIComponent.prototype.init.apply(this);
				var oRouter = this.getRouter();
				oRouter.initialize();
			},
			// createContent: function(){
			// 	//similar code what we had in index.html
			// 	var oView = new sap.ui.view({
			// 		id:"idApp",
			// 		viewName: "spiderman.view.App",
			// 		type:"XML"
			// 	});
				
			// ///	var oJSONModel = models.createJSONModel();
			// 	//If you want your model @ app level - all the views and controller to access
			// 	//set model at App View level
			// 	//oView.setModel(oJSONModel);
				
			// 	return oView;
			// },
			destroy: function(){}
			
			
			
		});
});