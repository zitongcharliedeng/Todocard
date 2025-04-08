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
  position?: { top?: number; bottom?: number; left?: number; right?: number },
  classContainer?: string
) {
  console.log(`!!!!!!!!!!!!! showTaskcardInbox with position: ${JSON.stringify(position)}, classContainer: ${classContainer}`);
  await plugin.window.openFloatingWidget(
    "taskcard_inbox_popup",
    { top: 100, bottom: 0, left: 0, right: 0 },
    "rn-queue"
  );
}

async function onActivate(plugin: ReactRNPlugin) {

  // // I think the AppEvents API QueueEnter	"queue.enter" is for starting the Flashcards?
  // plugin.event.addListener(AppEvents.QueueEnter, undefined, async () => {
  //   // We use a small setTimeout delay to make sure the flashcard view has finished
  //   // rendering before showing the Taskcard Inbox.
  //   console.log("QueueEnter event triggered!!!!");
  //   setTimeout(() => {
  //     showTaskcardInbox(plugin, { top: -180, left: 180 }, "rn-queue__show-answer-btn");
  //     // "rn-queue" appears to be the central widget class for the queue popup.
  //   }, 25);
  // });

  // A test command so you can see how the popup looks using a RemNote command.
  await plugin.app.registerCommand({
    id: "showTaskcardInbox",
    name: "TESTING: Show Taskcard Inbox popped over Flashcard Queue box (.rn-queue)",
    action: () => showTaskcardInbox(plugin, {}, "rn-queue"),
  });

  // Register the popup widget component.
  await plugin.app.registerWidget(
    "taskcard_inbox_popup", // I assume this register is needed for openFloatingWidget("taskcard_inbox_popup",) to work earlier.
    WidgetLocation.Popup, // NOTE FOR LATER: WidgetLocation.Flashcard will place it in the current flashcards contents also work for the floating widget?
    {
      dimensions: {
        width: "auto",
        height: "auto",
      },
      // widgetTabTitle: "Taskcard Inbox",
    }
  );

}

async function onDeactivate(_: ReactRNPlugin) { }

declareIndexPlugin(onActivate, onDeactivate);
