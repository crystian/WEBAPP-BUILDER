(function(){
function methodReplaced(m){
		console.log("m", m);
	}
	return {
		method: methodReplaced
	};
}());