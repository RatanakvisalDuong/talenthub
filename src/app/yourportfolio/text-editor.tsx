"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type TextEditorProps = {
    onChange?: (html: string) => void;
    defaultContent?: string;
    id: string;
    label: string;
    required?: boolean;
};

export default function TextEditor({
    onChange,
    defaultContent,
    id,
    label,
    required = false,
}: TextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const [quill, setQuill] = useState<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && toolbarRef.current && !quill) {
            const q = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: toolbarRef.current,
                },
            });

            if (defaultContent) {
                q.clipboard.dangerouslyPasteHTML(defaultContent);
            }

            q.on("text-change", () => {
                const html = q.root.innerHTML;
                if (onChange) {
                    onChange(html);
                }
            });

            setQuill(q);
        }
    }, [editorRef, toolbarRef, quill, defaultContent, onChange]);

    return (
        <div className="w-full space-y-2 mb-2">
            <label htmlFor={id} className="block text-sm font-medium text-black">
                {label}
                {required && <span className="text-red-400 ml-2">*</span>}
            </label>
            {/* Wrapper with border */}
            <div className="border border-gray-300 rounded">
                {/* Toolbar */}
                <div ref={toolbarRef} className="px-2 py-1 border-b border-gray-200 bg-gray-50 rounded-t">
                    <span className="ql-formats">
                        <button className="ql-bold" />
                        <button className="ql-italic" />
                        <button className="ql-underline" />
                    </span>
                    <span className="ql-formats">
                        <button className="ql-list" value="ordered" />
                        <button className="ql-list" value="bullet" />
                    </span>
                    <span className="ql-formats">
                        <select className="ql-align" />
                    </span>
                </div>

                {/* Editor */}
                <div
                    id={id}
                    ref={editorRef}
                    className="text-black text-sm min-h-[100px] max-h-[100px] overflow-y-auto focus:outline-none"
                />
            </div>
        </div>

    );
}
