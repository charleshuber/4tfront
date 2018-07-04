require("./timeline-calendar-frame.css");

import {TimeInterval} from "js/resources/timeinterval/timeinterval";
import {TimeIntervalService} from "js/resources/timeinterval/timeintervalService";
import {TimelineGraphicIndex} from "js/time/breakdown/graphics/timeline-graphic-index";
import {TimeUnitIndexXInfo} from "js/time/breakdown/graphics/timeunit-index-graphic-info";
import DU, {addToMoment} from "js/time/dateutils";
import {TimeUnit} from "js/time/timeunit";
import {TimelineCalendarForm} from "jsx/calendar/timeline/form/timeline-calendar-form";
import {TimelineCalendarFormState} from "jsx/calendar/timeline/form/timeline-calendar-form-state";
import {Ruler} from "jsx/calendar/timeline/frame/ruler/ruler";
import {Timeline} from "jsx/calendar/timeline/frame/timeline/timeline";
import {ITimelineCalendarFrameProps} from "jsx/calendar/timeline/frame/timelinecalendar-frame-props";
import {TimelineCalendarFrameState} from "jsx/calendar/timeline/frame/timelinecalendar-frame-state";
import {Moment} from "moment";
import * as React from "react";

export class TimelineCalendarFrame
  extends React.Component<ITimelineCalendarFrameProps, TimelineCalendarFrameState> {

  private tiService: TimeIntervalService;

  constructor(props: ITimelineCalendarFrameProps) {
    super(props);
    this.state = new TimelineCalendarFrameState();
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  get startDateFormat() {
    if (this.state.startDate) {
      return this.state.startDate.format();
    }
    return null;
  }

  get endDate() {
    return this.computeEndDate(this.state);
  }

  get endDateFormat() {
    const endDate = this.endDate;
    if (endDate) {
      return endDate.format();
    }
    return null;
  }

  public render() {
    const viewBoxWidth = this.props.timelineWidth + this.props.leftPaneWidth;
    const maxNumber = 400;
    const rulerIndex: TimelineGraphicIndex | null =
      buildTimelineGraphicIndex(this.props.timelineWidth, maxNumber, this.state);
    const timelines = buildTimelines(
      rulerIndex, this.state.intervals, this.props.leftPaneWidth, this.props.timelineHeight);
    const yRulerPosition = this.props.timelineHeight * timelines.length + 1;
    const rulers = buildRulers(rulerIndex, maxNumber, this.props.leftPaneWidth, yRulerPosition);
    const viewbox = "0 0  " + viewBoxWidth + " " + (yRulerPosition + this.props.rulerHeight);
    return (
      <div>
        <h1>Timeline Calendar Frame Yop</h1>
        <div>
          Timeunit: {this.state.timeunit}
          - number: {this.state.unitnumber}
          - startDate: {this.startDateFormat}
          - endDate: {this.endDateFormat}
        </div>
        {/* https://www.sarasoueidan.com/blog/svg-coordinate-systems */}
        {/* https://www.w3schools.com/graphics/svg_intro.asp */}
        <div className="svg-container">
          <svg version="1.1" viewBox={viewbox} preserveAspectRatio="xMinYMin meet" className="svg-content">
            {timelines}
            {rulers}
          </svg>
        </div>
        <TimelineCalendarForm publish={this.handleFormChange}/>
      </div>
    );
  }

  private computeEndDate({startDate, timeunit, unitnumber}) {
      return addToMoment(startDate, timeunit, unitnumber);
  }

  private handleFormChange(formState: TimelineCalendarFormState) {
    const startDate = formState.startDate;
    const endDate = this.computeEndDate(formState);
    this.props.timeIntervalService.getTimeIntervals()
    .then((intervals) => {
      const state = {...formState, intervals};
      this.setState(state);
    });
    this.setState(formState);
  }
}

function buildTimelineGraphicIndex(
  timelineWidth: number,
  maxGradientNumber: number,
  state: TimelineCalendarFrameState): TimelineGraphicIndex | null {
  let rulerIndex: TimelineGraphicIndex | null = null;
  if (state.startDate && state.timeunit && state.unitnumber) {
    rulerIndex = new TimelineGraphicIndex(
      timelineWidth,
      maxGradientNumber,
      state.startDate,
      state.timeunit,
      state.unitnumber);
  }
  return rulerIndex;
}

function buildRulers(
  rulerIndexs: TimelineGraphicIndex | null,
  maxNumber: number,
  xOffset: number,
  yOffset: number) {
  let rulers: any[] = [];
  if (rulerIndexs && maxNumber) {
    rulers = Object.keys(TimeUnit)
    .map((tu: TimeUnit) => rulerIndexs.indexMap.get(tu))
    .filter((tuIndexXInfo: TimeUnitIndexXInfo) => tuIndexXInfo && tuIndexXInfo.index)
    .filter((tuIndexXInfo: TimeUnitIndexXInfo) => tuIndexXInfo.index.size <= maxNumber)
    .map((tuIndexXInfo: TimeUnitIndexXInfo, i) => {
        return <Ruler
          key={i} y={yOffset} x={xOffset}
          timeunit={tuIndexXInfo.timeunit}
          index={tuIndexXInfo.index}
          height={(i + 1) * 2}
          xDelta={tuIndexXInfo.xDelta}
          color={rulersColor.get(tuIndexXInfo.timeunit)}
        />;
    });
  }
  return rulers;
}

function buildTimelines(
  rulerIndexs: TimelineGraphicIndex | null,
  intervals: TimeInterval[],
  xOffset: number,
  height: number) {
  if (rulerIndexs && intervals) {
    const moreAccurateIndex = rulerIndexs.getSmallerTimeUnitIndex();
    const displayedStartDate = rulerIndexs.timebreakdown.range.start;
    const displayedEndDate = rulerIndexs.timebreakdown.range.end;
    if (moreAccurateIndex) {
      return intervals.map((ti, i) => buildTimeLine(
        i, ti,
        moreAccurateIndex,
        xOffset, height,
        displayedStartDate,
        displayedEndDate));
    }
  }
  return [];
}

function buildTimeLine(
  i: number,
  ti: TimeInterval,
  referenceGraphicIndex: TimeUnitIndexXInfo,
  xOffset: number,
  height: number,
  displayedStartDate: Moment,
  displayedEndDate: Moment) {

    const tiStartDate = DU.roundDown(DU.dateToMoment(ti.getStartTime()), referenceGraphicIndex.timeunit);
    let tiEndDate = DU.roundUp(DU.dateToMoment(ti.getEndTime()), referenceGraphicIndex.timeunit);
    // if interval is outside the scope
    if (tiStartDate.isAfter(displayedEndDate) || tiEndDate.isBefore(displayedStartDate)) {
      return buildEmptyTimeline(i, xOffset, height);
    }
    // calibrate starting point on departure of the ruler
    let startPoint = xOffset;
    // if start date of the interval is inside the scope, get its x coordinate from the reference ruler
    if (tiStartDate.isAfter(displayedStartDate)) {
      const startGraphicGradEntry = referenceGraphicIndex.index.get(tiStartDate.valueOf());
      startPoint += startGraphicGradEntry.xPosition;
    }
    // if the end date of the interval is outside the scope,
    // we set the end date equals to the date of the last gradient of the ruler
    if (tiEndDate.isSameOrAfter(displayedEndDate)) {
      const length = referenceGraphicIndex.index.size;
      const lastEntry = [...referenceGraphicIndex.index.entries()][length - 1];
      const lastValue = lastEntry[1];
      tiEndDate = lastValue.moment;
    }
    // get the x coordinate of the end date from the reference ruler
    const endGraphicGradEntry = referenceGraphicIndex.index.get(tiEndDate.valueOf());
    const endPoint = endGraphicGradEntry.xPosition + xOffset;
    return buildTimeline(i, startPoint, endPoint, xOffset, height, "red");
}

function buildEmptyTimeline(i: number, xOffset: number, height: number) {
  return buildTimeline(i, null, null, xOffset, height, "white");
}

function buildTimeline(
  i: number,
  startPoint: number | null, endPoint: number | null,
  xOffset: number, height: number,
  color: string) {
    return (<Timeline
      key={i} position={i + 1}
      startPoint={startPoint} endPoint={endPoint}
      color={color}
      leftPaneWidth={xOffset} height={height}
    />);
}

const rulersColor = new Map();
rulersColor.set(TimeUnit.MINUTE, "rgb(200,80,200)");
rulersColor.set(TimeUnit.MINUTES_5, "rgb(210,60,210)");
rulersColor.set(TimeUnit.MINUTES_15, "rgb(220,40,220)");
rulersColor.set(TimeUnit.HOUR, "rgb(80,80,200)");
rulersColor.set(TimeUnit.DAY, "rgb(80,200,200)");
rulersColor.set(TimeUnit.WEEK, "rgb(80,200,80)");
rulersColor.set(TimeUnit.MONTH, "rgb(200,200,80)");
rulersColor.set(TimeUnit.YEAR, "rgb(200,80,80)");
