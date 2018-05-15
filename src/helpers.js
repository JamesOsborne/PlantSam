function path(vertices) {
    if (vertices.length > 0) {
        beginShape();

        let first = vertices[0];
        let last = vertices[vertices.length - 1];

		curveVertex(first.x, first.y);

        for (let vertex of vertices) {
            curveVertex(vertex.x, vertex.y);
        }

		curveVertex(last.x, last.y);

        endShape();
    }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function flatten(l) {
	return [].concat.apply([], l)
}

function averageAngles(angle1, angle2) {
	var y = Math.sin(angle1) + Math.sin(angle2);
	var x = Math.cos(angle1) + Math.cos(angle2);
	return atan2(y, x);
}

function distance(v1, v2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function determineAngleInDegrees(v1, v2) {
	return toDegrees(determineAngleInRadians(v1, v2));
}

function determineAngleInRadians(v1, v2) {
	return Math.atan2(v1.y - v2.y, v1.x - v2.x);
}