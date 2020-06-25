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
        if (this.startTime === undefined) {
            return 0
        }

        if (this.endTime === undefined) {
            return new Date().getTime() - this.startTime?.getTime()
        }

        return this.endTime?.getTime() - this.startTime?.getTime()
    }
}

export default Session