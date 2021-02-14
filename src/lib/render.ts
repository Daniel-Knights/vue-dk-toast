import type { App } from 'vue'
import type { Options, LocalOptions } from './types'
import { formatCssProperties } from './styles'
import { validateLocalOptions } from './validate'

const toastQueue: Array<[Element, Element]> = []

function renderToast(app: App, options: Options): void {
    // Render toast container
    const container = document.createElement('div')
    const mobileContainer = document.createElement('div')

    // Set container attributes
    container.className = 'dk__toast-container'
    container.setAttribute('role', 'status')
    container.setAttribute('aria-live', 'polite')
    container.setAttribute('aria-atomic', 'false')

    mobileContainer.className = 'dk__toast-mobile-container'
    mobileContainer.setAttribute('role', 'status')
    mobileContainer.setAttribute('aria-live', 'polite')
    mobileContainer.setAttribute('aria-atomic', 'false')

    // Append
    document.body.appendChild(container)
    document.body.appendChild(mobileContainer)

    function DKToast(text: string, localOptions?: LocalOptions): void {
        if (!localOptions) localOptions = {}
        const toast = document.createElement('div')
        const left = localOptions.slotLeft
        const right = localOptions.slot || localOptions.slotRight
        let clicked: boolean

        if (!validateLocalOptions(text, localOptions)) return

        const positions = {
            y: localOptions.positionY || options.positionY,
            x: localOptions.positionX || options.positionX
        }

        // Render toast section
        const section =
            document.querySelector(`.dk__toast-${positions.y}-${positions.x}`) ||
            document.createElement('div')
        const toastCount = document.querySelectorAll('.dk__toast').length / 2

        if (options.max && toastCount >= options.max) {
            toastQueue[0][0].remove()
            toastQueue[0][1].remove()
            toastQueue.shift()
        }

        if (!section.className) {
            // Set section attributes
            section.className = `dk__toast-section dk__toast-${positions.y}-${positions.x}`
            section.setAttribute('role', 'status')
            section.setAttribute('aria-live', 'polite')
            section.setAttribute('aria-atomic', 'false')

            // Append
            container.appendChild(section)
        }

        toast.className = 'dk__toast'
        if (options.class) toast.classList.add(options.class)
        if (localOptions.class) toast.classList.add(localOptions.class)
        if (localOptions.type) toast.classList.add(`dk__${localOptions.type}`)

        // If text
        if (text) toast.textContent = text
        // If left slot
        if (left) {
            toast.innerHTML = `<div class="dk__icon-left">${left}</div>` + toast.innerHTML
        }
        // If right slot
        if (right) {
            toast.innerHTML += `<div class="dk__icon-right">${right}</div>`
        }
        // If slot only
        if (!text && (left || right)) toast.classList.add('dk__icon-only')

        // Set custom local styles
        const duration =
            localOptions.duration || localOptions.duration === false
                ? localOptions.duration
                : options.duration
        const styles = localOptions.styles ? localOptions.styles : options.styles

        toast.setAttribute('style', formatCssProperties(styles, duration))

        const mobileClone = toast.cloneNode(true)

        function removeToastPair(): void {
            if ([...section.children].includes(toast)) {
                section.removeChild(toast)
            }
            if ([...mobileContainer.children].includes(mobileClone as Element)) {
                mobileContainer.removeChild(mobileClone)
            }
        }

        function clickHandler(): void {
            clicked = true

            removeToastPair()
        }

        // Remove toast on click
        toast.addEventListener('click', clickHandler)
        mobileClone.addEventListener('click', clickHandler)

        toastQueue.push([toast, mobileClone as Element])
        section.appendChild(toast)
        mobileContainer.appendChild(mobileClone)

        if (!duration) return

        setTimeout(() => {
            if (clicked) return

            removeToastPair()
        }, duration)
    }

    app.config.globalProperties.$toast = DKToast
    app.provide('$toast', DKToast)
}

export default renderToast
