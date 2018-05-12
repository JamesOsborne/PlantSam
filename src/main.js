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

    _.each(particleEmitters, particleEmitter => {
        particleEmitter.emit();
        particleEmitter.draw();
    });
}

function mouseClicked() {
    let pos = createVector(mouseX, mouseY);
    if (mouseButton === LEFT) {
        end = begin;
        begin = pos;

        if (end) {
            let length = distance(begin, end);
            let angle = determineAngleInRadians(end, begin);
            plant.branches.push(new Branch(begin, length, angle));
        }
    }
    particleEmitters.push(new ParticleEmitter(pos));
}