import * as fs from 'fs'

function getPosition(string: string, subString: string, index: number): number {
    return string.split(subString, index).join(subString).length;
}

export default class logF {
    private queue: string[] = [];

    private writing: boolean = false;

    public errorMaxDepth: number = 1;

    public queueMode: 'FIFO' | 'LIFO' = 'FIFO';
        
    constructor(public logPath: string) {}

    async addMessageToQueue(message: string | Error) {
        return new Promise(async (res, rej) => {
            let content: string
            if (typeof message === 'string') {
                content = `#LOG => ${message}`
            }
            else {
                const errorCut = message.stack.substring(0, getPosition(message.stack, ')', this.errorMaxDepth) + 1)
                content = `#ERROR (of type: ${message.name}); The message was "${message.message}" on stack: ${errorCut}`
            }

            this.queue.push(content);

            console.log('about to write!')

            await this.write();
        })
    }
    /**
     * Concatenates strings together seperated by newlines, date is prepended to each line
     */
    async write() {
        return new Promise((res, rej) => {
            if (this.writing) return;

            if (this.queue.length === 0) return;

            this.writing = true;

            let writeStr = '';

            let nextItem = this.queueMode === 'FIFO' ? this.queue.shift() : this.queue.pop();

            writeStr += `[~TimeStamp: "${Date()}~"]\n\t[${nextItem}]\n`;
            
            fs.appendFileSync(this.logPath, writeStr);

            this.writing = false;

            console.log(this.logPath)

            if (this.queue.length > 0) this.write();

            res(true);
        })
    }
}