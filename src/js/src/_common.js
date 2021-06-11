/**
 * --------------------------------------------------------------------------
 *  common.js
 * --------------------------------------------------------------------------
 */

var front = front || {};


front.common = front.common || {};

front.common = (function () {

  var init = function() {
    this.a();
    this.inputFile();
    this.commonHandler();
  };

  var a = function () {
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });
  }

  var inputFile = function () {
    $('.custom-file-input').on('change', function() {
      let fileName = $(this).val().split('\\').pop();
      $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
      // $(this).siblings('.custom-file-label').addClass('selected').html(fileName).css({'color':'#333','border-color':'#333'});
    });
  }




  var commonHandler = function () {
    // console.log($('img').length);
    // $('img').each(function(){
      // console.log($(this).height());
      //$(this).attr('src','../../img/example/img-milkt.png'); //가로 긴 이미지
      //$(this).attr('src','../../img/example/img-training-institute.png'); // 세로긴 이미지
      // var w = $(this).width()
      // var h = $(this).height()
      //
      // if (w / h  > 1) {
      //   $(this).css({'height': '100%'})
      // } else {
      //   $(this).css({'width': '100%'})
      // }
    // })

    $(document).on({
      'show.bs.modal': function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
          $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);

      },
      'hidden.bs.modal': function () {
        if ($('.modal:visible').length > 0) {
          // restore the modal-open class to the body element, so that scrolling works
          // properly after de-stacking a modal.
          setTimeout(function () {
            $(document.body).addClass('modal-open');
          }, 0);
        }
      }
    }, '.modal');

  }
  return {
    a : a,
    commonHandler : commonHandler,
    inputFile : inputFile,
    init : init
  }
})();

$(function () {
  front.common.init();
});





front.loading = front.loading || {};

front.loading = (function () {
  var showLoading = function () {
    $('._loading').show()
  }
  var hideLoading = function () {
    $('._loading').hide()
  }
  return {
    showLoading : showLoading,
    hideLoading : hideLoading
  }
})();


/*
|----------------------------------|
|      교과학습에서만든 아코디언 JS
|----------------------------------|
*/
$(document).ready(function () {
  /*1depth 아코디언 마지막줄 radius 와 border-bottom line 정의  */
  $('.list-accordion .item:last-child .item_body.collapse').on('show.bs.collapse', function(event){
    $('.list-accordion .item:last-child .item_head').css('border-bottom-left-radius','0px');
    $('.list-accordion .item:last-child .item_head').css('border-bottom-right-radius','0px');
    $('.list-accordion .item:last-child .item_body').css('border-bottom','0px solid #e0e0e0');
    $('.list-accordion').css('border-bottom','1px solid #e0e0e0');
    event.stopPropagation();
  }).on('hide.bs.collapse', function(event){
    $('.list-accordion .item:last-child .item_head').css('border-bottom-left-radius','10px');
    $('.list-accordion .item:last-child .item_head').css('border-bottom-right-radius','10px');
    $('.list-accordion').css('border-bottom','0px solid #e0e0e0');
  });



  /* debug 93 */
  $('.item:last-child .item_body').on('show.bs.collapse', function(event){
    //TP2-1021 팝업아코디언 item-head border-bottom color변경
    $('.item:last-child .item_head').css('border-bottom','1px solid #ccc');
  });


  /*
  |----------------------------------|
  |          아코디언 화살표 제어
  |----------------------------------|
  */
  /*item body(외부) 아코디언 화살표 재어 */
    //아코디언 1dep body name : item_body
    $('.item_body.collapse').on('show.bs.collapse', function(event){
      $(this).parent().find('.arrow').removeClass('down').addClass('up');
      event.stopPropagation();
    }).on('hide.bs.collapse', function(event){
      $(this).parent().find('.arrow').removeClass('up').addClass('down');
      event.stopPropagation();
    });

  /*contents_body(내부) 아코디언 화살표 재어 */
    //아코디언 2dep body name : contents_body
    $('.contents_body.collapse').on('show.bs.collapse', function(event){
      $(this).parent().find('.btn-icon-circle').removeClass('down').addClass('up');
      $(this).parent().find('.arrow-circle').removeClass('down').addClass('up');
      event.stopPropagation();
    }).on('hide.bs.collapse', function(event){
      $(this).parent().find('.btn-icon-circle').removeClass('up').addClass('down');
      $(this).parent().find('.arrow-circle').removeClass('up').addClass('down');
      event.stopPropagation();
    });

    //아코디언 2dep body name : body_contents :: 유치에서는 body_contents를 내부로 씀 
    $('.body_contents.collapse').on('show.bs.collapse', function(event){
      $(this).parent().find('.btn-icon-circle').removeClass('down').addClass('up');
      $(this).parent().find('.arrow-circle').removeClass('down').addClass('up');
      event.stopPropagation();
    }).on('hide.bs.collapse', function(event){
      $(this).parent().find('.btn-icon-circle').removeClass('up').addClass('down');
      $(this).parent().find('.arrow-circle').removeClass('up').addClass('down');
      event.stopPropagation();
    });

  /*
  |---------------------------------------|
  | 아코디언 스크롤 클릭한 head position follow
  |---------------------------------------|
  */
  // $('.item_head .txt').on('click',function(){
  //   const position_this = $(this).data('target');
  //   const positoin_this_scroll = $(position_this).offset().top;
  //   $( 'html, body' ).animate( { scrollTop : positoin_this_scroll }, 400 );
  // });
});



/*
|----------------------------------|
|     티칭보드 투명한 재생아이콘 CSS
|----------------------------------|
*/
// $(document).ready(function () {
//   $('.icon-play-md-white').parents('.icon_area').css('background','none');
// });

/*
|----------------------------------|
|            popup click
|----------------------------------|
*/
function subject_popup() {

   //버튼 클릭시
  $('._pop-click').click(function(){

  //대단원,중단원 팝업위치
   /* debug :: 583 */
    const bodyWidth = $(this).parents('.popup').outerWidth();
    
    const leftPopbtn = $(this).position().left;
    
    const popButton = $(this).outerWidth();
    
    const bodyPopbtnRight = bodyWidth - (leftPopbtn + popButton ); // popButton = 버튼사이즈 , 58.5 = 버튼 반값
    
    $(this).siblings('.subject_detail').css('right',bodyPopbtnRight);

    //교과학습 팝오버 내부 컨텐츠 사이즈별 width resizing
    // const columns = $(this).siblings('.popup-contents').find('.subject_detail_contents .subject_detail_contents_columns');
    // if (columns.length == 4) {
    //   $(columns).css('width','25%');
    // }else if (columns.length == 3) {
    //   $(columns).css('width','33.3333%');
    // }else if (columns.length == 2) {
    //   $(columns).css('width','50%');
    // }else if (columns.length == 1) {
    //   $(columns).css('width','100%');
    // }

    const pop_contents = $(this).siblings('.popup-contents');
    if(!pop_contents.hasClass('show')){
      $('._pop-click').siblings('.popup-contents').removeClass('show');
      pop_contents.addClass('show');
    } else {
      pop_contents.removeClass('show');
    }

    return false;
  });


  //X 버튼 클릭시
  $('._pop-click_close').click(function(){
    $(this).parent('.popup-contents').removeClass('show');
    return false;
  });

  //popup 외부 클릭시
  $('body').click(function(e){
      if($(e.target).closest('.popup-contents').length == 0){
        $(".popup-contents").removeClass('show');
      }
  });


}

function file_popup() {
  //버튼 클릭시
  $('._popup-attachments').click(function(){
    var pop_contents = $("._popup-attachments_contents");
    if(!pop_contents.hasClass('show')){
      pop_contents.addClass('show');
    } else {
      pop_contents.removeClass('show');
    }
    pop_contents.css('top',$(this).offset().top - 200);
    pop_contents.css('right','25px');
  });

 //X 버튼 클릭시
  $('._pop-click_close').on('click', function(){
    $(this).parent('.popup-common').removeClass('show');
  });

  //popup 외부 클릭시
  $('body').click(function(e){
    if($(e.target).find('.popup-common').length == 1){
      $(".popup-common").removeClass('show');
    }
  });
}


/*
 |----------------------------------|
 |            슬라이드
 |----------------------------------|
 */
 function slideStart(){
  $(".slide").each(function(index, element){
      var $this = $(this);
      $this.addClass('slide-' + index);
      $('.slide-'+ index).siblings('span').find('.next').css('border','1px solid red');
      
      var swiper = new Swiper('.slide-' + index, {
          observer: true,
          observeParents: true,
          slidesPerView : 5,
          spaceBetween: 15,
          navigation: {
              nextEl: $('.slide-'+ index).siblings('span.next'),
              prevEl: $('.slide-'+ index).siblings('span.prev'),
          },
          watchOverflow: true,
          breakpoints:{ 
            760: {
              slidesPerView: 2,
              spaceBetween: 8
            },
          }
      });

      const slide_num = '.slide-' + index;
      if ($(slide_num).find('.swiper-slide').length < 6) {
          $(slide_num).siblings('.slide-button').hide();
      }
  });
};




/*
|----------------------------------|
|            차시창 삭제
|----------------------------------|
*/
remove = function(target) {
  console.log('remove click');
  $(target).parents('li').remove();
}


/*
|----------------------------------|
|     교과학습 평가자료 체크 벨리데이션
|----------------------------------|
*/
function evaluationCheck (){
  /*평가자료 체크박스 전체 선택,해제 */
  const  thCheckBox = $('.item thead input[type=checkbox]');
  const  tdCheckBox = $('.item tbody input[type=checkbox]');

  thCheckBox.on('click', function(){
    const  tdCheckBox =  $(this).parents('table').children('tbody').find('input[type=checkbox]')
      if($(this).is(':checked')){
        tdCheckBox.prop('checked', true);
      } else {
        tdCheckBox.prop('checked', false);
      }
  })
  tdCheckBox.on("click", function(){
      if($(this).parents('table').children('tbody').find('input[type=checkbox]').length == $(this).parents('table').children('tbody').find('input[type=checkbox]:checked').length)  {
        $(this).parents('table').find('thead').find('tr').find('th').find('div').find('input[type=checkbox]').prop('checked', true);
      }else {
        $(this).parents('table').find('thead').find('tr').find('th').find('div').find('input[type=checkbox]').prop('checked', false);
      }
    })
}
