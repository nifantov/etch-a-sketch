let size = 10;
let color = "rgb(0,0,0)";
let currentMode = "color"
const DEFAULT_COLOR = "papayawhip";




//DOM
const container = document.querySelector("#grid-container");
const btnClear = document.querySelector("#clear");
const btnColor = document.querySelector("#color");
const btnEraser = document.querySelector("#eraser");
const btnRandom = document.querySelector("#random");
const input = document.querySelector("#input");
const label = document.querySelector("#label");
const colorChange = document.querySelector("#colorChange");


input.onmousemove = (e) => updateLabel(e.target.value)
input.onchange = (e) => changeSize(e.target.value)

colorChange.onchange = (e) => changeColor(e.target.value);

btnClear.onclick = () => clear ();
btnEraser.onclick = () => mode ("eraser");
btnRandom.onclick = () => mode ("random");
btnColor.onclick = () => mode ("color")

function updateSize(newSize) {
    size = newSize;
}

function changeSize (value) {
    updateSize(value);
    updateLabel(value);
    createGrid(value);
}

//mode
function mode (value) {
     currentMode = value; 
     btnActivate(value);
}

//change color
function changeColor (newColor) {
    color = newColor;
}


//create grid size * size and listen events
function createGrid (size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
   
    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement("div");
        gridItem.style.backgroundColor = DEFAULT_COLOR;    
        gridItem.addEventListener("mouseover", changeGrid);
        gridItem.addEventListener("mousedown", changeGrid);
        container.appendChild(gridItem);
    }
}

//change grid color after event
function changeGrid (e) {
    if (currentMode === "color") {
        e.target.style.backgroundColor = color;
    }
    else if (currentMode === "eraser") {
        e.target.style.backgroundColor = DEFAULT_COLOR;
    }
    else if (currentMode === "random") {
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    }
}

//clear
function clear () {
    container.innerHTML = "";
    createGrid (size);
    updateLabel    
}
//update Label range
function updateLabel (value) {
    label.innerHTML = `${value} x ${value}`
  }


//activate button
function btnActivate (newMode) {

  if (newMode === "random") {
    btnRandom.classList.add("active");
    btnColor.classList.remove("active");
    btnEraser.classList.remove("active");
    } 
    else if (newMode === "color") {
    btnRandom.classList.remove("active");
    btnColor.classList.add("active");
    btnEraser.classList.remove("active");

    } 
    else if (newMode === "eraser") {
    btnRandom.classList.remove("active");
    btnColor.classList.remove("active");
    btnEraser.classList.add("active")
    }
}

window.onload = () => {
    createGrid (size);
    btnActivate ("color");
}