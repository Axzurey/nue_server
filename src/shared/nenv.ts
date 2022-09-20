import * as path from "path";
import logF from "./logf"

const _dirname = path.dirname(require.main.filename);
const dirname = _dirname.substring(0, Math.max(_dirname.lastIndexOf('/'), _dirname.lastIndexOf('\\')))

const logger = new logF(`${dirname}/nue_server_logs.log`);

const nenv = {
    log: (v: string | Error) => logger.addMessageToQueue(v)
}

export default nenv;