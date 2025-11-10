import * as fs from "fs";

function readfile(path: string): string[] {
  const datafile = fs
    .readFileSync(path, "utf-8")
    .split("\n")
    .map((line) => line.trim());
  return datafile
}

function initMap(path: string) {
  const datafile = readfile(`${path}`)
  const heightMap: number[][] = [];
  for (let i = 1; i < datafile.length - 1; i++) {
    const lineParts = datafile[i].split(" ");
    const tmpArray: number[] = [];
    for (let j = 0; j < lineParts.length; j++) {
      tmpArray.push(Number(lineParts[j]));
    }
    heightMap.push(tmpArray);
  }
  return heightMap;
}

function initCoordinate(path: string) {
  const datafile = readfile(`${path}`)
  const start = datafile[1].split(' ').map(e => Number(e))
  const end = datafile[3].split(' ').map(e => Number(e))
  return [start, end]
}
const heightMap = initMap("/Users/root1/Desktop/trg/teorygraph/test/task_2/map_001.txt")
const [st, end] = initCoordinate("/Users/root1/Desktop/trg/teorygraph/test/task_2/map_001_task_002.txt")

function h(start: number[], end: number[]): number {
  return Math.max(Math.abs(start[0] - end[0]), Math.abs(start[1] - end[1]));
}

function dist(s: number[], hs: number, e: number[], he: number) {
  return Math.abs(e[0] - s[0]) + Math.abs(e[1] - s[1]) + Math.abs(he - hs)
}

function Astar(heightMap: number[][], start: number[], end: number[]): void {
  let map = heightMap;
  const distanceVertex = h(start, end)
  const queue = [start];
  console.log(distanceVertex)

  // while (queue) {

  // }
}

Astar(heightMap, st, end)
