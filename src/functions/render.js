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

        // If none
        if (!text && !localOptions.slot && !localOptions.slotLeft){
            return console.error('vue-dk-toast [Error]: a text value is required');
        }
        toast.className = 'dk__toast';

        // If empty text
        if(!text == ' ') toast.innerHTML = `<div> </div>`;

        // If text
        if(text){
            toast.innerHTML = `<div>${text}</div>`;
        }

        // If text + left icon
        if(text && localOptions.slotLeft){
            toast.innerHTML = localOptions.slotLeft + toast.innerHTML
        }

        // If text + right icon
        if (text && localOptions.slot){
            toast.innerHTML += localOptions.slot
        }

        // If left + text + right icon
        if(!text && localOptions.slotLeft && localOptions.slot){
            toast.innerHTML = localOptions.slotLeft + toast.innerHTML + localOptions.slot
            toast.classList.add('dk__icon-only')
        }

        // If left icon only
        if(!text && localOptions.slotLeft && !localOptions.slot){
            toast.innerHTML = localOptions.slotLeft
            toast.classList.add('dk__icon-only')
        }

        //  If right icon only
        if(!text && !localOptions.slotLeft && localOptions.slot){
            toast.innerHTML = localOptions.slot
            toast.classList.add('dk__icon-only')
        }

        // If only left and right icon
        if(!text && localOptions.slotLeft && localOptions.slot){
            toast.innerHTML = localOptions.slotLeft + localOptions.slot
            toast.classList.add('dk__icon-only')
        }

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
