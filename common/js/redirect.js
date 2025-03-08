
function backAjaxMsg(url,msg){
    alert(msg);
    var rurl = url;
    rurl = rurl.replace(/&amp;/g,"&");
    moveTreeContents(rurl);
}
function backMsg(url,msg){
    alert(msg);
    if(url == ""){
        window.history.back();
    }else{
        location.href = url;
    }

}
function msg(msg){
    alert(msg);

}
function popupRedirect(url,schema){

    try
    {
        $(opener.location).attr("href", url);
    }
    catch (exception)
    {
        window.open(schema, 'NeoPopupWindow');
    } finally {
        window.close();
    }
}
function popupRedirectMsg(url,msg){
    alert(msg);
    var rurl = url;
    rurl = rurl.replace(/&amp;/g,"&");
    $(opener.location).attr("href", rurl);
    close();
}
function redirect(url){
    var rurl = url;
    rurl = rurl.replace(/&amp;/g,"&");
    $(location).attr("href", rurl);
}
function redirectAjax(url,msg){
    alert(msg);
    var rurl = url;
    rurl = rurl.replace(/&amp;/g,"&");
    moveTreeContents(rurl);
}
function redirectMsg(url,msg){
    alert(msg);
    var rurl = url;
    rurl = rurl.replace(/&amp;/g,"&");
    $(location).attr("href", rurl);

}