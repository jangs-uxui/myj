
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        /* 탭메뉴 */
        var $tabWrap = $('.tab_wrap');
        $tabWrap.each(function () {
            var $this = $(this),
                $tabList = $this.find('.tab_list'),
                $tabItem = $tabList.find('.tab_item'),
                tabIndex = $tabItem.length;

            if(tabIndex >= 5){
                $tabList.addClass('col5');
            }else if(tabIndex < 5){
                $tabList.addClass('col' + tabIndex);
            }
        });

        $('.tab_wrap.temp_tab').each(function () {
            var $this = $(this),
                $TabContentsNotActive = $this.find('.tab_content').not('.active'),
                $nyj_map = $TabContentsNotActive.find('.nyj_map_box'),
                $root_daum_roughmap = $nyj_map.find('.root_daum_roughmap'),
                nyj_mapLength = $nyj_map.length;
            if(nyj_mapLength>0){
                $root_daum_roughmap.empty();
            }
        });

        $('.tab_wrap.temp_tab .tab_link').on('click', function () {
            var $this = $(this),
                $parent = $this.parent('.tab_item'),
                $OtherParents = $parent.siblings('.tab_item'),
                $OtherBtns = $OtherParents.find('.tab_link'),
                $content = $this.closest('.tab_wrap').find('.tab_content'),
                index = $parent.index(),
                $TempTab = $this.parents('.temp_tab');

            $parent.addClass('on').siblings('.tab_item').removeClass('on');
            $OtherBtns.removeAttr('title');
            $this.attr('title', '선택됨');
            $content.eq(index).addClass('active').siblings('.tab_content').removeClass('active');

        });

        // 반응형 테이블 시작
        $('table.table.responsive').not($('.prettyprint').children()).each(function () {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });
        // 반응형 테이블 끝

        // 다운로드 및 링크박스 시작
        var $container = $('#container');
        var $nyjLinkItem = $container.find('.nyj_link_box .nyj_link_item');

        $nyjLinkItem .each(function() {
            var $this = $(this),
                $linkTextBox = $this.find('.link_text_box'),
                $linkBtnBox = $nyjLinkItem.find('.link_btn_box');

            // link_btn_box 안의 버튼 개수
            $linkBtnBox.each(function() {
                var $linkBtn = $(this).find('.nyj_btn.small'),
                    $nyjItem = $(this).closest('.nyj_link_item'),
                    $linkBtnLength = $linkBtn.length;

                if ($linkBtnLength === 1) {
                    $nyjItem.attr('data-btn', '1');
                } else if ($linkBtnLength === 2){
                    $nyjItem.attr('data-btn', '2');
                }
            });
        });
        // 다운로드 및 링크박스 끝

        // 스타일 있는 셀렉트박스 시작
            var $nyjSelBox = $container.find('.nyj_fake_select_box');

            $nyjSelBox.each(function () {
                var $nyjSelBox = $(this),
                    $realSelc = $(this).find('select.real_select'),
                    $realSelcOpt = $realSelc.find('option'),
                    $fakeSelcOpenBtn = $(this).find('button.fake_select_btn_open'),
                    $fakeSelcOpenText =  $fakeSelcOpenBtn.find('.text'),
                    $fakeSelcList = $(this).find('.fake_select_list'),
                    $fakeSelcItem = $fakeSelcList.find('.fake_select_item'),
                    $fakeSelcItemActive = $fakeSelcItem.siblings('.fake_select_item.active'),
                    $fakeSelcItemActiveText = $fakeSelcItemActive.find('button.fake_select_btn'),
                    $fakeSelcItemActiveIndex = $fakeSelcItemActive.index(),
                    $StartSelcOpt = $realSelc.find('option').eq($fakeSelcItemActiveIndex),
                    $fakeSelcBtn = $fakeSelcItem.find('button.fake_select_btn');

                $StartSelcOpt.attr('selected', true);
                $fakeSelcOpenText.text($fakeSelcItemActiveText.text());

                // option text 매칭
                $fakeSelcItem.each(function() {
                    var fakeItemIndex = $(this).index(),
                        $fakeSelcBtnText = $(this).find('button.fake_select_btn').text(),
                        $fakeSelcOptionText = $realSelcOpt.eq(fakeItemIndex).text($fakeSelcBtnText);
                });

                // nyjSelBox on off
                $fakeSelcOpenBtn.on('click', function () {
                    if ($nyjSelBox.hasClass('active')) {
                        $nyjSelBox.removeClass('active');
                        $(this).attr('title', '셀렉트박스 열기');
                    } else {
                        $nyjSelBox.addClass('active');
                        $(this).attr('title', '셀렉트박스 닫기');
                    };
                });

                // btn select
                $fakeSelcBtn.on('click', function () {
                    var fakeSelcItemIndex = $(this).closest('.fake_select_item').index();

                    $(this).attr('title', '선택됨').closest('.fake_select_item').addClass('active').siblings().removeClass('active').children().removeAttr('title');
                    $realSelcOpt.eq(fakeSelcItemIndex).attr('selected', true).siblings().attr('selected', false);
                    $fakeSelcOpenText.text($(this).text()).closest('.fake_select_btn_open').attr('title', '셀렉트박스 열기');
                    $nyjSelBox.removeClass('active');
                    $fakeSelcOpenBtn.focus();
                });
            });

        // 스타일 있는 셀렉트박스 끝

        // 박스 자동 높이조절 시작
        // 내용있는 스텝박스
        var $stepBoxes = $container.find('.step_box.desc_type[data-row="2"], .step_box.desc_type[data-row="3"], .step_box.desc_type[data-row="4"]');
        $window.on('load resize', function() {
            $stepBoxes.each(function() {
                stepAutoHeight($(this));
            });
        });
        function stepAutoHeight(stepbox) {
            if ($window.width() > 640) {
                var $stepInner = stepbox.find('.step_item_inner'),
                    $onlyStepTitle = $stepInner.find('.step_title:only-child'),
                    $stepDesc = $stepInner.find('.step_desc'),
                    $hasStepInner = $stepDesc.closest('.step_item_inner');

                var tabs = stepbox.closest('.tab_obj, .tab_content');
                var tabchk1 = tabchk(tabs);

                $stepDesc.removeAttr('style');
                $onlyStepTitle.removeAttr('style');

                //step_desc 높이값
                var $descHeightArray = $stepDesc.map(function () {
                    return $(this).height();
                }).get();

                //step_desc 최대 높이값
                var $descMaxHeight = Math.max.apply(null, $descHeightArray);
                $stepDesc.height($descMaxHeight);

                //step_desc가 있는 step_item_inner의 높이값
                var $innerHeightArray = $stepInner.map(function () {
                    return $(this).height();
                }).get();

                //step_desc가 있는 step_item_inner의 최대 높이값
                var $innerMaxHeight = Math.max.apply(null, $innerHeightArray),
                    $resultMaxHeight = $innerMaxHeight.valueOf() - 2; //step_title border값 2px
                $onlyStepTitle.height($resultMaxHeight);

                if (tabchk1) tabs.removeAttr('style');
            }
        }

        //사이트 링크 박스
        var $siteBox = $container.find('.nyj_site_box');
        $window.on('load resize', function(){
            $siteBox.each(function(){
                siteAutoHeight($(this));
            });
        });
        function siteAutoHeight(sitebox) {
            if ($window.width() > 640) {
                var $siteList = sitebox.find('.nyj_site_list'),
                    $siteItem = $siteList.find('.nyj_site_item'),
                    $siteLink = $siteItem.find('.nyj_site_link'),
                    $onlyTitleBox =  $siteLink.find('.title_box:only-child'),
                    $hasTitleBox = $onlyTitleBox.closest('.nyj_site_link'),
                    $descBox = $siteLink.find('.desc_box'),
                    $descTitleBox = $descBox.prev('.title_box'),
                    $hasDescBox = $descBox.closest('.nyj_site_link');

                var tabs = sitebox.closest('.tab_obj, .tab_content');
                var tabchk1 = tabchk(tabs);

                $hasTitleBox.removeAttr('style');
                $hasDescBox.removeAttr('style');

                //.nyj_site_list 자동높이
                var $titleHeightArray = $onlyTitleBox.map(function(){
                    return $(this).height();
                }).get();

                var $titleMaxHeight = Math.max.apply(null, $titleHeightArray);
                $hasTitleBox.height($titleMaxHeight);

                //.nyj_site_list.type2 자동높이
                var linkHeight = 0;
                $siteLink.each(function(){
                    var title = $(this).find('.title_box'),
                        desc = $(this).find('.desc_box');

                    let totalHeight = title.outerHeight(true) + desc.outerHeight(true);
                    if (totalHeight>linkHeight) {linkHeight = totalHeight}
                })
                $hasDescBox.height(linkHeight)

                if (tabchk1) tabs.removeAttr('style');
            }
        }
        //텝 오류 제거
        function tabchk(tabs) {
            if (tabs && tabs.css('display') == 'none') {
                tabs.css('display', 'block');
                return true;
            }
        }
        //박스 자동 높이조절 끝

        //이미지박스 시작
        var $nyjImgBox = $container.find('.nyj_img_box'),
            $imgListBox = $container.find('.nyj_img_box.list_type');

        $imgListBox.each(function() {
            var $imgItem = $(this).find('.nyj_img_list .nyj_img_item');

            if ($imgItem.length > 1) {
                $(this).attr('data-row', '2');
            }
        });
        //이미지박스 끝

        //큐엔에이 시작
        var $acnBox = $container.find('.nyj_acn_box');

        $acnBox.each(function(){
            var $acnBox = $(this),
                $acnList = $acnBox.find('.nyj_acn_list'),
                $acnItem = $acnList.find('.nyj_acn_item'),
                $acnBtn = $acnItem.find('button.nyj_acn_btn');

            $acnBtn.on('click', function(){
                var $acnBtn = $(this),
                    $thisItem = $acnBtn.closest('.nyj_acn_item'),
                    $thisCon = $thisItem.find('.nyj_acn_con'),
                    IsActive = $thisItem.is('.active');

                if (!IsActive) {
                    $thisCon.slideDown(250, 'swing');
                    $thisItem.addClass('active');
                    $acnBtn.attr('title', '닫기');
                } else {
                    $thisCon.slideUp(250, 'swing');
                    $thisItem.removeClass('active');
                    $acnBtn.attr('title', '열기');
                }
            });

            $(document).on('click', 'button.acn_con_inner', function (){
                var $textConBtn = $(this),
                    $textCon = $textConBtn.closest('.nyj_acn_con'),
                    $textAcnBtn = $textCon.siblings('button.nyj_acn_btn'),
                    $textAcnItem = $textCon.closest('.nyj_acn_item'),
                    IsActive = $textAcnItem.is('.active');
                if (IsActive) {
                    $textCon.slideUp(250, 'swing');
                    $textAcnItem.removeClass('active');
                    $textAcnBtn.attr('title', '열기');
                }
                $textAcnBtn.focus();
            });
        });
        //큐앤에이 끝
        
        //지도 시작
        $('.tab_obj.n13').find('.nyj_map_box').not($('.tab_content').not('.active').children()).each(function () {
            var $this = $(this),
                $location_map = $(this).find('.map_inner'),
                $root_daum_roughmap = $this.find('.root_daum_roughmap');
            $root_daum_roughmap.empty();
        });

        $('.template_tabmenu li:nth-child(13) a').on('click', function(){
            $('.tab_obj.n13 .nyj_map_box').not($('.tab_content').not('.active').children()).each(function () {
                var $this = $(this),
                    $location_map = $this.find('.map_inner'),
                    Timestamp = $location_map.attr('data-timestamp'),
                    Key = $location_map.attr('data-key'),
                    $root_daum_roughmap = $this.find('.root_daum_roughmap');
                $root_daum_roughmap.empty();
                new daum.roughmap.Lander({
                    "timestamp" : Timestamp,
                    "key" : Key,
                    "mapWidth" : "",
                    "mapHeight" : ""
                }).render();
            });
        });

        $('.tab_wrap.temp_tab.maptab').each(function () {
            var $this = $(this),
                $tab_contents = $this.find('.tab_content');
            $tab_contents.each(function () {
                var $this = $(this),
                    $nyj_maps = $this.find('.nyj_map_box'),
                    nyj_mapsLength = $nyj_maps.length;
                if(nyj_mapsLength>=0){
                    var $this = $(this),
                        IsActive = $this.is('.active'),
                        $nyj_maps = $this.find('.nyj_map_box');
                    if(!IsActive) {
                        $nyj_maps.each(function () {
                            var $this = $(this),
                                $location_map = $this.find('.map_inner'),
                                $root_daum_roughmap = $this.find('.root_daum_roughmap');
                            setTimeout(function () {
                                $root_daum_roughmap.empty();
                            }, 200);
                        });
                    }
                    $this.attr('data-maplength', nyj_mapsLength);
                }
            });
        });

        $('.tab_wrap.temp_tab.maptab .tab_link').on('click', function () {
            var $this = $(this),
                $Myparent = $this.parent('.tab_item'),
                IsActive = $Myparent.is('.on'),
                $content = $this.parents('.tab_wrap').find('.tab_content'),
                index = $Myparent.index(),
                $OtherParents = $Myparent.siblings('.tab_item'),
                $MyTabBox = $content.eq(index),
                MyTabMapLength = $MyTabBox.attr('data-maplength'),
                $OtherTabBox = $MyTabBox.siblings('.tab_content');

            if (IsActive){
                if(MyTabMapLength>0){
                    var $nyj_maps = $MyTabBox.find('.nyj_map_box');
                    $nyj_maps.each(function () {
                        var $this = $(this),
                            $location_map = $this.find('.map_inner'),
                            Timestamp = $location_map.attr('data-timestamp'),
                            Key = $location_map.attr('data-key'),
                            $root_daum_roughmap = $this.find('.root_daum_roughmap');
                        new daum.roughmap.Lander({
                            "timestamp" : Timestamp,
                            "key" : Key,
                            "mapWidth" : "",
                            "mapHeight" : ""
                        }).render();
                    });
                }
                $OtherTabBox.each(function () {
                    var $this = $(this),
                        MapLength = $this.attr('data-maplength');
                    if(MapLength>0){
                        var $Otherlocation_map = $this.find('.map_inner'),
                            $root_daum_roughmap = $this.find('.root_daum_roughmap');
                        $root_daum_roughmap.empty();
                    }
                });
            }
        });
        //지도 끝
        // 아이프레임 높이 자동 조정
        if($('iframe.auto_height').length > 0){
            function iframe_auto_height(e)
            {
                $('iframe.auto_height')
                    .attr('scrolling', 'auto')
                    .each(function(index)
                    {
                        var self = $(this);
                        try
                        {
							
                            var doc = self.contents(),
                                height1 = doc.outerHeight(),
                                body = doc.find('body'),
                                height2 = body.outerHeight();
							console.log(doc);
                            body.css({
                                'padding' : '0',
                                'margin' : '0'
                            });

                            height1 = doc.outerHeight();
                            height2 = body.outerHeight();

                            self.height(height1 < height2 ? height1 : height2);

                            height1 = doc.outerHeight();
                            height2 = body.outerHeight();
                            self.height(height1 > height2 ? height1 : height2);
							console.log(height1);
                        }
                        catch(e)
                        {
                            self.height(1300);
                        }
                    });
            }

			

            $(window).bind('load resize', iframe_auto_height);
            //$('iframe.auto_height').bind('load resize', iframe_auto_height);
        }

        //24.3 게시판큐엔에이 추가 
        var $accordionBox = $container.find('.temp_accordion');
        
        $accordionBox.each(function(){
            var $accordionBox = $(this),                
                $accordionItem = $accordionBox.find('.accordion_item'),
                $accordionBtn = $accordionItem.find('button.accordion_btn');

                $accordionBtn.on('click', function(){
                var $accordionBtn = $(this),
                    $thisItem = $accordionBtn.closest('.accordion_item'),
                    $thisCon = $thisItem.find('.accordion_con'),
                    IsActive = $thisItem.is('.active');

                if (!IsActive) {
                    $thisCon.slideDown(250, 'swing');
                    $thisItem.addClass('active');
                    $accordionBtn.attr('title', '닫기');
                } else {
                    $thisCon.slideUp(250, 'swing');
                    $thisItem.removeClass('active');
                    $accordionBtn.attr('title', '열기');
                }
            });            
        });       

        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);