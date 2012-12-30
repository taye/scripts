function Vector(x, y) {
    // ensure that "new" is used
    if (!(this instanceof Vector)) {
        return new Vector(x, y);
    }
    
    if (typeof x !== 'number' || typeof y !== 'number') {
        x = y = 0;
    }

    this.x = x;
    this.y = y;
    
    Vector.created++;
}

Vector.created = 0;

Vector.prototype = {
    set: function (x, y) {
        if (x instanceof Object) {
            y = x.y;
            x = x.x;
        }
        if (typeof x === 'number' && typeof y === 'number') {
            this.x = x;
            this.y = y;
        }
        return this;
    },
    distanceTo: function (other) {
        var x = this.x - other.x,
            y = this.y - other.y;

        return Math.sqrt(x * x + y * y);
    },
    distanceSqTo: function (other) {
        var x = this.x - other.x,
            y = this.y - other.y;

        return x * x + y * y;
    },
    plus: function (other) {
        return new Vector(
                this.x + other.x,
                this.y + other.y);
    },
    minus: function (other) {
        return new Vector(
                this.x - other.x,
                this.y - other.y);
    },
    scale: function (scalar) {
        return new Vector (
                this.x * scalar,
                this.y * scalar);
    },
//        intersection: function (other) {
//        },
    dot: function (other) {
        return this.x * other.x + this.y * other.y;
    },
    magnitude: function () {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    },
    angle: function (other) {
        if (!other) {
            other = Vector.I;
        }
        var correction = (this.y < 0) ? Math.PI : 0;

        return correction + Math.acos(this.dot(other) / (this.magnitude() * other.magnitude()));
    },
    rotateBy: function (angle) {
        if (angle > Math.PI) {
            return this.rotateBy(-(2 * Math.PI - angle));
        }
        else if (angle < -Math.PI) {
             return this.rotateBy(2 * Math.PI + angle);
        }

        return new Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle));
    },
    rotateTo: function (angle) {
        var dAngle = angle - this.angle();
        return this.rotateBy(dAngle);
    },
    unitVector: function () {
        return this.scale(1 / this.magnitude());
    },
    
    // The methods below modify the vector
    add: function (other) {
        this.x += other.x;
        this.y += other.y;
        
        return this;
    },
    sub: function (other) {
        this.x -= other.x;
        this.y -= other.y;
        
        return this;
    },
    mul: function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        
        return this;
    },
    rotBy: function (angle) {
        this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        
        return this;
    },
    rotTo: function (angle) {
        var dAngle = angle - this.angle();
        return this.rotBy(dAngle);
    },
    copy: function () {
        return new Vector(this.x, this.y);
    },
    toString: function (fix) {
        if (typeof fix === 'number' && fix >= 0) {
            return [
                    this.x.toFixed(fix),
                    this.y.toFixed(fix)
                ].join(', ');
        }
        return [this.x, this.y].join(', ');
    }
};

var vectorI = new Vector();
var vectorJ = new Vector();

Object.defineProperties(vectorI, {
        "x": { value: 1 },
        "y": { value: 0 }
    });
Object.defineProperties(vectorJ, {
        "x": { value: 0 },
        "y": { value: 1 }
    });

Object.defineProperties(Vector, {
        "I": { value: vectorI },
        "J": { value: vectorJ }
    });

function radToDeg (radians) {
    return 180 * radians / Math.PI;
}

function degToRad (degrees) {
    return degrees * Math.PI / 180;
}
