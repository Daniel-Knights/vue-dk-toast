export default {
	install: (app, options) => {
		let properties;

		if (!options)
			options = {
				duration: 5000,
			};

		if (options.styles) {
			properties = Object.keys(options.styles)
				.map((style) => {
					const formattedName = style
						.split('')
						.map((letter) => {
							if (letter === letter.toUpperCase()) return `-${letter.toLowerCase()}`;
							else return letter;
						})
						.join('');
					return `${formattedName}: ${options.styles[style]};`;
				})
				.join('');
		}

		let styles = `
				.dk__toast-container {
					display: flex;
					flex-direction: column;
					position: absolute;
					bottom: 10px;
					right: 10px;
					z-index: 100;
				}
				.dk__toast {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 5px;
					padding: 5px 20px;
					font-family: Avenir, sans-serif;
					border-radius: 25px;
					border: 1px solid #000;
					box-shadow: 0 1px 3px #000;
					animation: toast-in 0.15s, toast-in 0.15s ${options.duration / 1000 - 0.15}s reverse forwards;
					${properties}
				}
				@keyframes toast-in {
					from {
						transform: translateY(100%);
						opacity: 0;
					}
					to {
						transform: translateY(0);
						opacity: 1;
					}
				}
			`;

		const stylesheet = document.createElement('style');
		const container = document.createElement('div');

		stylesheet.innerHTML = styles;
		container.className = 'dk__toast-container';
		container.setAttribute('role', 'status');
		container.setAttribute('aria-live', 'polite');
		container.setAttribute('aria-atomic', 'false');

		document.head.appendChild(stylesheet);
		document.body.appendChild(container);

		const DKToast = (text) => {
			const toast = document.createElement('div');
			toast.innerHTML = text;
			toast.className = 'dk__toast';
			container.appendChild(toast);
			setTimeout(() => container.removeChild(toast), options.duration);
		};

		app.config.globalProperties.$toast = DKToast;
	},
};
