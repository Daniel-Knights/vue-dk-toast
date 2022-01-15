import type { Options, LocalOptions } from './toast.d';

const logErr = (msg: string) => console.error(`vue-dk-toast [Error]: ${msg}`);
const logWarn = (msg: string) => console.warn(`vue-dk-toast [Warn]: ${msg}`);

export function validateOptions(options: Options): void {
  console.log(options.positionX, options.positionY);
  // Invalid position error-handling
  if (!/^(?:left|right|center)$/.test(options.positionX ?? '')) {
    logErr(
      `positionX must be either "left", "right" or "center", received "${options.positionX}"`
    );
  }
  if (!/^(?:top|bottom)$/.test(options.positionY ?? '')) {
    logErr(`positionY must be either "top" or "bottom", received "${options.positionY}"`);
  }
}

export function validateLocalOptions(text: string, options: LocalOptions): boolean {
  let valid = true;

  // Required text value
  if (!text && !options.slotLeft && !options.slotRight && !options.slot) {
    logErr('a text/slot value is required');
    valid = false;
  }
  // Slot deprecation warning
  if (options.slot) {
    logWarn('slot is now deprecated. Use slotRight instead');
  }

  return valid;
}
