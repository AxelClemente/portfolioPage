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
    constructor(effect, x, y, color){
      this.effect = effect;
      this.x = Math.random()* this.effect.canvasWidth;
      this.y = 0;
      this.color = color;
      this.originX = x;
      this.originY = y;
      this.size = this.effect.gap; // <------------ TO CHECK
      this.dx = 0;  
      this.dy = 0;
      this.vx = 0;
      this.dy = 0;
      this.force = 0;
      this.angle = 0;
      this.distance = 0;
      this.friction = Math.random() * 0.6 + 0.15;
      this.ease = Math.random() * 0.1 + 0.005;

    }
    draw(){
      this.effect.context.fillStyle = this.color; 
      this.effect.context.fillRect(this.originX, this.originY, this.size, this.size); 
    }
    update(){
      this.x += this.originX - this.x;
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
      //particle text
      this.Particles = [];
      this.gap = 3; // <--- TO CHECK
      this.mouse = {
        radius: 20000,
        x: 0,
        y: 0
      }
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      })

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
      this.convertToParticles();
    }
    convertToParticles(){
      this.particles = [];
      const pixels = this.context.getImageData(0,0, this.canvasWidth, this.canvasHeigth).data;
      this.context.clearRect(0,0, this.canvasWidth, this.canvasHeigth);
      for (let y = 0; y < this.canvasHeigth; y+=this.gap){
        for (let x = 0; x < this.canvasWidth; x+= this.gap){
          const index = (y * this.canvasWidth + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 0){
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const color = 'rgb (' + red + ',' + green + ',' + blue + ')';
            this.particles.push(new Particle(this, x, y, color));

          }
        }
      }
      console.log(this.particles);
    }
    render(){
      this.particles.forEach(particle =>{
        particle.update();
        particle.draw();
      } )
    }
  }

  const effect = new Effect (ctx, canvas.width, canvas.height);
  effect.wrapText('Fullstack Developer');
  effect.render();
 
  function animate(){
    effect.render();
    requestAnimationFrame(animate);
    
  }
  animate();

  // //ctx.letterSpacing = '10px';
})
