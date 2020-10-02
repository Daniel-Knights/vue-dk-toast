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
        if (!localOptions) localOptions = {};
        if (!text && !localOptions.slot)
            return console.error('vue-dk-toast [Error]: a text value is required');

        toast.innerHTML = text;
        if (localOptions.slot) toast.innerHTML += localOptions.slot;
        toast.className = 'dk__toast';

        // Calculate -0.15s from the end of duration for animating out
        toast.style.animation = `dk__toast-in 0.15s, dk__toast-in 0.15s ${(localOptions.duration ||
            options.duration) /
            1000 -
            0.15}s reverse forwards`;

        // Set custom local styles
        if (localOptions.styles)
            toast.setAttribute('style', formatCssProperties(localOptions.styles));

        container.appendChild(toast);
        setTimeout(() => container.removeChild(toast), localOptions.duration || options.duration);
    };

    app.config.globalProperties.$toast = DKToast;
};

export default renderToast;
