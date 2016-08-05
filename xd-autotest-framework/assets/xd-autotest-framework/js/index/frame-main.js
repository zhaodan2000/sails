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
  $.each($(".side-nav>li"), function () {
    var node = $(this);
    node.click(function () {
      $(".active").removeClass("active");
      var target = node.children();
      $.main.refreshRight(target.attr("target"));
    });
  });
});
