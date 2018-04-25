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
	var getDefaultProperties = function( callback ){
		return {
			"isElasticSearch" 	: false,
			"onRenderCallback"	: callback,
			"onSucessClear"		: false,
			"label"				: "Search",
			"isImgLabel"		: false,
			"placeHolder"		: "",
			"optionLimit"		: 5,
			"searchBarRatio"	: [4,1],
			"button-CSS"		: Utils.clone( styleSheet ),
			"inputField-CSS"	: Utils.clone( styleSheet )
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
		this.id = "c-input-field-" + Utils.randomNumber(5);
		
		this.input = document.createElement('input');
		this.input.setAttribute( "id", this.id );
		this.button = document.createElement('button');
		this.inputDiv = document.createElement( 'div' );
		this.buttonDiv = document.createElement( 'div' );
		
		this.properties = getDefaultProperties( callback );
		
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
		
		if( typeof this.properties.onRenderCallback === "function" ){
			this.button.onclick = function(){
				this.properties.onRenderCallback( this.input.value, function(){ //onsucess callback
					if( this.properties.onSucessClear ){
						this.input.value = "";
					}
				 }.bind(this) );
			}.bind(this)
		}
		if( !this.properties.isImgLabel ){
			this.button.innerText = this.properties.label;
			this.button.style.fontSize = getCalculatedFontSize( this.height );
		} else {
			//TODO:: image for button
		}
		this.buttonDiv.appendChild( this.button );
	};
	
	SearchBar.prototype.setCSSForButtonAndInputDiv = function(){
		var buttonCSS = this.properties[ "button-CSS" ];
		var inputFieldCSS = this.properties[ "inputField-CSS" ];
		
		if( this.properties.isImgLabel ){
			this.button.remove()
			this.button = document.createElement( "img" );
		} else {
			this.button.remove()
			this.button = document.createElement( "button" );
		}
		
		for( var key in buttonCSS ){
			try{
				if( key == "src" && buttonCSS[ key ] != "" ){
					this.button.setAttribute( key, buttonCSS[ key ]);
				} else {
					this.button.style[ key ] = buttonCSS[ key ];
				}
				
			} catch(e){
				//exception
				//console.log("button-css-EXception", key,":::::::", e);
			}
		}
		for( var key in inputFieldCSS ){
			try{
				if( key == "src" && inputFieldCSS[ key ] != "" ){
					this.input.setAttribute( key, inputFieldCSS[ key ]);
				} else {
					this.input.style[ key ] = inputFieldCSS[ key ];
				}
				
			} catch(e){
				//exception
				//console.log("input-field-css-EXception", key ,":::::::", e);
			}
		}
	};

	SearchBar.prototype.setDomInContainer = function(){
		this.properties.searchBarRatio = getRatioInPercentage( this.properties.searchBarRatio );
		this.setCSSForButtonAndInputDiv();
		this.setStyleForInputDiv();
		this.setStyleForButtonDiv();
		this.container.appendChild( this.inputDiv );
		this.container.appendChild( this.buttonDiv );
	};

	SearchBar.prototype.render = function(){
		this.canRender = true;
		this.setDomInContainer();
		
		if( this.properties.isElasticSearch == true ){
			//keyEventBinder && enter
			this.input.onkeypress = function(ev) {
				if( typeof this.properties.onRenderCallback === "function" ){
					this.properties.onRenderCallback( this.input.value, function(){ //onsucess callback
						if( this.properties.onSucessClear ){
							this.input.value = "";
						}
				 	}.bind(this) );
				}
			}.bind( this );
		} else {
			// enter
			this.input.onkeypress = function(ev) {
				if(ev.key == "Enter"){
					if( typeof this.properties.onRenderCallback === "function" ){
						this.properties.onRenderCallback( this.input.value, function(){ //onsucess callback
							if( this.properties.onSucessClear ){
								this.input.value = "";
							}
				 		}.bind(this) );
					}
				}
			}.bind( this );
		}
		
	};
	
	window.SearchBar = SearchBar;
})();