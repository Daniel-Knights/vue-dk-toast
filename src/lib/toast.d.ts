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
         * @property `slot` - (deprecated) Slot for displaying HTML on the right side of provided text.
         * @property `slotLeft` - Slot for displaying HTML on the left-side of provided text.
         * @property `slotRight` - Slot for displaying HTML on the right-side of provided text.
         * @property `styles` - CSS key/value pairs.
         * @property `duration` - Time in milliseconds before hiding the toast notification.
         */
        $toast: Toast
    }
}

declare module 'vue-dk-toast' {
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
    const DKToast: Plugin
    export default DKToast
}

interface LocalOptions {
    slot?: string
    slotLeft?: string
    slotRight?: string
    duration?: number
    styles?: Record<string, string>
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
