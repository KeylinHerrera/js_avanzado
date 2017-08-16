(function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    vx1 = -3 + Math.random() * 6;
    vy1 = -3 + Math.random() * 6;
    vx2 = -5 + Math.random() * 6;
    vy2 = -5 + Math.random() * 6;
    maxRadius = 30;

    //Rectangle one(x, y, width and heigth)
    rect0 = {
        x: 40 + Math.random() * (width - (2 * maxRadius)),
        y: 40 + Math.random() * (height - (2 * maxRadius)),
        width: 50,
        height: 50
    };

    //Rectangle two(x, y, width and heigth)
    rect1 = {
        x: 40 + Math.random() * (height - (2 * maxRadius)),
        y: 40 + Math.random() * (height - (2 * maxRadius)),
        width: 100,
        height: 100
    };

    /*
     * Function drawRect
     */
    function drawRect() {

    // Red rectangle
    ctx.beginPath();
    ctx.fillStyle = "#DC143C";
    ctx.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);  
    ctx.stroke();

    // Green rectangle
    ctx.beginPath();
    ctx.fillStyle = "#00BFFF";
    ctx.fillRect(rect1.x, rect1.y, rect1.width, rect1.height); 
    ctx.stroke();

    }

    /*
     * Function draw
     * Use utils.js
     */
    function draw () {
        ctx.clearRect(0, 0, width, height);
        drawRect();

        if(utils.rectIntersect(rect0, rect1)) {
            var va = vx1;
            vx1 = vx2;
            vx2 = va;
            va = vy1;
            vy1 = vy2;
            vy2 = va;
        } else {

            if(rect0.x + vx1 > canvas.width - rect0.width 
                || rect0.x + vx1 < 0) {
                vx1 = -vx1;
            }

            if(rect0.y + vy1 > canvas.height - rect0.height 
                || rect0.y + vy1 < 0 ) {
                vy1 = -vy1;
            }
    
            if(rect1.x + vx2 > canvas.width - rect1.width 
                || rect1.x + vx2 < 0) {
                vx2 = -vx2;
            }
    
            if(rect1.y + vy2 > canvas.height - rect1.height  
                || rect1.y + vy2 < 0 ) {
                vy2 = -vy2;
            }

        }

        rect0.x += vx1;
        rect0.y += vy1;
    
        rect1.x += vx2;
        rect1.y += vy2;
    
    }
    
    setInterval(draw, 10);
    
})();

