import {
  WidgetLocation,
  AppEvents,
  RNPlugin,
  declareIndexPlugin,
  ReactRNPlugin,
} from "@remnote/plugin-sdk";
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
}
async function onDeactivate(_: ReactRNPlugin) { }
declareIndexPlugin(onActivate, onDeactivate);
