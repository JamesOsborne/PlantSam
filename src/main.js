let plant;
let particleEmitters;

function setup() {
    createCanvas(displayWidth, displayHeight);
    background(255);

    plant = new Plant();
    begin = plant.pos;

    particleEmitters = [];
    frameRate(2);
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
        var points = plant.branches.reduce(
            (r, x) => r.concat(V.add(
                (r[r.length - 1] || plant.pos),
                V.mult(new V(Math.cos(x.angle), Math.sin(x.angle)), x.length)
            )),
            []
        );

        var last = (points[points.length - 1] || plant.pos);
        relative = V.sub(pos, last);

        plant.branches.push(new Branch(
            Math.atan2(relative.y, relative.x),
            Math.sqrt(Math.pow(relative.x, 2) + Math.pow(relative.y, 2))
        ));
    }
    //particleEmitters.push(new ParticleEmitter(pos));
}
