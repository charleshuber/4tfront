import {TimeUnit} from "js/time/timeunit";
import * as React from "react";

export interface ITimeunitSelectionProps {
  handleChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  selected: TimeUnit;
  options: TimeUnit[];
}
