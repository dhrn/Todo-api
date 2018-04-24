function Utils() {
};

Utils.clone = function(obj) {
	return JSON.parse(JSON.stringify(obj));
};

Utils.randomNumber = function( val ){
	var len = 8;
	if( val && typeof val === "number" ){
		len = Math.abs( val );
		len = len == 0 ? 1: ( len > 21 ? 21 : len );//limit of the length is 21 
	} 
	return parseInt( Math.random() * ( Math.pow( 10, len ) ) );
};