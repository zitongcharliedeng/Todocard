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
}
async function onDeactivate(_: ReactRNPlugin) { }
declareIndexPlugin(onActivate, onDeactivate);
