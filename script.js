var i = 0
var txt = 'By Alexander Anthony'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var $window = $(window)

var state = {
  page: 0
}


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
  });
  sizeBlocks()
})

$window.on("resize", () => {
  console.log("resize")
  sizeBlocks()
})

function sizeBlocks() {
  for (var i = 0; i < 3; i++) {
    sizeBlock(i)
  }
}

//
// $(".chev-down").on("click", () => {
//   $('html, body').animate({scrollTop: state.pairs[0].offset().top * state.page}, 1000);
//   state.page++
// })

function sizeBlock(i) {
  var vph = $window.innerHeight()
  var $block = $($(".block").get(i))
  $($(".heading-container").get(i)).css({
    "margin-top": (vph - $block.height()) / 2 + "px"
  })
}




var headings = $(".heading");
var texts = $(".text")

var animations = {
  0: false,
  1: false,
  2: false,
}

function animateBlocks(page) {
  switch (page) {
    case 0:
      sizeBlock(page)
      animateText(page);
      break;
    case 1:
      animateText(page);
      break;
    case 2:
      animateIcons();
      break;
  }
}

function animateText(page) {
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
  animations.page = true
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
// var page = 0

function stopScroll(direction) {
  scrolling = false;
}

$(window).on('mousewheel', function(event) {
  console.log("wheel")
  if (!scrolling) {
    scrolling = true

    if (event.originalEvent.wheelDelta >= 0) {
      scrollUp(state.page)
      if (state.page !== 0) {
        state.page--
      }
    } else {
      scrollDown(state.page)
      if (state.page !== 2) {
        state.page++
      }
    }
  }
  event.preventDefault()
  event.stopPropagation()
});


function scrollUp(page) {
  console.log("up")
  if (page !== 0) {
    var $all = $(".all")
    var vph = $window.innerHeight()
    var top = $all.offset().top + vph;
    console.log(top)
    $all.animate({top: top}, 1000);
    setTimeout(() => {
      stopScroll()
    }, 1600)
  }
}

function scrollDown(page) {
  console.log("down")
  var $all = $(".all")
  var vph = $window.innerHeight()
  var top = $all.offset().top - vph;
  console.log(top)
  $all.animate({top: top}, 1000);
  setTimeout(() => {
    animateBlocks(page)
  }, 500)
  setTimeout(() => {
    stopScroll()
  }, 1600)
}

$window.on("swipeup", () => {
  if (!scrolling) {
    scrollDown(state.page)
    if (state.page !== 2) {
      state.page++
    }
  }
})

$window.on("swipwdown", () => {
  if (!scrolling) {
    scrollUp(state.page)
    if (state.page !== 0) {
      state.page--
    }
  }
})
