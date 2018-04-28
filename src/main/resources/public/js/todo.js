var Todo = (function(){
	var call = function(){

		var cardView = new CardListViewer( [],"todo-list", function(param){ 
		  var div = document.createElement( "div" );
		  div.innerHTML = param;
		  div.style.border = "1px solid #c3afaf";
		  div.style.padding = "10px";
		  div.style.height = "50px";
		  div.style[ "font-size" ] = ( parseFloat( div.style.height ) * 6 ) / 10 + "px";    
		  return div;
		} );

		cardView.render();

		var callback = function( value , onSucess ){
		  //onsucess
		  cardView.unshift(value);
		  onSucess();
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