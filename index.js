var $drag;
var ofs;

function drag_begin(event) {
  //Get the actual window
  $drag = $(this).closest(".windowframe");

  //Bring it to top of Z order by making it the target

  //Retrieve its current position
  var curofs = $drag.offset();

  //Calculate mouse cursor position relative to top-left of window frame
  ofs = {
    left: event.pageX - curofs.left,
    top: event.pageY - curofs.top,
  };

  //Set event handlers
  $("body").on("mousemove", drag_mousemove);
  $drag.on("mouseup", drag_end);
  event.preventDefault();
}

function drag_end(event) {
  $("body").off("mousemove", drag_mousemove);
  $drag.off("mouseup", drag_end);
}

function drag_mousemove(event) {
  $drag.css(
    "transform",
    "translateX(" +
      (event.pageX - ofs.left) +
      "px) translateY(" +
      (event.pageY - ofs.top) +
      "px)"
  );
  event.preventDefault();
}

$(function () {
  $(".windowframe").on("mousedown", function (event) {});
  $(".titlebar").on("mousedown", ".buttons", function (event) {
    event.stopPropagation();
  });
  $(".moveable .titlebar").on("mousedown", drag_begin);
  $(".titlebar").on("click", "button.maximise", function () {
    $(this).closest(".windowframe").toggleClass("maximised moveable");
  });
  $(".titlebar").on("click", "button.close", function () {
    $(this).closest(".windowframe").remove();
  });
});

document
  .getElementById("contact-a")
  .addEventListener("click", function (event) {
    document.getElementById("dialog-window").style.visibility = "visible";
  });
