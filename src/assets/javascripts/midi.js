MidiController = function() {
  this.colorR = 0;
  this.colorG = 0;
  this.colorB = 0;
  this.fontSize = 0;
}
MidiController.prototype.bind = function(event) {
  let comments = document.querySelectorAll(".comment p");
  let sin = '0123456789abcdef'
  console.log(event.data[1] + ":" + event.data[2]);
  switch (event.data[1]) {
    case 2:
      n = Number(event.data[2]) * 2
      this.colorR = sin.charAt(Math.floor(n / 16)) + sin.charAt(n%16)
      break;
    case 3:
      n = Number(event.data[2]) * 2
      this.colorG = sin.charAt(Math.floor(n / 16)) + sin.charAt(n%16)
      break;
    case 4:
      n = Number(event.data[2]) * 2
      this.colorB = sin.charAt(Math.floor(n / 16)) + sin.charAt(n%16)
      break;
    case 12:
      this.fontSize = event.data[2] * 2;
      break;
    case 13:
      this.glitch = event.data[2]
    case 86:
      this.rotate = event.data[2]
      this.update = true
      break;
  }


  var gl = Object.create(glitch_exec);
  color = `#${this.colorR.toString(16)}${this.colorG.toString(16)}${this.colorB.toString(16)}`
  console.log(color)
  comments.forEach(function(comment){
    let style = `font-size: ${this.fontSize}px; color: ${color}; text-shadow:2px 1px 14px #666; white-space: nowrap;`
    document.styleSheets[0].cssRules[1].style.cssText = style
    console.log(comment.style.cssText)

  }, this)
}

midiCon = new MidiController

function success(midiAccess) {
  var inputs = midiAccess.inputs;
  inputs.forEach(function(key, port) {
    console.log("[" + key.state + "] manufacturer:" + key.manufacturer + " / name:" + key.name + " / port:" + port);
    key.onmidimessage = midiCon.bind
  });
}

console.log("aaaaaalksdhfaklsdjhfalksjdh")
navigator.requestMIDIAccess().then(success, midiCon.failure);
