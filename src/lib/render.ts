import type { App } from 'vue'
import type { Options, LocalOptions } from './types'
import { formatCssProperties } from './styles'
import { validateLocalOptions } from './validate'

const toastQueue: Array<[Element, Element]> = []

function formatAndMountContainer(el: Element, className: string, target: Element): void {
    const attributes = [
        ['role', 'status'],
        ['aria-live', 'polite'],
        ['aria-atomic', 'false']
    ]

    attributes.forEach((attr) => {
        el.setAttribute(attr[0], attr[1])
    })

    el.className = className
    target.appendChild(el)
}

function formatToastFromOptions(
    text: string,
    options: Options,
    localOptions: LocalOptions,
    duration?: number | false
): Element {
    const toast = localOptions.link?.href
        ? document.createElement('a')
        : document.createElement('div')
    const left = localOptions.slotLeft
    const right = localOptions.slot || localOptions.slotRight

    if (localOptions.link?.href) {
        const anchor = toast as HTMLAnchorElement

        anchor.href = localOptions.link.href
        anchor.rel = 'noopener'

        if (localOptions.link.targetBlank) {
            anchor.target = '_blank'
        }
    }

    // Add classes
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

    const styles = localOptions.styles ? localOptions.styles : options.styles
    toast.setAttribute('style', formatCssProperties(styles, duration))

    if (localOptions.disableClick) {
        // Prevent hover styling
        toast.style.cursor = 'default'
        toast.style.opacity = '1'
    }

    return toast
}

function toastPlugin(app: App, options: Options): void {
    const container = document.createElement('div')
    const mobileContainer = document.createElement('div')

    formatAndMountContainer(container, 'dk__toast-container', document.body)
    formatAndMountContainer(mobileContainer, 'dk__toast-mobile-container', document.body)

    function renderToast(text: string, localOptions?: LocalOptions): void {
        if (!localOptions) localOptions = {}
        if (!validateLocalOptions(text, localOptions)) return

        const positions = {
            y: localOptions.positionY || options.positionY,
            x: localOptions.positionX || options.positionX
        }

        const section =
            document.querySelector(`.dk__toast-${positions.y}-${positions.x}`) ||
            document.createElement('div')
        const toastCount = document.querySelectorAll('.dk__toast').length / 2

        // Remove oldest toast if max limit is reached
        if (options.max && toastCount >= options.max) {
            const toastEl = toastQueue[0][0]
            const mobileToastEl = toastQueue[0][1]

            toastEl.parentElement?.removeChild(toastEl)
            mobileToastEl.parentElement?.removeChild(mobileToastEl)
            toastQueue.shift()
        }

        // If section doesn't exist, format and mount
        if (!section.className) {
            const className = `dk__toast-section dk__toast-${positions.y}-${positions.x}`

            formatAndMountContainer(section, className, container)
        }

        // Determine if duration is a number or false, local or global
        const duration =
            localOptions.duration || localOptions.duration === false
                ? localOptions.duration
                : options.duration

        const toast = formatToastFromOptions(text, options, localOptions, duration)
        const mobileClone = toast.cloneNode(true)

        // Prevent attempting to remove toast if it's been removed by click
        let clicked: boolean

        function removeToastPair(e?: Event): void {
            if (e) clicked = true

            if ([...section.children].includes(toast)) {
                section.removeChild(toast)
            }
            if ([...mobileContainer.children].includes(mobileClone as Element)) {
                mobileContainer.removeChild(mobileClone)
            }

            toastQueue.shift()
        }

        if (!options.disableClick && !localOptions.disableClick) {
            // Remove toast on click
            toast.addEventListener('click', removeToastPair)
            mobileClone.addEventListener('click', removeToastPair)
        }

        toastQueue.push([toast, mobileClone as Element])
        section.appendChild(toast)
        mobileContainer.appendChild(mobileClone)

        if (!duration) return

        setTimeout(() => {
            if (clicked) return

            removeToastPair()
        }, duration)
    }

    app.config.globalProperties.$toast = renderToast
    app.provide('$toast', renderToast)
}

export default toastPlugin
