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
        this.branches = branches;
    }
}
