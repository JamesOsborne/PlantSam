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
        beginShape();

        // start anchor and start point
        curveVertex(this.pos.x, this.pos.y);
        curveVertex(this.pos.x, this.pos.y);

        for (let branch of this.branches) {
            curveVertex(branch.begin.x, branch.begin.y);
        }

        // end anchor
        if (this.branches.length > 0) {
            let begin = this.branches[this.branches.length - 1].begin;
            curveVertex(
                begin.x, begin.y
            );
        }

        endShape();
        pop();
    }
}