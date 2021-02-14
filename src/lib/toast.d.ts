import type { ComponentCustomProperties, Plugin } from 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        /**
         *
         * @param text Text to display in toast notification.
         * @param localOptions Optional config for individual toast.
         *
         * ---
         * **Options:**
         * @property `duration` - Time in milliseconds before hiding the toast notification, set to `false` for an indefinite duration.
         * @property `styles` - CSS key/value pairs.
         * @property `slot` - (deprecated) Slot for displaying HTML on the right side of provided text.
         * @property `slotLeft` - Slot for displaying HTML on the left-side of provided text.
         * @property `slotRight` - Slot for displaying HTML on the right-side of provided text.
         * @property `class` - Local class to be added to individual toast.
         * @property `type` - Default classes for `success`, `error` and `passive`.
         */
        $toast: Toast
    }
}

/**
 * @param options Optional global config for toast notifications.
 *
 * ---
 * **Options:**
 * @property `duration` - Time in milliseconds before hiding the toast notification, set to `false` for an indefinite duration.
 * @property `positionX` - 'left', 'right' or 'center'.
 * @property `positionY` - 'top' or 'bottom'.
 * @property `styles` - CSS key/value pairs.
 * @property `class` - Global class to be added to each toast.
 * @property `max` - Max number of toasts allowed at any one time.
 */
declare const DKToast: Plugin
export default DKToast

interface LocalOptions {
    slot?: string
    slotLeft?: string
    slotRight?: string
    duration?: number | false
    positionX?: 'left' | 'right' | 'center'
    positionY?: 'top' | 'bottom'
    styles?: Record<string, string>
    class?: string
    type?: 'error' | 'success' | 'passive'
}

/**
 * Used for typing main plugin function.
 *
 * @example
 * import type { Toast } from 'vue-dk-toast'
 * ...
 * setup() {
 *     const toast = inject<Toast>('$toast')
 *
 *     if (toast) toast('Simple!')
 * }
 */
export type Toast = {
    (text: string, localOptions?: LocalOptions): void
}
