import type { App } from 'vue'
import type { Options } from './types'
import { validateOptions } from './validate'
import { appendStylesheet } from './styles'
import renderToast from './render'

/**
 * @param options Optional global config for toast notifications.
 *
 * ---
 * **Options:**
 * @property `duration` - Time in milliseconds before hiding the toast notification.
 * @property `positionX` - 'left' or 'right'.
 * @property `positionY` - 'top' or 'bottom'.
 * @property `styles` - CSS key/value pairs.
 */
const toastPlugin = {
    install: (app: App, options: Options): void => {
        // Set defaults
        if (!options) options = {}
        if (!options.duration) options.duration = 5000
        if (!options.positionY) options.positionY = 'bottom'
        if (!options.positionX) options.positionX = 'right'

        if (!validateOptions(options)) return
        appendStylesheet(options)
        renderToast(app, options)
    }
}

export default toastPlugin

// CDN compatibility
// @ts-ignore
if (window !== undefined && window.Vue) {
    // @ts-ignore
    window.DKToast = toastPlugin
}
