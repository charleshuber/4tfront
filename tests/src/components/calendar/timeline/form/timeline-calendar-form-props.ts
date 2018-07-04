import {TimelineCalendarFormState} from "components/calendar/timeline/form/timeline-calendar-form-state";

export interface ITimelineCalendarFormProps {
  publish: (formState: TimelineCalendarFormState) => void;
}
