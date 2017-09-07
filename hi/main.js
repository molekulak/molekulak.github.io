var circle_game = (function() {
    
    var c, ctx;
    
    var point = new Vector3(0, 0.5, 10);
    var angle = Math.PI / 2;
    var fov = 0.5 * Math.PI;
    
    
    var blocks = [];
    var start;
    
    function main() {
        c = document.getElementById("canvas");
        ctx = c.getContext("2d");
        
        var img = document.getElementById("img");
        img.onload = function () {
            var temp = document.createElement("canvas");
            temp.width = img.width;
            temp.height = img.height;
            tempCtx = temp.getContext("2d");
            tempCtx.drawImage(img, 0, 0);
            
            var width = 1;
            var height = img.height / img.width * width;
            
            
            var data = tempCtx.getImageData(0, 0, img.width, img.height).data;
            for (var x = 0; x < img.width; x++) {
                for (var y = 0; y < img.height; y++) {
                    var index = (x + y * img.width) * 4;
                    if (data[index + 3] != 0) {
                        position = new Vector3(width / img.width * x - width / 2, height / img.height * y - height / 2 - 0.5, 0).add(point).normalize().mul(10 + Math.random() * width - width / 2).sub(point);
                        position.x *= width;
                        position.y *= width;
                        var dist = position.add(point).z;
                        blocks.push({
                            color: "rgb(" +  [data[index], data[index + 1], data[index + 2]] + ")",
                            pos: position,
                            size: new Vector2(dist, dist)
                        });
                    }
                }
            }
            
            start = Date.now();
            
            loop();
        };
        
    }
    
    function loop() {
        update();
        render();
        requestAnimationFrame(loop);
    }
    
    function update() {
        angle = Math.PI / 6 * 5 - Math.pow(Math.sin((Date.now() - start) / 5000), 2) * Math.PI / 6 * 5;
    }
    
    function render() {
        ctx.clearRect(0, 0, c.width, c.height);
        
        var newBlocks = [];
        for (var i = 0; i < blocks.length; i++) {
            var pos = blocks[i].pos;
            var size = blocks[i].size;
            var color = blocks[i].color;
            var p = new Vector3(pos.x, pos.y, pos.z);
            p.x = p.x * Math.cos(angle) - p.z * Math.sin(angle);
            p.z = p.x * Math.sin(angle) + p.z * Math.cos(angle);
            p = p.add(point);
            p.z /= 10;
            newBlocks.push({
                pos: p,
                size: size,
                color: color
            })
        }
        
        newBlocks.sort(function (a, b) { return b.pos.z > a.pos.z ? 1 : -1 });
        
        for (var i = 0; i < newBlocks.length; i++) {
            drawQuad(newBlocks[i].pos, newBlocks[i].size, newBlocks[i].color);
        }
    }
    
    function drawQuad(pos, size, color) {
        ctx.fillStyle = color;
        ctx.fillRect((pos.x / pos.z + 1) * c.width / 2, (pos.y / pos.z + 1) * c.height / 2, size.x / pos.z / 2.5, size.y / pos.z / 2.5);
    }
    
    main();
        
}());
