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

    //Circle one(radius, x and y)
    circle0 = {
        radius: 10 + Math.random() * maxRadius,
        x: 40 + Math.random() * (width - (2 * maxRadius)),
        y: 40 + Math.random() * (height - (2 * maxRadius)),
        
    };

    //Circle one(radius, x and y)
    circle1 = {
        radius: 10 + Math.random() * maxRadius,
        x: 40 + Math.random() * (width - (2 * maxRadius)),
        y: 40 + Math.random() * (height - (2 * maxRadius)),
    };

    /*
     * Function drawCircle
     */
    function drawCircle() {
        
        ctx.beginPath();
        ctx.fillStyle = "#DC143C";
        ctx.arc(circle0.x, circle0.y, circle0.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.fillStyle = "#00BFFF";
        ctx.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }
    
    /*
     * Function draw
     * Use utils.js
     * @return width and heigt and velocity
     */
    function draw () {
        ctx.clearRect(0, 0, width, height);
        drawCircle();
    
        if(utils.circleCollision(circle0, circle1)) {
            var va = vx1;
            vx1 = vx2;
            vx2 = va;
            va = vy1;
            vy1 = vy2;
            vy2 = va;
        } else {
            if(circle0.x + vx1 > canvas.width - circle0.radius 
                || circle0.x + vx1 < circle0.radius) {
                vx1 = -vx1;
            }
            if(circle0.y + vy1 > canvas.height - circle0.radius  
                || circle0.y + vy1 < circle0.radius ) {
                vy1 = -vy1;
            }
    
            if(circle1.x + vx2 > canvas.width - circle1.radius 
                || circle1.x + vx2 < circle1.radius) {
                vx2 = -vx2;
            }
    
            if(circle1.y + vy2 > canvas.height - circle1.radius  
                || circle1.y + vy2 < circle1.radius ) {
                vy2 = -vy2;
            }
        }
    
        circle0.x += vx1;
        circle0.y += vy1;
    
        circle1.x += vx2;
        circle1.y += vy2;
    }
    
    setInterval(draw, 10);
    
})();

