
function star (n, inset, rotation, precision, suffix) {
    'use strict';
 
    var Vector = Vector || {},
        points = [],
        sequence = [0, 1, -1, -1, 1],
        centre = new Vector(0, 0),
        triangles = [],
        vertexArray = [],
        angle = Math.PI * (1 / n),
        i;

    i = i || 5;
    inset = inset || 0.5;
    rotation = rotation || 0;
    precision = precision || 10;
    suffix = suffix || '';

    for (i = 0; i < n * 2; i++) {
        var rot = rotation + angle * (i + (n % 2 ? 0.5: 0)),
            point = Vector.J.rotateBy(rot).scale(i % 2 ? inset: 1);

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
            triangles.push(points[seq[j]]);
            //string += seq[j] + '  ';
        }

        triangles.push(centre);
        //print(string);
    }

    for (i = 0; i < triangles.length; i++) {
        vertexArray.push(triangles[i].x, triangles[i].y);
    }

    function stringVectors (vectors, rowSize) {
        var string = [
                vectors[0].x.toFixed(precision),
                suffix,
                ',\t',
                vectors[0].y.toFixed(precision),
                suffix
            ].join('');

        for (i = 1; i < vectors.length; i++) {
            string += ',\t';
            string += '\n';
            if (rowSize && i % rowSize === 0) {
                string += '\n';
            }

            string += [
                vectors[i].x.toFixed(precision),
                suffix,
                ',\t',
                vectors[i].y.toFixed(precision),
                suffix
            ].join('');
        }
        return string + '\n';
    }

    print('Points:');
    print('---------');
    print(stringVectors(points));

    print('Triangles:');
    print('----------');
    print(stringVectors(triangles, 3));

    return {
        points: points,
        triangles: triangles,
        vertexArray: vertexArray
    };
}

if (arguments && arguments.length) {
    star.apply(this, arguments);
}
