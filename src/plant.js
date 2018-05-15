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

        let points = _.flatten(
            _.flatten(
                _.map(
                    plant.branches,
                    branch => [plant.pos, getPathStructure(plant.pos, 0, branch)]
                )
            )
        );
        let finalPath = _.concat(points, plant.pos);

        pathFromVertices(finalPath);

        // little red balls on the points for debugging
        _.each(finalPath, point => {
            fill(255, 0, 0);
            noStroke();
            //ellipse(point.x, point.y, 4);
        });

        pop();
    }
}
