import { Glob } from "bun";

const PATH =
  "C:\\Users\\oisa0\\OneDrive\\Рабочий стол\\tgr\\teorygraph\\test\\list_of_adjacency";

const foo = new Glob("*.txt");
console.log(foo);

for await (const file of foo.scan(PATH)) {
  console.log(file);
}
