(function ($) {
    'use strict';
    
    function applyTransitionDelay(object) {
        var speed = parseFloat($(object).data('speed')) || 0.05; // 글자 간 딜레이
        var delaySpeed = parseFloat($(object).data('speed-delay')) || 0; // 시작 딜레이
        var isBttmT = $(object).closest('.bttm_t').length > 0; // bttm_t인지 확인
        var baseDelay = isBttmT ? 0.3 : delaySpeed; // bttm_t는 0.4s부터 시작
        
        $(object).find('.char').each(function (index) {
            var delay = baseDelay + (index * speed); // 딜레이 계산
            $(this).css({
                'transition-delay': delay + 's',
            });
        });
    }
    
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    
    $(function () {
        
        //여기서부터 코드 작성해주세요
        
        //스크롤 애니메이션 시작
        $(document).ready(function () {
            // .scroll 클레스명에 on 붙으면 실행
            $('.scroll').waypoint(function (direction) {
                var $element = $(this.element);
                
                if (direction === 'down') {
                    $element.addClass('on'); // 클래스 추가
                    applyTransitionDelay($element.find('.word-split')); // 딜레이 적용
                } else {
                    $element.removeClass('on'); // 클래스 제거
                }
            }, {
                offset: '60%' // 애니메이션 시작 시점
            });
            
            //텍스트 스플리팅 시작
            Splitting({    //[2]splitting.js 초기화
                target: "[data-splitting]",
                by: "chars",  //단어별로("words") 적용할지, 음절별로("chars") 적용할지 지정
                key: null
            });
            
            $('.word-split').each(function () {
                applyTransitionDelay(this);
            });
        });
        //스크롤 애니메이션 끝
        

        //텍스트 스플리팅 끝
        
        //보호중인 동물 - 탭 탭 슬라이드 시작
        var $tabBox = $('.protect .prot_wrap .tab_box'),
            $tabBtn1 = $tabBox.find('.tab_btn1'),
            $tabBtn2 = $tabBox.find('.tab_btn2'),
            $slideBox= $('.protect .prot_wrap .pet_slide'),
            $petSlideList = $slideBox.find('.pet_slide_list'),
            $petControl = $slideBox.find('.pet_control'),
            $petPrevBtn = $petControl.find('button.prev'),
            $petNextBtn = $petControl.find('button.next');
        
        var petSlideOpt = {
            autoplay: false,
            infinite: false,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: false,
            slidesToShow: 4,
            slidesToScroll : 1,
            variableWidth: true,
            arrows: true,
            prevArrow: $petPrevBtn,
            nextArrow: $petNextBtn,
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true
        };
        
        // [1]클릭 이벤트 - 텝버튼들
        $tabBtn1.add($tabBtn2).on('click', function() {
            var $tabItem = $(this).parent('li'),   // 사용자가 선택한 텝버튼의 부모인 텝아이템
                pet = false,                       // 동물 유형 - 초기값 false
                state = false;                     // 동물 상태 - 초기값 false
            
            // (1)텝아이템 구분
            if ($tabItem.hasClass('tab_item1')) {  // IF ▶ 첫번째 텝 아이템이면,
                pet = $tabItem.attr('data-pet');   // 텝아이템의 data-pet 속성 값을 가져오고,
                state = '1';                       // data-state 속성 기본값을 1로 설정 (1 = 전체)
                $tabBtn2.eq(0).parent().addClass('active').siblings().removeClass('active');
                $tabItem.addClass('active').siblings().removeClass('active');
            } else if ($tabItem.hasClass('tab_item2')) {  // IF ▶ 두번째 텝 아이템이면,
                state = $tabItem.attr('data-state');      // 텝아이템의 data-state 속성 값을 가져온다
                $tabItem.addClass('active').siblings().removeClass('active');
            }
            
            // (2)슬라이드 속성 업데이트
            if(pet) $petSlideList.attr('data-pet', pet);
            if(state) $petSlideList.attr('data-state', state);
            
            // (3)슬라이드 필터링
            $petSlideList.slick('slickUnfilter');                                // 기존에 있던 필터 모두 제거 후
            $petSlideList.slick('slickFilter', onFilterSlides($petSlideList));   // 함수에서 반환된 조건에 따른 새로운 필터 적용
        });
        
        // [2]슬라이드 이벤트
        $petSlideList.on('init', function() {                                   // (1)슬라이드 리스트에 초기(init)설정 적용
            $(this).attr({'data-pet': 'all', 'data-state': 1});                 // 모든 동물 유형을 보여주고, 기본상태는 전체보기로 설정
            $petSlideList.slick('slickFilter', onFilterSlides($petSlideList));  // 초기 필터조건 적용
        }).slick(petSlideOpt);                                                  // (2)슬라이드 초기화 - 초기화시 init 이벤트 자동발생
        
        // [3]필터 조건 함수
        function onFilterSlides($list) {       // (1)슬라이드 리스트의 data 속성 확인
            var filterPet = $list.attr('data-pet'),
                filterState = $list.attr('data-state');
            
            return function(index, slide) {    // (2)슬라이트 필터링 조건 검사
                var $item = $(slide).find('.pet_slide_item'),
                    thisPet = $item.data('pet'),
                    thisState = $item.data('state');
                
                return (filterPet == 'all' || filterPet == thisPet) &&
                    (filterState == '1' || filterState == thisState);
            };
        }
        //보호중인 동물 - 슬라이드 끝
        
        //입양가족 행복한 일상 - 슬라이드 시작
        var $lifeSlide = $('.life .life_wrap .life_slide'),
            $lifeSlideList = $lifeSlide.find('.life_slide_list'),
            $lifeControl = $lifeSlide.find('.life_control'),
            $lifePrevBtn = $lifeControl.find('button.prev'),
            $lifeNextBtn = $lifeControl.find('button.next');
        
        $lifeSlideList.slick({
            autoplay: false,
            infinite: false,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: false,
            slidesToShow: 3,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow: $lifePrevBtn,
            nextArrow: $lifeNextBtn,
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true
        });
        //입양가족 행복한 일상 - 슬라이드 끝
    });
})(jQuery);