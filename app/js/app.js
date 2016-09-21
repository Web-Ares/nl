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

        $( '.services__form' ).each( function() {
            new Contact( $( this ) );
        } );

        $.each( $('.upload-file'), function (i) {

            new UploadFile( $(this), i );

        } );

        $('.contact-scroll').on( {
            'click': function (event) {
                event.preventDefault();

                var id  = $(this).attr('href'),

                    top = $(id).offset().top;

                $('body,html').animate({scrollTop: top}, 500);
            }
        } );

        $(document).on( 'mailsent.wpcf7', function()  {

            $( '.apply, .contact__form' ).each( function() {
                var curElem = $( this );

                if( curElem.attr( 'id' ) == $( 'body' ).attr( 'data-form' ) ) {

                    if ( curElem.hasClass( 'contact__form' ) ) {
                        curElem.parents( '.contact' ).find( '.contact__thank-you' ).addClass( 'active' );
                    } else {
                        curElem.addClass( 'thank-you' );
                    }

                }
            } );

        });

    });

    var Contact = function(obj) {

        //private properties
        var _obj = obj,
            _path = _obj.data( 'path' ),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function() {

                _obj.on( {
                    'submit': function() {

                        _ajaxRequest( $( this ) );

                        return false;
                    }
                } );
            },
            _ajaxRequest = function( elem ) {

                _request.abort();
                _request = $.ajax({
                    url: _path,
                    data: elem.serialize(),
                    dataType: 'html',
                    timeout: 20000,
                    type: "get",
                    success: function () {
                        elem.trigger( 'reset' );
                        alert('Form sended');
                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != "abort" ) {
                            alert( 'Error!' );
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

    var UploadFile = function ( obj, num ) {

        //private properties
        var _self = this,
            _obj = obj,
            _inputFile = obj.find( 'input[type=file]' ),
            _inputText = obj.find( '.upload-file__path' );

        //private methods
        var _onEvents = function () {

                _inputFile.on( {
                    'change': function() {

                        _inputText.text( $( this ).val() );

                    }
                } );

            },
            _init = function () {

                _obj.attr( 'for', 'upload-file' + num );
                _inputFile.attr( 'id', 'upload-file' + num );

                obj[0].obj = self;
                _onEvents();

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