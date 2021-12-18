import type { App } from 'vue';
import type { Options } from './toast.d';
import { validateOptions } from './validate';
import { appendStylesheet } from './styles';
import renderToast from './render';
import './toast.d';

/**
 * @param options Optional global config for toast notifications.
 *
 * ---
 * **Options:**
 * @property `class` - CSS class to be added to every toast.
 * @property `disableClick?: boolean`
 * @property `duration` - Time in milliseconds before hiding the toast notification.
 * @property `max` - Max number of toasts allowed per-section at any one time.
 * @property `positionX` - 'left', 'right' or 'center'.
 * @property `positionY` - 'top' or 'bottom'.
 * @property `styles` - CSS key/value pairs.
 */
const toastPlugin = {
  install(app: App, passedOptions: Options): void {
    const options = passedOptions || {};

    // Set defaults
    if (!options.duration && options.duration !== false) options.duration = 5000;
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
