export interface SettingsState {
    useImperial: boolean;
    useAMPM: boolean;
    getLocation: boolean;
    coords: [number, number];
    rainmapTimer: number;
    openweatherTimer: number;
    degreeSymbol: string;
  }