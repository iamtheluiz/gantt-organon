/* eslint-disable no-bitwise */

/**
 * Convert hexadecimal string to a object with rgb values
 * @param backgroundColor Hexadecimal color
 */
export function convertHexToRgb(hex: string): {r: number, g: number, b: number} {
  const intHex = parseInt(hex.split('#')[1], 16);

  const r = (intHex >> 16) & 255;
  const g = (intHex >> 8) & 255;
  const b = intHex & 255;

  return { r, g, b };
}

/**
 * Return 'black' or 'white' based on hexadecimal background color
 * @param backgroundColor Hexadecimal color
 */
export default function getTextColorFromBackgroundColor(backgroundColor: string): 'white' | 'black' {
  const { r, g, b } = convertHexToRgb(backgroundColor);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return (yiq >= 128) ? 'black' : 'white';
}
