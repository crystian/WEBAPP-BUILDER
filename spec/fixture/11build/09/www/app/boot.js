/**
 * Created by Crystian on 3/14/2015.
 */

var appInit = function () {
    var elApp = document.getElementById('app');

    if(elApp && angular){
        angular.element(elApp).ready(function() {
            loader.hide();
            angular.bootstrap(elApp, ['app']);
        });

    }
};

document.addEventListener('loaderFinished', appInit);