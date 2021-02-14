import type { Options } from './types'

// Minify CSS
function minify(styles: string): string {
    let selector = false
    let value = false

    const minified = styles
        .split('')
        .map((char) => {
            // Retain spaces between selectors
            // Determine start of selector
            if ((char === '.' || char === '@' || char === '#') && !value) selector = true
            // Determine end of selector
            if (selector && (char === ',' || char === '{')) selector = false

            // Retain spaces between rules with multiple values
            if (char === ':' && !selector) value = true
            if (char === ';' && !selector) value = false

            // Replace spaces and line-breaks
            if ((char === ' ' || char === '\n' || char === '\r') && !selector && !value)
                return ''

            return char
        })
        .join('')
        .split(' {')
        .join('{')
        .split(': ')
        .join(':')

    return minified
}

// Format CSS from camelCase
export function formatCssProperties(
    styles?: Record<string, string>,
    duration?: number | false
): string {
    if (!styles) styles = {}

    let formatted = Object.keys(styles)
        .map((style) => {
            const formattedName = style
                .split('')
                .map((letter, index) => {
                    // Vendor prefixes
                    const webkit = style.split('webkit')[0] === ''
                    const moz = style.split('moz')[0] === ''
                    const ms = style.split('ms')[0] === ''

                    if (letter === '-') return letter
                    if ((webkit || moz || ms) && index === 0)
                        return `-${letter.toLowerCase()}`
                    if (letter === letter.toUpperCase()) return `-${letter.toLowerCase()}`
                    else return letter
                })
                .join('')
            // @ts-ignore
            return `${formattedName}: ${styles[style]};`
        })
        .join('')

    if (duration) {
        // Calculate -0.15s from the end of duration for animating out
        formatted += `animation-delay: 0s, ${duration / 1000 - 0.15}s;`
    } else {
        formatted += 'animation: dk__toast-in 0.15s;'
    }

    return formatted
}

// Append minified stylesheet to document head
export function appendStylesheet(options: Options): void {
    const { duration, styles, positionX, positionY } = options
    // Format style properties/values
    const properties = formatCssProperties(styles, duration)
    let oppositePositionX: string

    if (positionX === 'left') {
        oppositePositionX = 'right'
    } else oppositePositionX = 'left'

    // Create stylesheet
    const stylesheet = document.createElement('style')

    stylesheet.type = 'text/css'

    // Stylesheet content
    stylesheet.textContent = minify(`
        .dk__toast-container {
            pointer-events: none;
            display: grid;
            grid-template-areas: "top-left top-center top-right" "bottom-left bottom-center bottom-right";
            grid-template-columns: repeat(3, 33%);
            grid-template-rows: repeat(2, 50%);
            gap: 10px;
            position: fixed;
            top: 0;
            left: 0;
            padding: 20px;
            height: calc(100vh - 40px);
            width: calc(100vw - 40px);
        }
        .dk__toast-mobile-container {
            visibility: hidden;
        }
        .dk__toast-section {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            z-index: 100;
        }
        .dk__toast {
            cursor: pointer;
            pointer-events: all;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            position: relative;
            margin: 5px 0;
            padding: 7px 40px;
            min-width: 170px;
            font: 17px Avenir, sans-serif;
            text-align: center;
            word-break: break-word;
            border-radius: 5px;
            background: #fff;
            -webkit-box-shadow: 0 1px 3px #000;
            box-shadow: 0 1px 3px #000;
            -webkit-transition: opacity 0.25s;
            -o-transition: opacity 0.25s;
            transition: opacity 0.25s;
            animation: dk__toast-in 0.15s, dk__toast-in 0.15s reverse forwards;
            ${properties || ''}
        }
        .dk__toast-top-left {
            grid-area: top-left;
        }
        .dk__toast-top-center {
            grid-area: top-center;
        }
        .dk__toast-top-right {
            grid-area: top-right;
        }
        .dk__toast-bottom-left {
            grid-area: bottom-left;
            justify-content: flex-end;
        }
        .dk__toast-bottom-center {
            grid-area: bottom-center;
            justify-content: flex-end;
        }
        .dk__toast-bottom-right {
            grid-area: bottom-right;
            justify-content: flex-end;
        }
        .dk__toast:hover {
            opacity: 0.7;
        }
        .dk__icon-left,
        .dk__icon-right {
            display: flex;
            position: absolute;
            padding: 5px 12px;
        }
        .dk__icon-left {
            left: 0;
        }
        .dk__icon-right {
            right: 0;
        }
        .dk__icon-left i,
        .dk__icon-left span,
        .dk__icon-right i,
        .dk__icon-right span {
            font-size: 16px;
        }
        .dk__icon-only {
            padding: 6px 0;
        }
        .dk__icon-only .dk__icon-left,
        .dk__icon-only .dk__icon-right {
            display: flex;
            position: relative;
            right: unset;
            left: unset;
            padding: 4px;
        }
        .dk__toast.dk__error {
            background-color: rgb(255, 0, 0);
            color: #fff;
        }
        .dk__toast.dk__success {
            background-color: rgb(31, 218, 56);
            color: #fff;
        }
        .dk__toast.dk__passive {
            background-color: rgb(31, 59, 218);
            color: #fff;
        }
        @-webkit-keyframes dk__toast-in {
            from {
                -webkit-transform: translateY(100%);
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                -webkit-transform: translateY(0);
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes dk__toast-in {
            from {
                -webkit-transform: translateY(100%);
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                -webkit-transform: translateY(0);
                transform: translateY(0);
                opacity: 1;
            }
        }
        @media only screen and (max-width: 810px) {
            .dk__toast-container {
                visibility: hidden;
            }
            .dk__toast-mobile-container {
                pointer-events: none;
                visibility: visible;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                position: fixed;
                top: 0;
                left: 0;
                padding: 20px;
                height: calc(100vh - 40px);
                width: calc(100vw - 40px);
            }
        }
        @media only screen and (max-width: 450px) {
            .dk__toast-section {
                right: 0;
                left: 0;
                ${positionY}: 10px;
                margin: 0 auto;
                width: 90%;
                transform: none;
            }
            .dk__toast {
                padding: 10px 40px;
            }
            .dk__icon-only {
                padding: 8px 30px;
            }
        }
    `)

    // Append
    document.head.appendChild(stylesheet)
}
