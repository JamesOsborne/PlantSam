let plant;
let currBranch;
let particleEmitters;

function setup() {
    createCanvas(displayWidth, displayHeight);
    background(255);

    plant = new Plant();
    begin = plant.pos;
    currBranch = plant;

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
        let points = _.reduce(
            plant.branches,
            (r, x) => _.concat(
                r,
                Vector.add(
                    (r[r.length - 1] || plant.pos),
                    Vector.mult(
                        new Vector(Math.cos(x.angle), Math.sin(x.angle)),
                        x.length)
                )
            ),
            []
        );

        let last = (points[points.length - 1] || plant.pos);
        let structure = getStructure(plant.pos, 0, plant);
        let branchStructure = getBranchStructure(structure, currBranch);
        let relative = Vector.sub(pos, branchStructure.pos);

        currBranch.branches = _.concat([
            new Branch(
                Math.atan2(relative.y, relative.x) - branchStructure.angle,
                Math.sqrt(Math.pow(relative.x, 2) + Math.pow(relative.y, 2)),
                5,
                _.map([1, 2], num =>
                    new Branch(
                        random(-HALF_PI, HALF_PI),
                        20,
                        5,
                        [new Branch(0.01, 20, 2, [])]
                    )
                )
            )],
            _.sortBy(currBranch.branches, branch => branch.angle)
        );
        currBranch = _.filter(currBranch.branches, branch => branch.branches.length > 1)[0];
    }
}