//Titanium.include('Parser.js');
var url = 'http://10.66.60.87:8080/HttpGetServlet/servlet/CommonServlet';
var url_DB = 'http://10.66.60.87:8080/HttpGetServlet/servlet/FetchServlet';
var feedbackObj;
var isReady = false;
function sendRequest(requestType,requestValue){
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function()
		{
			Ti.API.info('in utf-8 onload for GET');
			Ti.API.info('response:' + this.responseText);
			dataHandler(requestType,this.responseText);
		};
			xhr.onerror = function()
		{
			Ti.API.info('in utf-8 error for GET');
			//alert(e.toSource());
		};	
		xhr.open('POST',url);
		Titanium.API.info(requestType + ':' + requestValue);
		if (requestType == 'userID'){
		xhr.send({'userID':requestValue});
		}else{
			xhr.send({'userInfo':requestValue});
		}
}

function getUserType(){
	var requestType = 'userID';
	sendRequest(requestType,Titanium.Facebook.uid);
}


function dataHandler(requestType,response){
	Titanium.API.info('dataHandler');
	if (requestType == 'userID' || requestType =='userInfo')
	{
		if (response == '0') feedbackObj = 0;
		else if(response == '1') feedbackObj = 1;
		else feedbackObj = 2;
	enterNextWindow(requestType,feedbackObj);
	}
	else if(requestType == 'Vendor'){
		Titanium.API.info(response);
		feedbackObj = parseVendorNames(response);
		isReady = true;
	}
}

function isDataReady(){
	return isReady;
}

function getFeedbackObj(){
	return feedbackObj;
}

function enterNextWindow(requestType,type){
	if(requestType == 'userID')
	{
		if (0 == type){
		//New users to register
			Titanium.API.info('new user');
			var RegisterWindow = require('ui/handheld/RegisterWindow');
			var registerWindow = new RegisterWindow();
		
			registerWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
			}
		//Soldiers need to choose attack style 
		else if(1 == type){
			Titanium.API.info('Soldier');
			var AttackStyleWindow = require('ui/handheld/AttackStyleWindow');
			var attackStyleWindow = new AttackStyleWindow();
		
			attackStyleWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
			}
		//Replicators dont need attack style
		else{	
			Titanium.API.info('Replicator');	
			var ControlPanelWindow = require('ui/handheld/ControlPanelWindow');
			var controlPanelWindow = new ControlPanelWindow();
			
			controlPanelWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
		}
	}else if(requestType == 'userInfo'){
		if (0 == type){
			alert('SORRY!!CHANGE YOUR EMAILL AND TRY AGAIN!!');
		}
		else if(1 == type){
			alert('IT\'S DONE!!WELCOME SOLDIER!!');
			var AttackStyleWindow = require('ui/handheld/AttackStyleWindow');
			var attackStyleWindow = new AttackStyleWindow();
		
			attackStyleWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
			}
		else{
			alert('IT\'S DONE!!WELCOME REPLICATOR!!');
			var ControlPanelWindow = require('ui/handheld/ControlPanelWindow');
			var controlPanelWindow = new ControlPanelWindow();
			
			controlPanelWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
		}
	}
}

function requestDataFromDB(dataType,dataValue){
	Titanium.API.info('requestDataFROMDB');
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function()
		{
			Ti.API.info('in utf-8 onload for GET');
			Ti.API.info('response:' + this.responseText);
			dataHandler(dataType,this.responseText);
		};
			xhr.onerror = function()
		{
			Ti.API.info('in utf-8 error for GET');
			//alert(e.toSource());
		};	
		xhr.open('POST',url_DB);
		Titanium.API.info(dataType + dataValue);
		if (dataType == 'Vendor'){
			xhr.send({'data':'Vendor'});
		}else{
			xhr.send({'weapon':dataValue});
		}
}

