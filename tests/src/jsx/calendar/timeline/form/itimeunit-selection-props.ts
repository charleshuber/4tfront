import * as React from "react";
import {TimeUnit} from "../../../../js/time/timeunit";

export interface ITimeunitSelectionProps {
  handleChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  selected: TimeUnit;
  options: TimeUnit[];
}
