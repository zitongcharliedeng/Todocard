# Todocard

Testing out GTD with task triaging and reminders all within the FlashcardQueue-centric workflow.

## Features Roadmap

This plugin is split into two human-digestible parts:

### Adding more RemNote (/todo) task states

Currently RemNote has a simple checkbox binary state - todo, or done. There are plans to have task reminders in the future and I yearn for that day. For now we will make our own states, applied through tags e.g. #Todocard/Doing, or #Todocard/Scheduled. And then to easily discern, each #Todocard state will come with a distinct CSS styling for the task rem, i.e. red and pseudocrossed out (not with strikethrough, but with CSS) for #Taskcard/Failed tasks, or a cyan background for scheduled tasks with a date parameter highlighted.
![image](https://github.com/user-attachments/assets/00d04b29-6b92-4c95-9033-a3968a966acb)

New task states (**#Taskcard/...**):

- [ ] Inbox/ To Triage: Like with emails, aim to get this to zero by the end of each day. This contains:
    - [ ] **New** tasks awaiting processing (triaging)
    - [ ] **Overdue** tasks - tasks past their scheduled date, to be re-triaged. 

- [ ] **Doing**: Tasks currently being worked on.

- [ ] **Scheduled**: Tasks linked to a specific date/time.
- [ ] **Someday**: Tasks deferred indefinitely, an innocent pipe dream.

- [ ] **Done**: Finished tasks.
- [ ] **Failed**: For tasks that cannot be rescheduled - time sensitive e.g. `-[ ] brush my teeth` as part of a morning routine template.

### Allowing triaging of inbox tasks, monitoring of tasks currently "doing" and reminders for "scheduled" tasks (i.e. by showing them in inbox when overdue) *using the Taskcard* interface

- [ ] Taskcard inbox loads a query Rem showing untriaged tasks, potentially have a powerup inbox page and portal to that in the Taskcard
- [ ] From the Taskcard inbox, allow triage of each tasks with buttons that assign the tags to them.

### Someday/Maybe
- [ ] Eisenhower Matrix option
- [ ] Kanban plugin views
- [ ] Reminders for scheduled tasks e.g. 5 mins before, to show up in the middle of your flashcard queue
- [ ] Reminders for someday/maybe tasks to randomly show up in your flashcard queue to be reconsidered
