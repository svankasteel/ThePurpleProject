class Session {
    startTime?: Date;
    endTime?: Date;

    start(time: Date) {
        this.startTime = time
    }

    stop(time: Date) {
        this.endTime = time
    }

    isRunning(): boolean {
        return this.startTime !== undefined && !this.hasFinished()
    }

    hasFinished(): boolean {
        return this.endTime !== undefined
    }

    getDuration(): number {
        if (this.endTime === undefined || this.startTime === undefined) {
            return -1
        }
        return this.endTime?.getTime() - this.startTime?.getTime()
    }
}

export default Session