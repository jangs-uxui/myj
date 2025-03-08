function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {
		var $body = $('body');
		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last'),
			$contents = $('#contents');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target,
				IsActive = $this.is('.active');

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					var $Depth = $this.children('.depth'),
						DepthDisplay = $Depth.css('display'),
                        $childItem = $Depth.find('.depth_item:first');
					if(DepthDisplay!=='none'){//하위메뉴가 display:none이 아니면 실행
						if(!IsActive){
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');

                            // 4차까지 한번에 열리기
                            $childItem.removeClass('active_prev active_next');
                            $childItem.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
                            $childItem.prev('.depth_item').addClass('active_prev');
                            $childItem.next('.depth_item').addClass('active_next');
						} else{
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');

                            // 4차까지 한번에 열리기
                            $childItem.removeClass('active');
                            $childItem.siblings('.depth_item').removeClass('active_prev active_next');
						}
						event.preventDefault();
					}
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
			$sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
			$sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
		}

		//여기서부터 코드 작성해주세요

        $('.sharebox .share_btn.sns_share').on('click', function () {
           var $this = $(this),
               $list = $this.parent('.share_wrap').find('.share_list');

           if($this.parent('.share_wrap').hasClass('active')){
               $this.attr('title', 'sns 공유하기 열기').parent('.share_wrap').removeClass('active');
               $list.slideUp();
           }else{
               $this.attr('title', 'sns 공유하기 닫기').parent('.share_wrap').addClass('active');
               $list.slideDown();
           }

        });

		//프린트
		$('.sharebox .share_btn.print').on('click', function () {
			var $contents = $('#contents'),
				ContentsClass = $contents.attr('class');
			var $head = $('head').clone();
			var $contentsClone = $('#contents').clone();    // 프린트 할 특정 영역 복사
			
			var headHtml = $head[0].innerHTML;
			var innerHtml = $contentsClone[0].innerHTML;
			var popupWindow = window.open("", "_blank", "width=1000,height=800");
			popupWindow.document.write('<!DOCTYPE html>'+
			  '<html>'+
				'<head>'+headHtml+'</head>'+
				'<body><div id="wrapper"><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></div></body>'+
			  '</html>')
		   
			popupWindow.document.close();
			popupWindow.focus();

			setTimeout(function(){
				popupWindow.print();         // 팝업의 프린트 도구 시작
				popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
			}, 1000);
		});
		
		//qr코드보기
		$('.sharebox .qrbtn').on('click', function () {
			$html.addClass('qr_show');
			$('.qr_layer').fadeIn();
		});
		$('.qr_layer .layer .close').on('click', function () {
			$html.removeClass('qr_show');
			$('.qr_layer').fadeOut();
		});

        //서브 비주얼 설정을 위한 active 메뉴 추출
        $('.depth1_item').each(function(index,elem){
            var $this = $(this),
                $thisAnchor = $this.find('.depth1_text');
            if($this.hasClass('actived')){
                $('html').attr('data-menu-index',index);
            }
        });

        // sub > pathbox

        var $pathBox = $('.sub_head .pathbox'),
            $pathItem = $pathBox.find('.path_item');
        $pathItem.each(function () {
            var $this = $(this),
                $thisbtn = $this.find('.path_btn'),
                $thislist = $this.find('.path_selectlist');

            $thislist.closest($pathItem).addClass('has');
        });

        $('.pathbox button.path_btn').on('click', function () {

            var $this = $(this),
                $parent = $this.parent('.path_item'),
                $silbing = $this.siblings('.path_selectlist');
            if($parent.hasClass('active')){
                $parent.removeClass('active');
				$this.attr('title', '열기');
                $silbing.slideUp();
            }else{
                $parent.addClass('active').siblings('.path_item').removeClass('active').find('button.path_btn').attr('title', '열기').siblings('.path_selectlist').slideUp();
				$this.attr('title', '닫기');
                $silbing.slideDown();
            }
        });

		//임시
		var menukey = getParameterByName('key'),
			SiteID = $body.attr('data-siteid');
		/*
		if(menukey){
			var img = new Image();
			img.src='/site/public/images/t_content/'+SiteID+'/t_cts'+menukey+'.jpg';
			img.onload=function(){
				$('#contents > *').hide();
				$contents.append('<div class="temporary"><img src="/site/public/images/t_content/'+SiteID+'/t_cts'+menukey+'.jpg" /></div>');
			}
			img.onerror=function(){
				
			}
		}
		*/

        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);