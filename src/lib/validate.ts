import type { Options, LocalOptions } from './types'

export function validateOptions(options: Options): boolean {
    let valid = true
    // Invalid position error-handling
    if (options.positionX === 'top' || options.positionX === 'bottom') {
        // eslint-disable-next-line
        console.error(
            `vue-dk-toast [Error]: positionX must be either "left" or "right", received "${options.positionX}"`
        )
        valid = false
    }
    if (options.positionY === 'left' || options.positionY === 'right') {
        // eslint-disable-next-line
        console.error(
            `vue-dk-toast [Error]: positionY must be either "top" or "bottom", received "${options.positionY}"`
        )
        valid = false
    }

    return valid
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
