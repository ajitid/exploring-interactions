// src: Popmotion

export function snap(x: number): (v: number) => number;
export function snap(x: number[]): (v: number) => [point: number, index: number];
export function snap(points: number | number[]) {
  if (typeof points === "number") {
    return (v: number) => Math.round(v / points) * points;
  } else {
    const firstPoint = points[0];
    if (firstPoint === undefined) {
      throw new Error("at least one point must be provided in the array");
    }

    let i = 0;
    const numPoints = points.length;

    return (v: number) => {
      let lastDistance = Math.abs(firstPoint - v);

      for (i = 1; i < numPoints; i++) {
        // valid as i won't exceed `points` array's length
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const point = points[i]!;
        const distance = Math.abs(point - v);

        if (distance === 0) return [point, i];

        if (distance > lastDistance) return [points[i - 1], i - 1];

        if (i === numPoints - 1) return [point, i];

        lastDistance = distance;
      }
    };
  }
}
