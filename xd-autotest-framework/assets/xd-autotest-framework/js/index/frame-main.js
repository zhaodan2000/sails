/**
 * Created by zhaodan on 16/8/4.
 */
$(function () {
  var main = {
    refresh: function (url) {
      $.ajax({
        url: url,
        success: function (data) {
          $("#page-wrapper").html(data);
        }
      });
    }
  };
  $.each($(".side-nav>li"), function () {
    var node = $(this);
    node.click(function () {
      var target = node.children();
      main.refresh(target.attr("target"));
    });
  });

});
