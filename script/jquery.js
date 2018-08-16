$(window).load(function () {
    var sH = $(window).height();
    $('main').css('height', (sH - 100) + 'px');
    $('#divSvg').css('height', (sH - 350) + 'px');
    var divHP = $('#projectTree').height();
    console.log(sH+" "+ divHP );
    var He = sH - divHP - 330;
    $('#elem_prop').css('height', (He) + 'px');
});
