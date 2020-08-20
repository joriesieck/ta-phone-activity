var numpad = {
  /* [INIT - DRAW THE ON-SCREEN NUMPAD] */
  selector : null, // will hold the entire on-screen numpad
  display : null, // will hold the numpad display
  zero : null, // will hold the zero button
  init : function () {
    // CREATE THE NUMPAD
    numpad.selector = document.createElement("div");
    numpad.selector.id = "numpad-back";
    var wrap = document.createElement("div");
    wrap.id = "numpad-wrap";
    numpad.selector.appendChild(wrap);

    // ATTACH THE NUMBER DISPLAY
		var displayWrap = document.createElement("div");
		displayWrap.id = "display-wrap";
		// create display
    numpad.display = document.createElement("input");
    numpad.display.id = "numpad-display";
    numpad.display.type = "text";
    numpad.display.readOnly = true;
		// create delete button
		var deleteButton = document.createElement("div");
		deleteButton.innerHTML = "&#10502;";
		deleteButton.classList.add("top-btn");
		deleteButton.addEventListener("click", numpad.delete);
		// append everything
		displayWrap.appendChild(numpad.display);
		displayWrap.appendChild(deleteButton);
    wrap.appendChild(displayWrap);

    // ATTACH BUTTONS
    var buttons = document.createElement("div"),
        button = null,
        append = function (txt, fn, css) {
          button = document.createElement("div");
          button.innerHTML = txt;
          button.classList.add("numpad-btn");
          if (css) {
            button.classList.add(css);
          }
          button.addEventListener("click", fn);
          buttons.appendChild(button);
        };
    buttons.id = "numpad-btns";

		// first row - 7-9]
		for (var i=7; i<=9; i++) {
			append(i, numpad.digit);
		}
		// second row - 4-6
		for (var i=4; i<=6; i++) {
			append(i, numpad.digit);
		}
		// third row - 1-3
		for (var i=1; i<=3; i++) {
			append(i, numpad.digit);
		}
		// fourth row - *,0,#
		append("*", numpad.digit);
		append(0, numpad.digit);
		append("#", numpad.digit);
		numpad.zero = button;
		// fifth row - call
		append("&#128222;", numpad.select, "ok");

    // Add all buttons to wrapper
    wrap.appendChild(buttons);
    document.body.appendChild(numpad.selector);
  },

  /* [ATTACH TO INPUT] */
  attach : function (opt) {
  // attach() : attach numpad to target input field

    var target = document.getElementById(opt.id);
    if (target!=null) {
      // MAXIMUM ALLOWED CHARACTERS
      target.dataset.max = 7;

			// show numpad
			numpad.show(target);

    } else {
      console.log(opt.id + " NOT FOUND!");
    }
  },

  target : null, // contains the current selected field
  dec : false, // allow decimals?
  max : 7, // max allowed characters
  show : function (evt) {
  // show() : show the number pad

    // Set current target field
    numpad.target = evt;

    // Max allowed characters
    numpad.max = parseInt(numpad.target.dataset.max);

		// no initial display value
		numpad.display.value = "";

    // Show numpad
    numpad.selector.classList.add("show");
  },

  hide : function () {
  // hide() : hide the number pad
    numpad.selector.classList.remove("show");
  },

  /* [BUTTON ONCLICK ACTIONS] */
  delete : function () {
  // delete() : delete last digit on the number pad

    var length = numpad.display.value.length;
    if (length > 0) {
      numpad.display.value = numpad.display.value.substring(0, length-1);
    }
  },

  reset : function () {
  // reset() : reset the number pad

    numpad.display.value = "";
  },

  digit : function (evt) {
  // digit() : append a digit

    var current = numpad.display.value,
        append = evt.target.innerHTML;

    if (current.length < numpad.max) {
      if (current=="0") {
        numpad.display.value = append;
      } else {
        numpad.display.value += append;
      }
    }
  },

  select : function () {
  // select() : select the current number

    var value = parseInt(numpad.display.value);

		let audioUrl = urlObj.url;
		// check number
		if(value===5557125) {
			audioUrl += 'src/audio/rightanswer.mp3';
		} else {
			audioUrl += 'src/audio/wronganswer.mp3';
		}
		// play corresponding audio
		const audio = new Audio(audioUrl);
		audio.play();
		// when audio is over, hide the numpad and display the message & button
		audio.onended = () => {
			document.querySelector('#show-number').style.display = 'block';
			document.querySelector('#msg').style.display = 'block';
			document.querySelector('#msg').textContent = 'Click "Next Topic" to move on or "Show Number" to try again.';
			numpad.hide();
		}
  }
};

/* [INIT] */
window.addEventListener("load", numpad.init);

export default numpad;
