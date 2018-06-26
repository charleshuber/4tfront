import {GradientXInfo} from "../../../../../js/time/breakdown/graphics/gradientXinfo";
import {TimeUnit} from "../../../../../js/time/timeunit";

export interface IRulerProps {
  x: number;
  y: number;
  xDelta: number;
  timeunit: TimeUnit;
  index: Map<number, GradientXInfo>;
  height: number;
  color: string;
}
