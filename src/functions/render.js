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
        let duration;

        if (!localOptions) localOptions = {};
        if (!text && !localOptions.slot)
            return console.error('vue-dk-toast [Error]: a text value is required');

        toast.innerHTML = text;
        if (localOptions.slot) toast.innerHTML += localOptions.slot;
        toast.className = 'dk__toast';

        // Set custom local styles
        duration = localOptions.duration ? localOptions.duration : options.duration;
        if (localOptions.styles)
            toast.setAttribute('style', formatCssProperties(localOptions.styles, duration));

        container.appendChild(toast);
        setTimeout(() => container.removeChild(toast), duration);
    };

    app.config.globalProperties.$toast = DKToast;
};

export default renderToast;
