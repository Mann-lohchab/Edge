export function buildModuleGraph(root:any , container: any ){
    root.providers?.forEach((p:any) => {
            container.resolve(p)
    })
}