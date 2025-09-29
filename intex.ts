import * as fs from "fs";

type SingleNumberProperty = {
  [key: string]: number;
};
type typeGraph = "directed" | "undirected"
type typeGraphArg = Map<number, string[][]>;

// type filedata = Map<number, [string, string][]>;

class graph {
  private vertexWeight: [];
  private typeGraph:typeGraph;
  public filedata;
  public size() {
    return this.filedata.size;
  }
  public weight(v1: number, v2: number): number | null {
    const adjacentVertex = [this.filedata.get(v1), this.filedata.get(v2)]; // ([string, string][] | undefined)[]

    if (adjacentVertex[0]) {
      for (const edge of adjacentVertex[0]) {
        const Vertex: number = Number(edge[0]);
        if (Vertex == v2) {
          return Number(edge[1]);
        }
      }
    }
    if (this.typeGraph === "undirected") {
      for (const edge of adjacentVertex[1]) {
        const Vertex: number = Number(edge[0]);
        if (Vertex == v1) {
          return Number(edge[1]);
        }
      }
    }

    return null;
  }

  public is_edge(v1: number, v2: number): boolean {
    const edgeVertex = [...this.filedata.get(v1), ...this.filedata.get(v2)];
    for (let i = 0; i < edgeVertex.length - 1; i++) {
      if (v1 == edgeVertex[i][0] || v2 == edgeVertex[i][0]) return true;
    }
    return false;
  }
  public add_vertex(v1: number): void {
    if (!this.filedata.has(v1)) {
      this.filedata.set(v1, []);
      // console.log(this.filedata)
    }
    console.log("This vertex is already there ");
  }
  public add_edge(v1: number, v2: number, weight: number): void {
    // if(this.is_edge(v1,v2)) { throw new Error("This edge is already there");} - не уверне что нужна проверка :l
    const oldEdges = this.filedata.get(v1) || [];
    this.filedata.set(v1, [...oldEdges, [v2.toString(), weight.toString()]]);
    // console.log(this.filedata)
  }

  public list_of_edges(vertex?: number) {
    const edgeList: { from: string; to: string; wight: number }[] = [];
    for (let edges of this.filedata) {
      for (let i = 0; i < edges[1].length; i++) {
        edgeList.push({
          from: edges[0].toString(),
          to: edges[1][i][0].toString(),
          wight: edges[1][i][1],
        });
      }
    }
    let resultList = edgeList;
    if (this.typeGraph === "undirected") {
      const uniqueEdges = new Map<string, { from: string; to: string; wight: number }>();
      for (let edge of edgeList) {
        const key = `${Math.min(Number(edge.from), Number(edge.to))}-${Math.max(Number(edge.from), Number(edge.to))}`;
        if (!uniqueEdges.has(key)) {
          uniqueEdges.set(key, { 
            from: edge.from, 
            to: edge.to,
            wight: edge.wight
           });
        }
      }


      resultList = Array.from(uniqueEdges.values());
    }
  if (vertex !== undefined) {
    const vertexStr = vertex.toString();
    return resultList.filter(edge => edge.from === vertexStr || edge.to === vertexStr);
  }
    console.log(edgeList);
    return resultList;
  }

  private readfiles(path: string) {
    return fs.readFileSync(path, "utf-8");
  }

  private readfile(path: string) {
    const content = this.readfiles(path).split("\n");
    const weightgraph = new Map();
    for (let i = 1; i < content.length - 1; i++) {
      const lineParts = content[i].split(" ");
      const parsedLine = [];
      for (let j = 0; j < lineParts.length; j++) {
        parsedLine.push(lineParts[j].split(":"));
      }
      weightgraph.set(i, parsedLine);
    }
    return weightgraph;
  }
  constructor(pathGraph: string, tGraph:typeGraph) {
    this.filedata = this.readfile(pathGraph);
    this.typeGraph = tGraph;
    this.vertexWeight = [];
  }
}

// console.log(Graph2)
// console.log(Graph2.weight(2,4))
// console.log(Graph2.size())
// Graph2.add_edge(2,5,22)
// Graph2.add_vertex(12)
// console.log(Graph2.is_edge(10,5))
// console.log(Graph2.list_of_edges(3))

function Dijkstra(star: number, graph: typeGraphArg) {
  let d: SingleNumberProperty = {};
  let visited: { [key: string]: boolean } = {};

  for (let vertex of graph.keys()) {
    d[vertex.toString()] = Infinity;
  }
  d[star.toString()] = 0;

  let numVisited = 0;
  while (numVisited < graph.size) {
    let minDist = Infinity;
    let currentVertexStr: string | null = null;
    for (let vertex of graph.keys()) {
      let vStr = vertex.toString();
      if (!visited[vStr] && d[vStr] < minDist) {
        minDist = d[vStr];
        currentVertexStr = vStr;
      }
    }
    if (currentVertexStr === null) break;

    let current = Number(currentVertexStr);
    visited[currentVertexStr] = true;
    numVisited++;

    // console.log(`Переходим к вершине ${current} (расстояние: ${minDist})`);

    const listweight = graph.get(current);
    if (listweight) {
      for (let j = 0; j < listweight.length; j++) {
        const a: string[] = listweight[j];
        const neighbor = a[0]; // Строка, напр. "2"
        const weight = Number(a[1]); // Число, напр. 15

        let newDist = d[currentVertexStr] + weight;
        if (newDist < d[neighbor]) {
          d[neighbor] = newDist;
          // console.log(`Обновлено: до ${neighbor} = ${newDist}`);
        }
      }
    } else {
      console.warn(`Нет соседей для вершины ${current}`);
    }
  }

  console.log("Итоговые расстояния:", d);
  return d;
}

function Prim(graph: graph): void {
  const sortedEdges = graph.list_of_edges().sort((a, b) => a.wight - b.wight);
  const adjList: Map<number, number> = new Map();
  const vertices = Array.from(graph.filedata.keys()); // НУЖНО ПЕРЕДЕЛАТЬ ВРОДЕ НЕ ТО!!!!!
  let i = 1;
  for (const vertex of vertices) {
    adjList.set(vertex, i);
    i++;
  }
  // for (let vertex of graph.filedata.keys()) {
  //   adjList.set(vertex, -1);
  // }
  console.log(adjList);

  // for (let edges of graph.values()) {
  //     edgeList.push(...edges)
  // }
  // console.log(edgeList)
}

const Graph2 = new graph("./chek.txt", "directed");
// console.log(Graph2.filedata)
// Dijkstra(1, Graph2.filedata);
// Prim(Graph2.filedata)
// console.log(Graph2.list_of_edges(2));
Prim(Graph2);


























// const myObject: { [key: number]: [string, string][] } = {
//   1: [
//     ["2", "15"],
//     ["4", "51"],
//     ["7", "31"],
//   ],
//   2: [
//     ["1", "15"],
//     ["4", "25"],
//     ["7", "43"],
//   ],
//   3: [
//     ["8", "30"],
//     ["9", "20"],
//     ["6", "35"],
//   ],
//   4: [
//     ["1", "51"],
//     ["2", "25"],
//     ["7", "81"],
//   ],
//   5: [["10", "16"]],
//   6: [
//     ["8", "8"],
//     ["9", "39"],
//     ["3", "35"],
//   ],
//   7: [
//     ["1", "31"],
//     ["2", "43"],
//     ["4", "81"],
//   ],
//   8: [
//     ["9", "12"],
//     ["3", "30"],
//     ["6", "8"],
//   ],
//   9: [
//     ["8", "12"],
//     ["3", "20"],
//     ["6", "39"],
//   ],
//   10: [["5", "16"]],
// };
