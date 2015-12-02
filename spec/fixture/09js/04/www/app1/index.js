(function(){
	function publicMethod(m){
		console.log("m", m);
	}
	return {
		method: publicMethod
	};
}());