//Ti.include('HttpLinker.js');

Ti.Facebook.appid = '3563214183734201';
Ti.Facebook.permissions = ['publish_stream'];
var loginStatus = false;

function login(){
		Ti.Facebook.authorize();
}

Titanium.Facebook.addEventListener('login',updateStatus);
Titanium.Facebook.addEventListener('logout',updateStatus);

function updateStatus(){
	loginStatus = Titanium.Facebook.loggedIn;
}

function checkStatus(){
	return loginStatus;
}

function logout(){
	Titanium.Facebook.logout();
}
