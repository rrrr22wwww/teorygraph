import * as fs from "fs";
import { binaryHeap } from "./binary-heap";
interface neighbours {
  [key: string]: number[]
}
interface Node {
  position: number[];
  g: number;  // стоимость от старта
  f: number;  // g + эвристика
}

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

const heightMap = initMap("C:\\Users\\oisa0\\OneDrive\\Рабочий стол\\tgr\\teorygraph\\test\\task_2\\map_001.txt") // "/Users/root1/Desktop/trg/teorygraph/test/task_2/map_001.txt"
const [st, end] = initCoordinate("C:\\Users\\oisa0\\OneDrive\\Рабочий стол\\tgr\\teorygraph\\test\\task_2\\map_001_task_002.txt") // "/Users/root1/Desktop/trg/teorygraph/test/task_2/map_001_task_002.txt"

function Chebyshev(start: number[], end: number[]): number {
  return Math.max(Math.abs(start[0] - end[0]), Math.abs(start[1] - end[1]));
}

function dist(s: number[], hs: number, e: number[], he: number) {
  return Math.abs(e[0] - s[0]) + Math.abs(e[1] - s[1]) + Math.abs(he - hs)
}

function neighbours(position:number[]):neighbours {
  return {
      left:   [position[0],position[1] - 1],
      right:  [position[0],position[1] + 1],
      top:    [position[0] - 1,position[1]],
      bottom: [position[0] + 1,position[1]],
    }
}
let vstd;
function Astar(heightMap: number[][], start: number[], end: number[]): void {
  let map = heightMap;
  const queue = new binaryHeap<Node>((a,b)=> a.f < b.f);

  queue.push({
    position:start,
    g:0,
    f: Chebyshev(start, end),
  })

  const visited = new Set <string>();

  while (queue.size() > 0) {
    const current = queue.shift();
    if (!current) return;
   
    const currentKey = `${current.position[0]},${current.position[1]}`;
    if (visited.has(currentKey)) continue;
     visited.add(currentKey)

    if (current?.position[0] === end[0] && current?.position[1] === end[1]) {
      console.log("Found path to the end:", current);
      // console.log(visited,visited.size)
      vstd = visited;
        // console.log(JSON.stringify(map)) --CHEK
      return;
    }

    const neighbors = neighbours(current.position); // -- refact code
    // console.log(neighbors)
    // console.log(current.f,current.position)
    for(let key in neighbors) {
      const row = neighbors[key][0];
      const col = neighbors[key][1];
      const neighborKey = `${row},${col}`;
      
      // Проверка границ карты(Пропускаем соседа, если он за границей карты)
      if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) {
        continue;
      }

      if (visited.has(neighborKey)) { // --CHEK
        continue;
      }
      const currDist = dist(current.position, map[current.position[0]][current.position[1]], neighbors[key], map[row][col]);
      const h = Chebyshev(neighbors[key], end);
      // console.log(h,neighbors[key], end) // Еврестическая оценка
  
      const g = current.g + currDist;

        queue.push({
          position: neighbors[key],
          g:g,
          f:g + h,
        })

    }
  }

}

Astar(heightMap, st, end)

function pritArr(visited:any,heightMap: number[][]):void {
  let arr  = visited.values();
  let mtrx = structuredClone(heightMap)
  console.table(mtrx)
  for(let i = 0; i < visited.size; i++) {
    let sr = arr.next().value;
    let coord = [Number(sr[0]),Number(sr[2])]
    mtrx[coord[0]][coord[1]] = 1;
  }
  console.table(mtrx)
}

 pritArr(vstd ,heightMap)
