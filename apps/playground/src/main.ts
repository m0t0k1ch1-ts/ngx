import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/comp';
import { appConfig } from './app/config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
