const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const rangeControl = document.querySelector('.range');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');

const CANVAS_WIDTH =  window.innerWidth*0.8;
const CANVAS_HEIGHT = window.innerHeight*0.8;
const INITIAL_COLOR = "#1e1a1a";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "#fff";
ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);

    }else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }   
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeControl(event){
    const thickness = event.target.value;
    ctx.lineWidth = thickness;
}

function handleModeCLick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling === true){
        ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function handleCM(event){
    event.preventDefault();
}    

function handleSaveBtnClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick );
    canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
rangeControl.addEventListener("input", handleRangeControl);
mode.addEventListener("click", handleModeCLick);
saveBtn.addEventListener("click", handleSaveBtnClick);