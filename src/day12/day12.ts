import { readFileSync } from "fs";

const inputFilePath = "src/day12/day12.txt";
const grid = readFileSync(inputFilePath, "utf-8")
  .split(/\r?\n/)
  .filter((line) => line.length > 0);

const DIRECTIONS: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function exploreRegionDFS(
  grid: string[],
  visited: boolean[][],
  gridWidth: number,
  gridHeight: number,
  startX: number,
  startY: number
): Set<string> {
  if (visited[startX][startY]) return new Set();

  visited[startX][startY] = true;
  const region = new Set<string>();
  region.add(`${startX},${startY}`);

  for (const [dx, dy] of DIRECTIONS) {
    const nextX = startX + dx;
    const nextY = startY + dy;

    if (
      nextX >= 0 &&
      nextX < gridWidth &&
      nextY >= 0 &&
      nextY < gridHeight &&
      grid[startX][startY] === grid[nextX][nextY] &&
      !visited[nextX][nextY]
    ) {
      const adjacentRegion = exploreRegionDFS(
        grid,
        visited,
        gridWidth,
        gridHeight,
        nextX,
        nextY
      );
      for (const point of adjacentRegion) {
        region.add(point);
      }
    }
  }
  return region;
}

function calculateRegionPerimeter(region: Set<string>): number {
  let perimeter = 0;
  for (const point of region) {
    const [x, y] = point.split(",").map(Number);
    perimeter += 4;
    for (const [dx, dy] of DIRECTIONS) {
      const neighbor = `${x + dx},${y + dy}`;
      if (region.has(neighbor)) {
        perimeter -= 1;
      }
    }
  }
  return perimeter;
}

function calculateTotalPerimeter(grid: string[]): number {
  const gridWidth = grid.length;
  const gridHeight = grid[0].length;
  const visited: boolean[][] = Array.from({ length: gridWidth }, () =>
    Array(gridHeight).fill(false)
  );
  let totalPerimeter = 0;

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      if (!visited[x][y]) {
        const region = exploreRegionDFS(
          grid,
          visited,
          gridWidth,
          gridHeight,
          x,
          y
        );
        totalPerimeter += region.size * calculateRegionPerimeter(region);
      }
    }
  }
  return totalPerimeter;
}

const part1Result = calculateTotalPerimeter(grid);
console.log("Part 1:", part1Result);
