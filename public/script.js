var i = 0
var txt = 'By Alexander Anthony'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var $window = $(window)
var $all = $(".all")
var $chevDown = $(".chev-down");
var direction = 1;


var state = {
  page: 0,
  pageAnimations: [true, false, false, false, false, false],
  pageTops: [0, 0, 0, 0, 0, 0],

}

function calibratePageTops() {
  state.pageTops = state.pageTops.map((top, i) => {
    return $(".block-container").outerHeight() * -i
  })
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
  $chevDown.fadeIn(1000);
}

var chevBottom = parseInt($chevDown.css("bottom"), 10)

var moveChev = setInterval(() => {

  if (direction < 0) {
    var px =  chevBottom + 5 + "px"
    direction = 1
  } else {
    var px = chevBottom + "px"
    direction = -1
  }
  $chevDown.animate({
    bottom: px
  }, 500)
}, 500)





$window.on("load", () => {
  sizeBlocks()
  calibratePageTops()
  $("#header-text").fadeIn(1500, "linear", () => {
    typeWriter()
  });
})

$window.on("resize", () => {
  console.log("resize")
  sizeBlocks()
  calibratePageTops()
})

function sizeBlocks() {
  for (var i = 0; i < 5; i++) {
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

var textIndex = 0


function animateBlocks(page) {
  if (page == 0) {
    moveChev
  } else if (page < 3 && !state.pageAnimations[page]) {
    animateText(page)
  } else if (page >= 3 && !state.pageAnimations[page]){
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
    $(headingsLeft[textIndex]).animate({
      right: percent
    }, 200, () => {
      $(headingsRight[textIndex]).animate({
        left: percent
      }, () => {
        $(texts[textIndex]).animate({
          opacity: 1
        }, 1000, () => {
          state.pageAnimations[page] = true
          textIndex++
        })
      })
    })
}

var iconHeadings = $(".icon-heading");
var icons = $(".icon")

var iconIndex = 0

function animateIcons() {
  $(iconHeadings[iconIndex]).children().each(function(i) {
      var item = $(this);
      setTimeout(function() {
        item.addClass('grow');
      }, i*500); // delay 100 ms
    });
    if (iconIndex > 0) {
      icons = $(".icon-1")
    }
    icons.each(function(index) {
      $(this).delay(1500 + 200*index).animate({
        opacity: 1
      }, 500);
    })
    iconIndex++
}

var scrolling = false;


window.addEventListener('wheel', function(event) {
  if (!scrolling) {
    scrolling = true
    if (event.deltaY < 0 && state.page > 0) {
      state.page--
    } else if (event.deltaY > 0 && state.page < 5) {
      console.log("down")
      state.page++
      if (state.page > 0) {
        clearInterval(moveChev)
      }
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
    if (state.page < 5) {
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

$('form').on("submit", () => {
  event.preventDefault()
  $.ajax({
    type: "POST",
    url: "/contact",
    data: {name: $("#name").val()}
  })
  .done((response) => {
    console.log("done")
  })
})
