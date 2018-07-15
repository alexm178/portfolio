var i = 0
var txt = 'By Alexander Anthony'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var $window = $(window)
var $all = $(".all")
var $chevDown = $(".chev-down");

var direction = 1;


var state = {
  page: 0,
  pageAnimations: [true, false, false, false, false, true],
  pageTops: [0, 0, 0, 0, 0, 0],
}

function calibratePageTops(resize) {
  // state.pageTops = state.pageTops.map(function(top, i) {
  //   if (i === 5) {
  //     return window.innerHeight * -4.5
  //   } else {
  //     return window.innerHeight * -i
  //   }
  // })

  state.pageTops = state.pageTops.map(function(top, i) {
    return window.innerHeight * -i
  })


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
  $("#header-text").animate({opacity: 1}, 1500, "linear", function() {
    typeWriter()
  });
})

$window.on("resize", function() {
  calibratePageTops()
  formatHeadings()
  sizeBlocks()
  $all.css({top: state.pageTops[state.page]})
})

function formatHeadings(resize) {
  var headingsLeft = $(".heading-left");
  var headingsRight = $(".heading-right")
  if (window.outerWidth >= 756 || (window.outerWidth > window.innerHeight && window.innerHeight < 576)) {
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
}

function sizeBlocks(resize) {
  for (var i = 0; i < 5; i++) {
    sizeBlock(i)
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

var textIndex = 0

function animateText(page) {
  var i = textIndex;
  textIndex++;
  var headingsLeft = $(".heading-left");
  var headingsRight = $(".heading-right")
    var percent;
    if (window.outerWidth >= 756 || (window.outerWidth > window.innerHeight && window.innerHeight < 576)) {
      percent = "50%"
    } else {
      percent = "0%"
    }
    $(headingsLeft[i]).animate({
      right: percent
    }, 200, function() {
      $(headingsRight[i]).animate({
        left: percent
      }, function() {
        $(texts[i]).animate({
          opacity: 1
        }, 1000, function() {
          state.pageAnimations[page] = true;
        })
      })
    })
}

var iconHeadings = $(".icon-heading");
var icons = $(".icon")

var iconIndex = 0;


function animateIcons() {
  var i = iconIndex
  iconIndex++
  $(iconHeadings[i]).children().each(function(i) {
      var item = $(this);
      setTimeout(function() {
        item.addClass('grow');
      }, i*500); // delay 100 ms
    });
    if (i > 0) {
      icons = $(".icon-1")
    }
    icons.each(function(index) {
      $(this).delay(1500 + 200*index).animate({
        opacity: 1
      }, 500);
    })
}

var scrolling = false;


window.addEventListener('wheel', function(event) {
  if (!scrolling) {
    scrolling = true
    if (event.deltaY < 0 && state.page > 0) {
      state.page--
    } else if (event.deltaY > 0 && state.page < 6) {
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
  }, 1500)
}

$window.on("swipeup", function() {
  if (!scrolling) {
    scrolling = true;
    if (state.page < 5) {
      state.page++;
    }
    scrollToPage(state.page);
  }
})

$window.on("swipedown", function() {
  scrolling = true;
  if (!scrolling) {
    if (state.page > 0) {
      state.page--;
    }
    scrollToPage(state.page);
  }
})

document.addEventListener("keydown", function(event) {
  if (!scrolling) {
    scrolling = true
    switch (event.which) {
      case 40:
        if (state.page < 5) {
          state.page++;
          scrollToPage(state.page);
        }
        break;
      case 38:
      if (state.page > 0) {
        state.page--;
        scrollToPage(state.page)
      }
        break;
      default:
        return
    }
  }
  event.preventDefault()
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

$("#btt").on("click", (e) => {
  $all.animate({top: 0}, 1000);
  state.page = 0
  e.preventDefault()
})
