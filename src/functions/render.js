import { formatCssProperties } from './styles';

const renderToast = (app, options) => {
    // Render toast container
    const container = document.createElement('div');

    // Set container attributes
    container.className = 'dk__toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');

    // Append
    document.body.appendChild(container);

    // Render individual toast
    const DKToast = (text, localOptions) => {
        const toast = document.createElement('div');
        let duration, styles, clicked;

        if (!localOptions) localOptions = {};
        if (!text && !localOptions.slot)
            return console.error('vue-dk-toast [Error]: a text value is required');

        toast.innerHTML = text;
        if (localOptions.slot) toast.innerHTML += localOptions.slot;
        toast.className = 'dk__toast';
        if (!text && localOptions.slot) toast.classList.add('dk__icon-only');

        // Set custom local styles
        duration = localOptions.duration ? localOptions.duration : options.duration;
        styles = localOptions.styles ? localOptions.styles : options.styles;
        toast.setAttribute('style', formatCssProperties(styles, duration));

        // Remove toast on click
        toast.addEventListener('click', () => {
            clicked = true;
            container.removeChild(toast);
        });

        container.appendChild(toast);
        setTimeout(() => {
            if (!clicked) container.removeChild(toast);
        }, duration);
    };

    app.config.globalProperties.$toast = DKToast;
};

export default renderToast;
