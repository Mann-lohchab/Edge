export class Container {
    private instances = new Map()

    resolve(token: any) {
        if (!this.instances.has(token)) {
            this.instances.set(token, new token())
        }
        return this.instances.get(token)
    }
}
