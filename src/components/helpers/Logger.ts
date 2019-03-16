import debug from 'debug';

const BASE = 'umbrella';
const COLOURS = {
    trace: 'gray',
    info: 'green',
    warn: 'orange',
    error: 'red'
}; // choose better colours :)

class Logger {
    generateMessage(level, message, source) {
        // Set the prefix which will cause debug to enable the message
        const namespace = `${BASE}:${level}`;
        const createDebug = debug(namespace);

        // Set the colour of the message based on the level
        createDebug.color = COLOURS[level];

        if (source) { createDebug(source, message); }
        else { createDebug(message); }
    }

    trace(message, source) {
        return this.generateMessage('trace', message, source);
    }

    info(message, source) {
        return this.generateMessage('info', message, source);
    }

    warn(message, source) {
        return this.generateMessage('warn', message, source);
    }

    error(message, source) {
        return this.generateMessage('error', message, source);
    }
}

export default new Logger();