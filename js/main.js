var molecule = (function () {

    var c, ctx;
    var size = 400;

    var length, name;
    var brahces;

    var nodes;
    var moleculeSize = 20;
    var bMoleculeSize = moleculeSize / 3 * 2;
    
    var names = ["met", "et", "prop", "but", "pent", "hex", "hept", "okt", "non", "dek", "undek", "dodek", "tridek"];
    var count = ["", "bi", "tri", "tetra", "penta", "hex", "hept", "okt"]

    var check, nameInput, newMolecule, difficulty;

    function main() {
        c = document.getElementById("canvas");
        c.width = size;
        c.height = size;
        ctx = c.getContext("2d");
        
        check = document.getElementById("check");
        nameInput = document.getElementById("name-input");
        newMolecule = document.getElementById("new");
        difficulty = document.getElementById("difficulty");
        
        var checkFunc = function () {
            if (name == nameInput.value) {
                alert("Helyes!");
            } else {
                alert("Rossz tipp! Helyes válasz: " + name + ", ezt írtad be: " + nameInput.value);
            }
            nameInput.value = "";
            generateMolecule();
        };
        
        check.onclick = checkFunc;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 13)
                checkFunc();
        });
        
        newMolecule.onclick = function () {
            nameInput.value = "";
            generateMolecule();
        };
        
        generateMolecule();
        
        ctx.strokeStyle = "white";
        loop();
    }

    function generateMolecule() {
        branches = [];
        nodes = [];
        name = "";
        
        var maxLength = 9;
        if (difficulty.value == 1)
            maxLength = 4;
        if (difficulty.value == 2)
            maxLength = 6;
        
        length = Math.floor(Math.random() * maxLength + 4);
        
        var naming = {
            "butil": [],
            "ciklohexil": [],
            "ciklopentil": [],
            "etil": [],
            "izopropil": [],
            "izobutil": [],
            "metil": [],
            "propil": [],
            "szek-butil": [],
            "tert-butil": []
        };
        
        for (var i = 1; i <= length - 2; i++) {
            for (var j = 0; j <= 1; j++) {
                var chance = 0.3;
                if (i == 1 && j == 0)
                    chance = 1;
                if (Math.random() < chance) {
                    var ind = Math.floor(Math.random() * (maxLength + 1));
                    if (i == 1 && j == 0)
                        ind = 0;
                    var branch = {
                        name: null,
                        pos: i,
                        side: j
                    };
                    switch (ind) {
                        case 0:
                            branch.name = "metil";
                            break;
                        case 1:
                            if (i >= 2 && i <= length - 1)
                                branch.name = "etil";
                            break;
                        case 2:
                            if (i >= 3 && i <= length - 2)
                                branch.name = "propil";
                            break;
                        case 3:
                            if (i >= 4 && i <= length - 3)
                                branch.name = "butil";
                            break;
                        case 4:
                            if (i >= 2 && i <= length - 1)
                                branch.name = "izopropil";
                            break;
                        case 5:
                            if (i >= 3 && i <= length - 2)
                                branch.name = "izobutil";
                            break;
                        case 6:
                            if (i >= 3 && i <= length - 2)
                                branch.name = "szek-butil";
                            break;
                        case 7:
                            if (i >= 2 && i <= length - 1)
                                branch.name = "tert-butil";
                            break;
                        case 8:
                            if (length > 5)
                                branch.name = "ciklopentil";
                            break;
                        case 9:
                            if (length > 6)
                                branch.name = "ciklohexil";
                            break;
                    }
                    if (branch.name != null) {
                        branches.push(branch);
                        naming[branch.name].push(branch.pos + 1);
                    }
                }
            }
        }
        
        for (var branchType in naming) {
            if (naming.hasOwnProperty(branchType)) {
                if (naming[branchType].length != 0) {
                    if (name.length != 0)
                        name += "-";
                    for (var i = 0; i < naming[branchType].length; i++) {
                        name += naming[branchType][i] + ",";
                    }
                    name = name.slice(0, -1) + "-" + count[naming[branchType].length - 1] + branchType;
                }
            }
        }
        name = name + names[length - 1] + "án";
    }

    function loop() {
        update();
        render();
        requestAnimationFrame(loop);
    }

    function update() {

    }

    function render() {
        ctx.clearRect(0, 0, size, size);
        ctx.beginPath();
        for (var x = 0; x < length; x++) {
            var pos = getMoleculePosition(x);
            ctx.lineTo(pos.x, pos.y);
        }
        for (var i = 0; i < branches.length; i++) {
            drawBranch(branches[i]);
        }
        ctx.stroke();
    }

    function drawBranch(branch) {
        var startPos = getMoleculePosition(branch.pos);
        ctx.moveTo(startPos.x, startPos.y);ctx.lineTo(startPos.x, startPos.y);
        var size = (branch.side * 2 - 1) * bMoleculeSize;
        switch (branch.name) {
            case "metil":
                ctx.lineTo(startPos.x, startPos.y - 1.5 * size);
                break;
            case "etil":
                ctx.lineTo(startPos.x + size / 2, startPos.y - size);
                ctx.lineTo(startPos.x, startPos.y - 2 * size);
                break;
            case "propil":
                ctx.lineTo(startPos.x + size / 2, startPos.y - size);
                ctx.lineTo(startPos.x, startPos.y - 2 * size);
                ctx.lineTo(startPos.x + size / 2, startPos.y - 3 * size);
                break;
            case "butil":
                ctx.lineTo(startPos.x + size / 2, startPos.y - size);
                ctx.lineTo(startPos.x, startPos.y - 2 * size);
                ctx.lineTo(startPos.x + size / 2, startPos.y - 3 * size);
                ctx.lineTo(startPos.x, startPos.y - 4 * size);
                break;
            case "izopropil":
                ctx.lineTo(startPos.x, startPos.y - size);
                ctx.lineTo(startPos.x - size, startPos.y - 2 * size);
                ctx.lineTo(startPos.x, startPos.y - size);
                ctx.lineTo(startPos.x + size, startPos.y - 2 * size);
                break;
            case "izobutil":
                ctx.lineTo(startPos.x + size / 2, startPos.y - size);
                ctx.lineTo(startPos.x, startPos.y - 2 * size);
                ctx.lineTo(startPos.x + size, startPos.y - 3 * size);
                ctx.moveTo(startPos.x, startPos.y - 2 * size);
                ctx.lineTo(startPos.x - size, startPos.y - 3 * size);
                break;
            case "szek-butil":
                ctx.lineTo(startPos.x, startPos.y - 3.5 * size);
                ctx.lineTo(startPos.x - size, startPos.y - 4.5 * size);
                ctx.lineTo(startPos.x - 2 * size, startPos.y - 3.5 *size);
                ctx.moveTo(startPos.x, startPos.y - 3.5 * size);
                ctx.lineTo(startPos.x + size, startPos.y - 4.5 * size);
                break;
            case "tert-butil":
                ctx.lineTo(startPos.x, startPos.y - 2 * size);
                ctx.lineTo(startPos.x - size, startPos.y - 2 * size);
                ctx.lineTo(startPos.x + size, startPos.y - 2 * size);
                ctx.lineTo(startPos.x, startPos.y - 2 * size);
                ctx.lineTo(startPos.x, startPos.y - 3 * size);
                break;
            case "ciklopentil":
                ctx.lineTo(startPos.x, startPos.y - size);
                ctx.lineTo(startPos.x + size / 3 * 2, startPos.y - size / 3 * 5);
                ctx.lineTo(startPos.x + size / 2, startPos.y - size / 3 * 7);
                ctx.lineTo(startPos.x - size / 2, startPos.y - size / 3 * 7);
                ctx.lineTo(startPos.x - size / 3 * 2, startPos.y - size / 3 * 5);
                ctx.lineTo(startPos.x, startPos.y - size);
                break;
            case "ciklohexil":
                ctx.lineTo(startPos.x, startPos.y - size);
                ctx.lineTo(startPos.x + size / 3 * 2, startPos.y - size / 3 * 5);
                ctx.lineTo(startPos.x + size / 3 * 2, startPos.y - size / 3 * 7);
                ctx.lineTo(startPos.x, startPos.y - 3 * size);
                ctx.lineTo(startPos.x - size / 3 * 2, startPos.y - size / 3 * 7);
                ctx.lineTo(startPos.x - size / 3 * 2, startPos.y - size / 3 * 5);
                ctx.lineTo(startPos.x, startPos.y - size);
                break;
        }
    }

    function getMoleculePosition(x) {
        return {
            x: size / 2 - (length / 2 - x - 0.5) * moleculeSize * 1.5,
            y: size / 2 + ((x % 2) * 2 - 1) * moleculeSize
        }
    }

    main();

}());
