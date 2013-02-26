(function( $ ){
    var contName, contIndex, contPosition = new Array();

    // rebind the position of headers
    $.fn.jqRebound = function() {
        contPosition = [];
        this.children('li').each(function(){
            contName = '.'+$(this).attr("class").split(' ')[0]+'-cont';
            contPosition.push($(contName).offset().top);
        });
    };
    
  $.fn.jqscroll = function() {
    var that = this;
    
    this.children('li').each(function(){
      contName = '.'+$(this).attr("class")+'-cont';
      contPosition.push($(contName).offset().top);
    });

    this.children('li').children('a').click(function(){      
      contIndex = $(this).parent().parent().children().index($(this).parent());
      $('body,html').animate({scrollTop: contPosition[contIndex]-contPosition[0]}, 300);
      return false;
    });


    $(window).scroll(function () {
      var curTop = $(this).scrollTop();
      that.children('h3').html(curTop);
      that.children().removeClass('currBm');
      var contLength = contPosition.length;
      for(var i=0; i<contLength; i++) {
        if(curTop >= contPosition[contLength-1]-5) {
          that.children('li:nth-child('+(contLength)+')').addClass('currBm');
            return false;
        }
        if(curTop >= contPosition[i]-contPosition[0]-5 && curTop < contPosition[i+1]-contPosition[0]-5) {
          that.children('li:nth-child('+(i+1)+')').addClass('currBm');
        }
      }
    });
  }
})( jQuery );
