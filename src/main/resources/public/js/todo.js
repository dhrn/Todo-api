var Todo = (function(){
	var call = function(){

		var removeNode = function(node){
			var index = ddList.indexOf(node);
			ddList.remove(index,1)
		};

		var ddList = new DropDownList( [],"todo-list", function( param ){ 
			var div = document.createElement( "div" ),
			contDiv = document.createElement( "div" ),
			closeDiv = document.createElement( "div" );
	
			closeDiv.innerText = "x";
			contDiv.innerHTML = param;
	
			closeDiv.style.float = "right";
			closeDiv.style.border = "1px solid white"
			closeDiv.style.width = "20px";
			closeDiv.style.height = "20px";
			closeDiv.style.textAlign = "center";
			closeDiv.style.borderRadius = "5px";
			closeDiv.style.color = "white";
			closeDiv.style.backgroundColor = "red"
			contDiv.style.float = "left";
	
			div.appendChild( contDiv );
			div.appendChild( closeDiv );
			div.style.border = "1px solid #c3afaf";
			div.style.padding = "10px";
			div.style.height = "50px";
			contDiv.style[ "font-size" ] = ( parseFloat( div.style.height ) * 6 ) / 10 + "px";
			closeDiv.onclick = function(){removeNode( div )};    
			  return div;
		} );

		ddList.render();

		var callback = function( value , onSucess ){
		  //onsucess
		  if( value ){
		  	ddList.unshift(value);	
		  	onSucess();
		  }
		};

		var todoComboBox = new SearchBar("list-input",callback );
		todoComboBox.render()

		var prop = todoComboBox.getProperties();
		prop.label = "Todo";
		prop.onSucessClear = true;
		todoComboBox.setProperties(prop);
		

	};
	return {
		call : call	
	};
}());