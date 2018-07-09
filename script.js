var i = 0
var txt = 'By Alexander Anthony'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var $window = $(window)
var $all = $(".all")

var state = {
  page: 0,
  pageAnimations: [true, false, false, false],
  pageTops: [0, 0, 0, 0],
  calibratePageTops: () => {
    state.pageTops = state.pageTops.map((top, i) => {
      return $(".block-container").outerHeight() * -i
    })
  }
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
  sizeBlocks()
  state.calibratePageTops()
  $("#header-text").fadeIn(1500, "linear", () => {
    typeWriter()
  });
})

$window.on("resize", () => {
  console.log("resize")
  sizeBlocks()
  state.calibratePageTops()
})

function sizeBlocks() {
  for (var i = 0; i < 3; i++) {
    sizeBlock(i)
  }
}




function sizeBlock(i) {
  var vph = $window.innerHeight()
  var $block = $($(".block").get(i))
  $($(".heading-container").get(i)).css({
    "margin-top": (vph - $block.height()) / 2 + "px"
  })
}




var headingsLeft = $(".heading-left");
var headingsRight = $(".heading-right")
var texts = $(".text")


function animateBlocks() {
  if (state.page < 3 && !state.pageAnimations[state.page]) {
    animateText(state.page)
  } else if (!state.pageAnimations[state.page]){
    animateIcons()
  }
}

function animateText(page) {
    var percent;
    if ($window.width() > 768) {
      percent = "50%"
    } else {
      percent = "0%"
    }
    $(headingsLeft[page - 1]).animate({
      right: percent
    }, 200, () => {
      $(headingsRight[page - 1]).animate({
        left: percent
      }, () => {
        $(texts[page - 1]).animate({
          opacity: 1
        }, 1000, () => {
          state.pageAnimations[page] = true
        })
      })
    })
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


window.addEventListener('wheel', function(event) {
  if (!scrolling) {
    scrolling = true
    if (event.deltaY < 0 && state.page > 0) {
      state.page--
    } else if (event.deltaY > 0) {
      state.page++
    }
    scrollToPage(state.page)
  }
  event.preventDefault()
  event.stopPropagation()
});

function scrollToPage(page) {
  $all.animate({top: state.pageTops[page]}, 1000);
  setTimeout(() => {
    animateBlocks(page)
  }, 500)
  setTimeout(() => {
    scrolling = false
  }, 2000)
}

$window.on("swipeup", () => {
  if (!scrolling) {
    if (state.page < 3) {
      state.page++
    }
    scrollToPage(state.page)
  }
})

$window.on("swipedown", () => {
  if (!scrolling) {
    if (state.page > 0) {
      state.page--
    }
    scrollToPage(state.page)
  }
})

$(".chev-down").on("click", () => {
  state.page++;
  scrollToPage(state.page)
})
