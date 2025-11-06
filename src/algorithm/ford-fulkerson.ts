import { Graph } from "./graphRealization";
import util from "util";

let a = new Graph();

a.readfile(
  "C:/Users/oisa0/OneDrive/Рабочий стол/tgr/teorygraph/test/list_of_adjacency_good_task_1/gpg_t1_004.txt",
);

type GraphLitsEdge = { [key: string]: string | number }[];

function findSourceAndSink(graph: Graph): GraphLitsEdge[] {
  const base: Map<number, number[]> = new Map(graph.filedata); // no sravnivaem s graph.filedata
  const stock = new Array();
  const snick = new Array();
  console.log(util.inspect(graph.list_of_edges(), { maxArrayLength: null }));
  for (let i = 0; i < graph.list_of_edges().length; i++) {
    if (graph.filedata.get(i + 1)?.length == 0) {
      stock.push(i + 1);
    }
    base.delete(Number(graph.list_of_edges()[i]["to"]));
  }
  let iterator = base.keys();
  for (let k = 0; k < base.size; k++) {
    snick.push(iterator.next().value);
  }
  // проверка на связные вершины в стоке/истоке
  /* eslint-disable */
  // prettier-ignore
  for (let i = 0; i < stock.length; i++) {
    for (let j = 0; j < snick.length; j++) {
      if (stock[i] == snick[j]) {
        stock[i] = stock[stock.length - 1],
        snick[j] = snick[snick.length - 1],
          stock.pop(),
          snick.pop(); // swap and pop delet algorithm
      }
    }
  }
  /* eslint-enable */
  // prettier-ignore-end
  return [stock[0], snick[0]];
}

// findSourceAndSink(a);

function FordFulkerson(graph: Graph): void {
  let adjList = graph.filedata;
  let [stock, snick] = findSourceAndSink(graph);
  let steck: number[] = [];
  steck.push(Number(snick));
  // init flow
  for (const edge of adjList.keys()) {
    for (let i = 0; i <= adjList.get(edge).length - 1; i++) {
      adjList.get(edge)[i].push("0");
    }
  }
}

function dfs(graph: Graph, startVertex: number) {
  let steck: number[] = [];
  let visited = new Array(graph.filedata.size).fill(false);
  steck.push(startVertex);
  while (steck.length != 0) {
    console.log(steck);
    let u = steck[steck.length - 1];
    steck.pop();
    if (!visited[u - 1]) {
      visited[u - 1] = true;
      for (let j: number = graph.filedata.get(u).length - 1; j >= 0; j--) {
        if (!visited[Number(graph.filedata.get(u)[j][0] - 1)]) {
          steck.push(Number(graph.filedata.get(u)[j][0]));
        }
      }
    }
  }
}
FordFulkerson(a);
