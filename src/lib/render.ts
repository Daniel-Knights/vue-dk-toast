import type { App } from 'vue'
import type { Options, LocalOptions } from './types'
import { formatCssProperties } from './styles'
import { validateLocalOptions } from './validate'

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
        let duration
        let styles
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

        if (section.children.length >= (options.max as number)) {
            section.removeChild(section.firstChild as Element)
            mobileContainer.removeChild(mobileContainer.firstChild as Element)
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
        duration = localOptions.duration ? localOptions.duration : options.duration
        styles = localOptions.styles ? localOptions.styles : options.styles
        toast.setAttribute('style', formatCssProperties(styles, duration))

        const mobileClone = toast.cloneNode(true)

        function clickHandler(): void {
            clicked = true

            if ([...section.children].includes(toast)) {
                section.removeChild(toast)
            }
            if ([...mobileContainer.children].includes(mobileClone as Element)) {
                mobileContainer.removeChild(mobileClone)
            }
        }

        // Remove toast on click
        toast.addEventListener('click', clickHandler)
        mobileClone.addEventListener('click', clickHandler)

        section.appendChild(toast)
        mobileContainer.appendChild(mobileClone)

        setTimeout(() => {
            if (clicked) return

            if ([...section.children].includes(toast)) {
                section.removeChild(toast)
            }
            if ([...mobileContainer.children].includes(mobileClone as Element)) {
                mobileContainer.removeChild(mobileClone)
            }
        }, duration)
    }

    app.config.globalProperties.$toast = DKToast
    app.provide('$toast', DKToast)
}

export default renderToast
