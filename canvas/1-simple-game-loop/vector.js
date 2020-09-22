'use strict';

class Vector {
    x = null
    y = null

    constructor(x, y) {
        if (Vector.isNotANumber(x) || Vector.isNotANumber(y)) throw new TypeError(`Got x: ${x.constructor} and y: ${y.constructor}. Wanted Number`);
            this.x = x
            this.y = y
    }

    static isNotANumber(value) {
        return isNaN(value)  || value == undefined  || value == Infinity || value == -Infinity;
    }

    static isVector(object) {
        return object.constructor === Vector;
    }

    add (vector) {
        if (!Vector.isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        const newPosition = Vector.add(this, vector);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }

    static add(vector1, vector2) {
        if (!Vector.isVector(vector1) || !Vector.isVector(vector2)) throw new TypeError(`Got ${vector1.constructor}  and ${vector2.constructor} but wanted Vector object!`);
        return new Vector(vector1.x + vector2.x,
            vector1.y + vector2.y);
    }

    subtract (vector) {
        if (!Vector.isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        const newPosition = Vector.subtract(this, vector);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }

    static subtract(vector1, vector2) {
        if (!Vector.isVector(vector1) || !Vector.isVector(vector2)) throw new TypeError(`Got ${vector1.constructor}  and ${vector2.constructor} but wanted Vector object!`);
        return new Vector(vector1.x - vector2.x,
            vector1.y - vector2.y);
    }

    magnitude() {
        return Vector.magnitude(this);
    }

    static magnitude(vector) {
        if (!Vector.isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    }

    scalar(scalarValue) {
        if (isNaN(scalarValue)) throw new TypeError(`Got ${scalarValue.constructor} but wanted Number!`);
        Vector.scalar(this, scalarValue);
    }

    static scalar(vector, scalarValue) {
        if (isNaN(scalarValue) || !Vector.isVector(vector)) throw new TypeError(`Got ${scalarValue.constructor} and wanted Number. Got ${vector.constructor} and wanted Vector object!`);
        for (let pos in vector) {
            if (vector.hasOwnProperty(pos)) {
                vector[pos] *= scalarValue;
            }
        }
        return vector;
    }

    distance(vector) {
        if (!Vector.isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        return Vector.distance(this, vector);
    }

    static distance(vector1, vector2) {
        if (!Vector.isVector(vector1) || !Vector.isVector(vector2)) throw new TypeError(`Got ${vector1.constructor}  and ${vector2.constructor} but wanted Vector object!`);
        return Math.sqrt(Math.pow(vector2.x - vector1.x,2)+ Math.pow(vector2.y - vector1.y,2));
    }

    normalize () {
         const newPosition = Vector.normalize(this);
         this.x = newPosition.x;
         this.y = newPosition.y;
    }

    static normalize(vector) {
        if (!Vector.isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        let length = vector.magnitude();
        for (let pos in vector) {
            if (vector.hasOwnProperty(pos)) {
                vector[pos] = vector[pos] / length;
            }
        }
        return vector;
    }

    directionAngle () {
        return Vector.directionAngle(this);
    }

    static directionAngle(vector) {
        if (!Vector.isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        return Math.atan(vector.y/vector.x) * 180 /Math.PI;
    }

    resetVector(x,y = undefined) {

    }
}

if (typeof module !== 'undefined') {
    module.exports = Vector
}