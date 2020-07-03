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
            <Header content="Welcome to the Atlas bot page" />
          </Flex.Item>

          <Flex.Item>
            <div>
              <Text content="Hello World! Yo Teams rocks!" />
            </div>
          </Flex.Item>

          <Flex.Item>
            <div>
              <Text content="TODO: Add you content here" />
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
