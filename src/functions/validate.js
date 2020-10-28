export const validateOptions = options => {
    let valid = true;
    // Invalid position error-handling
    if (options.positionX === 'top' || options.positionX === 'bottom') {
        console.error(
            `vue-dk-toast [Error]: positionX must be either "left" or "right", received "${options.positionX}"`
        );
        valid = false;
    }
    if (options.positionY === 'left' || options.positionY === 'right') {
        console.error(
            `vue-dk-toast [Error]: positionY must be either "top" or "bottom", received "${options.positionY}"`
        );
        valid = false;
    }

    return valid;
};

export const validateLocalOptions = (text, options) => {
    console.log(options);
    // Required text value
    if (!text && !options.slotLeft && !options.slotRight && !options.slot) {
        return console.error('vue-dk-toast [Error]: a text/slot value is required');
    }
    // Slot deprecation warning
    if (options.slot) {
        console.warn('vue-dk-toast [Warn]: slot is now deprecated. Use slotRight instead');
    }
};
