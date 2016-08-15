/**
 * Created by zhaodan on 16/8/4.
 */
;(function ($) {
  $.main = $.main || {};
  $.main.refreshRight = function (url, option) {
    if ($("#page-wrapper-right")) {
      var _option = {};
      _option.data = option&&option.data? option.data:{};
      $.ajax({
        url: url,
        data : _option.data,
        success: function (data) {
          $("#page-wrapper-right").html(data);
        }
      });
    }
  };
})(jQuery);
$(function () {
  $.each($(".right-operation>li"), function () {
    var node = $(this);
    node.click(function () {
      var target = node.children();
      if (target && target.attr("target"))
        $.main.refreshRight(target.attr("target"));
    });
  });
});
