namespace benchmark {
    export class Timer {
        private started: number;
        private constructor() {this.started = Date.now()}

        static start() {return new this()};

        timeNow(f: boolean = false) {
            return f ? `${Date.now() - this.started} seconds` : Date.now() - this.started
        }
    }
}

export default benchmark;