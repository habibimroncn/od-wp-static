export declare class Time {
  /**
   * The `aria-label` property of the time.
   */
  label: string;
  /**
   * The length of time in seconds.
   */
  seconds: number;
  /**
   * Whether the time should always show the hours unit, even if the time is less than
   * 1 hour (eg: `20:35` -> `00:20:35`).
   */
  alwaysShowHours: boolean;
  render(): any;
}
