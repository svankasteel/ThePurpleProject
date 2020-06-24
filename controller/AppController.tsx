import Session from "../data/Session"

class SessionSummary {
    session: Session
    constructor(session: Session) {
        this.session = session
    }

    render(): string {
        if (!this.session.hasFinished) return "Your session is still running."

        const t = this.session.endTime

        var timeFormat = ""
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

    startTimer(): string {
        if (this.currentSession?.isRunning()) {
            throw new Error("You already have a session running.")
        }
        var t = new Date()
        this.currentSession = new Session()
        this.currentSession.start(t)
        return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
    }

    stop(): SessionSummary {
        if (this.currentSession === undefined || !this.currentSession.isRunning()) {
          throw new Error("You must start a session first.")
        }
        var t = new Date()
        this.currentSession.stop(t)

        return new SessionSummary(this.currentSession)
      }
}

export default AppController