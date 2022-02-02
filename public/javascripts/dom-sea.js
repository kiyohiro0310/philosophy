$(document).ready(function(){
    $('#right-arrow').on('mouseover', function(){
        $('.top').toggleClass('show');
    });
    $('#right-arrow').on('mouseout', function(){
        $('.top').toggleClass('show');
    });
});