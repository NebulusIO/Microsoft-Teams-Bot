import { Dialog, DialogContext, DialogTurnResult } from 'botbuilder-dialogs';

export default class FeedbackDialog extends Dialog {
    constructor(dialogId: string){
        super(dialogId);
    }

    public async beginDialog(context: DialogContext, options?:any): Promise<DialogTurnResult>{
        context.context.sendActivity(`Since I'm still growing feedback is welcomed!`);
        return await context.endDialog();
    }
}