class Session {
    startTime?: Date;
    endTime?: Date;

    start(time: Date) {
        this.startTime = time
        
        // These adjustments are made to make short time sessions an hour longer
        let newTime = this.startTime.getTime()
        newTime -= 60*60*1000

        this.startTime.setTime(newTime)
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