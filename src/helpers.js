function path(vertices, closed = false) {
    if (vertices.length === 0) {
        return;
    }
    
    beginShape();
    let first = vertices[0];
    let last = vertices[vertices.length - 1];
    
    if (closed) {
        curveVertex(last.x, last.y);
    } else {
        curveVertex(first.x, first.y);
    }
    
    for (let vertex of vertices) {
        curveVertex(vertex.x, vertex.y);
    }
    
    if (closed) {
        curveVertex(first.x, first.y);
    } else {
        curveVertex(last.x, last.y);
    }
    endShape();
}