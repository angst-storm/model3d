import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.ceramic3d.app',
  appName: 'model3d',
  webDir: 'build',
  server: {
    androidScheme: 'http'
  }
};

export default config;
