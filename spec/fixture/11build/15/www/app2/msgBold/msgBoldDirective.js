/**
 * Created by Crystian on 3/14/2015.
 */

app.directive('msgBoldDirective', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		templateUrl: '../app2/msgBold/msgBoldDirective.tpl.html',
		link: function (scope, element) {
			scope.model = {result:'Really!!'};
		}
	};
});
