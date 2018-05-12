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
        path([this.pos].concat(this.branches.map((x) => x.begin)));
        pop();
    }
}