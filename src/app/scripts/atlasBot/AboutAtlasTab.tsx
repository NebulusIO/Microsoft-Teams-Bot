import * as React from 'react';
import {
  Provider,
  Flex,
  Text,
  Button,
  Header,
} from '@fluentui/react-northstar';
import TeamsBaseComponent, {
  ITeamsBaseComponentState,
} from 'msteams-react-base-component';
import * as microsoftTeams from '@microsoft/teams-js';
import { Widget } from 'rasa-webchat';

/**
 * State for the aboutAtlasTab React component
 */
export interface IAboutAtlasTabState extends ITeamsBaseComponentState {}

/**
 * Properties for the aboutAtlasTab React component
 */
export interface IAboutAtlasTabProps {}

/**
 * Implementation of the aboutAtlas content page
 */
export class AboutAtlasTab extends TeamsBaseComponent<
  IAboutAtlasTabProps,
  IAboutAtlasTabState
> {
  public async componentWillMount() {
    this.updateTheme(this.getQueryVariable('theme'));

    if (await this.inTeams()) {
      microsoftTeams.initialize();
      microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
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
            <Header content="Welcome to the Atlas about me page!" />
          </Flex.Item>

          <Flex.Item>
            <div>
              <Text content="I'm a bot that works as a custom app inside Microsoft teams." />
            </div>
          </Flex.Item>

          <Flex.Item>
            <Widget
              initPayload={'/get_started'}
              embedded="true"
              socketUrl={'https://311320773469.ngrok.io'}
              socketPath={'/socket.io/'}
              customData={{ language: 'en' }} // arbitrary custom data. Stay minimal as this will be added to the socket
              title={'Atlas Bot'}
              subtitle='A Troy Kirin Experience.'
            />
          </Flex.Item>

          <Flex.Item>
            <div>
              <Text content="Custom built by Troy Kirin" />
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
