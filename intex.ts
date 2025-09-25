

type typeGraphArg = {
    pathGraph:string,
    typeGraph: "directed" | "undirected"
}

class graph {
    private path:string;
    private vertex:[];

    public size(){
        
    }
    public weight(v1: Object, v2: Object):number{
        return 0
    }

    public is_edge(v1: Object, v2: Object):boolean {
        return true
    }
    public add_vertex(v1:Object):void {
        
    }
    public add_edge(v1: Object, v2: Object):void {
        
    }
    constructor(pathGraph:string,typeGraph:string) {
        this.path = pathGraph;
        this.vertex = []
    }
}