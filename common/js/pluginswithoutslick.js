
(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
        $html = $('html'),
        $header = $('#header'),
        $container = $('#container'),
        debounce = null;

        //device check
        function screen(){
            /*var windowWidth = $window.outerWidth(); 스크롤바 width 적용 안됨 */

            function windowSizes(){
                var w = window,
                    i = 'inner';
                if (!('innerWidth' in window)) {
                    i = 'client';
                    w = document.documentElement || document.body;
                }
                return {
                    width: w[i + 'Width']
                };
            }

            if($window.width() > 1000){
                window.mode = 'pc';
            } else {
                window.mode = 'mobile';
            }
        }
        screen();

        //lnb
        var $lnb = $header.find('.lnb'),
            $lnbShow = $lnb.find('.menu_show'),
            $lnbHide = $lnb.find('.menu_hide'),
            $lnbDepthItem = $lnb.find('.depth_item'),
            $lnbMenu = $lnb.find('.menu'),
            $lnbDepth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
            lnbHeight;

        //$lnb.addClass('length' + $lnb.find('.depth1_item').length);

        function refreshlnbHeight() {
            $html.removeClass('lnb_show lnb_open');
            lnbHeight = $lnbMenu.css('transition-property', 'none').removeClass('init').outerHeight() || '';
            $lnbMenu.css('transition-property', '').addClass('init').height('');
        }
        refreshlnbHeight();

        $window.on('resize', function () {
            clearTimeout(debounce);
            debounce = setTimeout(function (){
                screen();
            }, 100);

            refreshlnbHeight();
        });

        $lnbShow.on('click', function(event) {
            $html.addClass('lnb_show');

            if(mode === 'mobile') {
                //2단메뉴일때 1차메뉴에 active가 없을때
                if($lnbMenu.hasClass('multiple') && $lnb.find('.depth1_item').hasClass('active') === false){
                    $lnb.find('.depth1_item:first-child').addClass('active');
                }
            }
        });

        $lnbHide.on('click', function(event) {
            $html.removeClass('lnb_show');
        });

        $lnbDepthItem.on('mouseover focusin', function(event) { //mouseover
            if(mode === 'pc') {
                var $this = $(this),
                    $depth1Itme = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');

                    //$lnbMenu.height('');

                if($lnbMenu.hasClass('pulldown')) {
                    var maxHeight = 0;

                    $lnbDepth2FirstChild.each(function(index, element) {
                        var $element = $(element),
                            outerHeight = $element.outerHeight() || 0;

                        //기존 값 보다 얻은 값이 초과일 때
                        if(outerHeight > maxHeight) {
                            maxHeight = outerHeight;
                        }
                    });

                    $lnbMenu.height(lnbHeight + maxHeight);

                }else if($lnbMenu.hasClass('eachdown')) {
                    $lnbMenu.height(lnbHeight + ($depth1Itme.find('.depth2 > :first-child').outerHeight() || ''));
                }

                $html.addClass('lnb_open');
                $lnbDepthItem.removeClass('active');
                $this.addClass('active').parents('li').addClass('active');
            }

            event.stopPropagation();

        }).on('click', function(event) {
            if(mode === 'mobile') {
                var $this = $(this),
                    $depthText = $this.children('.depth_text'),
                    eventTarget = event.target;

                if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                    if($this.hasClass('depth1_item')) {
                        if($this.hasClass('active')) {
                            $html.removeClass('lnb_open');
                        }else{
                            $html.addClass('lnb_open');
                        }
                    }

                    if($this.children('.depth2').length) {
                        if($lnbMenu.hasClass('multiple')) { //모바일 2단 메뉴일때
                            $this.addClass('active').siblings('.depth_item').removeClass('active');
                        }else{
                            $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        }
                        event.preventDefault();
                    }

                    if($this.children('.depth3, .depth4, depth5').length) {
                        $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        event.preventDefault();
                    }

                    /* 기존소스
                    if($this.children('.depth').length) {
                        $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        event.preventDefault();
                    }
                    */
                }
            }

            event.stopPropagation();
        }).each(function(index, element) {
            var $element = $(element);

            if($element.children('.depth').length) {
                $element.addClass('has');
            }
        });

        $lnbMenu.find('.depth1_item:last-child .depth2 .depth2_itemst .depth2_item:last-child .depth2_text').on('focusout', function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });

        $lnbMenu.on('mouseleave', function(event) {//mouseleave
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });

        /*$window.on('screen:wide screen:web', function(event) {
            refreshlnbHeight();

            if($lnbSpy.length) {
                $html.removeClass('lnb_open');
                $lnbSpy.parents('.depth_item').removeClass('active');
            }
        });

        $window.on('screen:tablet screen:phone', function(event) {
            refreshlnbHeight();

            if($lnbSpy.length) {
                $html.addClass('lnb_open');
                $lnbSpy.parents('.depth_item').addClass('active');
            }
        });*/

        //사이드
        var $side = $container.find('.side'),
            $sideDepthLI = $side.find('.depth_item');

        //$side.addClass('length' + $side.find('.depth1_item').length);

        $sideDepthLI.on('click', function(event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target;

            if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if($this.hasClass('depth1_item')) {
                    if($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    }else{
                        $html.addClass('side_open');
                    }
                }

                if($this.children('.depth').length) {
                    $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                    event.preventDefault();
                }
            }

            event.stopPropagation();
        }).each(function(index, element) {
            var $element = $(element);

            if($element.children('.depth').length) {
                $element.addClass('has');
            }
        });

        /*if($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
        }*/
    });

})(window.jQuery);
