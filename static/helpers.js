function path(vertices, vertexFunc = curveVertex) {
    if (vertices.length <= 0) return;

    beginShape();

    let first = vertices[0];
    let last = vertices[vertices.length - 1];

    vertexFunc(first.x, first.y);

    for (let vertex of vertices) {
        vertexFunc(vertex.x, vertex.y);
    }

    vertexFunc(last.x, last.y);

    endShape();
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function flatten(l) {
    return [].concat.apply([], l);
}

function averageAngles(angle1, angle2) {
    var y = Math.sin(angle1) + Math.sin(angle2);
    var x = Math.cos(angle1) + Math.cos(angle2);
    return atan2(y, x);
}
