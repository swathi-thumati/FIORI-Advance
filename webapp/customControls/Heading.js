sap.ui.define([],function(){
	
	sap.ui.core.Control.extend("spiderman.customControls.Heading",{
		metadata: {
			properties: {
				"mario": "",
				"zumba": "",
				"border": ""
			}
		},
		init: function(){
			this.setZumba("red");
		},
		renderer: function(oRm, oControl){
			//oRm.write("<h1 style='color:" + oControl.getZumba() + "'>" + oControl.getMario() + "</h1>");
			oRm.write("<h1");
			oRm.addStyle("color",oControl.getZumba());
			oRm.addStyle("border",oControl.getBorder());
			oRm.writeStyles();
			oRm.write(">" + oControl.getMario() + "</h1>");
		}
	});
		
});