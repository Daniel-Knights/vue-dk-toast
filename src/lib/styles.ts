import type { Options } from './toast.d';

export const animDuration = 150;

/** Minify CSS */
function minify(styles: string): string {
  let selector = false;
  let value = false;

  function mapStyleChar(char: string) {
    // Retain spaces between selectors
    // Determine start of selector
    if (/[\.@#]/.test(char) && !value) {
      selector = true;
    }
    // Determine end of selector
    if (/[,\{]/.test(char) && selector) {
      selector = false;
    }

    // Retain spaces between rules with multiple values
    if (char === ':' && !selector) value = true;
    if (char === ';' && !selector) value = false;

    // Replace spaces and line-breaks
    if (/\s/.test(char) && !selector && !value) return '';

    return char;
  }

  const minified = styles
    .split('')
    .map(mapStyleChar)
    .join('')
    .replace(' {', '{')
    .replace(': ', ':');

  return minified;
}

/** Format CSS from camelCase */
export function formatCssProperties(passedStyles?: Record<string, string>): string {
  const styles = passedStyles || {};

  function formatStyle(style: string) {
    const formattedName = style
      .split('')
      .map((letter, index) => {
        if (letter === '-') return letter;

        const vendorPrefix = /^(?:webkit|moz|ms)/.test(style) && index === 0;

        if (vendorPrefix || letter === letter.toUpperCase()) {
          return `-${letter.toLowerCase()}`;
        }

        return letter;
      })
      .join('');

    return `${formattedName}: ${styles[style]};`;
  }

  return Object.keys(styles).map(formatStyle).join('');
}

/** Append minified stylesheet to document head */
export function appendStylesheet(options: Options): void {
  const { styles, positionY } = options;
  // Format style properties/values
  const properties = formatCssProperties(styles);
  const animationDefault = `animation: dk__toast-in ${animDuration / 1000}s`;

  // Create stylesheet
  const stylesheet = document.createElement('style');
  stylesheet.type = 'text/css';

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
      z-index: 10000;
    }
    .dk__toast-mobile-container {
      pointer-events: none;
      visibility: hidden;
      position: fixed;
    }
    .dk__toast-section {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }
    .dk__toast {
      ${options.disableClick ? '' : 'cursor: pointer;'}
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
      ${properties || ''}
    }
    .dk__toast-anim--in {
      ${animationDefault};
    }
    .dk__toast-anim--out {
      ${animationDefault} reverse forwards;
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
    ${options.disableClick ? '' : '.dk__toast:hover { opacity: 0.7; }'}
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
    .dk__click-disabled {
      cursor: default;
      opacity: 1;
    }
    .dk__click-disabled:hover {
      opacity: 1;
    }
    .dk__error {
      background-color: rgb(255, 0, 0);
      color: #fff;
    }
    .dk__success {
      background-color: rgb(31, 218, 56);
      color: #fff;
    }
    .dk__passive {
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
        visibility: visible;
        display: grid;
        grid-template-areas: "top" "bottom";
        grid-template-rows: 50% 50%;
        grid-template-columns: 100%;
        top: 0;
        left: 0;
        padding: 20px;
        height: calc(100vh - 40px);
        width: calc(100vw - 40px);
        z-index: 10000;
      }
      .dk__toast-mobile-top { grid-area: top; }
      .dk__toast-mobile-bottom { 
        grid-area: bottom;
        align-self: end;
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
  `);

  document.head.appendChild(stylesheet);
}
