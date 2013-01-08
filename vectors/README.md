Vectors
=======
They're everywhere.
______________________________

## Vector.js
Make vectors
```javascript
var v;

v = new Vector(-31, 4.1);
v = v.unitVector()
    .rotateBy(Math.PI)
    .scale(1.5)
    .plus(Vector.I.scale(-2));
// etc
```

## splode.js
Make splosions
```javascript
splode(numberOfParticles, animationSteps, spiralFactor, decimalFix);
```

## star.js
Make stars
```javascript
star(numberofPoints, inset, rotationRadians, decimalFix);
```

## interpolate.js
Join vectors
```javascript
interpolate(vectorArray, interpolations);
interpolate([Vector.I, {x: 2, y: 3}, new Vector(0, 0)], 10);
```

