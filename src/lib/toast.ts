import type { App } from 'vue';
import type { Options } from './toast.d';
import { validateOptions } from './validate';
import { appendStylesheet } from './styles';
import renderToast from './render';

/**
 * **Options:**
 * @property `class` - Global class to be added to each toast.
 * @property `disableClick` - Disable toast removal on click.
 * @property `duration` - Time in milliseconds before hiding the toast notification,
 * set to `false` for an indefinite duration.
 * @property `max` - Max number of toasts allowed at any one time.
 * @property `positionX` - 'left', 'right' or 'center'.
 * @property `positionY` - 'top' or 'bottom'.
 * @property `styles` - CSS key/value pairs.
 */
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
