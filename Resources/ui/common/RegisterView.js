Ti.include('../logic/Animations.js');
Ti.include('../logic/GraphicFunctions.js');
function RegisterView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		//backgroundImage:'images/WelcomePage/welcomeBG.png'
	});

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var lastNameBox = Ti.UI.createTextField({
		hintText:'Last Name',
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_LINE,
		width:120,
		height:40,
		left:20,
		top:30
	});
	self.add(lastNameBox);
	
	var firstNameBox = Ti.UI.createTextField({
		hintText:'First Name',
		width:120,
		height:40,
		left:150,
		top:30
	});
	self.add(firstNameBox);
	return self;
}

module.exports = RegisterView;
