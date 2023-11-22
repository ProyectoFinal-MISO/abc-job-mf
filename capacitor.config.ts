import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'abc-job-mv',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  },
  "cordova": {
    "preferences": {
      "ScrollEnabled": "false",
      "android-minSdkVersion": "19",
      "BackupWebStorage": "none",
      "SplashMaintainAspectRatio": "true",
      "FadeSplashScreenDuration": "0",
      "SplashShowOnlyFirstTime": "false",
      "SplashScreen": "none",
      "SplashScreenDelay": "0"
    }
  }
};

export default config;
