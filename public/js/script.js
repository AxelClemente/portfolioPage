// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("portfolioPage JS imported successfully!");
});


// canvas elements has TWO independent sizes that need to be synchronised, otherwise we get distorted shapes.
// When you set canvas size with just CSS, you are setting just the element size, but that will strech the drawing surface size and distort your drawings
window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(ctx);

  class Particle {
    constructor(){

    }
    draw(){

    }
    update(){

    }
  }

  class Effect {
    constructor(context, canvasWidth, canvasHeigth){
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeigth = canvasHeigth;
      this.textX = this.canvasWidth/2;
      this.textY = this.canvasHeigth/2;
      this.fontSize = 100;
      this.lineHeight = this.fontSize * 0.8;
      this.maxTextWidth = this.canvasWidth * 0.8;
      this.textInput = document.getElementById('textInput');
      this.textInput.addEventListener('keyup',(e) => {
        if (e.key !==' '){
          this.context.clearRect(0,0, this.canvasWidth, canvasHeigth);
          this.wrapText(e.target.value);
        }
      });
      

    }
    wrapText(text){
      const gradient = this.context.createLinearGradient(0,0, this.canvasWidth, this.canvasHeigth);
      gradient.addColorStop(0.3, 'red');
      gradient.addColorStop(0.5, 'orange');
      gradient.addColorStop(0.7, 'green');
      this.context.fillStyle = gradient;
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.lineWidth = 3;
      this.context.strokeStyle = 'white';
      this.context.font = this.fontSize + 'px Helvatica';

      // break multiline text
      let linesArray = [];
      let words = text.split(' ');
      let lineCounter = 0;
      let line = '';
      for ( let i=0; i < words.length; i++){
        let testLine = line + words[i] + ' ';
        if (this.context.measureText(testLine).width > this.maxTextWidth){
          line = words[i] + ' ';
          lineCounter++;
        } else {
          line = testLine;
        }
        linesArray[lineCounter] = line;
      }
      let textHeight = this.lineHeight * lineCounter;
      this.textY = this.canvasHeigth/2 - textHeight / 2;
      linesArray.forEach((el, index) => {
        this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
        this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
      });
    }
    convertToParticles(){

    }
    render(){

    }
  }

  const effect = new Effect (ctx, canvas.width, canvas.height);
  effect.wrapText('Fullstack Developer');
  console.log(effect);

  function animate(){

  }


 

  // ctx.lineWidth = 1;
  // //ctx.letterSpacing = '10px';



  //////////////// Function for max Text Width"//////////////////////////////////
  // function wrapText(text){
  //   let linesArray = [];
  //   let linesCounter = 0;
  //   let line = '';
  //   let words = text.split(' ');
  //   for (let i=0; i< words.length; i++){
  //     let testLine = line + words[i] + ' ';
  //     if (ctx.measureText(testLine).width >maxTextWidth){
  //       line = words[i] + ' ';
  //       linesCounter++;
  //     } else {
  //       line = testLine; 
  //     }
  //     linesArray[linesCounter] = line;
  //   }
  //   let textHeight = lineHeight * linesCounter;
  //   let textY = canvas.height/2 - textHeight/2;
  //   linesArray.forEach((element, index) =>{
  //     ctx.fillText(element, canvas.width/2, textY + (index * lineHeight));
  //   });
  //   console.log(linesArray);
  // }
  


})
