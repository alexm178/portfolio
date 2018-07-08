var i = 0;
var txt = 'By Alexander Anthony'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */


var state = {
  sm: () => {return $(window).width() < "768"},
  blocks: [
    $("#first-block"),
    $("#second-block"),
    $('#third-block')
  ],
  pairs: [
    $("#first-pair"),
    $("#third-block")
  ],
  headings: [
    "first-heading",
    "second-heading",
  ],
  text: [
    "first-text",
    "second-text",
  ],
  watching: 0,
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
  var $chevDown = $("#chev-down");
  var direction = "down";
  setInterval(() => {
    if (direction === "up") {
      var px = "10px"
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


$(window).on("load", () => {
  resize()
  $("#header-text").fadeIn(1500, "linear", () => {
    typeWriter()
  })
})


function resize() {
  var secondText = '<div class="col-md-6 text" id="second-text"><p>Mastery of both front-end and back-end development means that I can deliver a custom product tailored to your needs, no matter how complex those may be.  User authentication, real-time updates using web-sockets, complex data pipelines, and secure payment solutions can all be added to your website!</p></div>';
  var secondHeading = '<div class="col-md-6 text-center heading" id="second-heading"><div id="a-galaxy-of">A GALAXY OF</div><div id="possibilities">POSSIBILITIES</div></div>';
  $("#second-block").html(() => {
    if (state.sm()) {
      return secondHeading + secondText
    } else {
      return secondText + secondHeading
    }
  });
}

$(window).on("resize", () => {
  resize()
})

$(window).on("scroll", () => {
    if (state.sm()) {
      if (isInViewport($(state.blocks[state.watching]))) {
        if ($(document.getElementById(state.headings[state.watching])).css("right") !== "0px") {
          animateBlocksSmall()
        }
      }
    } else {
      if (isInViewport($(state.pairs[state.watching]))) {
        animateBlocksLarge();
      }
    }
})

function isInViewport(element){
  var elementTop = element.offset().top;
  var elementBottom = elementTop + element.outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom < viewportBottom + 50;
};

function animateBlocksSmall() {
  if (state.watching === 2) {
    animateLogoSection()
  } else {
    $(document.getElementById(state.headings[state.watching])).animate({
      right: "0px"
    })
    $(document.getElementById(state.text[state.watching])).animate({
      left: "0px"
    })
    if (state.watching < state.blocks.length -1) {
      state.watching++
    }
  }
}

function animateBlocksLarge() {
  if (state.watching === 1) {
    animateLogoSection()
  } else {
    state.blocks[state.watching].animate({
      right: "0px"
    })
    state.blocks[state.watching + 1].animate({
      left: "0px"
    })
    state.watching++
  }
}

function animateLogoSection() {
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
