// tslint:disable: quotemark

import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { Widget } from 'rasa-webchat';

/**
 * State for the rasaTabTab React component
 */
export interface IRasaTabState extends ITeamsBaseComponentState {
  entityId?: string;
}

/**
 * Properties for the rasaTabTab React component
 */
export interface IRasaTabProps {

}

const RasaWidget = () => {
  return (
      <Widget
        initPayload={'/get_started'}
        embedded="true"
        socketUrl={'https://rasa.troykirin.io'}
        socketPath={'/socket.io/'}
        customData={{ language: 'en' }} // arbitrary custom data. Stay minimal as this will be added to the socket
        title={'Atlas Bot'}
        subtitle='A Troy Kirin Experience.'
      />
  );
};

/**
 * Implementation of the Rasa content page
 */
export class RasaTab extends TeamsBaseComponent<IRasaTabProps, IRasaTabState> {

  public async componentWillMount() {
    this.updateTheme(this.getQueryVariable("theme"));


    if (await this.inTeams()) {
      microsoftTeams.initialize();
      microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
      // This is where the widget breaks by showing briefly then disappearing.
      microsoftTeams.appInitialization.notifySuccess();
    }
  }

  /**
   * The render() method to create the UI of the tab
   */
  public render() {
    return (
      <Provider theme={this.state.theme}>
        <Flex
          fill={true}
          column
          styles={{
            padding: '.8rem 0 .8rem .5rem',
          }}
        >
          <Flex.Item>
            <Header content="Welcome to Rasa WebChat Tab!" />
          </Flex.Item>

          <Flex.Item>
            <div>

              <div>
                <Button onClick={() => alert('Thanks!')}>
                  Click if you like!
                    </Button>
              </div>
            </div>
          </Flex.Item>

          <Flex.Item>
            <RasaWidget/>
          </Flex.Item>

          <Flex.Item
            styles={{
              padding: '.8rem 0 .8rem .5rem',
            }}
          >
            <Text size="smaller" content="(C) Copyright KirinEnt" />
          </Flex.Item>
        </Flex>
      </Provider>
    );
  }
}
