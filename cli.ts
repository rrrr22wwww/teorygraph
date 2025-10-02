import * as readline from 'readline';
import { graph, Dijkstra, isConnected, Prim } from './graphRealization.ts';

let currentGraph: graph | null = null; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "❯"
});

console.log("Доступные команды: --help, quit");

rl.on("line", (line: string) => {
    const parts = line.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    try {
        switch (command) {
            case "--help":
            case "help":
            case "h":
            case "?": {
                console.log(`
--------------------------------------------------------------------------------
[Система]
  init <type>               - Создать граф ('directed'/'undirected'). @Алиас: i.
  load <file> [-t type]     - Загрузить граф из файла (тип опционален). @Алиас: l.
  save [file]               - Сохранить граф в файл. @Алиас: s.
  help                      - Показать эту справку. @Алиасы: h, ?, --help.
  quit                      - Выйти из программы. @Алиасы: q, quit.

[Изменение графа]
  add-vertex <v1> [<v2>...] - Добавить одну или несколько вершин. @Алиас: av.
  add-edge <from> <to> [-w w]- Добавить ребро (вес [-w] опционален). @Алиас: ae.
  remove-vertex <v1> ...    - Удалить одну или несколько вершин. @Алиас: rv.
  remove-edge <from> <to>   - Удалить ребро. @Алиас: re.

[Алгоритмы и информация]
  vertices                  - Показать все вершины. @Алиасы: v, lv.
  edges                     - Показать все рёбра. @Алиасы: e, le.
  connectivity              - Проверить связность и компоненты. @Алиас: conn.
  dijkstra <start>          - Расстояния от начальной вершины. @Алиас: dist.
  mst                       - Показать минимальное остовное дерево.
--------------------------------------------------------------------------------
                `);
                break;
            }
            case "init":
            case "i": {
                if (args.length < 1) throw new Error("Укажите тип графа: directed или undirected");
                const type = args[0] as "directed" | "undirected";
                if (type !== "directed" && type !== "undirected") throw new Error("Неверный тип");
                currentGraph = new graph("", type); 
                console.log(`Граф ${type} создан.`);
                break;
            }
            case "load":
            case "l": {
                if (!args.length) throw new Error("Укажите путь к файлу");
                let filePath = args[0];
                let type: "directed" | "undirected" = "directed";
                const typeIndex = args.findIndex(arg => arg === "-t");
                if (typeIndex > -1 && typeIndex + 1 < args.length) {
                    type = args[typeIndex + 1] as "directed" | "undirected";
                    filePath = args[0];
                }
                if(currentGraph) {
                    currentGraph.filedata = currentGraph.readfile(filePath);
                    currentGraph.typeGraph = type;
                }
                console.log(`Граф загружен из ${filePath} (тип: ${type}).`);
                break;
            }
            case "save":
            case "s": {
                if (!currentGraph) throw new Error("Граф не инициализирован. Используйте init или load.");
                const filePath = args[0] || "saved_graph.txt";
                let content = `${currentGraph.size()}\n`;
                for (const [v1, edges] of currentGraph.filedata) {
                    for (const edge of edges) {
                        content += `${v1} ${edge[0]} ${edge[1]}\n`;
                    }
                }
                require('fs').writeFileSync(filePath, content);
                console.log(`Граф сохранен в ${filePath}.`);
                break;
            }
            case "exit":
            case "q":
            case "quit": {
                console.log("Succes!");
                rl.close();
                break;
            }

          
            case "add-vertex":
            case "av": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                if (!args.length) throw new Error("Укажите вершины.");
                for (const vStr of args) {
                    const v = Number(vStr);
                    if (isNaN(v)) throw new Error(`Неверная вершина: ${vStr}`);
                    currentGraph.add_vertex(v);
                }
                console.log(`Вершины добавлены.`);
                break;
            }
            case "add-edge":
            case "ae": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                if (args.length < 2) throw new Error("Укажите from и to.");
                if (Number(args[3]) < 0 ) throw new Error ("Отрицательные графы запрещены")
                const from = Number(args[0]);
                const to = Number(args[1]);
                let weight = Number(args[2]);
                const wIndex = args.findIndex(arg => arg === "-w");
                if (wIndex > -1 && wIndex + 1 < args.length) {
                    weight = Number(args[wIndex + 1]);
                }
                if (isNaN(from) || isNaN(to) || isNaN(weight)) throw new Error("Неверные параметры.");
                currentGraph.add_edge(from, to, weight);
                console.log(`Ребро ${from} -> ${to} (вес ${weight}) добавлено.`);
                break;
            }
            case "remove-vertex":
            case "rv": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                if (!args.length) throw new Error("Укажите вершины.");
                
                for (const vStr of args) {
                    const v = Number(vStr);
                    if (isNaN(v)) throw new Error(`Неверная вершина: ${vStr}`);
                    currentGraph.filedata.delete(v);
                }
                console.log(`Вершины удалены.`);
                break;
            }
            case "remove-edge":
            case "re": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                if (args.length < 2) throw new Error("Укажите from и to.");
                const from = Number(args[0]);
                const to = Number(args[1]);
                if (isNaN(from) || isNaN(to)) throw new Error("Неверные параметры.");
                currentGraph.rm_edge(from,to)
                console.log(`Ребро ${from} -> ${to} удалено.`);
                break;
            }

            case "vertices":
            case "v":
            case "lv": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                const verts = Array.from(currentGraph.filedata.keys()).sort((a, b) => a - b);
                console.log("Вершины:", verts.join(', '));
                break;
            }
            case "edges":
            case "e":
            case "le": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                const edges = currentGraph.list_of_edges();
                console.log("Рёбра:");
                edges.forEach(edge => console.log(`${edge.from} -> ${edge.to} (вес: ${edge.wight})`));
                break;
            }
            case "connectivity":
            case "conn": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                const isConn = isConnected(currentGraph);
                console.log(isConn ? "Граф связный." : "Граф несвязный.");
                break;
            }
            case "dijkstra":
            case "dist": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                if (!args.length) throw new Error("Укажите start.");
                const start = Number(args[0]);
                if (isNaN(start)) throw new Error("Неверная вершина.");
                const dists = Dijkstra(start, currentGraph.filedata);
                console.table(dists);
                break;
            }
            case "mst": {
                if (!currentGraph) throw new Error("Граф не инициализирован.");
                if (!isConnected(currentGraph)) {
                    console.log("Граф несвязный, MST не строится.");
                } else {
                    let prim = Prim(currentGraph);
                    console.table(prim)
                }
                break;
            }
            default: {
                console.log(`Неизвестная команда: ${command}. Используйте --help.`);
            }
        }
    } catch (err: any) {
        console.error(`[x] Ошибка: ${err.message}`);
    }
});

rl.prompt();


