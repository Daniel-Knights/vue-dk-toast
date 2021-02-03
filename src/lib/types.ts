import type { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $toast: Toast
    }
}

export type Toast = {
    (text: string, localOptions?: LocalOptions): void
}

export interface Options {
    positionX?: string
    positionY?: string
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