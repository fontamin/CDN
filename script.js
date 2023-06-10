var win, container;
//-
$(document).ready(function($) {
  win = $(window);
  container = $("section");
  //-
  container.find("a").each(function() {
    new SplitFont($(this));
  });
});

//- FONT -
var SplitFont = function(_element) {
  var t = this;
  t.el = _element;
  t.splitText = new SplitText(t.el, { type: "words" });
  t.numwords = t.splitText.words.length;
  //
  t.words = [];
  for (var i = 0; i < t.numwords; i++) {
    var word = $(t.splitText.words[i]);
    var text = word.text();
    word.html('</span><span class="c2">' + text + "</span>");
  }

  //- FunctionsEDited
  t.changeWeight = function(_mouseX, _wght, _vel, _delayVel) {
    for (var i = 0; i < t.numwords; i++) {
      var word = $(t.splitText.words[i]);
      //-
      var delay = Math.abs(word.offset().left - _mouseX) * _delayVel;
      TweenMax.to(word.find(".c2"), _vel, {
        "font-variation-settings": '"wght" ' + _wght + ', "KSHD" 100',
        delay: delay,
        overwrite: 5
      });
    }
  };

  //- Events
  t.el
    .bind("mouseenter", function(e) {
      //$(this).addClass('over');
      t.changeWeight(e.clientX, 900, 0.3, 0.002);
    })
    .bind("mouseleave", function(e) {
      //$(this).removeClass('over');
      t.changeWeight(e.clientX, 100, 0.5, 0.002);
    });
};
