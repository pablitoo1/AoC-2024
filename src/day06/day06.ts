import { readFileSync } from "fs";

const inputFile = "src/day06/day06.txt";
const input = readFileSync(inputFile, "utf-8");
const lines = input.trim().split("\n");

const DIRECTIONS: ("^" | ">" | "v" | "<")[] = ["^", ">", "v", "<"];
const MOVEMENTS: Record<"^" | ">" | "v" | "<", { x: number; y: number }> = {
    "^": { x: 0, y: -1 },
    ">": { x: 1, y: 0 },
    "v": { x: 0, y: 1 },
    "<": { x: -1, y: 0 }
};

let guardPosition = { x: 0, y: 0 };
let guardDirection: "^" | ">" | "v" | "<" = "^";
const labMap: string[][] = lines.map((line, y) => {
    return line.split("").map((char, x) => {
        if (DIRECTIONS.includes(char as "^" | ">" | "v" | "<")) {
            guardPosition = { x, y };
            guardDirection = char as "^" | ">" | "v" | "<";
            return ".";
        }
        return char;
    });
});

const visitedMap: boolean[][] = Array.from({ length: labMap.length }, () =>
    Array(labMap[0].length).fill(false)
);

visitedMap[guardPosition.y][guardPosition.x] = true;

const isWithinBounds = (x: number, y: number): boolean => {
    return y >= 0 && y < labMap.length && x >= 0 && x < labMap[0].length;
};

while (true) {
    const move = MOVEMENTS[guardDirection];
    const nextX = guardPosition.x + move.x;
    const nextY = guardPosition.y + move.y;

    if (isWithinBounds(nextX, nextY) && labMap[nextY][nextX] === "#") {
        guardDirection = DIRECTIONS[(DIRECTIONS.indexOf(guardDirection) + 1) % 4];
    } else if (isWithinBounds(nextX, nextY)) {
        guardPosition.x = nextX;
        guardPosition.y = nextY;
        visitedMap[nextY][nextX] = true;
    } else {
        break;
    }
}

let part1Result = 0;
for (let y = 0; y < visitedMap.length; y++) {
    for (let x = 0; x < visitedMap[y].length; x++) {
        if (visitedMap[y][x]) {
            part1Result++;
        }
    }
}

console.log("Part 1:", part1Result);
