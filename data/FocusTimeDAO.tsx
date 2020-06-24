import Session from "./Session";

export class FocusTimeDAO {
    private registry: Map<number, number>

    constructor() {
        this.registry = new Map<number, number>()
        for (var i = 0; i < 7; i++) {
            this.registry.set(i, 1+Math.random() * 4)
        }
    }
    
    put(session: Session) {
        const day = session.startTime?.getDay()
        if (day === undefined) return
        
        const hoursToAdd = session.getDuration() / (60 * 60 * 1000)

        const newVal = (this.registry.get(day) ?? 0) + hoursToAdd

        this.registry.set(day, newVal)
    }

    getData(): Map<number, number> {
        return this.registry
    }
}