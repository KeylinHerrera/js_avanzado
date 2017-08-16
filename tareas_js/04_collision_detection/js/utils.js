var utils = {

    distance: function(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    circleCollision: function(c0, c1) {
        return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },

    rangeIntersect: function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && 
               Math.min(min0, max0) <= Math.max(min1, max1);
    },

    rectIntersect: function(r0, r1) {
        return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
               utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    }

}