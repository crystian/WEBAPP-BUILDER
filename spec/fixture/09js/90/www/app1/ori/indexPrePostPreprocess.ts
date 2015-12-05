(function(){
function publicMethod(m){
		console.log("m", 'publicMethod' +m);
	}
	return {
		method: publicMethod
	};
}());