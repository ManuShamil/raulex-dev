import OpenAI from "openai";
import {
    ConfigParser
} from "./config-parser";

export interface RaulexCoreOptions {
    openAIKey: string;
}

export class RaulexCore {
    private openAI: OpenAI

    private configParser: ConfigParser;


    public constructor( private opts: RaulexCoreOptions ) {
        this.openAI = new OpenAI( { apiKey: opts.openAIKey } );
        this.configParser = new ConfigParser( this.openAI );
    }

    public getConfigParser() {
        return this.configParser;
    }
}