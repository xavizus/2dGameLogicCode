let Vector = require('../vector');
let assert = require('assert');

describe('Vectors', function () {
    const a = 1, b = 2, c = 3, d = 4;
    let vectorA = new Vector(a,b);
    let vectorB = new Vector(c,d);
    beforeEach(function(done) {
        vectorA.pos.x = a;
        vectorA.pos.y = b;
        vectorB.pos.x = c;
        vectorB.pos.y = d;
        done();
    });
    describe('Successful tests', function () {
        it('should add two vectors', function () {
            vectorA.add(vectorB);
            assert.strictEqual(vectorA.pos.x, 4);
            assert.strictEqual(vectorA.pos.y, 6);
        });
        it('should subtract two vectors', function () {
            vectorA.subtract(vectorB);
            assert.strictEqual(vectorA.pos.x, -2);
            assert.strictEqual(vectorA.pos.y, -2);
        });

        it('should return Vector.pos that\'s two times larger', function () {
            vectorA.scalar(5);
            assert.strictEqual(vectorA.pos.x, 5);
            assert.strictEqual(vectorA.pos.y, 10);
        });
        it('return vector length', function () {
            let length = vectorA.magnitude();
            assert.strictEqual(length, 2.23606797749979);
        });

        it('return magnitude between two vectors', function () {
            let magnitude = vectorA.distance(vectorB);
            assert.strictEqual(magnitude, 2.8284271247461903);
        });

        it('normalize a vector', function () {
            vectorA.normalize();
            let length = vectorA.magnitude();
            assert.strictEqual(length, 0.9999999999999999);
        });

        it('should be an angle', function () {
            let degrees = vectorA.directionAngle();
            assert.strictEqual(Math.round(degrees), 63);
        });
    });

    describe('Tests to fail', function () {
        it('should fail to construct with non numbers', function () {
            assert.throws(() => new Vector("h", "a"), TypeError);
        });
        it('should fail to construct with nothing', function () {
            assert.throws(() => new Vector(), TypeError);
        });
        it('should fail to construct with null', function () {
            assert.throws(() => new Vector(null, null), TypeError);
        });
        it('should fail to construct with undefined', function () {
            assert.throws(() => new Vector(undefined, undefined), TypeError);
        });
        it('should fail to construct with infinity value', function () {
            assert.throws(() => new Vector(Infinity, 10), TypeError);
            assert.throws(() => new Vector(-Infinity, 10), TypeError);
        });
        it('should fail to add with numbers', function () {
            assert.throws(() => vectorA.add(10), TypeError);
        });
        it('should fail to add with "own made object"', function () {
           let object = {
               pos: {
                   x: 10,
                   y: 5
               }
           }
           assert.throws(() => vectorA.add(object), TypeError);
        });
    });

    describe('Static', function () {
        it('should subtract two vectors', function () {
            let newVector = Vector.subtract(vectorA, vectorB);
            assert.strictEqual(newVector.pos.x, -2);
            assert.strictEqual(newVector.pos.y, -2);
        });
        it('should add two vectors', function () {
            let newVector = Vector.add(vectorA, vectorB);
            assert.strictEqual(newVector.pos.x, 4);
            assert.strictEqual(newVector.pos.y, 6);
        });
        it('should return Vector.pos that\'s two times larger', function () {
            Vector.scalar(vectorA,5);
            assert.strictEqual(vectorA.pos.x, 5);
            assert.strictEqual(vectorA.pos.y, 10);
        });
        it('return vector length', function () {
            let length = Vector.magnitude(vectorA);
            assert.strictEqual(length, 2.23606797749979);
        });
        it('return magnitude between two vectors', function () {
            let magnitude = Vector.distance(vectorA,vectorB);
            assert.strictEqual(magnitude, 2.8284271247461903);
        });
        it('normalize a vector', function () {
            let length = (Vector.normalize(vectorA)).magnitude();
            assert.strictEqual(length, 0.9999999999999999);
        });

        it('should be an angle', function () {
            let degrees = Vector.directionAngle(vectorA);
            assert.strictEqual(Math.round(degrees), 63);
        });
    });
});