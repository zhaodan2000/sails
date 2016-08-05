/**
 * Created by zhaodan on 16/8/4.
 */
;(function ($) {
  $.main = {
    refreshRight: function (url) {
      $.ajax({
        url: url,
        success: function (data) {
          $("#page-wrapper").html(data);
        }
      });
    }
  };
})(jQuery);
$(function(){
  $.each($(".operation>li"), function () {
    var node = $(this);
    node.click(function () {
      $(".active").removeClass("active");
      node.addClass("active");
      var target = node.children();
      $.main.refreshRight(target.attr("target"));
    });
  });
});
