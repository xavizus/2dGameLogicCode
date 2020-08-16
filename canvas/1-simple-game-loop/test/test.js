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
    });
});