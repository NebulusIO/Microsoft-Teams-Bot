import { LuisRecognizer } from "botbuilder-ai";

export class HelpDeskRecognizer {

    // declare prop types
    public recognizer: LuisRecognizer;


    constructor(config: any) {
        const luisIsConfigured =
            config && config.applicationId && config.endpointKey && config.endpoint;

        if (luisIsConfigured) {
            const recognizerOptions = {
                apiVersion: "v3"
            };
            this.recognizer = new LuisRecognizer(config, recognizerOptions);
        }
    }

    get isConfigured() {
        return (this.recognizer !== undefined);
    }

    public async executeLuisQuery(context: any) {
        return await this.recognizer.recognize(context);
    }

    public getFromEntities(result: any) {
        return null;
    }

    public getToEntities(result: any) {
        return null;
    }


}

module.exports.HelpDeskRecognizer = HelpDeskRecognizer;
