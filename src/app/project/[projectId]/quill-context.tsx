// 'use client'

// import { useEffect, useRef, useState } from 'react';

// interface QuillDisplayProps {
//   content: string;
//   className?: string;
//   onContentLoaded?: () => void;
// }

// export default function QuillDisplay({ content, className = '', onContentLoaded }: QuillDisplayProps) {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [isContentSet, setIsContentSet] = useState(false);
  
//   // Effect to set the content
//   useEffect(() => {
//     if (contentRef.current && content) {
//       // Set the content
//       contentRef.current.innerHTML = content;
//       setIsContentSet(true);
      
//       // Notify parent component if needed
//       if (onContentLoaded) {
//         // Slight delay to ensure DOM is updated
//         setTimeout(onContentLoaded, 100);
//       }
//     }
//   }, [content, onContentLoaded]);

//   // Add Quill CSS if it doesn't exist yet
//   useEffect(() => {
//     // Check if we need to add Quill styles
//     const quillCssId = "quill-custom-styles";
//     if (!document.getElementById(quillCssId)) {
//       const styleEl = document.createElement("style");
//       styleEl.id = quillCssId;
//       document.head.appendChild(styleEl);
//     }
//   }, []);
  
//   return (
//     <div className={`quill-content ${className}`}>
//       <div className="ql-container ql-snow" style={{ border: 'none' }}>
//         <div
//           ref={contentRef}
//           className={`ql-editor ${isContentSet ? 'quill-loaded' : 'quill-loading'}`}
//           style={{
//             padding: '0',
//             lineHeight: '1.5',
//             fontFamily: 'inherit',
//             fontSize: '1rem'
//           }}
//         />
//       </div>
      
//       <style jsx global>{`
//         /* Global styles for Quill content */
//         .ql-editor {
//           font-family: inherit;
//           font-size: 1rem !important;
//           padding: 0 !important; /* Override any default padding */
//           color: inherit;
//         }
        
//         .quill-loading {
//           opacity: 0;
//         }
        
//         .quill-loaded {
//           opacity: 1;
//           transition: opacity 0.3s ease-in-out;
//         }
        
//         .ql-editor p {
//           margin-bottom: 1rem;
//           font-family: inherit;
//           font-size: 1rem !important;
//         }
        
//         /* Text formatting */
//         .ql-editor strong {
//           font-weight: 600;
//         }
        
//         .ql-editor em {
//           font-style: italic;
//         }
        
//         .ql-editor u {
//           text-decoration: underline;
//         }
        
//         /* List styles */
//         .ql-editor ol, .ql-editor ul {
//           list-style: decimal;
//           margin-left: 1.5em;
//           padding-left: 1.5em;
//           margin-bottom: 1rem;
//           font-size: 1rem !important;
//         }
        
//         .ql-editor ol > li, .ql-editor ul > li {
//           padding-left: 0.5em;
//           display: list-item;
//           font-family: inherit;
//           font-size: 1rem !important;
//         }
        
//         .ql-editor ul {
//           list-style: disc;
//         }
        
//         .ql-editor ul > li {
//           list-style-type: disc;
//         }
        
//         /* First paragraph spacing */
//         .ql-editor > p:first-child {
//           margin-top: 0;
//         }
        
//         /* Last paragraph spacing */
//         .ql-editor > p:last-child {
//           margin-bottom: 0;
//         }
        
//         /* Make sure content is visible regardless of parent styling */
//         .quill-content {
//           display: block;
//           width: 100%;
//           height: auto;
//         }
//       `}</style>
//     </div>
//   );
// }