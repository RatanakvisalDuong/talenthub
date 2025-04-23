/**
 * Sanitizes whitespace in HTML content for cleaner rendering
 * - Removes excessive spaces between HTML tags
 * - Preserves spaces within text content
 * - Returns HTML with normalized spacing
 */
export function sanitizeQuillHtml(html: string): string {
    if (!html || html === '<p><br></p>') return '';
    
    // Clean up excessive whitespace between tags only
    return html
      // Replace multiple whitespace chars with a single space
      .replace(/\s+/g, ' ')
      // Remove space between tags
      .replace(/>\s+</g, '><')
      // Restore space after specific tags that need it for readability
      .replace(/(<\/(?:p|div|h[1-6]|li|ul|ol)>)(<(?!\/|br|p|div|h[1-6]|li|ul|ol))/g, '$1 $2');
  }