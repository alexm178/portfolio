var i = 0;
var txt = 'By Alexander Anthony'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var $window = $(window)


function typeWriter() {
  if (i < txt.length) {
    $("#header-footer").html(()=>{ return ($("#header-footer").html() + txt.charAt(i))});
    i++;
    setTimeout(typeWriter, speed);
  } else {
    chevron()
  }
}

function chevron() {
  var $chevDown = $(".chev-down");
  var direction = "down";
  setInterval(() => {
    if (direction === "up") {
      var px = "5px"
      direction = "down"
    } else {
      var px = "0px"
      direction = "up"
    }
    $chevDown.animate({
      bottom: px
    }, 500)
  }, 500)
  $chevDown.fadeIn(1000);
}




$window.on("load", () => {
  $("#header-text").fadeIn(1500, "linear", () => {
    typeWriter()
  })
})

$window.on("resize", () => {
  for (var i = 0; i < $(".block").length; i++) {
    sizeBlock(i)
  }
})




// $(window).on("scroll", () => {
//     if (state.sm()) {
//       if (isInViewport($(state.blocks[state.watching]))) {
//         if ($(document.getElementById(state.headings[state.watching])).css("right") !== "0px") {
//           animateBlocksSmall()
//         }
//       }
//     } else {
//       if (isInViewport($(state.pairs[state.watching]))) {
//         animateBlocksLarge();
//       }
//     }
// })

// function isInViewport(element){
//   var elementTop = element.offset().top;
//   var elementBottom = elementTop + element.outerHeight();
//   var viewportTop = $(window).scrollTop();
//   var viewportBottom = viewportTop + $(window).height();
//   return elementBottom < viewportBottom + 50;
// };
//
// function animateBlocksSmall() {
//   if (state.watching === 2) {
//     animateLogoSection()
//   } else {
//     $(document.getElementById(state.headings[state.watching])).animate({
//       right: "0px"
//     })
//     $(document.getElementById(state.text[state.watching])).animate({
//       left: "0px"
//     })
//     if (state.watching < state.blocks.length -1) {
//       state.watching++
//     }
//   }
// }
//
// function animateBlocksLarge() {
//   if (state.watching === 1) {
//     animateLogoSection()
//   } else {
//     state.blocks[state.watching].animate({
//       right: "0px"
//     })
//     state.blocks[state.watching + 1].animate({
//       left: "0px"
//     })
//     state.watching++
//   }
// }
//
// function animateLogoSection() {
//   $('.third-heading-item').each(function(i) {
//     var item = $(this);
//     setTimeout(function() {
//       item.addClass('grow');
//     }, i*500); // delay 100 ms
//   });
//   $(".icon").each(function(index) {
//     $(this).delay(1500 + 200*index).fadeIn(500);
//   });
// }
//
// $(".chev-down").on("click", () => {
//   $('html, body').animate({scrollTop: state.pairs[0].offset().top * state.page}, 1000);
//   state.page++
// })

function sizeBlock(i) {

  var vph = $window.innerHeight()

  var $blocks = $(".block")

    var $block = $($blocks[i]);
    var blockHeight = $block.outerHeight();
    $block.css({
      "padding-top": (vph - blockHeight) / 2 + "px"
    })

}




var headings = $(".heading");
var texts = $(".text")

var animations = {
  0: false,
  1: false,
  2: false,
}

$window.on("scroll", () => {
  var vph = $window.innerHeight()
  var page = Math.floor($window.scrollTop() / vph - 1)
  switch (page) {
    case 0:
      animateText(page);
      break;
    case 1:
      animateText(page);
      break;
    case 2:
      sizeBlock(page)
      animateIcons();
      break;
  }
})

function animateText(page) {
  sizeBlock(page)
  if (!animations[page]) {
    var percent;
    if ($window.width() > 768) {
      percent = "50%"
    } else {
      percent = "0%"
    }
    $(headings[page * 2]).animate({
      right: percent
    }, 200, () => {
      $(headings[page * 2 + 1]).animate({
        left: percent
      }, () => {
        $(texts[page]).animate({
          opacity: 1
        }, 1000)
      })
    })
  }
}

function animateIcons() {
  $('.third-heading-item').each(function(i) {
      var item = $(this);
      setTimeout(function() {
        item.addClass('grow');
      }, i*500); // delay 100 ms
    });
    $(".icon").each(function(index) {
      $(this).delay(1500 + 200*index).fadeIn(500);
    });
}

var scrolling = false;
var position = 0

function stopScroll(direction, vph) {
  scrolling = false;
  if (direction === "up") {
    position -= vph
  } else {
    position += vph
  }
}

$(window).on('mousewheel', function(event) {
  console.log("mousewheel")
  if (!scrolling) {
    scrolling = true
    var vph = $window.innerHeight()

    if (event.originalEvent.wheelDelta >= 0) {
      scrollUp(vph)
    } else {
      scrollDown(vph)
    }
  }
  event.preventDefault()
});

var ts;
$(document).on('touchstart', function (e){
   ts = e.originalEvent.touches[0].clientY;
   console.log("touch")
});


$(document).on('touchend', function (e){
  var vph = $window.innerHeight()

   var te = e.originalEvent.changedTouches[0].clientY;
   if(ts > te+5){
      scrollDown(vph)
   }else if(ts < te-5){
      scrollUp(vph);
   }

});

function scrollUp(vph) {
  $('html').animate({scrollTop: position - vph}, 1000, () => {
    setTimeout(() => {
      stopScroll("up", vph)
    }, 0)
  });
}

function scrollDown(vph) {
  $('html').animate({scrollTop: position + vph}, 1000, () => {
    setTimeout(() => {
      stopScroll("down", vph)
    }, 0)
  });
}

console.log("derp")
