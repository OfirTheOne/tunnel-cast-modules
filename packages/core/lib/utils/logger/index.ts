

// import { WriteStream } from 'node'


export enum VerboseLevel {
    Zero = 0,
    Low,
    Medium,
    High,
    Critical
}

export abstract class BasicLogger {

    constructor(protected stdout: NodeJS.WriteStream, protected verboseLevel: number) { }
    public abstract log(args: string, verbose: number): void;
    abstract stringifyArguments(date: Date, verbose: number, args: string): string;

}

export class Logger extends BasicLogger {


    constructor(protected gls: { VERBOSE_LEVEL: number, LOGGER_STDOUT: NodeJS.WriteStream }) { 
        super(gls.LOGGER_STDOUT, gls.VERBOSE_LEVEL);
    }
    

    public log(args: string, verbose: number) {
        if(this.gls.VERBOSE_LEVEL >= verbose) {
            const logMessage = this.stringifyArguments(new Date(), verbose, args)
            this.stdout.write(logMessage)
        }
    }

    stringifyArguments(date: Date, verbose: number, args: string) {
        return `[VERBOSE: ${verbose}][${date.toISOString()}] | ${args}\n`
    }
}