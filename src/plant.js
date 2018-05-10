class Plant {
    constructor(pos = createVector(0, 0), branches = []) {
        this.pos = pos;
        this.branches = branches;
    }

    draw() {
        console.log(this.branches);
        for (let branch of this.branches) {
            branch.draw();
        }
    }
}