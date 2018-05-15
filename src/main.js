let plant;
let mybranch;
let particleEmitters;

function setup() {
    createCanvas(displayWidth, displayHeight);
    background(255);

    plant = new Plant();
    begin = plant.pos;
    mybranch = plant;

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
        var structure = getStructure(plant.pos, 0, plant);
        var mybranchStructure = getBranchStructure(structure, mybranch);
        relative = V.sub(pos, mybranchStructure.pos);

        mybranch.branches = [new Branch(
            Math.atan2(relative.y, relative.x) - mybranchStructure.angle,
            Math.sqrt(Math.pow(relative.x, 2) + Math.pow(relative.y, 2)),
            5,
            [1, 2].map(i => new Branch(
                random(-Math.PI/2, Math.PI/2),
                20,
                5,
                [new Branch(0.01, 20, 2, [])]
            ))
        )].concat(mybranch.branches).sort((a, b) => a.angle - b.angle);
        mybranch = mybranch.branches.filter(b => b.branches.length > 1)[0];
    }
}
