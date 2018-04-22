/* $Id:$ */
(function(){
    'use strict'; //NO I18N
    
    var splitContainer = function( container, fragment ){
        var domArr = container.firstChild.children,
        panelContainer = getPanelContainer(),
        container1 = panelContainer.cloneNode( true ),
        container2 = panelContainer.cloneNode( true ),
        arrLength = domArr.length;
        
        for( var idx = 0; idx < arrLength; idx++ ){
            if( idx < 50 ){
                container1.firstChild.appendChild( domArr[0] );
            } else {
                container2.firstChild.appendChild( domArr[0] );
            }
        }
        fragment.insertBefore( container2, container.nextSibling );
        fragment.insertBefore( container1, container2 );
        fragment.removeChild( container );
    };
    
    var mergeContainers = function( container1, container2 ){
        var panelContainer = getPanelContainer(),
        firstContainerArr = container1.firstChild.children,
        secondContainerArr = container2.firstChild.children,
        totLen = firstContainerArr.length + secondContainerArr.length;
        
        for( var idx = 0; idx < totLen; idx++ ){
            if( firstContainerArr.length != 0 ){
                panelContainer.firstChild.appendChild( firstContainerArr[0] );
            } else {
                panelContainer.firstChild.appendChild( secondContainerArr[0] );
            }
        }
        
        panelContainer.length > 0 ? container1.parentElement.insertBefore( panelContainer, container1 ) : undefined;
        container1 ? container1.parentElement.removeChild( container1 ) : undefined;
        container2 ? container2.parentElement.removeChild( container2 ) : undefined;
        
        if( panelContainer.firstChild.childElementCount >= 100 ){
            splitContainer( panelContainer, panelContainer.parentElement );
        }
    };
    
    var getPanelDiv = function( length ){
        var div = document.createElement( 'div' ),
        innerDiv = document.createElement( 'div' );
        div.className = "panelElement";
        div.appendChild( innerDiv );
        
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
    
    var getPanelContainer = function(){
        var div = document.createElement( 'div' ),
        innerDiv = document.createElement( 'div' );
        div.className = "panelContainer";
        innerDiv.className = "hideableContainer";
        div.appendChild( innerDiv );
        return div;
    };
    
    var randomString = function(len) {
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789"; //No I18N
        var string_length = len || 12;
        var randomString = '';
        for (var i = 0; i < string_length; i++) {
            var randomNum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(randomNum, randomNum + 1);
        }
        return randomString;
    };
    
    var getDivHeight = function( div ){
        var divHeight = div.style.height;
        
        if( divHeight == "auto" ){
            return div.firstChild.clientHeight;
        } else {
            return divHeight;
        }
    };
 
    var getContainerElem = function( node ){
        //process until body only
        
        var nodeName =  node.nodeName.toLowerCase();
        if( nodeName == 'body' ){
            return false;
        }
        
        do{
            if( node.nodeName.toLowerCase() == 'body' ){
                return false;
            } else if( J( node ).hasClass( 'panelContainer' ) ){
                return node;
            }
            node = node.parentNode;
 
        }while( node );
        
    };
    
    var binarySearch = function( searchElement, searchArr ) {
        if( !searchArr || searchArr.length == 0 ){
            return -1;
        }
        var minIndex = 0;
        var maxIndex = searchArr.length - 1;
        var currentIndex;
        var currentElement;
        var leastIndex = 0;
     
        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = searchArr[ currentIndex ].offsetTop;
     
            if (currentElement < searchElement) {
                minIndex = currentIndex + 1;
                leastIndex = currentIndex;
            }
            else if (currentElement > searchElement) {
                maxIndex = currentIndex - 1;
            }
            else {
                return currentIndex;
            }
        }
     
        return leastIndex;
    };
    
    var setStyleForContainer = function( container ){
        
        if( container && container.className.indexOf('visiblePanelContainer') == -1 ){
            container.firstChild.style.display = 'block';
            var height = container.firstChild.clientHeight;
            container.style.height = height + 'px';
            container.firstChild.style.display = 'none';
            
        }
    }; 
    
    var mergeFragmentContainer = function( containerArr ){
        
        if( containerArr && containerArr.length ){
            var arrLength = containerArr.length;
            for( var idx = 0; idx < arrLength; idx++ ){
                var containerElem = containerArr.shift();
                
                if( containerElem.firstChild.childElementCount < 50 ){
                    if( containerElem.previousSibling ){
                        mergeContainers( containerElem.previousSibling, containerElem );
                        
                    } else if( containerElem.nextSibling ){
                        mergeContainers( containerElem, containerElem.nextSibling );
                        
                    }
                }
                
            }
        }
    };
    
 
    var CardListViewer = function( cont, containerId, callback ){
        this.scrollContainer = document.getElementById( containerId );
        this.getView = callback;
        this.content = [];
        this.currentScrollTop = 0;
        this.setIntervalId;
        this.chunkQueue = [];
        this.domArr = [];
        this.prevActive = [];
        this.curFilter;
        this.isScrolling;
        this.canRender = false;
        
        this.scrollContainer.style.overflow = 'scroll';
        
        this.scrollContainer.onscroll = function(){
            window.clearTimeout( this.isScrolling );
 
              //timeout to run after scrolling ends
            this.isScrolling = setTimeout(function() {
                                  this.scrollStop();
                            }.bind(this), 10);
            
        }.bind( this );
 
        cont.length ? this.insert( 0, cont ): undefined;
 
        //Object.defineProperties( this, {});
    };
 
    CardListViewer.prototype.scrollStop = function(){
        var scrollDiff = this.currentScrollTop - this.scrollContainer.scrollTop;
        if( scrollDiff > 10 || scrollDiff < -10 ){
            this.currentScrollTop = this.scrollContainer.scrollTop;
            this.startRendering( this.currentScrollTop );
        }
    };
    //specific for remove operation
    CardListViewer.prototype.splitAndPushChunk = function(dirtyContainers) {
        var parts = 10,
        newDirtyContainers = [];
        if (parts< dirtyContainers.length && dirtyContainers.length > 1 && dirtyContainers != null) {
            var len = dirtyContainers.length;
            for (var idx = 0; idx < len; idx++) {
                
                newDirtyContainers.push( dirtyContainers[ idx ] );
                
                if( newDirtyContainers.length > parts - 1 || ( idx == 0 && newDirtyContainers.length > 0 ) ){
                    this.chunkQueue.unshift({
                        'dirtyContainers'        : newDirtyContainers, //NO I18N
                        'type'        : 'merge' //NO I18N
                    });
                    newDirtyContainers = [];
                }
                
            }
 
        } else if( dirtyContainers != null ){
            this.chunkQueue.unshift({
                'dirtyContainers'        : dirtyContainers, //NO I18N
                'type'        : 'merge' //NO I18N
            });
        }
    };
    
    CardListViewer.prototype.render = function(){
        this.canRender = true;
        this.chunkParser();
    };
    
    CardListViewer.prototype.checkAndUpdate = function( index ){
        var status = this.curFilter( this.content[ index ] );
 
         if( status ){
             this.domArr[ index ].style.display = 'block';
         } else {
             this.domArr[ index ].style.display = 'none';
         }
    };
    
    CardListViewer.prototype.isVisibleDiv = function( div ){
        var offsetTop = div.offsetTop,
        clientHeight = div.firstChild.clientHeight,
        containerHt = this.scrollContainer.clientHeight,
        scrollBtm = this.currentScrollTop + containerHt;
        if( ( this.currentScrollTop < offsetTop + clientHeight && this.currentScrollTop > offsetTop ) || ( this.currentScrollTop < offsetTop && scrollBtm > offsetTop ) ){
            return true;
        } else {
            return false;
        }
        
    };
 
    CardListViewer.prototype.setFilter = function( checkFilter ){
        this.curFilter = checkFilter;
         for( var idx = 0; idx < this.content.length; idx++ ){
             this.checkAndUpdate( idx );
         }
    };
    
    CardListViewer.prototype.removeFilter = function(){
        this.curFilter = undefined;
         for( var idx = 0; idx < this.content.length; idx++ ){
             this.domArr[ idx ].style.display = 'block';
         }
    };
    
    CardListViewer.prototype.onRenderCallback = function( callback ){
        this.getView = callback;
    };
    CardListViewer.prototype.push = function( cont ){
        this.insert( this.content.length, [cont] );
    };
    CardListViewer.prototype.pop = function(){
        this.remove( this.content.length - 1, 1 );
    };
    CardListViewer.prototype.shift = function(){
        this.remove( 0, 1 );
    };
    CardListViewer.prototype.unshift = function( cont ){
        this.insert( 0, [cont] );
    };
    
    CardListViewer.prototype.concat = function( cont ){
        this.insert( this.content.length, cont );
    };
    
    CardListViewer.prototype.flush = function(){
        
        this.chunkQueue = [];
        this.prevActive = [];
        this.setIntervalId = undefined;
        this.currentScrollTop = 0;
        this.content = [];
        this.domArr = [];
        var allPanelContainers = document.getElementsByClassName( 'panelContainer' ), //NO I18N
        len = allPanelContainers.length;
        for( var idx = 0; idx < len; idx++ ){
            allPanelContainers[0].remove();
        }
    };
    
    CardListViewer.prototype.remove = function( rmvIdx, length ){
        var containerArr = this.scrollContainer.children,
        removedDomElems = this.domArr.slice( rmvIdx , rmvIdx + length ),
        dirtyContainers = [];
        
        
        this.content.splice( rmvIdx , length );
        this.domArr.splice( rmvIdx , length     );
        
        for( var idx = 0; idx < length; idx++ ){
            var removingElem = removedDomElems[ idx ],
            container = removingElem.parentElement.parentElement;
            
            if( container.firstChild.childElementCount < 50 ){
                if( dirtyContainers.indexOf( container ) == -1 ){
                    dirtyContainers.push( container );
                }
            }
            
            removingElem.parentElement.removeChild( removingElem );
        }
        
        this.splitAndPushChunk( dirtyContainers );
        
        if( this.canRender ){
            this.startRendering( this.currentScrollTop );
        }
 
        this.chunkParser();
    };
    
    CardListViewer.prototype.insert = function( insIdx, cont ){
        var content = cont.slice(), 
        insertAfterElem = insIdx != 0 ? this.domArr[ insIdx - 1 ] || this.scrollContainer.lastElementChild.firstChild.lastElementChild: undefined,
        insertBeforeContainer,
        appendableContainer = getPanelContainer(),
        contLength =  content.length,
        fragment = document.createDocumentFragment(),
        insertAtContainer = insertAfterElem && getContainerElem( insertAfterElem );
        
        if( insertAtContainer ){
            insertBeforeContainer = insertAtContainer.nextSibling;
            fragment.appendChild( insertAtContainer );
        }
        
        Array.prototype.splice.apply( this.content, [insIdx, 0].concat( content ));
        Array.prototype.splice.apply( this.domArr, [insIdx, 0].concat( getPanelDiv( contLength ) ));
        
        for( var idx = 0; idx < contLength; idx++ ){
            var  container, panelContainer;
            
            if( insertAfterElem  ){
                container = insertAfterElem.parentElement;
                container.insertBefore( this.domArr[ insIdx + idx ], insertAfterElem.nextSibling );
                if( container.childNodes.length >= 100 ){
                    splitContainer( container.parentElement, fragment);
                } 
                
            } else {
                 if( this.scrollContainer.childElementCount ){ //intentional insertion at 0th index
                    insertAtContainer = this.scrollContainer.firstChild;
                    insertBeforeContainer = insertAtContainer.nextSibling;
                    fragment.appendChild( insertAtContainer );
                    container = fragment.firstChild.firstChild;
                     container.prepend( this.domArr[ insIdx + idx ] );
                 } else {                                        //first time insertion at the main container
                    panelContainer = appendableContainer.cloneNode( true );
                    container = panelContainer.firstChild;
                    container.appendChild( this.domArr[ insIdx + idx ] );
                    fragment.appendChild( panelContainer );
                 }
            }
            
            this.chunkQueue.push({
                'dom'        : this.domArr[ insIdx + idx ], //NO I18N
                'data'         : this.content[ insIdx +  idx ], //NO I18N
                'type'        : 'insert' //NO I18N
            });
            
            insertAfterElem = this.domArr[ insIdx + idx ];
        }
 
        this.scrollContainer.insertBefore( fragment, insertBeforeContainer );
        
        this.chunkParser();
    };
    
    CardListViewer.prototype.chunkParser = function(){
        if( !this.canRender ){
            return;
        }
        
        if( !this.setIntervalId ){
            this.setIntervalId = setInterval( function(){
                var thershold = 5, prevContainer,
                curContainer, prevContainer,
                continerTrackArr = [],
                callRender = false;
                
                if( this.chunkQueue.length == 0 ){
                    clearInterval( this.setIntervalId );
                    this.setIntervalId = undefined;
                }
                var processedChunk = 0;
                for( var idx = 0; idx < thershold && this.chunkQueue[ idx ]; idx++ ){
                    var chunkDomElem = this.chunkQueue[ idx ].dom;
                    if( this.chunkQueue[ idx ].type == 'insert' && this.domArr.indexOf( chunkDomElem ) != -1 ){ //insert dom operation
                        
                        var height, 
                        panelElem = chunkDomElem,
                        cont = this.chunkQueue[ idx ].data,
                        viewElem = this.getView( cont );
                        curContainer = panelElem.parentElement.parentElement;
                        
                        !callRender && document.getElementsByClassName('visiblePanelContainer').length ? callRender = false : callRender = true; //NO I18N
                        
                        panelElem.innerHTML = '';
                        panelElem.appendChild( viewElem );
                        
                        if( this.curFilter && typeof this.curFilter === 'function' ){ //for applying filter for inserting container
                            var index = this.domArr.indexOf( panelElem );
                            this.checkAndUpdate( index );
                        }
                        
                        if( prevContainer != curContainer ){
                            setStyleForContainer( prevContainer ); // height & display none for prevContainer
                            prevContainer = curContainer;
                        }
                        
                    } /*else if( this.chunkQueue[ idx ].type == 'remove' ){ //remove dom operation
                        var chunkDomElem = this.chunkQueue[ idx ].dom,
                        removingElem =  chunkDomElem,
                        container = removingElem.parentElement.parentElement;
                        
                        container.firstChild.removeChild( removingElem );
                        
                        !callRender && container.className.indexOf('visiblePanelContainer') != -1 ? callRender = false : callRender = true;
                        
                        if( container.firstChild.childElementCount < 50 ){
                            if( continerTrackArr.indexOf( container ) == -1 ){
                                continerTrackArr.push( container );
                            }
                        }
                    }*/ else if( this.chunkQueue[ idx ].type == 'merge' ){
                        var dirtyContainers = this.chunkQueue[ idx ].dirtyContainers;
                        mergeFragmentContainer( dirtyContainers );//for removing chunk
                        !callRender && document.getElementsByClassName('visiblePanelContainer').length ? callRender = false : callRender = true; //NO I18N
                    }
                    
                    processedChunk++;
                }
                this.chunkQueue.splice( 0, processedChunk );
                
                setStyleForContainer( prevContainer );//for inserting chunk
//                mergeFragmentContainer( continerTrackArr );//for removing chunk
                
                if( callRender ){
                    this.startRendering( this.currentScrollTop );
                }
                
            }.bind( this ), 10 );
        }
        
    };
 
    CardListViewer.prototype.startRendering = function( param ){
        var scrollChildren = this.scrollContainer.children,
        topCussion, bottomCussion,
        startIndex, endIndex,
        containerHtBelowScrollTop,
        foundBottomCussion = false,
        index = binarySearch( param, scrollChildren );
        
        if( index == -1 ){
            return;
        }
        
        for( var idx = 0; idx < this.prevActive.length; idx++ ){
 
            if( this.isVisibleDiv( this.prevActive[ idx ] ) ){
                continue;
            }
            
            var updateHt = this.prevActive[ idx ].firstChild.clientHeight;
            this.prevActive[ idx ].style.height = updateHt + 'px';
            this.prevActive[ idx ].firstChild.style.display = 'none';
            this.prevActive[ idx ].classList.remove( "visiblePanelContainer" );
        }
        
        startIndex = index;
        endIndex = index;
        topCussion = param - scrollChildren[ index ].offsetTop; //length above the rendering area
        containerHtBelowScrollTop = parseInt( getDivHeight( scrollChildren[ endIndex ] ) ) - topCussion; 
        
        if( topCussion < 500 && index > 0 ){ //top cussion Index
            startIndex -= 1;
        }
        
        do{ //bottom cussion Index
            bottomCussion = containerHtBelowScrollTop - this.scrollContainer.offsetHeight; //length below the rendering area
            
            if( bottomCussion < 500 && endIndex < scrollChildren.length - 1 ){
                 endIndex += 1;
                 containerHtBelowScrollTop = scrollChildren[ endIndex ].offsetTop - param;
            } else {
                foundBottomCussion = true;
            }
            
        } while( !foundBottomCussion );
        
        this.prevActive = [];
        for( var idx = startIndex; idx <= endIndex; idx++ ){
            
            scrollChildren[ idx ].firstChild.style.display = 'block';
            scrollChildren[ idx ].style.height = "auto";
            scrollChildren[ idx ].className += scrollChildren[ idx ].className.indexOf( 'visiblePanelContainer' ) == -1 ? " visiblePanelContainer" : ""; //NO I18N
            this.prevActive.push( scrollChildren[ idx ] );
        }
        
    };
 
    window.CardListViewer = CardListViewer;
})();