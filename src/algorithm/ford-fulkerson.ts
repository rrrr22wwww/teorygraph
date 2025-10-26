import { Graph } from "./graphRealization";

let a = new Graph();
a.readfile(
  "/Users/root1/Desktop/trg/teorygraph/test/list_of_adjacency_good_task_1/gpg_t1_001.txt",
);

type GraphLitsEdge = { [key: string]: string | number }[];

function findSourceAndSink(graph: Graph): void {
  const base: Map<number, number[]> = new Map(graph.filedata); // no sravnivaem s graph.filedata
  const stock = new Array();
  const snick = new Array();
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
  console.log(stock, snick);
}

// findSourceAndSink(a);

function FordFulkerson(graph: Graph): void {
  let adjList = graph.filedata;
  // init flow
  for (const vertex of adjList.keys()) {
    for (let i = 0; i < adjList.get(vertex).length; i++) {
      adjList.get(vertex)[i].push("0");
    }
  }
  // let edgList: EdgList = graph.list_of_edges();
  // // init flow

  // for (let i = 0; i < edgList.length; i++) {
  //   edgList[i].flow = 0;
  // }
  console.log(adjList);
}

function dfs(graph: Graph) {
  let adjList = graph.filedata.keys();
  adjList.next();
  adjList.next();
  adjList.next();

  console.log(adjList.next().value);
}
dfs(a);
// FordFulkerson(a);
