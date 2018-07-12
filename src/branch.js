function getBranchStructure(structure, branch) {
    if (structure.branch === branch) {
        return structure;
    }
    for (let b of structure.branchStructures) {
        var possible = getBranchStructure(b, branch);
        if (possible) { return possible; }
    }
    return null;
}

function getStructure(root, rootAngle, branch) {
    var angle = (branch.angle || 0) + rootAngle;
    var pos = (
        branch.length
        ? new V(root.x + cos(angle) * branch.length, root.y + sin(angle) * branch.length)
        : root
    );
    return new BranchStructure(
        pos,
        angle,
        branch.branches.map(b => getStructure(pos, angle, b)),
        branch
    );
}

function getPath(structure) {
    var branchRoot = structure.pos;
    var allBranchAngles = [structure.angle + Math.PI].concat(
        structure.branchStructures ? structure.branchStructures.map(x => x.angle) : []
    );
    var middleAngles = allBranchAngles.map((a, i) => {
        var next = allBranchAngles[i + 1];
        var nextAngle = next != undefined ? next : allBranchAngles[0];
        return (
            averageAngles(a, nextAngle)
            // This looks to see if the angle between on one side is greater than
            // half, then flip it
            + (mod((nextAngle - a), (Math.PI * 2)) > Math.PI ? Math.PI : 0)
        );
    });
    console.log('hey');
    var width = structure.branch.width || 0;
    var middlePoints = middleAngles.map(a => new V(branchRoot.x + cos(a) * width, branchRoot.y + sin(a) * width));

    var points = flatten(flatten(structure.branchStructures.map((b, i) =>
        [[middlePoints[i]], getPath(b)]
    ))).concat([middlePoints[middlePoints.length - 1]]);
    return points;
}

class BranchStructure {
    constructor(pos, angle, branchStructures, branch = null) {
        this.pos = pos;
        this.angle = angle;
        this.branchStructures = branchStructures;
        this.branch = branch;
    }
}

class Branch {
    constructor(angle, length, width, branches) {
        this.angle = angle;
        this.length = length;
        this.width = width;
        this.branches = branches.sort((a, b) => a.angle - b.angle);
    }
}
