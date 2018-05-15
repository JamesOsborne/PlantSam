function getBranchStructure(structure, branch) {
    if (structure.branch === branch) {
        return structure;
    }

    for (let branchStructure of structure.branchStructures) {
        let result = getBranchStructure(branchStructure, branch);

        if (result) {
            return result;
        }
    }

    return null;
}

function getStructure(root, rootAngle, branch) {
    let angle = (branch.angle || 0) + rootAngle
    let pos = branch.length ?
        new Vector(
            root.x + cos(angle) * branch.length,
            root.y + sin(angle) * branch.length
        )
        : root;

    return new BranchStructure(
        pos,
        angle,
        _.map(
            branch.branches,
            branchToMap => getStructure(pos, angle, branchToMap)
        ),
        branch
    );
}

function getPathStructure(root, rootAngle, branch) {
    let angle = branch.angle + rootAngle;
    let branchRoot = Vector.add(
        root,
        Vector.mult(
            new Vector(
                Math.cos(angle),
                Math.sin(angle)
            ),
            branch.length
        )
    );
    let branchAngle = averageAngles(angle, rootAngle);
    let allBranchAngles = _.concat(
        [angle + Math.PI],
        _.map(
            branch.branches,
            branchToMap => branchToMap.angle + angle
        )
    );
    let middleAngles = _.map(allBranchAngles, (branchAngle, i) => {
        let next = allBranchAngles[i + 1];
        let nextAngle = next !== undefined ? next : allBranchAngles[0];

        /* This looks to see if the angle between on one side is greater than
           half, then flips it;
        */
        return averageAngles(branchAngle, nextAngle) +
            (
                mod(
                    nextAngle - branchAngle,
                    TWO_PI
                ) > PI ? PI : 0
            );
    });
    let branchWidth = branch.width;
    let middlePoints = _.map(
        middleAngles,
        middleAngle => new Vector(
            branchRoot.x + cos(middleAngle) * branchWidth,
            branchRoot.y + sin(middleAngle) * branchWidth
        )
    );

    let points = _.concat(
        _.flatten(
            _.flatten(
                _.map(
                    branch.branches,
                    (branchToMap, i) =>[
                        [middlePoints[i]],
                        getPathStructure(branchRoot, angle, branchToMap)
                    ]
                )
            )
        ),
        [middlePoints[middlePoints.length - 1]]
    );

    return points;
}