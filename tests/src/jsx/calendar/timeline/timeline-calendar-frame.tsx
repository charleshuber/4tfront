require("./timeline-calendar-frame.css");

import * as React from "react";
import {TimeIntervalService} from "../../../js/resources/timeinterval/timeintervalService";
import {TimelineGraphicIndex} from "../../../js/time/breakdown/graphics/timeline-graphic-index";
import {TimeUnitIndexXInfo} from "../../../js/time/breakdown/graphics/timeunitindexXinfo";
import DU, {addToMoment} from "../../../js/time/dateutils";
import {TimeUnit} from "../../../js/time/timeunit";
import {TimelineCalendarForm} from "./form/timeline-calendar-form.jsx";
import {Ruler} from "./ruler.jsx";
import Timeline from "./timeline.jsx";
import {TimelineCalendarFrameState} from "./timelinecalendar-frame-state";

const viewBow = {
  height: {
    ruler: 20,
    timeline: 20,
  },
  width: {
    leftpane: 10,
    timeline: 500,
  },
};

export class TimelineCalendarFrame extends React.Component<any, TimelineCalendarFrameState> {

  private tiService: TimeIntervalService;

  constructor(props) {
    super(props);
    this.state = new TimelineCalendarFrameState();
    this.handleFormChange = this.handleFormChange.bind(this);
    this.tiService = new TimeIntervalService();
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
    const viewBoxWidth = viewBow.width.timeline + viewBow.width.leftpane;
    const maxNumber = 400;
    let rulerIndex: TimelineGraphicIndex | null = null;
    if (this.state.startDate && this.state.timeunit && this.state.unitnumber) {
      rulerIndex = new TimelineGraphicIndex(viewBow.width.timeline, maxNumber, this.state);
    }
    const timelines = buildTimelines(rulerIndex, this.state.intervals, viewBow.width.leftpane, viewBow.height.timeline);
    const yRulerPosition = viewBow.height.timeline * timelines.length + 1;
    const rulers = buildRulers(rulerIndex, maxNumber, viewBow.width.leftpane, yRulerPosition);
    const viewbox = "0 0  " + viewBoxWidth + " " + (yRulerPosition + viewBow.height.ruler);
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

  private handleFormChange(formState) {
    const startDate = formState.startDate;
    const endDate = this.computeEndDate(formState);
    this.tiService.getTimeIntervals()
    .then((intervals) => {
      formState.intervals = intervals;
      this.setState(formState);
    });
    this.setState(formState);
  }
}

function buildRulers(rulerIndexs: TimelineGraphicIndex | null, maxNumber, xOffset, yOffset) {
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
          x_delta={tuIndexXInfo.xDelta}
          color={rulersColor.get(tuIndexXInfo.timeunit)}
        />;
    });
  }
  return rulers;
}

function buildTimelines(rulerIndexs: TimelineGraphicIndex | null, intervals, xOffset, height) {
  if (rulerIndexs && intervals) {
    const moreAccurateIndex = rulerIndexs.getSmallerTimeUnitIndex();
    const displayedStartDate = rulerIndexs.timebreakdown.range.start;
    const displayedEndDate = rulerIndexs.timebreakdown.range.end;
    if (moreAccurateIndex) {
      return intervals.map((ti, i) => {
        const tiStartDate = DU.roundDown(DU.dateToMoment(ti.startTime), moreAccurateIndex.timeunit);
        let tiEndDate = DU.roundUp(DU.dateToMoment(ti.endTime), moreAccurateIndex.timeunit);
        if (tiStartDate.isAfter(displayedEndDate) || tiEndDate.isBefore(displayedStartDate)) {
          return (<Timeline
            key={i} position={i + 1}
            startPoint={null} endPoint={null}
            color="white"
            leftPaneWidth={xOffset} height={height}
          />);
        }
        let startPoint = xOffset;
        if (tiStartDate.isAfter(displayedStartDate)) {
          const startGraphicGradEntry = moreAccurateIndex.index.get(tiStartDate.valueOf());
          startPoint += startGraphicGradEntry.xPosition;
        }

        if (tiEndDate.isSameOrAfter(displayedEndDate)) {
          const length = moreAccurateIndex.index.size;
          const lastEntry = [...moreAccurateIndex.index.entries()][length - 1];
          const lastValue = lastEntry[1];
          tiEndDate = lastValue.moment;
        }
        const endGraphicGradEntry = moreAccurateIndex.index.get(tiEndDate.valueOf());
        const endPoint = endGraphicGradEntry.xPosition + xOffset;
        return (<Timeline
          key={i} position={i + 1}
          startPoint={startPoint} endPoint={endPoint}
          color="red"
          leftPaneWidth={xOffset} height={height}
        />);
      });
    }
  }
  return [];
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
