function draw_plant(plant, pos) {
    push();
    noStroke();
    fill(100, 180, 0);
    stroke(100, 180, 0);
    var structure = getStructure(pos, 0, plant);
    var points = getPath(structure);
    var finalPath = points.concat(pos);
    path(finalPath);

    // little red balls on the points for debugging
    for (let p of finalPath) {
        fill(255, 0, 0);
        noStroke();
        //ellipse(p.x, p.y, 4);
    }
    pop();
}
