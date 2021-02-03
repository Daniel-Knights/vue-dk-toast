import type { ComponentCustomProperties, Plugin } from 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $toast: Toast
    }
}

declare const DKToast: Plugin
export default DKToast

interface LocalOptions {
    slot?: string
    slotLeft?: string
    slotRight?: string
    duration?: number
    styles?: Record<string, string>
}

export type Toast = {
    (text: string, localOptions?: LocalOptions): void
}
