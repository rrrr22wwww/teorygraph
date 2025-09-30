import * as fs from "fs";

type SingleNumberProperty = {
  [key: string]: number;
};
type typeGraph = "directed" | "undirected"
type typeGraphArg = Map<number, string[][]>;

class graph {
  public typeGraph:typeGraph;
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
    }
    console.log("This vertex is already there ");
  }
  public add_edge(v1: number, v2: number, weight: number): void {
    // if(this.is_edge(v1,v2)) { throw new Error("This edge is already there");} - не уверне что нужна проверка :l
    const oldEdges = this.filedata.get(v1) || [];
    this.filedata.set(v1, [...oldEdges, [v2.toString(), weight.toString()]]);
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
  }
}

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
      console.warn(`There are no neighbors for the vertex ${current}`);
    }
  }

  console.log("Total distances:", d);
  return d;
}

function isConnected(graph: graph): boolean {
  const vertices = Array.from(graph.filedata.keys());
  
  if (vertices.length <= 1) return true;

  const visited = new Set<number>();

  function dfs(vertex: number) {
    visited.add(vertex);
    const neighbors = graph.filedata.get(vertex) || [];
    for (const edge of neighbors) {
      if (!visited.has(Number(edge[0]))) {
        dfs(Number(edge[0]));
      }
    }
  }

  dfs(vertices[0]);
  return visited.size === graph.size();
}



function Prim(graph: graph): void {
  if(!isConnected(graph)) {return console.log("The graph is not connected")}
  let mst: string[][] = [];
  let vertices = Array.from(graph.filedata.keys());
  const originalSize = vertices.length;
  const visited: number[] = [];
  let adjList: string[][] = [];
  
  for(let i = 0; i < originalSize - 1 ; i++) {
    if (visited.length === 0) {
      visited.push(vertices[i]);
      adjList.push(...graph.filedata.get(visited[i]))
      vertices = vertices.filter(vertex => vertex !== visited[i])
    }
    if (visited.length !== 0) {
      if (adjList.length === 0) {
        continue;
      }

      let minEdge: string[] | null = null;
      let minWeight = Infinity;

     
      for (const edge of adjList) {
        const target = Number(edge[0]);
        const weight = Number(edge[1]);

        if (!visited.includes(target) && weight < minWeight) {
          minWeight = weight;
          minEdge = edge;
        }
      }
      if (minEdge === null) {
        continue;
      }
      adjList = adjList.filter(edge => edge !== minEdge);
      
      const curretVertex = minEdge;
      mst.push(minEdge);
      visited.push(Number(curretVertex[0]));
      const newNeighbors = graph.filedata.get(Number(curretVertex[0]));
      const filteredNeighbors = newNeighbors.filter((edge:any) => !visited.includes(Number(edge[0])));
      adjList.push(...filteredNeighbors);
      vertices = vertices.filter(vertex => vertex !== Number(curretVertex[0]))
    }
  }
  console.log(visited)
  console.log(mst)
  console.log(vertices)

}

const Graph2 = new graph("./chek.txt", "directed");
Dijkstra(1,Graph2.filedata)
Prim(Graph2);
