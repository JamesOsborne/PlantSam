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
    return {
        pos: pos,
        angle: angle,
        branchStructures: branch.branches.map(b => getStructure(pos, angle, b)),
        branch: branch
    };
}

function getPath(structure) {
    var branchRoot = structure.pos;
    var branches = _.sortBy(structure.branchStructures, b => b.angle);
    var allBranchAngles = [structure.angle + Math.PI].concat(
        branches ? branches.map(x => x.angle) : []
    ).concat((branches && branches.length) ? [] : [structure.angle + Math.PI * 2 + .001]);
    var middleAngles = allBranchAngles.map((a, i) => {
        var next = allBranchAngles[i + 1];
        var nextAngle = next != undefined ? next : allBranchAngles[0];
        var modNextAngle = mod(nextAngle, Math.PI * 2);
        var modThisAngle = mod(a, Math.PI * 2);
        return (
            averageAngles(modThisAngle, modNextAngle)
            // This looks to see if the angle between on one side is greater than
            // half, then flip it
            + (mod(nextAngle - a, Math.PI * 2) > Math.PI ? Math.PI : 0)
        );
    });
    var width = structure.branch.width || 0;
    var middlePoints = middleAngles.map(a => new V(branchRoot.x + cos(a) * width, branchRoot.y + sin(a) * width));

    var points = (branches.length ? flatten(flatten(branches.map((b, i) =>
        [[middlePoints[i]], getPath(b)]
    ))) : [middlePoints[0]]).concat([middlePoints[middlePoints.length - 1]]);
    return points;
}
