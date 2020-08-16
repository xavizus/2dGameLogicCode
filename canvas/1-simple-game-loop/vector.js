module.exports = class Vector {
    pos = {
        x: null,
        y: null
    };

    constructor(x, y) {
        this.pos = {
            x: x,
            y: y
        }
    }

    add (vector) {
        this.pos = Vector.add(this, vector).pos;
    }

    static add(vector1, vector2) {
        return new Vector(vector1.pos.x + vector2.pos.x,
            vector1.pos.y + vector2.pos.y);
    }

    subtract (vector) {
        this.pos = Vector.subtract(this, vector).pos;
    }

    static subtract(vector1, vector2) {
        return new Vector(vector1.pos.x - vector2.pos.x,
            vector1.pos.y - vector2.pos.y);
    }

    magnitude() {
        return Vector.magnitude(this);
    }

    static magnitude(vector) {
        return Math.sqrt(Math.pow(vector.pos.x, 2) + Math.pow(vector.pos.y, 2));
    }

    scalar(scalarValue) {
        Vector.scalar(this, scalarValue);
    }

    static scalar(vector, scalarValue) {
        for (let pos in vector.pos) {
            if (vector.pos.hasOwnProperty(pos)) {
                vector.pos[pos] *= scalarValue;
            }
        }
        return vector
    }

    distance(vector) {
        return Vector.distance(this, vector);
    }

    static distance(vector1, vector2) {
        return Math.sqrt(Math.pow(vector2.pos.x - vector1.pos.x,2)+ Math.pow(vector2.pos.y - vector1.pos.y,2));
    }

    normalize () {
         this.pos = Vector.normalize(this).pos;
    }

    static normalize(vector) {
        let length = vector.magnitude();
        for (let pos in vector.pos) {
            if (vector.pos.hasOwnProperty(pos)) {
                vector.pos[pos] = vector.pos[pos] / length;
            }
        }
        return vector;
    }
}