import type { App } from 'vue';
import type { Options } from './toast.d';
import { validateOptions } from './validate';
import { appendStylesheet } from './styles';
import renderToast from './render';

const toastPlugin = {
  install(app: App, globalOptions: Options): void {
    const options = globalOptions || {};

    // Set defaults
    if (!options.duration && options.duration !== false) {
      options.duration = 5000;
    }
    if (!options.positionY) options.positionY = 'bottom';
    if (!options.positionX) options.positionX = 'right';

    validateOptions(options);
    appendStylesheet(options);
    renderToast(app, options);
  },
};

export default toastPlugin;

// CDN compatibility
if (window !== undefined && 'Vue' in window) {
  window.DKToast = toastPlugin;
}
