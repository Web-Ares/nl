$(function(){
    'use strict';

    $(function(){

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.main-slider').each( function() {
            new MainSlider( $(this) );
        } );

        $( '.main-slider__item' ).each( function() {
            new NiceScroll( $( this ) );
        } );

        $( '.tabs' ).each( function() {
            new Tabs( $( this ) );
        } );

        $( '.site__header-search' ).each( function() {
            new SearchShow( $( this ) );
        } );

    });

    var SearchShow = function (obj) {

        var _obj = obj,
            _input = _obj.find('input');

        var _addEvents = function () {

                _obj.on({
                    'click': function(event){

                        if ( !_obj.hasClass( 'open' ) ) {
                            _obj.addClass( 'open' );
                            _input.focus();
                            event = event || window.event;
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else {
                                event.cancelBubble = true;
                            }
                        }
                    }
                });

                $( '.site' ).on({
                    'click': function(){
                        _obj.removeClass( 'open' );
                    }
                });

                _input.on({
                    'click': function(event){
                        event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });
            },

            _init = function () {
                _addEvents();
            };

        _init();
    };

    var MainSlider = function(obj) {

        //private properties
        var _obj = obj,
            _window = $(window),
            _mainSlider = null,
            _slider = _obj.find( '.swiper-container' ),
            _sliderLength = _slider.find( '.swiper-slide' ).length,
            _duration = _obj.data('duration'),
            _pagination = _obj.find( '.swiper-pagination' );

        //private methods
        var _addEvents = function() {

                _window.on({
                    'resize': function() {
                        _sliderHeight();
                    }
                });

            },
            _addMainSlider = function() {

                if ( _sliderLength > 1 ) {
                    _mainSlider = new Swiper( _slider, {
                        pagination: _pagination,
                        loop: true,
                        effect: "fade",
                        speed: 1000,
                        autoplay: _duration,
                        paginationClickable: true
                    });
                } else {
                    _pagination.css( { 'display': 'none' } );
                }
            },
            _sliderHeight = function() {

                if ( _window.width() < 800 ) {
                    _slider.css( { height: _slider.outerHeight() } );
                }
            },
            _init = function() {
                _addEvents();
                _sliderHeight();
                _addMainSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'active' ) ) {
                            _obj.addClass( 'active' );
                        } else {
                            _obj.removeClass( 'active' );
                        }
                    }
                });

            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var NiceScroll = function(obj) {

        //private properties
        var _obj = obj;

        //private methods
        var _addEvents = function() {

                $( window ).on( {
                    'resize': function() {

                        _obj.getNiceScroll().resize();
                    }
                } );

            },
            _addScroll = function() {
                _obj.niceScroll( {
                    cursorcolor:"#eeeeee",
                    railalign: 'right',
                    cursorwidth: 4,
                    cursorborder: 0,
                    cursorborderradius: 0,
                    autohidemode: false,
                    railpadding: { top: 0, right: 0, left: 0, bottom: 0 }
                } );
            },
            _init = function () {
                _addEvents();
                _addScroll();
            };

        //public properties

        //public methods

        _init();
    };

    var Tabs = function( obj ) {

        //private properties
        var _obj = obj,
            _tabCaption = _obj.find( '.tabs__caption' ),
            _tabContent = _obj.find( '.tabs__content' );

        //private methods
        var _addEvents = function() {

                _tabCaption.on( {
                    'click': function() {
                        var curItem = $( this ),
                            curContent = _tabContent.eq( curItem.index() );

                        if( !( curItem.hasClass( 'active' ) ) ) {
                            _tabCaption.removeClass( 'active' );
                            _tabContent.css( {
                                'display': 'none'
                            } );
                            curItem.addClass( 'active' );
                            curContent.css( {
                                'display': 'block'
                            } );
                        }

                        return false;
                    }
                } );

            },
            _startView = function() {
                _tabCaption.eq( 0 ).addClass( 'active' );
                _tabContent.eq( 0 ).css( {
                    'display': 'block'
                } );
            },
            _init = function() {
                _startView();
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

});