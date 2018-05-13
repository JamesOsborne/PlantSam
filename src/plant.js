var V = p5.Vector;

class Plant {
    constructor(pos = createVector(500, 800), branches = []) {
        this.pos = pos;
        this.branches = branches;
    }

    draw() {
        push();
        strokeWeight(2);
        fill(100, 180, 0);
        stroke(100, 180, 0);
        var points = plant.branches.reduce(
            (r, b) => r.concat(V.add(
                (r[r.length - 1] || plant.pos),
                V.mult(new V(Math.cos(b.angle), Math.sin(b.angle)), b.length)
            )),
            []
        );
        var averageAngles = plant.branches.map(
            (b, i) =>  {
                var nextAngle = (plant.branches[i + 1] || {angle: b.angle}).angle;
                var y = Math.sin(b.angle) + Math.sin(nextAngle);
                var x = Math.cos(b.angle) + Math.cos(nextAngle);
                return atan2(y, x) + Math.PI / 2;
            }
        );
        var widths = points.map((p, i) => i);
        var pointsLeft = points.map(
            (b, i) => new V(
                Math.cos(averageAngles[i]) * widths[i] + b.x,
                Math.sin(averageAngles[i]) * widths[i] + b.y
            )
        );
        var pointsRight = points.map(
            (b, i) => new V(
                Math.cos(averageAngles[i]) * -widths[i] + b.x,
                Math.sin(averageAngles[i]) * -widths[i] + b.y
            )
        );
        path([this.pos].concat(pointsLeft).concat(pointsRight.reverse()).concat([this.pos]), true);
        pop();
    }
}
