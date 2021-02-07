import type { Options, LocalOptions } from './types'

export function validateOptions(options: Options): void {
    // Invalid position error-handling
    if (
        options.positionX !== 'left' &&
        options.positionX !== 'right' &&
        options.positionX !== 'center'
    ) {
        // eslint-disable-next-line
        console.error(
            `vue-dk-toast [Error]: positionX must be either "left", "right" or "center", received "${options.positionX}"`
        )
    }
    if (options.positionY !== 'top' && options.positionY !== 'bottom') {
        // eslint-disable-next-line
        console.error(
            `vue-dk-toast [Error]: positionY must be either "top" or "bottom", received "${options.positionY}"`
        )
    }
}

export function validateLocalOptions(text: string, options: LocalOptions): boolean {
    let valid = true

    // Required text value
    if (!text && !options.slotLeft && !options.slotRight && !options.slot) {
        // eslint-disable-next-line
        console.error('vue-dk-toast [Error]: a text/slot value is required')
        valid = false
    }
    // Slot deprecation warning
    if (options.slot) {
        // eslint-disable-next-line
        console.warn('vue-dk-toast [Warn]: slot is now deprecated. Use slotRight instead')
    }

    return valid
}
