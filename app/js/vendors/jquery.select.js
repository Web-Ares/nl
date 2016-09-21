$(function(){
    $( 'select' ).each( function(){
        new AresSelect( {
            obj: $( this ),
            optionType: 1,
            showType: 2
        } );
    } );
} );

var AresSelect = function( params ){
    this.obj = params.obj;
    this.curParent = this.obj.parents('.search__filter > div');
    this.optionType = params.optionType || 0;
    this.showType = params.showType || 1;
    this.visible = params.visible || 8;

    this.init();
};
AresSelect.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            build: function(){
                self.core.start();
                self.core.controls();
            },
            start: function(){
                self.device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                self.text = $( '<span class="ares-select__item"></span>' );
                self.wrap = $( '<div class="ares-select"></div>' );
                self.window = $( window );
                self.opened = false;

                self.core.addWraper();
                if( !self.optionType || self.device ){
                    self.core.setMobileView();
                } else if( self.optionType == 1 ){
                    self.core.setCustom1();
                }

                self.obj[ 0 ].customSelect = this;
            },
            setMobileView: function(){
                self.wrap.addClass( 'ares-select_mobile' );
            },
            setCustom1: function(){
                self.wrap.addClass( 'ares-select_custom' );
            },
            destroy: function(){
                self.text.remove();
                self.wrap.unwrap();
            },
            addWraper: function(){
                var curText = '';

                self.obj.css( {
                    opacity: 0
                } );

                self.obj.wrap( self.wrap );
                self.wrap = self.obj.parent();
                self.wrap.addClass( self.obj.attr( 'class' ) );
                self.obj.before( self.text );
                self.obj.find( 'option' ).each( function(){
                    var curItem = $( this );

                    if( curItem.attr( 'selected' ) == 'selected' ){
                        curText = curItem.text();
                    }
                } );

                if( curText == '' ){
                    curText =  self.obj.find( 'option').eq( 0 ).text();
                }
                self.text.text( curText );
            },
            showPopup: function(){
                var list = $( '<ul></ul>'),
                    curScroll = self.window.scrollTop(),
                    offset = self.wrap.offset(),
                    maxHeight = 0,
                    curIndex = self.obj.find( 'option:selected' ).index();
                self.id = Math.round( Math.random() * 1000 );

                if( self.opened ){
                    self.popup.remove();
                }
                self.opened = true;

                self.popup = $( '<div class="ares-select__popup" id="ares-select__popup' + self.id + '"></div>' );

                self.popupInner = $( '<div class="ares-select__popup-inner""></div>' );

                self.obj.find( 'option' ).each( function(i){
                    var curItem = $( this );

                    if (curItem.attr('data-href')) {
                        if( i == curIndex ){
                            list.append( '<li class="active"><a href="' + curItem.attr('data-href') + '">' + curItem.text() + '</a></li>' );
                        } else {
                            list.append( '<li><a href="' + curItem.attr('data-href') + '">' + curItem.text() + '</a></li>' );
                        }
                    } else {
                        if( i == curIndex ){
                            list.append( '<li class="active">' + curItem.text() + '</li>' );
                        } else {
                            list.append( '<li>' + curItem.text() + '</li>' );
                        }
                    }

                } );

                self.popupInner.append( list );
                self.popup.append( self.popupInner );
                self.wrap.append( self.popup );

                if ( self.popup.parents( '.ares-select__parent' ).length ){
                    self.popup.css( {
                        width: self.popup.parents( '.ares-select__parent' ).outerWidth() - 6,
                        left: 0,
                        top: self.wrap.outerHeight()
                    } );
                } else {
                    self.popup.css( {
                        width: self.wrap.outerWidth(),
                        left: 0,
                        top: self.wrap.outerHeight()
                    } );
                }

                maxHeight = self.popupInner.outerHeight();

                if( maxHeight > self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible ){
                    self.popupInner.outerHeight(self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible);
                    $('#ares-select__popup' + self.id + ' .ares-select__popup-inner').niceScroll({
                        cursorcolor:"#323232",
                        cursoropacitymin: "1",
                        cursorborderradius: "0",
                        cursorborder: "none",
                        cursorwidth: "5px",
                        //railoffset: {left:15},
                        enablemousewheel: true
                    });
                }

                if( self.showType == 1 ){
                    self.popup.css( {
                        display: 'none'
                    } );
                    self.popup.slideDown( 300, function(){
                        if( self.scroll ) {
                            self.popup.getNiceScroll().resize();
                        }
                    } );
                } else if( self.showType == 2 ) {
                    self.popup.css( {
                        opacity: 1
                    } );
                    self.popup.animate( { opacity: 1 },300, function(){
                        if( self.scroll ) {
                            self.popup.getNiceScroll().resize();
                        }
                    } );
                }

                self.popup.find( 'li' ).on( {
                    'click': function( event ){
                        var event = event || window.event,
                            index = $( this ).index();

                        if (event.stopPropagation) {
                            event.stopPropagation()
                        } else {
                            event.cancelBubble = true
                        }

                        self.obj.val( self.obj.find( 'option' ).eq( index).attr( 'value' ) );
                        self.obj.trigger( 'change' );
                        self.core.hidePopup();
                        self.wrap.removeClass('active');

                    }
                } );
                self.curParent.addClass('active');

            },
            hidePopup: function(){
                self.opened = false;
                if( !self.showType ){
                    self.popup.css( {
                        display: 'none'
                    } );
                } else if( self.showType == 1 ){
                    self.popup.stop( true, false ).slideUp( 300, function(){
                        self.popup.remove();
                    } );
                } else if( self.showType == 2 ) {
                    self.popup.stop( true, false ).fadeOut( 100, function(){
                        self.popup.remove();
                    } );
                }
                self.curParent.removeClass('active');
            },
            controls: function() {
                self.obj.on( 'change', function() {
                    self.text.text( $( this ).find( 'option:selected' ).text() );
                } );

                if( self.optionType == 1 && !self.device ){
                    self.wrap.on( {
                        'click': function(event){
                            var event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation()
                            } else {
                                event.cancelBubble = true
                            }

                            if( self.opened ) {

                                self.wrap.removeClass('active');
                                self.core.hidePopup();

                            } else {

                                $( 'body').trigger('click');

                                setTimeout(function(){
                                    self.wrap.addClass('active');
                                    self.core.showPopup();
                                },10);

                            }

                        }
                    } );
                    $( 'body' ).on( {
                        'click': function(){
                            if( self.opened ){
                                self.wrap.removeClass('active');
                                self.core.hidePopup();
                            }
                        }
                    } );
                }
            }
        };
    }
};