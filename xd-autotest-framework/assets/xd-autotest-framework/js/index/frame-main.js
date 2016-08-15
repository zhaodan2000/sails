/**
 * Created by zhaodan on 16/8/4.
 */
;(function ($) {
  $.main = $.main || {};
  $.main.refreshMain = function (url, option) {
    if ($("#page-wrapper")) {
      var _option = {};
      _option.data = option && option.data? option.data:{};
      $.ajax({
        url: url,
        data : _option.data,
        success: function (data) {
          $("#page-wrapper").html(data);
        }
      });
    }
  };
})(jQuery);
$(function () {
  $.each($(".main-operation>li"), function () {
    var node = $(this);
    node.click(function () {
      $(".active").removeClass("active");
      node.addClass("active")
      var target = node.children();
      if (target && target.attr("target"))
        $.main.refreshMain(target.attr("target"));
    });
  });
});
