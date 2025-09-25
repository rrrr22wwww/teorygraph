import * as fs from "fs"

type typeGraphArg = {
    pathGraph:string,
    typeGraph: "directed" | "undirected"
}

class graph {
    private vertexWeight:[];
    private filedata ;
    public size(){
        
    }
    public weight(v1: Object, v2: Object):number{
        return 0
    }

    public is_edge(v1: Object, v2: Object): boolean {
        return true
    }
    public add_vertex(v1:Object):void {
        
    }
    public add_edge(v1: Object, v2: Object):void {
        
    }
    async readfile (tp:string) {
        const file = Bun.file(tp);
        const content = (await file.text()).split('\n');
        const weightgraph = new Map();
        for (let i = 1; i < content.length - 1;i++) {
            const lineParts = content[i].split(" ");
            const parsedLine = [];
            for (let j = 0; j < lineParts.length; j++) {
                parsedLine.push(lineParts[j].split(":"));
            }
            weightgraph.set(i,parsedLine)
        }
        console.log(weightgraph) // Сдлеать реализацию МАП ДЛЯ МАССИВА компанентов смежности элементов!!!
    }
     constructor (pathGraph:string,typeGraph:string) {
        this.filedata = this.readfile(pathGraph)
        // this.filedata = fs.readFileSync(pathGraph,"utf-8").split('\n')
        console.log(this.filedata)
        this.vertexWeight = []
    }
}

const Graph2 = new graph("/Users/root1/Desktop/tgraph/teorygraph/chek.txt","directed")