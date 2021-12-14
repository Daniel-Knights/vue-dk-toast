/**
 * @property `class?: string`
 * @property `disableClick?: boolean`
 * @property `duration?: number | false`
 * @property `max?: number`
 * @property `positionX?: 'left' | 'right' | 'center'`
 * @property `positionY?: 'top' | 'bottom'`
 * @property `styles?: Record<string, string>`
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
