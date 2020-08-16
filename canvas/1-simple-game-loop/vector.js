'use strict';

module.exports = class Vector {
    pos = {
        x: null,
        y: null
    };

    constructor(x, y) {
        if (Vector.#isNotANumber(x) || Vector.#isNotANumber(y)) throw new TypeError(`Got x: ${x.constructor} and y: ${y.constructor}. Wanted Number`);
        this.pos = {
            x: x,
            y: y
        }
    }

    static #isNotANumber(value) {
        return isNaN(value)  || value == undefined  || value == Infinity || value == -Infinity;
    }

    static #isVector(object) {
        return object.constructor === Vector;
    }

    add (vector) {
        if (!Vector.#isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        this.pos = Vector.add(this, vector).pos;
    }

    static add(vector1, vector2) {
        if (!Vector.#isVector(vector1) || !Vector.#isVector(vector2)) throw new TypeError(`Got ${vector1.constructor}  and ${vector2.constructor} but wanted Vector object!`);
        return new Vector(vector1.pos.x + vector2.pos.x,
            vector1.pos.y + vector2.pos.y);
    }

    subtract (vector) {
        if (!Vector.#isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        this.pos = Vector.subtract(this, vector).pos;
    }

    static subtract(vector1, vector2) {
        if (!Vector.#isVector(vector1) || !Vector.#isVector(vector2)) throw new TypeError(`Got ${vector1.constructor}  and ${vector2.constructor} but wanted Vector object!`);
        return new Vector(vector1.pos.x - vector2.pos.x,
            vector1.pos.y - vector2.pos.y);
    }

    magnitude() {
        return Vector.magnitude(this);
    }

    static magnitude(vector) {
        if (!Vector.#isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        return Math.sqrt(Math.pow(vector.pos.x, 2) + Math.pow(vector.pos.y, 2));
    }

    scalar(scalarValue) {
        if (isNaN(scalarValue)) throw new TypeError(`Got ${scalarValue.constructor} but wanted Number!`);
        Vector.scalar(this, scalarValue);
    }

    static scalar(vector, scalarValue) {
        if (isNaN(scalarValue) || !Vector.#isVector(vector)) throw new TypeError(`Got ${scalarValue.constructor} and wanted Number. Got ${vector.constructor} and wanted Vector object!`);
        for (let pos in vector.pos) {
            if (vector.pos.hasOwnProperty(pos)) {
                vector.pos[pos] *= scalarValue;
            }
        }
        return vector;
    }

    distance(vector) {
        if (!Vector.#isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        return Vector.distance(this, vector);
    }

    static distance(vector1, vector2) {
        if (!Vector.#isVector(vector1) || !Vector.#isVector(vector2)) throw new TypeError(`Got ${vector1.constructor}  and ${vector2.constructor} but wanted Vector object!`);
        return Math.sqrt(Math.pow(vector2.pos.x - vector1.pos.x,2)+ Math.pow(vector2.pos.y - vector1.pos.y,2));
    }

    normalize () {
         this.pos = Vector.normalize(this).pos;
    }

    static normalize(vector) {
        if (!Vector.#isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        let length = vector.magnitude();
        for (let pos in vector.pos) {
            if (vector.pos.hasOwnProperty(pos)) {
                vector.pos[pos] = vector.pos[pos] / length;
            }
        }
        return vector;
    }

    directionAngle () {
        return Vector.directionAngle(this);
    }

    static directionAngle(vector) {
        if (!Vector.#isVector(vector)) throw new TypeError(`Got ${vector.constructor} but wanted Vector object!`);
        return Math.atan(vector.pos.y/vector.pos.x) * 180 /Math.PI;
    }
}