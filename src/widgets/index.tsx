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
  plugin.app.registerCSS(
    "#content",
    `
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcarddoing"] > * {
        background-color: rgba(255, 0, 0, 0.25) !important;
      }
    `
  );
}
async function onDeactivate(_: ReactRNPlugin) { }
declareIndexPlugin(onActivate, onDeactivate);
