(function($) {
    'use strict';
	var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {
		//language
		$('.header_top .gnb .language .gnbbtn').attr('title', '새창');
		$('.header_top .gnb .language .gnbbtn').on('click', function(event) {
            var $this = $(this),
				$Parent = $this.parent('.language'),
				IsActive = $Parent.is('.active'),
				$Layer = $this.siblings('.language_panel');
			/*
			if(!IsActive){
				$Parent.addClass('active');
				$this.attr('title', '하위메뉴닫기');
			} else{
				$Parent.removeClass('active');
				$this.attr('title', '하위메뉴열기');
			}*/
            if(window.location.pathname === '/international_kgu/index.do') {
                window.open('/international_kgu/index.do', '_self');
            } else {
                window.open('/international_kgu/index.do', '_blank');
            }
        });
		$('.header_top .gnb ul .language .language_panel .language_hide').on('click', function(event) {
			var $this = $(this),
				$Parent = $this.parents('.language'),
				$Gnbbtn = $Parent.find('.gnbbtn');
			$Parent.removeClass('active');
			$Gnbbtn.attr('title', '하위메뉴열기');
		});
		/* 검색 */
		$('.header_top .gnb ul .gnbitem.gnbsearch .gnbbtn').on('click',function(){
			$html.addClass('search_open');
			$('.search_panel').addClass('active');
			setTimeout(function() {
				$('.search_panel .search_query').focus();
			}, 50);
		});
		$('#header .shortcut_item.search .shortcut_anchor').on('click',function(){
			$html.addClass('search_open');
			$('.search_panel').addClass('active');
		});
		$('#header .search_hide').on('click',function(){
			var NowState = $.screen.settings.state[0];
			$('.search_panel').removeClass('active');
			if(NowState=='wide'||NowState=='web'){
				$('.header_top .gnb ul .gnbitem.gnbsearch .gnbbtn').focus();
			}
			$html.removeClass('search_open');
		});
		$(document).on('click','#header .keyword_del',function(){
			$(this).parent().remove();
		});
    });

	$document.on('ready', function(event) {
        /**
         * @link {https://github.com/JungHyunKwon/screen}
         */
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1601
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1600,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }, {
                name : 'maxheight',
                vertical : {
                    from : 9999,
                    to : 881
                }
            }, {
                name : 'minheight',
                vertical : {
                    from : 880,
                    to : 0
                }
            }]
        });
    });
})(window.jQuery);
