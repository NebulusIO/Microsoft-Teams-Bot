  ConversationState,
  ActivityTypes,
  TeamsActivityHandler,
  UserState
} from 'botbuilder';
import { LuisRecognizer } from 'botbuilder-ai';
import HelpDialog from './dialogs/HelpDialog';
import IntroDialog from './dialogs/IntroDialog';
import FeedbackDialog from './dialogs/FeedbackDialog';
import AtlasExtentionMessageExtension from '../atlasExtentionMessageExtension/AtlasExtentionMessageExtension';
import WelcomeCard from './dialogs/WelcomeDialog';
import { HelpDeskRecognizer } from './HelpDeskRecognizer';

// Initialize debug logging module
const log = debug('msteams');

/**
 * Implementation for Atlas
 */
@BotDeclaration(
  '/api/messages',
  new MemoryStorage(),
  process.env.MICROSOFT_APP_ID,
  process.env.MICROSOFT_APP_PASSWORD
)
@PreventIframe('/atlasBot/aboutAtlas.html')

// class will create this for each user within a team, makes conversations private

export class Atlas extends TeamsActivityHandler {
  private readonly conversationState: ConversationState;
  private LuisRecognizer: LuisRecognizer;

  /** Local property for AtlasExtentionMessageExtension */
  @MessageExtensionDeclaration('atlasExtentionMessageExtension')
  private _atlasExtentionMessageExtension: AtlasExtentionMessageExtension;
  private readonly dialogs: DialogSet;
  private dialogState: StatePropertyAccessor<DialogState>;

  /**
   * The constructor
   * @param conversationState
   * @param luisRecognizer
   */
  public constructor(
    conversationState: ConversationState,
  ) {
    super();

    // get env_var
    const { LuisAppId, LuisAPIKey, LuisAPIHostName } = process.env;
    // create a luisConfig
    const luisConfig = {
      applicationId: LuisAppId,
      endpointKey: LuisAPIKey,
      endpoint: `https://${LuisAPIHostName}`,
    };

    this.LuisRecognizer = new HelpDeskRecognizer(luisConfig);

    // Message extension AtlasExtentionMessageExtension
    this._atlasExtentionMessageExtension = new AtlasExtentionMessageExtension();

    this.conversationState = conversationState;
    this.dialogState = conversationState.createProperty('dialogState');
    this.dialogs = new DialogSet(this.dialogState);

    // add dialogs
    this.dialogs.add(new HelpDialog('help'));
    this.dialogs.add(new IntroDialog('intro'));
    this.dialogs.add(new FeedbackDialog('feedback'));

    // Set up the Activity processing

    this.onMessage(
      async (context: TurnContext): Promise<void> => {
        // TODO: add your own bot logic in here
        switch (context.activity.type) {
          case ActivityTypes.Message:
            let text = TurnContext.removeRecipientMention(context.activity);
            text = text.toLowerCase();
            if (text.startsWith('hi')) {
              await context.sendActivity('Oh, hello to you as well!');
              return;
            } else if (text.startsWith('help')) {
              const dc = await this.dialogs.createContext(context);
              await dc.beginDialog('help');
            } else if (text.startsWith('intro')) {
              const dc = await this.dialogs.createContext(context);
              await dc.beginDialog('intro');
            } else if (text.startsWith('feedback')) {
              const dc = await this.dialogs.createContext(context);
              await dc.beginDialog('feedback');
            } else {
              await context.sendActivity(
                `I\'m terribly sorry, but my master hasn\'t trained me to do anything yet...`
              );
            }
            break;
          default:
            break;
        }
        // Save state changes
        return this.conversationState.saveChanges(context);
      }
    );


    // when conversation updates with a new member, send a welcome card
    this.onConversationUpdate(
      async (context: TurnContext): Promise<void> => {
        if (
          context.activity.membersAdded &&
          context.activity.membersAdded.length !== 0
        ) {
          for (const idx in context.activity.membersAdded) {
            if (
              context.activity.membersAdded[idx].id ===
              context.activity.recipient.id
            ) {
              const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
              await context.sendActivity({ attachments: [welcomeCard] });
            }
          }
        }
      }
    );

    // when a reaction is made, send the following activity from bot
    this.onMessageReaction(
      async (context: TurnContext): Promise<void> => {
        const added = context.activity.reactionsAdded;