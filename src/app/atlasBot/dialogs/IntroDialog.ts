import {Dialog, DialogContext, DialogTurnResult} from 'botbuilder-dialogs';

export default class IntroDialog extends Dialog{
    constructor(dialogId: string){
        super(dialogId);
    }

    public async beginDialog(context: DialogContext, options?:any):
    Promise<DialogTurnResult>{
        context.context.sendActivity(`I'm built to do the following!`);
        return await context.endDialog();
    }
}