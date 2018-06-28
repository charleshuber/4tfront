import {TimelineCalendarFormState} from "./timeline-calendar-form-state";

export interface ITimelineCalendarFormProps {
  publish: (formState: TimelineCalendarFormState) => void;
}
