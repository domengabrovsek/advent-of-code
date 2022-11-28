
const calculateLines = (wire) => {

  const lines = [];
  let currentX = 0; currentY = 0;

  wire.forEach(step => {
    const direction = step.slice(0, 1);
    const distance = parseInt(step.slice(1, step.length));

    switch (direction) {
      case 'R': {
        lines.push({ x1: currentX, y1: currentY, x2: currentX + distance, y2: currentY });
        currentX += distance;
        break;
      }
      case 'L': {
        lines.push({ x1: currentX, y1: currentY, x2: currentX - distance, y2: currentY });

        currentX -= distance;
        break;
      }
      case 'U': {
        lines.push({ x1: currentX, y1: currentY, x2: currentX, y2: currentY + distance });
        currentY += distance;
        break;
      }
      case 'D': {
        lines.push({ x1: currentX, y1: currentY, x2: currentX, y2: currentY - distance });
        currentY -= distance;
        break;
      }
    }
  })

  return lines;
}

// taken from http://paulbourke.net/geometry/pointlineplane/javascript.txt
// and modified
const calculateIntersection = (firstLine, secondLine) => {

  const { x1, x2, y1, y2 } = firstLine;
  const { x1: x3, x2: x4, y1: y3, y2: y4 } = secondLine;

  // We don't care about 0,0 intersection
  if (x1 === 0 && x3 === 0) {
    return;
  }

  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return;
  }

  let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
  if (denominator === 0) {
    return;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1)
  let y = y1 + ua * (y2 - y1)

  return { x, y };
}

const findLinesOfIntersection = (wires, point) => {

  const result = [];

  wires.forEach((wire, wireIndex) => {
    const lines = calculateLines(wire);

    for (let [index, line] of lines.entries()) {
      let dxc = point.x - line.x1;
      let dyc = point.y - line.y1;

      let dxl = line.x2 - line.x1;
      let dyl = line.y2 - line.y1;

      const cross = dxc * dyl - dyc * dxl;

      if (cross === 0) {

        if (result.find(x => x.wireIndex === wireIndex)) {
          result.pop();
        }

        let distance = 0;

        // save distance from previous lines
        for (let i = 0; i < index; i++) {
          // 'R8' -> 8, 'D123' -> 123
          const stepDistance = parseInt(wire[i].slice(1, wire[i].length));
          distance += stepDistance;
        }

        result.push({
          line: line,
          distance: distance,
          wireIndex: wireIndex
        });
      }
    }
  })

  return result;
}

const findDistanceToClosestIntersectionBySteps = (wires) => {

  const interceptions = calculateIntersectionPoints(wires);
  const distances = [];

  interceptions.forEach(interception => {

    // those are the lines on which the point of interception is
    const linesOfInterception = findLinesOfIntersection(wires, interception);

    let totalDistance = 0;

    // go through each line and find all the previous lines to calculate distance
    linesOfInterception.forEach(line => {

      const a = { x: line.line.x1, y: line.line.y1 };
      const b = interception;

      const totalLineDistance = line.distance + calculatePointDistance(a, b);

      totalDistance += totalLineDistance;
    })

    distances.push(totalDistance);
  })

  return Math.min(...distances);

}

const calculateIntersectionPoints = (wires) => {

  const [firstWire, secondWire] = wires;

  const intersections = [];

  const firstWireLines = calculateLines(firstWire);
  const secondWireLines = calculateLines(secondWire);

  firstWireLines.forEach(fl => {
    secondWireLines.forEach(sl => {

      const intersection = calculateIntersection(fl, sl);

      if (intersection) {
        intersections.push(intersection);
      }
    })
  })

  return intersections;
}

const calculateDistanceFromCenter = (point) =>
  Math.abs(point.x) + Math.abs(point.y);

const calculatePointDistance = (a, b) => Math.abs((a.x + a.y) - (b.x + b.y));

const calculateClosestIntersectionDistance = (intersections) =>
  Math.min(...intersections.map(intersection => calculateDistanceFromCenter(intersection)));

module.exports = {
  calculateIntersectionPoints,
  calculateDistanceFromCenter,
  calculateClosestIntersectionDistance,
  calculateLines,
  findLinesOfIntersection,
  findDistanceToClosestIntersectionBySteps,
  calculatePointDistance
}
