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
        const left = localOptions.slotLeft;
        const right = localOptions.slot || localOptions.slotRight;
        let duration, styles, clicked;

        if (!localOptions) localOptions = {};

        // Required text value
        if (!text && !left && !right) {
            return console.error('vue-dk-toast [Error]: a text value is required');
        }
        // Slot deprecation warning
        if (localOptions.slot) {
            console.warn('vue-dk-toast [Warn]: slot is now deprecated. Use slotRight instead');
        }

        toast.className = 'dk__toast';

        // If text
        if (text) toast.textContent = text;
        // If left icon
        if (left) toast.innerHTML = left + toast.innerHTML;
        // If right icon
        if (right) toast.innerHTML += right;
        // If icon only
        if (!text && (left || right)) toast.classList.add('dk__icon-only');

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
