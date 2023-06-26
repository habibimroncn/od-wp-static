export declare class TimeProgress {
  /**
   * The string used to separate the current time and end time.
   */
  separator: string;
  /**
   * Whether the times should always show the hours unit, even if the time is less than
   * 1 hour (eg: `20:35` -> `00:20:35`).
   */
  alwaysShowHours: boolean;
  render(): any;
}
