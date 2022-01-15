import type { Plugin } from 'vue';

/**
 * **Options:**
 * @property `class` - Global class to be added to each toast.
 * @property `disableClick` - Disable toast removal on click.
 * @property `duration` - Time in milliseconds before hiding the toast notification,
 * set to `false` for an indefinite duration.
 * @property `max` - Max number of toasts allowed at any one time.
 * @property `positionX` - 'left', 'right' or 'center'.
 * @property `positionY` - 'top' or 'bottom'.
 * @property `styles` - CSS key/value pairs.
 */
declare const DKToast: Plugin;
export default DKToast;

// CDN compatibility
declare global {
  interface Window {
    /**
     * **Options:**
     * @property `class` - Global class to be added to each toast.
     * @property `disableClick` - Disable toast removal on click.
     * @property `duration` - Time in milliseconds before hiding the toast notification,
     * set to `false` for an indefinite duration.
     * @property `max` - Max number of toasts allowed at any one time.
     * @property `positionX` - 'left', 'right' or 'center'.
     * @property `positionY` - 'top' or 'bottom'.
     * @property `styles` - CSS key/value pairs.
     */
    DKToast?: typeof DKToast;
  }
}

/**
 * **Options:**
 * @property `class` - Global class to be added to each toast.
 * @property `disableClick` - Disable toast removal on click.
 * @property `duration` - Time in milliseconds before hiding the toast notification,
 * set to `false` for an indefinite duration.
 * @property `max` - Max number of toasts allowed at any one time.
 * @property `positionX` - 'left', 'right' or 'center'.
 * @property `positionY` - 'top' or 'bottom'.
 * @property `styles` - CSS key/value pairs.
 */
export interface Options {
  class?: string;
  disableClick?: boolean;
  duration?: number | false;
  max?: number;
  positionX?: 'left' | 'right' | 'center';
  positionY?: 'top' | 'bottom';
  styles?: Record<string, string>;
}

/**
 * @property `class?: string`
 * @property `disableClick?: boolean`
 * @property `duration?: number | false`
 * @property `link?: { href: string; targetBlank?: boolean }`
 * @property `positionX?: 'left' | 'right' | 'center'`
 * @property `positionY?: 'top' | 'bottom'`
 * @property `slot?: string`
 * @property `slotLeft?: string`
 * @property `slotRight?: string`
 * @property `styles?: Record<string, string>`
 * @property `type?: 'error' | 'success' | 'passive'`
 */
export interface LocalOptions {
  class?: string;
  disableClick?: boolean;
  duration?: number | false;
  link?: { href: string; targetBlank?: boolean };
  positionX?: 'left' | 'right' | 'center';
  positionY?: 'top' | 'bottom';
  slot?: string;
  slotLeft?: string;
  slotRight?: string;
  styles?: Record<string, string>;
  type?: 'error' | 'success' | 'passive';
}

/**
 * @param text Text to display in toast notification.
 * @param localOptions Optional config for individual toast.
 * ---
 * **Options:**
 * @property `class` - Local class to be added to individual toast.
 * @property `disableClick` - Disable toast removal on click.
 * @property `duration` - Time in milliseconds before hiding the toast notification,
 * set to `false` for an indefinite duration.
 * @property `link` - Object with `href` and `targetBlank` properties, turns the toast
 * into an `<a>` element which has a `href` of the one provided and optional `target="_blank"`.
 * @property `positionX` - 'left', 'right' or 'center'.
 * @property `positionY` - 'top' or 'bottom'.
 * @property `slot` - (deprecated) Slot for displaying HTML on the right side of provided text.
 * @property `slotLeft` - Slot for displaying HTML on the left-side of provided text.
 * @property `slotRight` - Slot for displaying HTML on the right-side of provided text.
 * @property `styles` - CSS key/value pairs.
 * @property `type` - Default classes for `success`, `error` and `passive`.
 */
export type Toast = {
  // eslint-disable-next-line no-unused-vars
  (text: string, localOptions?: LocalOptions): void;
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * @param text Text to display in toast notification.
     * @param localOptions Optional config for individual toast.
     * ---
     * **Options:**
     * @property `class` - Local class to be added to individual toast.
     * @property `disableClick` - Disable toast removal on click.
     * @property `duration` - Time in milliseconds before hiding the toast notification,
     * set to `false` for an indefinite duration.
     * @property `link` - Object with `href` and `targetBlank` properties, turns the toast
     * into an `<a>` element which has a `href` of the one provided and optional `target="_blank"`.
     * @property `positionX` - 'left', 'right' or 'center'.
     * @property `positionY` - 'top' or 'bottom'.
     * @property `slot` - (deprecated) Slot for displaying HTML on the right side of provided text.
     * @property `slotLeft` - Slot for displaying HTML on the left-side of provided text.
     * @property `slotRight` - Slot for displaying HTML on the right-side of provided text.
     * @property `styles` - CSS key/value pairs.
     * @property `type` - Default classes for `success`, `error` and `passive`.
     */
    $toast: Toast;
  }
}
