/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { Provider } from 'mobx-react/native'
import App from './App';
import {name as appName} from './app.json';

import AddRun from './views/AddRun'
import RunTracker from './views/RunTracker'
import ConfirmRun from './views/ConfirmRun'
import ListRuns from './views/ListRuns'
import RunDetail from './views/RunDetail'
import rootStore from './stores'
//AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponentWithRedux(`navigation.playground.WelcomeScreen`, () => App, Provider, rootStore)
Navigation.registerComponentWithRedux(`navigation.runtracker.AddRun`, () => AddRun, Provider, rootStore)
Navigation.registerComponentWithRedux(`navigation.runtracker.RunTracker`, () => RunTracker, Provider, rootStore)
Navigation.registerComponentWithRedux(`navigation.runtracker.ConfirmRun`, () => ConfirmRun, Provider, rootStore)
Navigation.registerComponentWithRedux(`navigation.runtracker.ListRuns`, () => ListRuns, Provider, rootStore)
Navigation.registerComponentWithRedux(`navigation.runtracker.RunDetail`, () => RunDetail, Provider, rootStore)

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
        {
          stack: {
            children: [{
              component: {
                name: 'navigation.runtracker.AddRun',
                passProps: {
                  text: 'This is tab 1'
                }
              }
            }],
            options: {
             bottomTab: {
               text: 'Add Run',
               testID: 'FIRST_TAB_BAR_BUTTON'
             }
            }
          }
        },
        {
          stack: {
            children: [{
              component: {
                name: 'navigation.runtracker.ListRuns',
                passProps: {
                  text: 'This is tab 2'
                }
              }
            }],
            options: {
              bottomTab: {
                text: 'View All Runs',
                testID: 'SECOND_TAB_BAR_BUTTON'
              }
            }
          },
        }]
      }
    }
  });
});