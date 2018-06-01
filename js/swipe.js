var windowH = window.innerHeight;
var windowW = window.innerWidth;
var theShort = windowH > windowW ? windowW:windowH;


var contentW = theShort * 2
var contentH = theShort;

$("#content").width(contentW).height(contentH).css({
  top:(windowH - contentH) /2,
  left:(windowW - contentW)/2
});


var originalWidthOfBoy = 151;
var originalHeightOfBoy = 291;
var roadH = contentH * 0.95;
var endBoyH;
var endBoyW;

function Swipe(container) {
  var element = container.find(":first");
  var slides = element.find("li");
  element.css({
    width: slides.length * contentW + "px",
    height: contentH + "px"
  });
  slides.each(function(index, item) {
    $(item).css({
      width: contentW + "px",
      height: contentH + "px"
    });
  });
  var swipe = {};
  swipe.scrollTo = function(x, speed) {
    let cssObj = {
      "transition-timing-function": "linear",
      "transition-duration": speed + "ms",
      transform: "translate3d(-" + x + "px,0px,0px)"
    };
    element.css(cssObj);
    console.info(cssObj);
  };
  return swipe;
}
function adaptiveSun() {
  var originalSunSize = 201;
  var proportion = contentH * 0.35 / originalSunSize;
  var scaleStr = "scale(" + proportion + ", " + proportion + ")";

  var top = contentH * 0.15 - 0.5 * originalSunSize;
  var left = contentW * 0.4 - 0.5 * originalSunSize;
  $("#sun")
    .css({
      "-webkit-transform": scaleStr,
      "-moz-transform": scaleStr,
      "-ms-transform": scaleStr,
      "-o-transform": scaleStr,
      transform: scaleStr,
      top: top + "px",
      left: left + "px"
    })
    .animate(
      {
        top: contentH * 0.3 - 0.5 * originalSunSize + "px",
        left: -0.6 * originalSunSize + "px"
      },
      5000,
      "linear"
    );
}

function adaptiveBoy() {
  var proportion = contentH * 0.4 / originalHeightOfBoy;
  var scaleStr = "scale(" + proportion + ", " + proportion + ")";
  endBoyH = originalHeightOfBoy * proportion;
  endBoyW = originalWidthOfBoy * proportion;
  var top = roadH - originalHeightOfBoy * 0.5 - endBoyH * 0.5;
  var left = -(originalWidthOfBoy - endBoyW) * 0.5;
  $(".charector").css({
    "-webkit-transform": scaleStr,
    "-moz-transform": scaleStr,
    "-ms-transform": scaleStr,
    "-o-transform": scaleStr,
    transform: scaleStr,
    top: top + "px",
    left: left + "px"
  });
}
function adaptiveGirl() {
  var proportion = contentH * 0.4 / originalHeightOfBoy;
  var scaleStr = "scale(" + proportion + ", " + proportion + ")";
  var endGirlH = originalHeightOfBoy * proportion;
  var endGirlW = originalWidthOfBoy * proportion;
  var top = contentH * 0.7 - originalHeightOfBoy * 0.5 - endGirlH * 0.5;
  var left = contentW * 0.5 - (originalWidthOfBoy - endGirlW) * 0.5;
  $("#girl").css({
    "-webkit-transform": scaleStr,
    "-moz-transform": scaleStr,
    "-ms-transform": scaleStr,
    "-o-transform": scaleStr,
    transform: scaleStr,
    top: top + "px",
    left: left + "px"
  });
}

function initLogo() { 
  var oriH = 86;
  var oriW = 600;
  var proportionW = contentW * 0.6 / oriW;
  var proportionH = contentH * 0.10 / oriH;
  var top = contentH * 0.08 - oriH * 0.5;
  var left = contentW * 0.5 - 0.5 * oriW ;
  var scaleStr = "scale(" + proportionW + ", " + proportionH + ")";
  $("#logo").css({
    "-webkit-transform": scaleStr,
    "-moz-transform": scaleStr,
    "-ms-transform": scaleStr,
    "-o-transform": scaleStr,
    transform: scaleStr,
    top: top + "px",
    left: left + "px",
  });
}

//top,left为boy走到画面中的坐标位置.top为到小男孩较低的top值
function walkXY(time, top, left, foo) {
  var correctionLeft = left - originalWidthOfBoy * 0.5;
  var correctionTop = top - 0.5 * originalHeightOfBoy - 0.5 * endBoyH;
  $(".charector").animate(
    {
      left: correctionLeft + "px",
      top: correctionTop + "px"
    },
    time,
    "linear",
    foo
  );
}
var swipe = Swipe($("#content"));

//门
function initDoor() { 
  var oriH = 231;
  var oriW = 182;
  var proportionW = contentW * 0.13 / oriW;
  var proportionH = contentH * 0.24 / oriH;
  var top = contentH * 0.48 - oriH * 0.5 + 0.5 * oriH * proportionH;
  var left = contentW * 0.52 - 0.5 * oriW + 0.5 * oriW * proportionW;
  var scaleStr = "scale(" + proportionW + ", " + proportionH + ")";
  $(".door").css({
    "-webkit-transform": scaleStr,
    "-moz-transform": scaleStr,
    "-ms-transform": scaleStr,
    "-o-transform": scaleStr,
    transform: scaleStr,
    top: top + "px",
    left: left + "px",
  });
}

function openDoor(){
  $(".door-left").animate({
    left:-91 + 'px'
  },1000);
  $(".door-right").animate({
    left:182 + 'px'
  },1000);
}
function closeDoor(){
  $(".door-left").animate({
    left:0 + 'px'
  },1000);
  $(".door-right").animate({
    left:91 + 'px'
  },1000);
}

$(document).ready(function() {
  initDoor()
  initLogo()
  var timeInterval = 1000;
  //背景图大小自适应
  $(".back-img")
    .attr("width", contentW + "px")
    .attr("height", contentH + "px");
  //小男孩尺寸自适应
  adaptiveSun();
  adaptiveBoy();
  adaptiveGirl();
  walkXY(timeInterval, roadH, contentW * 0.59, function() {
    swipe.scrollTo(contentW, timeInterval);
  });
  //第二幕
  setTimeout(function() {
    $(".b_background > img").attr("src", "images/QixiB-bright.png");
    openDoor()
    walkXY(1000, contentH * 0.8, contentW * 0.59);
    $(".charector").animate(
      {
        opacity: 0
      },
      1000,
      function() {
        $(".charector")
          .removeClass("slow-walk")
          .addClass("slow-walk-flower")
          .animate({
            opacity: 1
          },1000,function(){
            $(".b_background > img").attr("src", "images/QixiB-dark.png");
            closeDoor()
          });
          walkXY(1000, roadH, contentW * 0.59);
      }
    );
  }, timeInterval * 2);
  //第三幕
  setTimeout(function(){
    swipe.scrollTo(contentW * 2, timeInterval);
    walkXY(1000, roadH, contentW * 0.22);
    setTimeout(function(){
      walkXY(1000, contentH * 0.7, contentW * 0.47);
      setTimeout(function(){
        $('#girl').addClass("girl-rotate");
        $('.charector').removeClass('slow-walk-flower').addClass('boy-rotate')

        $('#logo').animate({
          opacity:1
        },2000)
        setTimeout(function(){
          $('#logo').addClass('logoshake')
        },2000)
      },1000)

    },1000)
  },timeInterval * 2 + 4000)

  // walkXY(5000,roadH - 100,contentW)
  // setTimeout(function(){
  //   $(".charector").addClass('pause-walk')
  // },5000)
});
