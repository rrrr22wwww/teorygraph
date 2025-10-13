import * as clack from '@clack/prompts';
import { graph, Dijkstra, isConnected, Prim } from './graphRealization.js';
import * as fs from 'fs';
import * as path from 'path';

let currentGraph = null;

const HELP_TEXT = `--------------------------------------------------------------------------------
[Система]
  init                      - Создать граф ('directed'/'undirected').
  load                      - Загрузить граф (выбор из тестовых файлов).
  save                      - Сохранить граф в файл.
  help                      - Показать эту справку.
  quit                      - Выйти из программы.

[Изменение графа]
  add-vertex                - Добавить одну или несколько вершин.
  add-edge                  - Добавить ребро (вес опционален).
  remove-vertex             - Удалить одну или несколько вершин.
  remove-edge               - Удалить ребро.

[Алгоритмы и информация]
  vertices                  - Показать все вершины.
  edges                     - Показать все рёбра.
  connectivity              - Проверить связность.
  dijkstra                  - Расстояния от начальной вершины.
  mst                       - Показать минимальное остовное дерево.
--------------------------------------------------------------------------------
`;

const TEST_DIR = 'C:\\Users\\oisa0\\OneDrive\\Рабочий стол\\tgr\\teorygraph\\test\\list_of_adjacency';

const run = async () => {
  clack.intro('Граф CLI');

  while (true) {
    const command = await clack.select({
      message: 'Выберите команду:',
      options: [
        { value: 'help', label: 'Помощь (help)' },
        { value: 'init', label: 'Инициализировать граф (init)' },
        { value: 'load', label: 'Загрузить граф (load)' },
        { value: 'save', label: 'Сохранить граф (save)' },
        { value: 'add-vertex', label: 'Добавить вершину (add-vertex)' },
        { value: 'add-edge', label: 'Добавить ребро (add-edge)' },
        { value: 'remove-vertex', label: 'Удалить вершину (remove-vertex)' },
        { value: 'remove-edge', label: 'Удалить ребро (remove-edge)' },
        { value: 'vertices', label: 'Вершины (vertices)' },
        { value: 'edges', label: 'Рёбра (edges)' },
        { value: 'connectivity', label: 'Связность (connectivity)' },
        { value: 'dijkstra', label: 'Дейкстра (dijkstra)' },
        { value: 'mst', label: 'MST (mst)' },
        { value: 'quit', label: 'Выход (quit)' },
      ],
    });

    if (command === 'quit') {
      clack.outro('Успех!');
      process.exit(0);
    }

    if (command === 'help') {
      console.log(HELP_TEXT);
      continue;
    }

    try {
      switch (command) {
        case 'init': {
          const type = await clack.select({
            message: 'Тип графа:',
            options: [
              { value: 'directed', label: 'Ориентированный (directed)' },
              { value: 'undirected', label: 'Неориентированный (undirected)' },
            ],
          });
          if (clack.isCancel(type)) break;
          currentGraph = new graph('', type);
          clack.log.success(`Граф ${type} создан.`);
          break;
        }
        case 'load': {
          if (!fs.existsSync(TEST_DIR)) {
            throw new Error(`Директория тестов не найдена: ${TEST_DIR}`);
          }
          const files = fs.readdirSync(TEST_DIR).filter(file => file.endsWith('.txt'));
          if (files.length === 0) {
            throw new Error('В директории тестов нет .txt файлов.');
          }
          const fileOptions = files.map(file => ({ value: path.join(TEST_DIR, file), label: file }));
          
          const result = await clack.group({
            filePath: () => clack.select({
              message: 'Выберите тестовый файл:',
              options: fileOptions,
            }),
            type: () => clack.select({
              message: 'Тип графа:',
              options: [
                { value: 'directed', label: 'Ориентированный (directed)' },
                { value: 'undirected', label: 'Неориентированный (undirected)' },
              ],
              initialValue: 'directed',
            }),
          });

          if (clack.isCancel(result)) break;

          currentGraph = new graph(result.filePath, result.type);
          clack.log.success(`Граф загружен из ${path.basename(result.filePath)} (тип: ${result.type}).`);
          break;
        }
        case 'save': {
          if (!currentGraph) throw new Error('Граф не инициализирован. Используйте init или load.');
          const filePath = await clack.text({
            message: 'Путь к файлу:',
            placeholder: 'saved_graph.txt',
            initialValue: 'saved_graph.txt',
          });
          if (clack.isCancel(filePath)) break;
          
          const content = currentGraph.serialize();
          fs.writeFileSync(filePath, content);
          clack.log.success(`Граф сохранен в ${filePath}.`);
          break;
        }
        case 'add-vertex': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const vertsInput = await clack.text({
            message: 'Вершины (через запятую):',
            placeholder: '1,2,3',
            validate: (value) => {
              if (!value || value.trim().length === 0) return 'Укажите вершины.';
              const verts = value.split(',').map(v => Number(v.trim()));
              if (verts.some(v => isNaN(v))) return 'Неверные вершины.';
            },
          });
          if (clack.isCancel(vertsInput)) break;
          const verts = vertsInput.split(',').map(v => Number(v.trim()));
          for (const v of verts) {
            currentGraph.add_vertex(v);
          }
          clack.log.success('Вершины добавлены.');
          break;
        }
        case 'add-edge': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const result = await clack.group({
            from: () => clack.text({
                message: 'From:',
                placeholder: '1',
                validate: (value) => !isNaN(Number(value)) || 'Должно быть числом',
            }),
            to: () => clack.text({
                message: 'To:',
                placeholder: '2',
                validate: (value) => !isNaN(Number(value)) || 'Должно быть числом',
            }),
            weight: () => clack.text({
                message: 'Вес:',
                placeholder: '1',
                initialValue: '1',
                validate: (value) => !isNaN(Number(value)) || 'Должно быть числом',
            }),
          });

          if (clack.isCancel(result)) break;

          currentGraph.add_edge(Number(result.from), Number(result.to), Number(result.weight));
          clack.log.success(`Ребро ${result.from} -> ${result.to} (вес ${result.weight}) добавлено.`);
          break;
        }
        case 'remove-vertex': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const vertsInput = await clack.text({
            message: 'Вершины для удаления (через запятую):',
            placeholder: '1,2',
            validate: (value) => {
              if (!value || value.trim().length === 0) return 'Укажите вершины.';
              const verts = value.split(',').map(v => Number(v.trim()));
              if (verts.some(v => isNaN(v))) return 'Неверные вершины.';
            },
          });
          if (clack.isCancel(vertsInput)) break;
          const verts = vertsInput.split(',').map(v => Number(v.trim()));
          for (const v of verts) {
            currentGraph.rm_vertex(v); // Используем метод класса
          }
          clack.log.success('Вершины удалены.');
          break;
        }
        case 'remove-edge': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const result = await clack.group({
            from: () => clack.text({
                message: 'From:',
                placeholder: '1',
                validate: (value) => !isNaN(Number(value)) || 'Должно быть числом',
            }),
            to: () => clack.text({
                message: 'To:',
                placeholder: '2',
                validate: (value) => !isNaN(Number(value)) || 'Должно быть числом',
            }),
          });
          if (clack.isCancel(result)) break;
          
          currentGraph.rm_edge(Number(result.from), Number(result.to));
          clack.log.success(`Ребро ${result.from} -> ${result.to} удалено.`);
          break;
        }
        case 'vertices': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const verts = Array.from(currentGraph.filedata.keys()).sort((a, b) => a - b);
          clack.note(`Вершины: ${verts.join(', ')}`);
          break;
        }
        case 'edges': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const edges = currentGraph.list_of_edges();
          clack.note('Рёбра:');
          // Исправлена опечатка wight -> weight
          console.table(edges.map(e => ({ from: e.from, to: e.to, weight: e.weight })));
          break;
        }
        case 'connectivity': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const isConn = isConnected(currentGraph);
          clack.log.info(isConn ? 'Граф связный.' : 'Граф несвязный.');
          break;
        }
        case 'dijkstra': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          const startStr = await clack.text({
            message: 'Начальная вершина:',
            placeholder: '1',
            validate: (value) => {
              const num = Number(value);
              if (isNaN(num)) return 'Неверная вершина.';
              return null;
            },
          });
          if (clack.isCancel(startStr)) break;
          const start = Number(startStr);
          const dists = Dijkstra(start, currentGraph.filedata);
          console.table(dists);
          break;
        }
        case 'mst': {
          if (!currentGraph) throw new Error('Граф не инициализирован.');
          if (!isConnected(currentGraph)) {
            clack.log.error('Граф несвязный, MST не строится.');
          } else {
            const prim = Prim(currentGraph);
            console.table(prim);
          }
          break;
        }
        default: {
          clack.log.error(`Неизвестная команда: ${command}.`);
        }
      }
    } catch (err) {
      clack.log.error(`[x] Ошибка: ${err.message}`);
    }
  }
};

run();