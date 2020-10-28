import { formatCssProperties } from './styles';
import { validateLocalOptions } from './validate';

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
        if (!localOptions) localOptions = {};
        const toast = document.createElement('div');
        const left = localOptions.slotLeft;
        const right = localOptions.slot || localOptions.slotRight;
        let duration, styles, clicked;

        if (!validateLocalOptions(text, localOptions)) return;

        toast.className = 'dk__toast';

        // If text
        if (text) toast.textContent = text;
        // If left slot
        if (left) {
            toast.innerHTML = `<div class="dk__icon-left">${left}</div>` + toast.innerHTML;
        }
        // If right slot
        if (right) {
            toast.innerHTML += `<div class="dk__icon-right">${right}</div>`;
        }
        // If slot only
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
