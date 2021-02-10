import type { App } from 'vue'
import type { Options, LocalOptions } from './types'
import { formatCssProperties } from './styles'
import { validateLocalOptions } from './validate'

function renderToast(app: App, options: Options): void {
    // Render toast container
    const container = document.createElement('div')

    // Set container attributes
    container.className = 'dk__toast-container'
    container.setAttribute('role', 'status')
    container.setAttribute('aria-live', 'polite')
    container.setAttribute('aria-atomic', 'false')

    // Append
    document.body.appendChild(container)

    /**
     * @param text Text to display in toast notification.
     * @param localOptions Optional config for individual toast.
     *
     * ---
     * **Options:**
     * @property `slot` - (deprecated) Slot for displaying HTML on the right side of provided text.
     * @property `slotLeft` - Slot for displaying HTML on the left-side of provided text.
     * @property `slotRight` - Slot for displaying HTML on the right-side of provided text.
     * @property `styles` - CSS key/value pairs.
     * @property `duration` - Time in milliseconds before hiding the toast notification.
     */
    function DKToast(text: string, localOptions?: LocalOptions): void {
        if (!localOptions) localOptions = {}
        const toast = document.createElement('div')
        const left = localOptions.slotLeft
        const right = localOptions.slot || localOptions.slotRight
        let duration
        let styles
        let clicked: boolean

        if (!validateLocalOptions(text, localOptions)) return

        toast.className = 'dk__toast'
        if (options.class) toast.classList.add(options.class)
        if (localOptions.class) toast.classList.add(localOptions.class)

        // If text
        if (text) toast.textContent = text
        // If left slot
        if (left) {
            toast.innerHTML = `<div class="dk__icon-left">${left}</div>` + toast.innerHTML
        }
        // If right slot
        if (right) {
            toast.innerHTML += `<div class="dk__icon-right">${right}</div>`
        }
        // If slot only
        if (!text && (left || right)) toast.classList.add('dk__icon-only')

        // Set custom local styles
        duration = localOptions.duration ? localOptions.duration : options.duration
        styles = localOptions.styles ? localOptions.styles : options.styles
        toast.setAttribute('style', formatCssProperties(styles, duration))

        // Remove toast on click
        toast.addEventListener('click', () => {
            clicked = true
            container.removeChild(toast)
        })

        container.appendChild(toast)
        setTimeout(() => {
            if (!clicked) container.removeChild(toast)
        }, duration)
    }

    app.config.globalProperties.$toast = DKToast
    app.provide('$toast', DKToast)
}

export default renderToast
