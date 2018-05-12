class Plant {
    constructor(pos = createVector(500, 800), branches = []) {
        this.pos = pos;
        this.branches = branches;
    }

    draw() {
        push();

        strokeWeight(20);
        noFill();
        stroke(100, 180, 0);
        path(_.concat([this.pos], _.map(this.branches, branch => branch.begin)));

        pop();
    }
}