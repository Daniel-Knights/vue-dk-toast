export interface Options {
    positionX?: 'left' | 'right' | 'center'
    positionY?: 'top' | 'bottom'
    duration?: number
    styles?: Record<string, string>
    class?: string
    type?: string
}

export interface LocalOptions {
    slot?: string
    slotLeft?: string
    slotRight?: string
    duration?: number
    styles?: Record<string, string>
    class?: string
    type?: string
}
