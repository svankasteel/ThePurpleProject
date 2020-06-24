import Session from "../data/Session"
import WeekData from "../data/WeekData"
import { FocusTimeDAO } from "../data/FocusTimeDAO"

export class SessionSummary {
    private session: Session

    constructor(session: Session) {
        this.session = session
    }

    render(): string {
        if (!this.session.hasFinished) return "Your session is still running."

        const t = this.session.endTime

        let timeFormat = ""
        const hours = Math.floor(this.session.getDuration() / (60 * 60 * 1000))
        const hRest = this.session.getDuration() % (60 * 60 * 1000)
        const minutes = Math.floor(hRest / (60 * 1000))
        const mRest = hRest % (60 * 1000)
        const seconds = Math.floor(mRest / 1000)
    
        if (hours > 0) {
          timeFormat = timeFormat + `${hours} hours, `
        }
    
        if (minutes > 0) {
          timeFormat = timeFormat + `${minutes} minutes, and `
        }
    
        timeFormat = timeFormat + `${seconds} seconds`

        return `Your session ended at ${t?.getHours()}:${t?.getMinutes()}:${t?.getSeconds()}. You enjoyed ${timeFormat} of serenity.`
    }
}

class AppController {
    private currentSession?: Session
    private dao: FocusTimeDAO

    constructor() {
        this.dao = new FocusTimeDAO()
    }

    startTimer(): string {
        if (this.currentSession?.isRunning()) {
            throw new Error("You already have a session running.")
        }
        let t = new Date()
        this.currentSession = new Session()
        this.currentSession.start(t)
        return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
    }

    stopTimer(): SessionSummary {
        if (this.currentSession === undefined || !this.currentSession.isRunning()) {
            throw new Error("You must start a session first.")
        }
        let t = new Date()
        this.currentSession.stop(t)

        this.dao.put(this.currentSession)

        let result = new SessionSummary(this.currentSession)

        this.currentSession = undefined

        return result
    }

    getData(): WeekData {
        const wd = this.dao.getData()

        const firstDay = (new Date().getDay() + 1) % 7

        const labels: string[] = []
        const times: number[] = []

        wd.forEach ((value: number, key: number) => {
            labels.push(renderWeekDay(key))
            times.push(value)
        })

        const sortedLabels = labels.slice(firstDay, labels.length).concat(labels.slice(0,firstDay))
        const sortedTimes = times.slice(firstDay, times.length).concat(times.slice(0,firstDay))

        return {
            labels: sortedLabels,
            datasets: [{data: sortedTimes}]
        }
    }
}

function renderWeekDay(day: number): string {
    const d = day % 7

    switch (d) {
        case 0:
            return "Sun"
        case 1:
            return "Mon"
        case 2:
            return "Tue"
        case 3:
            return "Wed"
        case 4:
            return "Thu"
        case 5:
            return "Fri"
        default:
            return "Sat"
    }
}

export default AppController