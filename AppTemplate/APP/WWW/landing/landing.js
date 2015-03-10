/**
 * Created by Crystian on 2/22/2015.
 */

document.addEventListener('loaderFinished', function () {
	var test = document.getElementById('text');
	test.innerHTML = 'This is a test injected with javascript';
	loader.hide();
});