export interface Options {
    positionX?: 'left' | 'right' | 'center'
    positionY?: 'top' | 'bottom'
    duration?: number
    styles?: Record<string, string>
}

export interface LocalOptions {
    slot?: string
    slotLeft?: string
    slotRight?: string
    duration?: number
    styles?: Record<string, string>
}
