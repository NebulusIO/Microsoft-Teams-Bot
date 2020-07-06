// tslint:disable: quotemark

import * as React from "react";
import {Widget} from 'rasa-webchat';
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
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

const CustomWidget = () => {
    return (
      <div>
        <Widget
          initPayload={'/get_started'}
          embedded="true"
          socketUrl={'https://311320773469.ngrok.io'}
          socketPath={'/socket.io/'}
          customData={{ language: 'en' }} // arbitrary custom data. Stay minimal as this will be added to the socket
          title={'Atlas Bot'}
          subtitle='A Troy Kirin Experience.'
        />
        <Text>Text from Widget function.</Text>
      </div>
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
            microsoftTeams.getContext((context) => {
                microsoftTeams.appInitialization.notifySuccess();
                this.setState({
                    entityId: context.entityId
                });
                this.updateTheme(context.theme);
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
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
                <Header content="This is your tab" />
              </Flex.Item>
              <Flex.Item>
                <div>
                  <div>
                    <Text content={this.state.entityId} />
                  </div>

                  <div>
                    <Button onClick={() => alert('It worked!')}>
                      A sample button
                    </Button>
                  </div>
                </div>
              </Flex.Item>

              <Flex.Item>
                <div>
                  <CustomWidget />
                  <Text>Widget Goes Here.</Text>
                </div>
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
