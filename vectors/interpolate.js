(function (scope) {
    'use strict';

    function join (v1, v2, segLength) {
        var joinVector = v2.minus(v1),
            magnitude = joinVector.magnitude(),
            numberOfPoints = magnitude / segLength,
            interpolated = [],
            i;

        for (i = 0; i < numberOfPoints; i++) {
            interpolated.push(
                v1.plus(joinVector.unitVector().scale(i * segLength)));
        }
        return interpolated;
    }

    function interpolate (vertices, steps) {
        var points = [],
            pathLength = 0,
            segmentLength,
            interpolated = [],
            i;

        if (!(vertices[0] instanceof Vector)) {
            vertices = vertices.map(Vector);
        }

        // Calculate the total length of the vertex sequence
        for (i = 0; i < vertices.length - 1; i++) {
            pathLength += vertices[i].distanceTo(vertices[i + 1]);
        }
        segmentLength = pathLength / steps;

        for (i = 0; i < vertices.length - 1; i++) {
            interpolated = interpolated.concat(join(vertices[i], vertices[i + 1], segmentLength));
        }

        return interpolated;
    }

    scope.join = join;
    scope.interpolate = interpolate;
} (this));
