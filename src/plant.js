class Plant {
    constructor(pos = createVector(500, 800), branches = []) {
        this.pos = pos;
        this.branches = branches;
    }

    draw() {
        strokeWeight(20);
        noFill();
        stroke(100, 180, 0);
        beginShape();
        // start ancor and start point
        curveVertex(this.pos.x, this.pos.y);
        curveVertex(this.pos.x, this.pos.y);
        this.branches.forEach((branch, i) => {
            curveVertex(branch.begin.x, branch.begin.y);
        });
        // end ancor
        if (this.branches.length) {
            var begin = this.branches[this.branches.length - 1].begin;
            curveVertex(
                begin.x, begin.y
            );
        }
        endShape();
    }
}