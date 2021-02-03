import type { ComponentCustomProperties } from 'vue'
import type { LocalOptions } from './types'

export type Toast = {
    (text: string, localOptions?: LocalOptions): void
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $toast: Toast
    }
}
