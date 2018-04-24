(function(){
	'use strict';
/*
 * * console caller
 * 	var z = document.createElement('div');
 *	z.setAttribute('id',"test");
 *	z.style.height = "20px";
 *	z.style.width = "300px";
 *	$0.appendChild( z );
 *	var x = new SearchBar("test",function(){console.log("sucess")});
 *	x.render()
 * */
	var getDefaultProperties = function(){
		return {
			"isElasticSearch" 	: false,
			"label"		: "Search",
			"imgLabel"	: "",
			"placeHolder"		: "",
			"optionLimit"		: 5,
			"searchBarRatio"	: [4,1]
		};
	};
	
	var getRatioInPercentage = function( ratioArr ){
		var total = ratioArr[ 0 ] + ratioArr[ 1 ];
		return [ (ratioArr[ 0 ]/total)*100, (ratioArr[ 1 ]/total)*100 ];
	};
	
	var getCalculatedPadding = function( ht ){
		return ( ht / 10 ) + "px"; //derivation=>(ht*10)/100=> 10% of ht
	};
	
	var getCalculatedFontSize = function( ht ){
		return ( ht * 6 ) / 10  + "px"; //derivation=>(ht*60)/100=> 60% of ht
	};
	
	var SearchBar = function( searchContainer, callback ){
		this.properties = {};
		this.container = document.getElementById( searchContainer );
		this.execute = callback;
		this.height = this.container.clientHeight,
		this.width = this.container.clientWidth;
		this.canRender = false;
		
		this.input = document.createElement('input');
		this.button = document.createElement('button');
		this.inputDiv = document.createElement( 'div' );
		this.buttonDiv = document.createElement( 'div' );
		
		this.properties = getDefaultProperties();
		//return this.properties;
	};

	SearchBar.prototype.setProperties = function( properties ){
		this.properties = properties;
		if( this.canRender == true ){
			this.render();
		}
	};

	SearchBar.prototype.getProperties = function(){
		return this.properties;
	};
	
	SearchBar.prototype.setStyleForInputDiv = function(){
//		node.setAttribute( 'contenteditable', true );
//		node.className += "single-line";
//		node.style.outline = "none";
		this.inputDiv.style.height = "inherit";
		this.inputDiv.style.width = this.properties.searchBarRatio[ 0 ] + "%";
		this.inputDiv.style.float = "left";
		this.input.style.height = "100%";
		this.input.style.width = "100%";
		this.input.style.outline = "none";
		this.input.style[ "box-sizing" ] = "border-box";
		this.input.style.padding = getCalculatedPadding( this.height );
		this.input.style.fontSize = getCalculatedFontSize( this.height );
		this.inputDiv.appendChild( this.input );
	};
	
	SearchBar.prototype.setStyleForButtonDiv = function( node ){
		this.buttonDiv.style.height = "inherit";
		this.buttonDiv.style.width = this.properties.searchBarRatio[ 1 ] + "%";
		this.buttonDiv.style.float = "left";
		this.button.style.width = "100%";
		this.button.style.height = "inherit";
		this.button.onclick = this.execute;
		if( !this.properties.imgLabel ){
			this.button.innerText = this.properties.label;
			this.button.style.fontSize = getCalculatedFontSize( this.height );
		} else {
			//TODO:: image for button
		}
		this.buttonDiv.appendChild( this.button );
	};

	SearchBar.prototype.setSearchDomInContainer = function(){
		this.properties.searchBarRatio = getRatioInPercentage( this.properties.searchBarRatio );
		
		this.setStyleForInputDiv();
		this.setStyleForButtonDiv();
		this.container.appendChild( this.inputDiv );
		this.container.appendChild( this.buttonDiv );
	};

	SearchBar.prototype.render = function(){
		this.canRender = true;
		this.setSearchDomInContainer();

		if( this.properties.isElasticSearch == "true" ){
			//keyEventBinder && enter/onclick
		} else {
			// enter/onclick
		}
		
	};

	SearchBar.prototype.startSearching = function(){

	};

	window.SearchBar = SearchBar;
})();