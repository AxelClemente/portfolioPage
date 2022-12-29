// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("portfolioPage JS imported successfully!");
});


// canvas elements has TWO independent sizes that need to be synchronised, otherwise we get distorted shapes.
// When you set canvas size with just CSS, you are setting just the element size, but that will strech the drawing surface size and distort your drawings
window.addEventListener('load', function(){
  const textInput = document.getElementById('textInput')
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(ctx);


  // red line
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();


  // green line
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'green';
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();

  // text "Fullstack Developer"
  const gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
  gradient.addColorStop(0.3, 'red');
  gradient.addColorStop(0.5, 'orange');
  gradient.addColorStop(0.7, 'green');

  ctx.fillStyle = gradient;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.font = '80px Helvatica';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  //ctx.letterSpacing = '10px';
  

  const maxTextWidth = canvas.width * 0.8;
  const lineHeight = 80;


  // Function for max Text Width"
  function wrapText(text){
    let linesArray = [];
    let linesCounter = 0;
    let line = '';
    let words = text.split(' ');
    for (let i=0; i< words.length; i++){
      let testLine = line + words[i] + ' ';
      if (ctx.measureText(testLine).width >maxTextWidth){
        line = words[i] + ' ';
        linesCounter++;
      } else {
        line = testLine; 
      }
      linesArray[linesCounter] = line;
    }
    let textHeight = lineHeight * linesCounter;
    let textY = canvas.height/2 - textHeight/2;
    linesArray.forEach((element, index) =>{
      ctx.fillText(element, canvas.width/2, textY + (index * lineHeight));
    });
    console.log(linesArray);
  }
  
  //wrapText('Fullstack Developer')
  textInput.addEventListener('keyup', function(e){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    wrapText(e.target.value);
  })

})
