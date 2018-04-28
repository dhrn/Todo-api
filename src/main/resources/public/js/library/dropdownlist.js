(function(){
	'use strict';
	
	var getPanelDiv = function( length ){
        var div = document.createElement( 'div' );
        div.className = "dd-panelElement";
        
        if( length ){
            var arr = [];
            
            for( var idx = 0; idx < length; idx++ ){
                arr.push( div.cloneNode( true ) );
            }
            return arr;
            
        } else {
            return div;
        }
        
    };
	
	var DropDownList = function( cont, containerId, callback ){
		this.content = [];
		this.domArr = [];
		this.container = document.getElementById( containerId );
		this.execute = callback;
		this.height = this.container.clientHeight,
		this.width = this.container.clientWidth;
		this.canRender = false;
		this.renderQueue = [];
		
		//setDefaultStyles for provided container
		this.container.style.height = "auto";
		this.container.innerHTML = "";
		
		cont.length ? this.insert( 0, cont ): undefined;
	};
	
	DropDownList.prototype.push = function( cont ){
        this.insert( this.content.length, [cont] );
    };
    DropDownList.prototype.pop = function(){
        this.remove( this.content.length - 1, 1 );
    };
    DropDownList.prototype.shift = function(){
        this.remove( 0, 1 );
    };
    DropDownList.prototype.unshift = function( cont ){
        this.insert( 0, [cont] );
    };
    DropDownList.prototype.concat = function( cont ){
        this.insert( this.content.length, cont );
    };
	
	DropDownList.prototype.remove = function( index, length ){
		var removeDomElems = this.domArr.slice( index , index + length );
		this.content.splice( index , length );
        this.domArr.splice( index , length );
        
        for( var idx = 0; idx < length; idx++ ){
        	var removingElem = removeDomElems[ idx ];
        	this.container.removeChild( removingElem );
        }
        
	};
	
	DropDownList.prototype.insert = function( index, cont ){
		var content = cont.slice(),
		contLength =  content.length,
		insertAfterElem = index != 0 ? this.domArr[ index - 1 ] || this.container.lastElementChild : undefined;
		
		Array.prototype.splice.apply( this.content, [index, 0].concat( content ));
		Array.prototype.splice.apply( this.domArr, [index, 0].concat( getPanelDiv( contLength ) ));
		
		for( var idx = 0; idx < contLength; idx++ ){
			if( insertAfterElem ){
				this.container.insertBefore( this.domArr[ index + idx ], insertAfterElem.nextSibling );
			} else {
				this.container.prepend( this.domArr[ index + idx ] );
			}
			this.renderQueue.push({
				'dom'        : this.domArr[ index + idx ],
                'data'         : this.content[ index +  idx ]   
			})
		}
		this.doRender();
		
	};
	
	DropDownList.prototype.render = function(){
		this.canRender = true;
		this.doRender();
	};
	
	DropDownList.prototype.doRender = function(){
		if( !this.canRender ){
			return;
		}
		
		var length = this.renderQueue.length;
		for( var idx = 0; idx < length; idx++ ){
			var renderElem = this.renderQueue.shift(),
			view = this.execute( renderElem.data ),
			panelElem = renderElem.dom;
			panelElem.appendChild( view );
		}
	};
	
	DropDownList.prototype.show = function(){
		this.container.style.display = "block";
	};
	
	DropDownList.prototype.hide = function(){
		this.container.style.display = "none";
	};
	
	window.DropDownList = DropDownList;
})();