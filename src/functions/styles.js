export const formatCssProperties = object => {
    const formatted = Object.keys(object)
        .map(style => {
            const formattedName = style
                .split('')
                .map((letter, index) => {
                    // Vendor prefixes
                    const webkit = style.split('webkit')[0] === '';
                    const moz = style.split('moz')[0] === '';
                    const ms = style.split('ms')[0] === '';

                    if ((webkit || moz || ms) && index === 0) return `-${letter.toLowerCase()}`;
                    if (letter === letter.toUpperCase()) return `-${letter.toLowerCase()}`;
                    else return letter;
                })
                .join('');
            return `${formattedName}: ${object[style]};`;
        })
        .join('');

    return formatted;
};

export const appendStylesheet = options => {
    let properties;

    // Format style properties/values
    if (options.styles) properties = formatCssProperties(options.styles);

    // Stylesheet content
    let styles = `
            .dk__toast-container {
                display: flex;
                flex-direction: column;
                position: fixed;
                ${options.positionY}: 40px;
                ${options.positionX}: 60px;
                z-index: 100;
            }
            .dk__toast {
                margin: 5px 0;
                padding: 5px 20px;
                min-width: 125px;
                font: clamp(0.9rem, 1.5vw, 1.2rem) Avenir, sans-serif;
                text-align: center;
                border-radius: 25px;
                border: 1px solid #000;
                background: #fff;
                box-shadow: 0 1px 3px #000;
                ${properties || ''}
            }
            @keyframes dk__toast-in {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            @media only screen and (max-width: 450px) {
                .dk__toast-container {
                    right: 0;
                    left: 0;
                    bottom: 10px;
                    margin: 0 auto;
                    width: 90%;
                }
            }
        `;

    // Create stylesheet
    const stylesheet = document.createElement('style');

    // Set stylesheet content
    stylesheet.innerHTML = styles;

    // Append
    document.head.appendChild(stylesheet);
};
