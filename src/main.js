let begin;
let end;
let plant;
let particleEmitters;

function setup() {
    createCanvas(displayWidth, displayHeight);
    background(255);

    plant = new Plant();
    begin = plant.pos;

    particleEmitters = [];
    frameRate(15);
}

function draw() {
    background(255);
    plant.draw();

    for (let particleEmitter of particleEmitters) {
        particleEmitter.emit();
        particleEmitter.draw();
    }
}

function mouseClicked() {
    let pos = createVector(mouseX, mouseY);
    if (mouseButton === LEFT) {
        end = begin;
        begin = pos;

        if (end) {
            plant.branches.push(new Branch(begin, end));
        }
    }
    particleEmitters.push(new ParticleEmitter(pos));
}