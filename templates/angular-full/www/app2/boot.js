/**
 * Created by Crystian on 3/14/2015.
 */

var appInit = function(){
	var elApp = document.getElementById('app2');

	if(elApp && angular){
		angular.element(elApp).ready(function(){
			//TODO BUG ON THIS FUNCION, IF IT FAIL, DOESN'T SHOW THE MESSAGE
			loader.hide();
			angular.bootstrap(elApp, ['app']);
		});

	}
};