var Todo = (function(){
	var call = function(){

		var removeNode = function(node){
			var index = ddList.indexOf(node);
			ddList.remove(index,1)
		};
		
		var getView = function(param){
		 
			var div = document.createElement( "div" ),
			contDiv = document.createElement( "div" ),
			selectDiv = document.createElement( "div" ),
			checkBox = document.createElement( "input" ),
			closeDiv = document.createElement( "div" );
	
			selectDiv.appendChild( checkBox );
			closeDiv.innerText = "x";
			contDiv.innerHTML = param;
	
			checkBox.setAttribute( "type", "checkbox" );
			checkBox.style.cursor = "pointer";
	
			closeDiv.style.float = "right";
			closeDiv.style.border = "1px solid white"
			closeDiv.style.width = "20px";
			closeDiv.style.height = "20px";
			closeDiv.style.textAlign = "center";
			closeDiv.style.borderRadius = "5px";
			closeDiv.style.color = "white";
			closeDiv.style.backgroundColor = "red"
			closeDiv.style.cursor = "pointer";
			selectDiv.style.margin = "10px";
			selectDiv.style.float = "left";
			contDiv.style.float = "left";
	
			div.appendChild( selectDiv );
			div.appendChild( contDiv );
			div.appendChild( closeDiv );
			div.style.border = "1px solid #c3afaf";
			div.style.padding = "10px";
			div.style.height = "50px";
			contDiv.style[ "font-size" ] = ( parseFloat( div.style.height ) * 6 ) / 10 + "px";
			contDiv.className = "textData";
	
			checkBox.onchange = function(ev){
				var node = ev.target,
				textNode = node.parentElement.parentElement.getElementsByClassName( "textData" )[0];
				if(node.checked){
					textNode.style.textDecoration = "line-through";
					textNode.style.color = "grey";
				} else {
					textNode.style.textDecoration = "none";
					textNode.style.color = "black";
				}
			}
			closeDiv.onclick = function(){removeNode( div )};    
			  return div;
	
		};

		var ddList = new DropDownList( [],"todo-list", getView );

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