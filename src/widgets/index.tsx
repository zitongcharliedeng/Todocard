import {
  WidgetLocation,
  AppEvents,
  RNPlugin,
  declareIndexPlugin,
  ReactRNPlugin,
} from "@remnote/plugin-sdk";
import '../style.css';
import '../App.css';

async function showTaskcardInbox(
  plugin: RNPlugin,
  classContainer?: string,
  position?: { top?: number; bottom?: number; left?: number; right?: number },
) {
  await plugin.window.openFloatingWidget(
    "taskcard_inbox_popup",
    position ?? { top: 0, left: 0},
    classContainer
  );
}

async function onActivate(plugin: ReactRNPlugin) {
  plugin.event.addListener(AppEvents.QueueEnter, undefined, async () => {
    setTimeout(() => {
      showTaskcardInbox(plugin, "rn-queue");
    }, 25);
  });

  await plugin.app.registerCommand({
    id: "showTaskcardInbox",
    name: "TESTING: Show Taskcard Inbox popped over Flashcard Queue box (.rn-queue)",
    action: () => showTaskcardInbox(plugin, "rn-queue"),
  });

  await plugin.app.registerWidget(
    "taskcard_inbox_popup",
    WidgetLocation.FloatingWidget,
    {
      dimensions: {
        width: "auto",
        height: "auto",
      },
    }
  );
}

async function onDeactivate(_: ReactRNPlugin) { }

declareIndexPlugin(onActivate, onDeactivate);
