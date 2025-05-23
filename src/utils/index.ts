export function sanitizeQuillHtml(html: string): string {
  if (!html || html === '<p><br></p>') return '';

  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/(<\/(?:p|div|h[1-6]|li|ul|ol)>)(<(?!\/|br|p|div|h[1-6]|li|ul|ol))/g, '$1 $2');
}

export function convertPhoneNumberSpacing(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, '');
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  return digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
}

import { ErrorHandling } from '../dummydata/error';

/**
 * Gets an error message by its ID
 * @param errorId The ID of the error to retrieve
 * @returns The error message or undefined if not found
 */
export function getErrorById(errorId: number): string | undefined {
    const errorEntry = ErrorHandling.find(error => error.id === errorId);
    return errorEntry?.error;
}