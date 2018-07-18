let plant;
let mybranch;
let particleEmitters;
var V = p5.Vector;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    setPlant = () => fetchStructure().then(r => plant = r);

    setInterval(setPlant, 1 * 10000);
    setPlant();
}

function fetchStructure() {
    return fetch('structure', {'credentials': 'include'})
    .then(r => r.json());
}

function draw() {
    background(255);
    if (plant) draw_plant(plant, new V(windowWidth / 2, windowHeight));
}
