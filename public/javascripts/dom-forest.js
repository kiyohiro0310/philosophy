$(document).ready(function(){
    $('#left-arrow').on('mouseover', function(){
        $('.top').toggleClass('show');
    });
    $('#left-arrow').on('mouseout', function(){
        $('.top').toggleClass('show');
    });
});
