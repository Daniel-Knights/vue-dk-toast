import validateOptions from './functions/validate';
import { appendStylesheet } from './functions/styles';
import renderToast from './functions/render';

const toastPlugin = {
    install: (app, options) => {
        // Set defaults
        if (!options) options = {};
        if (!options.duration) options.duration = 5000;
        if (!options.positionY) options.positionY = 'bottom';
        if (!options.positionX) options.positionX = 'right';

        if (!validateOptions(options)) return;
        appendStylesheet(options);
        renderToast(app, options);
    },
};

export default toastPlugin;
