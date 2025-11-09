import { console } from "inspector";
import { Graph } from "./graphRealization";
import util from "util";

let a = new Graph();

a.readfile(
  // "C:/Users/oisa0/OneDrive/Рабочий стол/tgr/teorygraph/test/list_of_adjacency_good_task_1/gpg_t1_004.txt",
  "/Users/root1/Desktop/trg/teorygraph/test/list_of_adjacency_good_task_1/gpg_t1_002.txt",
);

type GraphLitsEdge = { [key: string]: string | number }[];

function findSourceAndSink(graph: Graph): number[] {
  const base: Map<number, number[]> = new Map(graph.filedata);
  const source = new Array();
  const snick = new Array();
  // console.log(util.inspect(graph.list_of_edges(), { maxArrayLength: null }));
  for (let i = 0; i < graph.list_of_edges().length; i++) {
    if (graph.filedata.get(i + 1)?.length == 0) {
      source.push(i + 1);
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
  for (let i = 0; i < source.length; i++) {
    for (let j = 0; j < snick.length; j++) {
      if (source[i] == snick[j]) {
        source[i] = source[source.length - 1],
          snick[j] = snick[snick.length - 1],
          source.pop(),
          snick.pop(); // swap and pop delet algorithm
      }
    }
  }
  /* eslint-enable */
  // prettier-ignore-end
  return [source[0], snick[0]];
}

// findSourceAndSink(a);

function initializeFlow(adjList: Map<number, string[][]>): void {
  // Сначала добавляем flow=0 ко всем существующим рёбрам
  for (const [vertex, edges] of adjList) {
    for (const edge of edges) {
      edge.push("0");
    }
  }

  // Создаём обратные рёбра с capacity=0 и flow=0
  const backEdges: Map<number, string[][]> = new Map();

  for (const [from, edges] of adjList) {
    for (const edge of edges) {
      const to = Number(edge[0]);

      // Проверяем, существует ли уже обратное ребро to -> from
      const existingEdge = adjList.get(to)?.find(e => Number(e[0]) === from);

      if (!existingEdge) {
        // Создаём обратное ребро to -> from с capacity=0
        if (!backEdges.has(to)) {
          backEdges.set(to, []);
        }
        backEdges.get(to)!.push([String(from), "0", "0"]);
      }
    }
  }

  // Добавляем обратные рёбра в граф
  for (const [vertex, edges] of backEdges) {
    adjList.get(vertex)!.push(...edges);
  }
}

// DFS для поиска увеличивающего пути
function findPathDFS(
  adjList: Map<number, string[][]>,
  source: number,
  sink: number
): Map<number, number> | null {
  const stack: number[] = [source];
  const parent = new Map<number, number>();
  const visited = new Set<number>();
  visited.add(source);

  while (stack.length > 0) {
    const u = stack.pop()!;

    if (u === sink) {
      return parent;
    }

    const edges = adjList.get(u) || [];
    for (const edge of edges) {
      const v = Number(edge[0]);
      const capacity = Number(edge[1]);
      const flow = Number(edge[2]);

      // Проверяем остаточную пропускную способность
      if (!visited.has(v) && (capacity - flow) > 0) {
        visited.add(v);
        parent.set(v, u);
        stack.push(v);
      }
    }
  }

  return null;
}

// Основной алгоритм Форда-Фалкерсона
function FordFulkersonAlgorithm(graph: Graph): number {
  // Находим источник и сток
  let adjList = graph.filedata;
  const [sink, source] = findSourceAndSink(graph);

  console.log(`Source: ${source}, Sink: ${sink}`);

  // Инициализируем потоки и создаём обратные рёбра
  initializeFlow(adjList);

  let maxFlow = 0;
  let iteration = 0;

  while (true) {
    iteration++;
    const parent = findPathDFS(adjList, source, sink);

    if (parent === null) {
      console.log(`Пути больше нет. Итераций: ${iteration - 1}`);
      break;
    }

    // Восстанавливаем путь
    const path: number[] = [];
    for (let v = sink; v !== source; v = parent.get(v)!) {
      path.unshift(v);
    }
    path.unshift(source);
    console.log(`Итерация ${iteration}, путь:`, path);

    // Находим минимальную остаточную пропускную способность
    let pathFlow = Infinity;
    for (let v = sink; v !== source; v = parent.get(v)!) {
      const u = parent.get(v)!;
      const edge = adjList.get(u)!.find((e: string[]) => Number(e[0]) === v)!;
      const residualCapacity = Number(edge[1]) - Number(edge[2]);
      pathFlow = Math.min(pathFlow, residualCapacity);
    }

    console.log(`Поток по пути: ${pathFlow}`);

    // Обновляем потоки на прямых и обратных рёбрах
    for (let v = sink; v !== source; v = parent.get(v)!) {
      const u = parent.get(v)!;

      // Увеличиваем поток на прямом ребре u -> v
      const forwardEdge = adjList.get(u)!.find((e: string[]) => Number(e[0]) === v)!;
      forwardEdge[2] = String(Number(forwardEdge[2]) + pathFlow);

      // Уменьшаем поток на обратном ребре v -> u
      const backwardEdge = adjList.get(v)!.find((e: string[]) => Number(e[0]) === u)!;
      backwardEdge[2] = String(Number(backwardEdge[2]) - pathFlow);
    }

    maxFlow += pathFlow;
  }

  return maxFlow;
}







function dfs(graph: Graph, startVertex: number) {
  let steck: number[] = [];
  let visited = new Array(graph.filedata.size).fill(false);
  steck.push(startVertex);
  while (steck.length != 0) {
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


// let [snick, source] = findSourceAndSink(a);
// console.log(dfs(a, source as number))
let b = FordFulkersonAlgorithm(a)
console.log(b)
