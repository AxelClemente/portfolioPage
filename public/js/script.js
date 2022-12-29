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

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();


  const text = 'Hello';
  const textX = canvas.width/2;
  const textY = canvas.height/2;
  console.log(ctx);
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'lightgreen'
  ctx.lineWidth = 1;
  ctx.font = '80px Helvatica';
  //ctx.letterSpacing = '10px';
  ctx.fillText(text, textX, textY);
  ctx.strokeText(text, textX, textY);
  
})
