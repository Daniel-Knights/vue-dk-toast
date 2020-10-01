export default {
    install: (app, options) => {
        let properties, error;

        // Set defaults
        if (!options.duration) options.duration = 5000;
        if (!options.positionY) options.positionY = 'bottom';
        if (!options.positionX) options.positionX = 'right';

        // Invalid position error-handling
        if (options.positionX === 'top' || options.positionX === 'bottom') {
            console.error(
                `vue-dk-toast [Error]: positionX must be either "left" or "right", received "${options.positionX}"`
            );
            error = true;
        }
        if (options.positionY === 'left' || options.positionY === 'right') {
            console.error(
                `vue-dk-toast [Error]: positionY must be either "top" or "bottom", received "${options.positionY}"`
            );
            error = true;
        }

        if (error) return;

        // Format style properties/values
        if (options.styles) {
            properties = Object.keys(options.styles)
                .map(style => {
                    const formattedName = style
                        .split('')
                        .map((letter, index) => {
                            // Vendor prefixes
                            const webkit = style.split('webkit')[0] === '';
                            const moz = style.split('moz')[0] === '';
                            const ms = style.split('ms')[0] === '';

                            if ((webkit || moz || ms) && index === 0)
                                return `-${letter.toLowerCase()}`;
                            if (letter === letter.toUpperCase()) return `-${letter.toLowerCase()}`;
                            else return letter;
                        })
                        .join('');
                    return `${formattedName}: ${options.styles[style]};`;
                })
                .join('');
        }

        // Stylesheet content
        let styles = `
				.dk__toast-container {
					display: flex;
					flex-direction: column;
					position: absolute;
					${options.positionY}: 40px;
					${options.positionX}: 60px;
					z-index: 100;
				}
				.dk__toast {
					margin: 5px 0;
					padding: 5px 20px;
					font: clamp(0.9rem, 1.5vw, 1.3rem) Avenir, sans-serif;
					text-align: center;
					border-radius: 25px;
					border: 1px solid #000;
					box-shadow: 0 1px 3px #000;
					animation: dk__toast-in 0.15s, dk__toast-in 0.15s ${options.duration / 1000 -
                        0.15}s reverse forwards;
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

        // Create elements
        const stylesheet = document.createElement('style');
        const container = document.createElement('div');

        // Set stylesheet content
        stylesheet.innerHTML = styles;

        // Set container attributes
        container.className = 'dk__toast-container';
        container.setAttribute('role', 'status');
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'false');

        // Append
        document.head.appendChild(stylesheet);
        document.body.appendChild(container);

        // Render function
        const DKToast = text => {
            const toast = document.createElement('div');
            toast.innerHTML = text;
            toast.className = 'dk__toast';
            container.appendChild(toast);
            setTimeout(() => container.removeChild(toast), options.duration);
        };

        app.config.globalProperties.$toast = DKToast;
    },
};
