
'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if (jQuery) {
        //$ 중복방지
        (function ($) {
            //태그객체
            var $window = $(window);
            $(function () {

                //여기서부터 코드 작성해주세요



                $window.on('screen:wide screen:web', function (event) {

                });

                $window.on('screen:tablet screen:phone', function (event) {

                });

            });
        })(jQuery);
    }
} catch (e) {
    console.error(e);
}