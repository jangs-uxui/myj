/*페이지 로드시*/
$( document ).ready(function() {
    // api 정보보기
	
	var toDt = getFormatDate();
    var fromDt = getFormatDate(toDt, null, null, -7);
    var checkedValue = $("input[type=radio][name=sort]:checked").val();
    

	if(typeof openAPI == "undefined"){
		alert("안정적인 정보공개포털 운영을 위한 시스템 정기점검을 실시합니다.\n점검시간 중에는 서비스 이용이 중단되오니 참고하시기 바랍니다.");
		return false;
	}
    // api nstList가 N일때
    if(!openAPI.nstList){
        $("#nstArea").css('display','none');
    }
    
    
    document.getElementById("end_dt").value= toDt;
    document.getElementById("start_dt").value= fromDt;
    setRecentBtn( 'week' );
    openAPI.param.fromDt = fromDt.replace(/-/g, ".");
	openAPI.param.toDt = toDt.replace(/-/g, ".");
	openAPI.param.sort = checkedValue;

    // 데이터 로드
    dataLoad();
});

/*데이터를 쿼리해서 뿌리는 함수*/
function dataLoad(){
    //로딩
    loadingStart();

    if(typeof openAPI == "undefined"){
		alert("안정적인 정보공개포털 운영을 위한 시스템 정기점검을 실시합니다.\n점검시간 중에는 서비스 이용이 중단되오니 참고하시기 바랍니다.");
        loadingEnd();
		return false;
	}
    // 데이터 로드
    openAPI.getWonmunList(function(success, error){
        if(error){
            alert("안정적인 정보공개포털 운영을 위한 시스템 점검을 실시합니다.\n점검시간 중에는 서비스 이용이 중단되오니 참고하시기 바랍니다.");
        }else{
            var result = success.data;
            setOpenPageHtml(success.info);

            $("#openBillingTable > tbody").empty();
            var str = "";
            var seq = 1;            
            if(result.length > 0){
                $.each(result, function(index, data){
                    if(result.length == seq){
                        str += "<tr class=\"last\">";
                    }else{
                        str += "<tr>";
                    }
                    var yy = data.REGDATE.substring(0,4);
                    var mon = data.REGDATE.substring(4,6);
                    var date = data.REGDATE.substring(6,8);
                    var fulldate = yy+"."+mon+"."+date;
                    str += "<td class=\"ce vmid \">" + data.GVRNPATH.replace(/\|/g,">"); + "</td>";
                    str += "<td class=\"ce vmid title_comm\"><a onclick=\"detail(\'"+data.PRDNDT+"\',\'"+data.PRDNNSTRGSTNO+"\')\" href='#'>" + data.TITLE + "</a></td>";
                    str += "<td class=\"ce vmid end\">" + fulldate + "</td>";
                    str += "</tr>";
                    seq++;
                });
            }else{
                str += "<tr class=\"last\">";
                str += "<td class=\"ce bl_w br_w\" colspan=\"8\">검색된 내용이 없습니다.</td>";
                str += "</tr>";
            }
            $("#openBillingTable > tbody").append(str);

//            $("#totalCount").text(success.info.totalCount);
//            $("#totalCount").text(totalc);
            
        }

        //로딩 끝
        loadingEnd();
    })
};


function setOpenPageHtml( info ){
    var infoDisplay     = Number(info.display);
    var infoPageNo      = Number(info.pageNo);
    var infoTotalCount  = Number(info.totalCount);    
    var totalPage       = Math.floor((infoTotalCount - 1) / infoDisplay) + 1;
    var startPage       = ( Math.floor( (infoPageNo - 1) / 10 ) * 10 ) + 1;
    var endPage         = ( startPage + 9 > totalPage ) ? totalPage : startPage + 9;
    var prevPage        = ( startPage - 10 < 1 ) ? 1 : startPage - 10;
    var nextPage        = ( startPage + 10 > totalPage ) ? totalPage : startPage + 10;

    var m_startPage       = ( Math.floor( (infoPageNo - 1) / 5 ) * 5 ) + 1;
    var m_endPage         = ( m_startPage + 4 > totalPage ) ? totalPage : m_startPage + 4;
    var m_prevPage        = ( m_startPage - 5 < 1 ) ? 1 : m_startPage - 5;
    var m_nextPage        = ( m_startPage + 5 > totalPage ) ? totalPage : m_startPage + 5;

    var firstPage       = 1;
    var lastPage        = totalPage;
    var m_lastPage        = totalPage;
    var this_w_width    = $(window).width();
    
    var commainfoTotalcount = comma(Number(info.totalCount));
    var commainfoPageNo = comma(Number(info.pageNo));
    var commatotalPage= comma(Math.floor((infoTotalCount - 1) / infoDisplay) + 1);
        
    // 상단 info
    $('#totalCount').html(commainfoTotalcount);

    // 자료가 없을경우
    if( infoTotalCount == 0 ) {
        $('.pagination').html('');
        return;
    }

    // 하단 페이지(setPageOpenForm)
    var pageHTML = '';
    pageHTML = pageHTML + '<div class="p-page">';
    pageHTML = pageHTML + '<div class="p-page__control">';
    pageHTML = pageHTML + '    <a href="#" onclick="setPageOpenForm(1);return false;" class="p-page__link prev-end" title="처음 페이지로"><span class="skip">처음 페이지</span></a>';
    pageHTML = pageHTML + '    <a href="#" onclick="setPageOpenForm(' + prevPage + ');return false;" class="p-page__link prev-one" title="이전 페이지 이동"><span class="skip"이전 페이지</span></a>';
    pageHTML = pageHTML + '</div>';
    pageHTML = pageHTML + '<div class="p-page__link-group">';
    for(var i = startPage ; i <= endPage ; i++){
        if(i == infoPageNo){
            pageHTML = pageHTML + '<strong title="현재 페이지" class="p-page__link active">' + i + '</strong>';
        }else{
            pageHTML = pageHTML + '<a href="#" class="p-page__link" onclick="setPageOpenForm(' + i + ');return false;" title="' + i + '페이지">' + i + '</a>';
        }
    }
    pageHTML = pageHTML + '</div>';
    pageHTML = pageHTML + '<div class="p-page__control">';
    pageHTML = pageHTML + '    <a href="#" onclick="setPageOpenForm(' + nextPage + ');return false;" class="p-page__link next-one" title="다음 페이지 이동"><span class="skip">다음  페이지</span></a>';
    pageHTML = pageHTML + '    <a href="#" onclick="setPageOpenForm(' + lastPage + ');return false;" class="p-page__link next-end" title="끝 페이지로"><span class="skip">끝 페이지</span></a>';
    pageHTML = pageHTML + '</div>';    
    pageHTML = pageHTML + '</div>';

    $('.p-pagination').html(pageHTML);
}

/**
 * page 이동
 */
function setPageOpenForm( p ){
    openAPI.param.pageNo = p;
    dataLoad();
    
}

/*페이지를 변경하는 함수*/
function paging(num){
    openAPI.param.pageNo = num;
    dataLoad();
};

/*한줄에 표시될 갯수를 바꾸는 함수*/
function rowCount(value) {
    openAPI.param.display = value;
    dataLoad();
};

/*검색어가 변경되었을경우*/
function searchTitle(title){
		openAPI.param.q = title;
		dataLoad();
}

/*정렬변경*/
function sortChange(sort){
    openAPI.param.sort = sort;
    dataLoad();
}

/*상세 내용을 불러오는 함수*/
function detail(prdnDt, prdnNstRgstNo){
  
    openAPI.getWonmunUrl(prdnDt, prdnNstRgstNo, function(url, error){
    	if(error){
    		console.log(error.error);
    	}else{
    		if(url.indexOf("www.open.go.kr") != -1){
    			window.open(url);  
    		}else{
    			$("#prdnDt").val(prdnDt);
    			$("#prdnNstRgstNo").val(prdnNstRgstNo);
    			window.open("/openApi/apiPop.html", "", "width=1024,height=350");
    		}
    	}
    });
    
};

/*검색기관 초기화*/
function nstReset(){
    $("#nstNm").html("");
    $("#searchWrd").val("");
    $("#searchDeptNm").val("");
    $("#input_keyword").val("");
    openAPI.param.nstCd = null;
    openAPI.param.q = null;
    dataLoad();
}

/*로딩시작*/
function loadingStart(){
    $("#loadingBg").css('display','inline');
};

/*로딩끝*/
function loadingEnd(){
    $("#loadingBg").css('display','none');
};

/*콤마*/
function comma(num){
	var len, point, str;
	num= num+"";
	point = num.length % 3;
	len = num.length;
	
	str = num.substring(0, point);
	while(point < len) {
		if(str !="") str += ",";
		str += num.substring(point, point + 3);
		point += 3;
	}
	return str;
};

/**
 * 날짜받아오기
 */
function date(start,end){
	openAPI.param.fromDt="";
	openAPI.param.toDt="";
	dataLoad();	
}

/**
 * 검색 버튼 클릭
 */
function search(){
	var checkedValue = $("input[type=radio][name=sort]:checked").val();
	var toDt = document.getElementById("end_dt").value;
    var fromDt = document.getElementById("start_dt").value;
	var searchtext = document.getElementById("input_keyword").value;	
	
	openAPI.param.fromDt = fromDt.replace(/-/g, ".");
	openAPI.param.toDt = toDt.replace(/-/g, ".");
	openAPI.param.sort = checkedValue;
	openAPI.param.q = searchtext;
	openAPI.param.pageNo = null;
	if(fromDt > toDt){
		alert("검색 날짜를 다시 선택해주세요");
	}else{
		dataLoad();
	}
	
}

function setRecent( y, m, d, btn ){
    // 종료일을 현재날짜로
    var toDt = getFormatDate();

    var fromDt = getFormatDate(toDt, y, m, d);
    document.getElementById("end_dt").value= toDt;
    document.getElementById("start_dt").value= fromDt;

    // 버튼 활성화
    if( btn ) setRecentBtn( btn );

}

function setRecentBtn( btn ){
    $('#week, #mon, #threeMon').removeClass('btn_gray btn_blue').addClass('btn_gray');
    if( btn ) $('#' + btn).removeClass('btn_gray').addClass('btn_blue');

}

/**
 * ymd : yyyy.mm.dd, 검증된 날짜만 사용
 */
function getFormatDate( ymd, y, m, d ){
    var formatDate;
    if( ymd ) {
        var ary = ymd.split('-');
        formatDate = new Date(ary[0], Number(ary[1]) - 1, Number(ary[2]));
    } else formatDate = new Date();

    formatDate.setFullYear( formatDate.getFullYear() + (( y ) ? y : 0), formatDate.getMonth() + (( m ) ? m : 0), formatDate.getDate() + (( d ) ? d : 0) );

    // format
    return formatDate.getFullYear() + '-' + stringFormat( formatDate.getMonth() + 1, 2 ) + '-' + stringFormat( formatDate.getDate(), 2 );
}

/**
 * 월, 일에 '0' 추가하기
 */
function stringFormat( str, n ){
    var s = '' + str;
    for( var i = 0 ; i < n - ( s.length ) ; i++ ){
        s = '0' + s;
    }
    return s;
}
