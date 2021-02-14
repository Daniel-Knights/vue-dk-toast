/**
 * @property `positionX?: 'left' | 'right' | 'center'`
 * @property `positionY?: 'top' | 'bottom'`
 * @property `duration?: number | false`
 * @property `styles?: Record<string, string>`
 * @property `class?: string`
 * @property `max?: number`
 */
export interface Options {
    positionX?: 'left' | 'right' | 'center'
    positionY?: 'top' | 'bottom'
    duration?: number | false
    styles?: Record<string, string>
    class?: string
    max?: number
}

/**
 * @property `slot?: string`
 * @property `slotLeft?: string`
 * @property `slotRight?: string`
 * @property `duration?: number | false`
 * @property `positionX?: 'left' | 'right' | 'center'`
 * @property `positionY?: 'top' | 'bottom'`
 * @property `styles?: Record<string, string>`
 * @property `class?: string`
 * @property `type?: 'error' | 'success' | 'passive'`
 */
export interface LocalOptions {
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
