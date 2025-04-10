import {
  WidgetLocation,
  AppEvents,
  RNPlugin,
  declareIndexPlugin,
  ReactRNPlugin,
  Rem,
} from "@remnote/plugin-sdk";
import '../style.css';
import '../App.css';

async function applyTaskStatusToCurrentRem(
  tagName: string,
  plugin: ReactRNPlugin
): Promise<void> {
  const focusedRem: Rem | undefined = await plugin.focus.getFocusedRem();
  if (!focusedRem) {
    plugin.app.toast("applyTaskStatusToCurrentRem: No focused Rem found!");
    return;
  }
  if (!await focusedRem.isTodo()) {
    plugin.app.toast("applyTaskStatusToCurrentRem: Not a Todo Rem!");
    return;
  }
  // [START1] Workaround for Rem.addTag not supporting string inputs despite docs.
  const existingRemForTagName = await plugin.rem.findByName([tagName], null);
  if (!existingRemForTagName) {
    plugin.app.toast(`applyTaskStatusToCurrentRem: Existing rem for tagName ${tagName} not found!`);
    return;
  }
  await focusedRem.addTag(existingRemForTagName);
  // [__END1] Workaround for Rem.addTag not supporting string inputs despite docs.
  plugin.app.toast(`The text of the focusedRem is ${focusedRem.text}.
    applyTaskStatusToCurrentRem: ${tagName} applied to Todo Rem.`);
}

async function onActivate(plugin: ReactRNPlugin) {
  // [START2] Workaround for Rem.addTag not supporting string inputs despite docs.
  const toCreateRemsForEachTagName: Promise<void>[] = [
    "TaskcardOverdue",
    "TaskcardSomeday",
    "TaskcardDoing",
    "TaskcardScheduled",
    "TaskcardDone",
    "TaskcardFailed",
  ].map(async (tagName) => {
    const newRem: Rem | undefined = await plugin.rem.createRem()
    if (!newRem) {
      throw new Error(`Failed to create Rem for tagName ${tagName}.`);
    }
    newRem.setText([tagName]);
    return;
  }
  );
  await Promise.all(toCreateRemsForEachTagName);
  // [__END2] Workaround for Rem.addTag not supporting string inputs despite docs.

  plugin.app.registerCSS(
    "#content",
    `
      [data-rem-container-tags*="todo"] > *,
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcarddoing"] > *,
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcarddone"] > *,
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardoverdue"] > *,
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardscheduled"] > *,
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardsomeday"] > *,
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardfailed"] > * {
        border-radius: 6px;
      }

      /* Actionable statuses - .75 opacity */

      /* NEW - Blue (Standard/Informational) */
      [data-rem-container-tags*="todo"] > * {
        background-color: rgba(0, 255, 255, 0.75) !important; /* Bright Blue */
      }

      /* OVERDUE - Orange (Warning/Attention Needed) */
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardoverdue"] > * {
        background-color: rgba(255, 165, 0, 0.75) !important; /* Orange */
      }

      /* SOMEDAY - Gray (Deferred/Inactive) */
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardsomeday"] > * {
        background-color: rgba(108, 117, 125, 0.75) !important; /* Gray */
      }

      /* Unactionable (in terms of triaging) for now - .5 opacity */

      /* DOING - Yellow (Active/Energy/In Progress) */
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcarddoing"] > * {
        background-color: rgba(255, 215, 0, 0.5) !important; /* Gold/Yellow */
      }

      /* SCHEDULED - Purple (Planning/Future) */
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardscheduled"] > * {
        background-color: rgba(111, 66, 193, 0.5) !important; /* Indigo/Purple */
      }

      /* Archived Statuses - .25 opacity */

      /* DONE - Green (Success/Completion) */
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcarddone"] > * {
        background-color: rgba(40, 167, 69, 0.25) !important; /* Success Green */
      }

      /* FAILED - Red (Error/Stop/Negative Outcome) */
      [data-rem-container-tags*="todo"][data-rem-container-tags*="taskcardfailed"] > * {
        background-color: rgba(220, 53, 69, 0.25) !important; /* Danger Red */
      }
    `
  );

  const toRegisterPluginCommandConfigs = [
    { statusName: "Overdue" },
    { statusName: "Someday" },
    { statusName: "Doing" },
    { statusName: "Scheduled" },
    { statusName: "Done" },
    { statusName: "Failed" },
  ].map(config =>
    plugin.app.registerCommand({
      id: `applyTaskcardStatus${config.statusName}`,
      name: `Apply Taskcard status to this TodoRem - ${config.statusName}`,
      action: async () => { await applyTaskStatusToCurrentRem(`Taskcard${config.statusName}`, plugin) },
    })
  );
  await Promise.all(toRegisterPluginCommandConfigs);
}
async function onDeactivate(_: ReactRNPlugin) { }
declareIndexPlugin(onActivate, onDeactivate);
