import {
  renderWidget,
  usePlugin,
  WidgetLocation,
} from "@remnote/plugin-sdk";

function TaskcardInboxPopup() {
  const plugin = usePlugin();

  return (
    <>
      {
        <div
          className="cursor-pointer rounded-md border border-solid grid gap-1 grid-cols-2 rn-clr-background-primary rn-clr-content-primary"
        >
          <div className="flex text-center text-lg items-center pr-2">
            Welcome to the Taskcard Inbox! <br />
            Click on the button below to proceed to the flashcards after updating your task statuses.
          </div>
          <button
            onClick={async () => {
              const { floatingWidgetId } = await plugin.widget.getWidgetContext<WidgetLocation.FloatingWidget>();
              await plugin.window.closeFloatingWidget(floatingWidgetId);
            }}
          > Proceed to flashcards </button>
        </div>
      }
    </>
  );
}

renderWidget(TaskcardInboxPopup);