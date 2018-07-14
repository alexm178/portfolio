var i = 0
var txt = 'By Alexander Anthony'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var $window = $(window)
var $all = $(".all")
var $chevDown = $(".chev-down");

var direction = 1;


var state = {
  page: 0,
  pageAnimations: [true, false, false, false, false],
  pageTops: [0, 0, 0, 0, 0],
}

function calibratePageTops(resize) {
  state.pageTops = state.pageTops.map(function(top, i) {
    return $(".block-container").outerHeight() * -i
  })
  if (resize) {
    scrollToPage(state.page)
  }
}

function typeWriter() {
  if (i < txt.length) {
    $("#header-footer").html(function(){ return ($("#header-footer").html() + txt.charAt(i))});
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

var moveChev = setInterval(function() {

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





$window.on("load", function() {
  formatHeadings()
  sizeBlocks()
  calibratePageTops()
  $("#header-text").fadeIn(1500, "linear", function() {
    typeWriter()
  });
})

$window.on("resize", function() {
  formatHeadings(true)
})

function formatHeadings(resize) {
  var headingsLeft = $(".heading-left");
  var headingsRight = $(".heading-right")
  if (window.outerWidth >= 756 || (window.outerWidth > window.innerHeight && window.innerHeight < 756)) {
    $(headingsLeft[0]).html("STELLAR&nbsp");
    $(headingsLeft[1]).html("A GALAXY OF&nbsp");
    headingsLeft.each(function(index) {
      if (state.pageAnimations[index + 1]) {
        $(headingsLeft[index]).css({
          "right": "50%"
        })
      }
    })
    headingsRight.each(function(index) {
      if (state.pageAnimations[index + 1]) {
        $(headingsRight[index]).css({
          "left": "50%"
        })
      }
    })
  } else {
    $(headingsLeft[0]).html("STELLAR");
    $(headingsLeft[1]).html("A GALAXY OF");
    headingsLeft.each(function(index) {
      if (state.pageAnimations[index + 1]) {
        $(headingsLeft[index]).css({
          "right": "0px"
        })
      }
    })
    headingsRight.each(function(index) {
      if (state.pageAnimations[index + 1]) {
        $(headingsRight[index]).css({
          "left": "0px"
        })
      }
    })
  }
  if (resize) {
    sizeBlocks(true)
  }
}

function sizeBlocks(resize) {
  for (var i = 0; i < 5; i++) {
    sizeBlock(i)
  }
  if(resize) {
    calibratePageTops(true)
  }
}




function sizeBlock(i) {
  var vph = $window.innerHeight()
  var $block = $($(".block").get(i))
  $block.css({
    "top": (vph - $block.height()) / 2  + "px"
  })
}





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
  var headingsLeft = $(".heading-left");
  var headingsRight = $(".heading-right")
    var percent;
    console.log((window.outerWidth > window.innerHeight && window.innerHeight < 756))
    if (window.outerWidth >= 756 || (window.outerWidth > window.innerHeight && window.innerHeight < 756)) {
      percent = "50%"
    } else {
      percent = "0%"
    }
    $(headingsLeft[textIndex]).animate({
      right: percent
    }, 200, function() {
      $(headingsRight[textIndex]).animate({
        left: percent
      }, function() {
        $(texts[textIndex]).animate({
          opacity: 1
        }, 1000, function() {
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
  setTimeout(function() {
    animateBlocks(page)
  }, 500)
  setTimeout(function() {
    scrolling = false
  }, 2000)
}

$window.on("swipeup", function() {
  if (!scrolling) {
    if (state.page < 5) {
      state.page++
    }
    scrollToPage(state.page)
  }
})

$window.on("swipedown", function() {
  if (!scrolling) {
    if (state.page > 0) {
      state.page--
    }
    scrollToPage(state.page)
  }
})

$(".chev-down").on("click", function() {
  state.page++;
  scrollToPage(state.page)
})


var btn = $(".form-btn")

btn.on("click", function(event) {
  event.preventDefault()
  $.ajax({
    type: "POST",
    url: "/contact",
    data: {
      name: $("#name").val(),
      email: $("#email").val(),
      subject: $("#subject").val(),
      phone: $("#phone").val(),
      content: $("#content").val(),
    }
  })
  .done(function(response) {
    if (response === "200") {
      btn.text("Success!")
      btn.removeClass("btn-primary");
      btn.addClass("btn-success disabled");
      $("input, textarea").val("")
    } else {
      alert("Something went wrong. Please Retry.")
    }
  })
  .fail(function() {
    alert("Something went wrong. Please Retry.")
  })
})

$("input").on("change", function(){

  if(btn.hasClass("disabled")) {
    console.log("disabled");
    btn.text("Submit")
    btn.removeClass("btn-success disabled");
    btn.addClass("btn-primary");
  }
})
