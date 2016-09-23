$(function(){
    'use strict';

    $(function(){

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.main-slider').each( function() {
            new MainSlider( $(this) );
        } );

        $( '.shop-post' ).each( function() {
            new ShopPost( $( this ) );
        } );

        $( '.site__header-search' ).each( function() {
            new SearchShow( $( this ) );
        } );

    });

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

    var ShopPost = function(obj) {

        //private properties
        var _obj = obj,
            _window = $(window),
            _swSlider = null,
            _slider = _obj.find( '.swiper-container' ),
            _duration = _obj.data('duration'),
            _perView = 1,
            _next = _obj.find( '.swiper-button-next' ),
            _prev = _obj.find( '.swiper-button-prev' );

        //private methods
        var _addEvents = function() {

                _window.on({
                    'resize': function() {
                        _changePerViewSlider();
                        _setPerview();
                    }
                });

            },
            _addSlider = function() {

                _changePerViewSlider();

                _swSlider = new Swiper( _slider, {
                    nextButton: _next,
                    prevButton: _prev,
                    speed: 800,
                    autoplay: _duration,
                    slidesPerView: _perView,
                    paginationClickable: true
                });

                _setPerview();

            },
            _changePerViewSlider = function() {

                if ( _window.width() < 640 ) {
                    _perView = 1;
                } else if ( _window.width() < 1200 ) {
                    _perView = 2;
                } else {
                    _perView = 3;
                }

            },
            _setPerview = function() {

                _swSlider.params.slidesPerView = _perView;

            },
            _init = function() {
                _addEvents();
                _addSlider();
            };

        //public properties

        //public methods

        _init();
    };

});