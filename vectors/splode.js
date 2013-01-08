function splode (n, steps, angleDiffRatio, precision) {
    var points = [],
        vector = new Vector (1, 0),
        displacements = [],
        angleDiff,
        i,
        j,
        currAngle = 0;

    n = n || 8;
    steps = steps || 100;
    precision = precision || 10;

    if (typeof angleDiffRatio !== 'number') {
        angleDiffRatio = 1;
    }

    angleDiff = Math.PI * 2 * (1 / n) * angleDiffRatio;

    for (i = 0; i < steps; i++) {
        var linear = i / steps;
        displacements.push(linear * linear);
        
        for (j = 0; j < n; j++) {
            vector = new Vector(1, 0).rotateTo(currAngle)
                .scale(displacements[i]);

            points.push(vector.x);
            points.push(vector.y);
            
            currAngle += angleDiff;
        }
    }

    var string = '',
        arrayLength = n * steps * 2;

    for (i = 0; i < arrayLength; i += 2) {
        if (i > 0) {
             string += ', ';
        }
        if ((i / 2) % n === 0) {
            string += '\n';
        }
        string += points[i].toFixed(precision) + 'f, ' + points[i + 1].toFixed(precision) + 'f';
    }

    print(string);
}

splode (8, 100, 1);
