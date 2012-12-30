var Vector = Vector || {},
    console = console || {log: function (){}},
    print = print || console.log,
    load = load || function (){};

load('Vector.js');

function star (n, rotation, precision) {
    'use strict';
 
    var points = [],
        sequence = [0, 1, -1, -1, 1],
        centre = new Vector(0, 0),
        vertices = [],
        vertexArray = [],
        angle = Math.PI * (1 / n),
        i;

    rotation = rotation || 0;
    precision = precision || 10;

    for (i = 0; i < n * 2; i++) {
        var point = Vector.J.rotateBy(rotation + angle * i).scale((i % 2 === 0) ? 1: 0.5);

        points.push(point);
    }

    function add (n) {
        return function (number) {
            return number + n;
        };
    }

    function wrap (length) {
        return function (index) {
            if (index >= length) {
                index -= length;
            }
            else if (index < 0) {
                index += length;
            }
            return index;
        };
    }

    // Sequence
    for (i = 0; i < n; i++) {
        var seq = sequence.map(add(i * 2)),
        string = '';
        
        seq = seq.map(wrap(points.length));

        for (var j = 0; j < seq.length; j++) {
            vertices.push(points[seq[j]]);
            string += seq[j] + '  ';
        }
        vertices.push(centre);
        print(string);
    }

    for (i = 0; i < vertices.length; i++) {
        vertexArray.push(vertices[i].x, vertices[i].y);
    }

    function stringVectors (vectors, rowSize) {
        var string = vectors[0].x + ',\t' + vectors[0].y;

        for (i = 1; i < vectors.length; i++) {
            string += ',\t';
            string += '\n';
            if (rowSize && i % rowSize === 0) {
                string += '\n';
            }

            string += vectors[i].x.toFixed(precision) + ',\t';
            string += vectors[i].y.toFixed(precision);
        }
        return string + '\n';
    }

    print(stringVectors(points));
    print(stringVectors(vertices, 3));

    return {
        points: points,
        vertexArray: vertexArray
    };
}
