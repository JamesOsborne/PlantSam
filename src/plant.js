var V = p5.Vector;

class Plant {
    constructor(pos = createVector(500, 800), branches = []) {
        this.pos = pos;
        this.branches = branches;
    }

    draw() {
        push();
        noStroke();
        fill(100, 180, 0);
        stroke(100, 180, 0);
        var structure = getStructure(plant.pos, 0, this);
        var points = getPath(structure);
        var finalPath = points.concat(plant.pos);
        path(finalPath);
        
        // little red balls on the points for debugging
        for (let p of finalPath) {
            fill(255, 0, 0);
            noStroke();
            //ellipse(p.x, p.y, 4)
        }
        pop();
    }
}
