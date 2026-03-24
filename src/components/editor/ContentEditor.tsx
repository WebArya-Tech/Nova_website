import React, { useState, useRef, useCallback, useEffect, type FC, type MouseEvent, type SyntheticEvent } from 'react';
import {
    Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3,
    List, ListOrdered, Code, Quote, Link as LinkIcon, Image as ImageIcon,
    Minus, Eye, Edit3, AlignLeft, AlignCenter, AlignRight, Undo, Redo,
    Type, X,
    type LucideIcon
} from 'lucide-react';

/* ─── Types ─── */
interface ToolbarItem {
    key: string;
    icon?: LucideIcon;
    label?: string;
    command?: string;
    value?: string;
    separator?: boolean;
    special?: 'image' | 'link' | 'code';
}

interface ContentEditorProps {
    initialContent?: string;
    onChange: (html: string) => void;
}

/* ─── Toolbar config ─── */
const TOOLBAR: ToolbarItem[] = [
    { key: 'undo', icon: Undo, label: 'Undo', command: 'undo' },
    { key: 'redo', icon: Redo, label: 'Redo', command: 'redo' },
    { key: 'sep0', separator: true },
    { key: 'bold', icon: Bold, label: 'Bold', command: 'bold' },
    { key: 'italic', icon: Italic, label: 'Italic', command: 'italic' },
    { key: 'underline', icon: Underline, label: 'Underline', command: 'underline' },
    { key: 'strikethrough', icon: Strikethrough, label: 'Strikethrough', command: 'strikeThrough' },
    { key: 'sep1', separator: true },
    { key: 'h1', icon: Heading1, label: 'Heading 1', command: 'formatBlock', value: '<H1>' },
    { key: 'h2', icon: Heading2, label: 'Heading 2', command: 'formatBlock', value: '<H2>' },
    { key: 'h3', icon: Heading3, label: 'Heading 3', command: 'formatBlock', value: '<H3>' },
    { key: 'paragraph', icon: Type, label: 'Normal', command: 'formatBlock', value: '<P>' },
    { key: 'sep2', separator: true },
    { key: 'ul', icon: List, label: 'List', command: 'insertUnorderedList' },
    { key: 'ol', icon: ListOrdered, label: 'Ordered', command: 'insertOrderedList' },
    { key: 'blockquote', icon: Quote, label: 'Quote', command: 'formatBlock', value: '<BLOCKQUOTE>' },
    { key: 'sep3', separator: true },
    { key: 'code', icon: Code, label: 'Code', special: 'code' },
    { key: 'hr', icon: Minus, label: 'HR', command: 'insertHorizontalRule' },
    { key: 'sep4', separator: true },
    { key: 'alignLeft', icon: AlignLeft, label: 'Left', command: 'justifyLeft' },
    { key: 'alignCenter', icon: AlignCenter, label: 'Center', command: 'justifyCenter' },
    { key: 'alignRight', icon: AlignRight, label: 'Right', command: 'justifyRight' },
    { key: 'sep5', separator: true },
    { key: 'link', icon: LinkIcon, label: 'Link', special: 'link' },
    { key: 'image', icon: ImageIcon, label: 'Image', special: 'image' },
];

const dialogInputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all";

/**
 * Wrapper around document.execCommand to suppress TS deprecation warning.
 * execCommand is deprecated but remains the only viable approach for
 * contentEditable-based editors without pulling in a heavy library.
 */
const exec = (command: string, value: string = ''): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return document.execCommand(command, false, value);
};

export const ContentEditor: FC<ContentEditorProps> = ({ initialContent = '', onChange }) => {

    const editorRef = useRef<HTMLDivElement>(null);
    const savedSelectionRef = useRef<Range | null>(null);
    const isInitializedRef = useRef<boolean>(false);

    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const [htmlContent, setHtmlContent] = useState<string>(initialContent);
    const [showImageDialog, setShowImageDialog] = useState<boolean>(false);
    const [showLinkDialog, setShowLinkDialog] = useState<boolean>(false);

    const [imageUrl, setImageUrl] = useState<string>('');
    const [imageAlt, setImageAlt] = useState<string>('');

    const [linkUrl, setLinkUrl] = useState<string>('');
    const [linkText, setLinkText] = useState<string>('');

    const [wordCount, setWordCount] = useState<number>(0);

    /* ─── Effects ─── */

    // Set initial content only once
    useEffect(() => {
        if (editorRef.current && initialContent && !isInitializedRef.current) {
            editorRef.current.innerHTML = initialContent;
            setHtmlContent(initialContent);
            updateWordCount();
            isInitializedRef.current = true;
        }
    }, [initialContent]);

    // When switching back from preview to edit, restore HTML
    useEffect(() => {
        if (mode === 'edit' && editorRef.current && isInitializedRef.current) {
            editorRef.current.innerHTML = htmlContent;
            updateWordCount();
        }
        // Only depend on mode — htmlContent is intentionally excluded
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    /* ─── Helpers ─── */
    const saveSelection = (): void => {
        const sel: Selection | null = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
        }
    };

    const restoreSelection = (): void => {
        const range: Range | null = savedSelectionRef.current;
        if (!range) return;
        const sel: Selection | null = window.getSelection();
        if (!sel) return;
        sel.removeAllRanges();
        sel.addRange(range);
    };

    const updateWordCount = (): void => {
        const el: HTMLDivElement | null = editorRef.current;
        if (!el) return;
        const text: string = el.innerText.trim();
        setWordCount(text ? text.split(/\s+/).length : 0);
    };

    const syncContent = useCallback((): void => {
        const el: HTMLDivElement | null = editorRef.current;
        if (!el) return;
        const html: string = el.innerHTML;
        setHtmlContent(html);
        onChange(html);
        updateWordCount();
    }, [onChange]);

    const execCommand = (command: string, value?: string): void => {
        editorRef.current?.focus();
        restoreSelection();
        exec(command, value);
        syncContent();
    };

    const handleToolbar = (item: ToolbarItem): void => {
        if (item.special === 'image') {
            saveSelection();
            setImageUrl('');
            setImageAlt('');
            setShowImageDialog(true);
            return;
        }

        if (item.special === 'link') {
            saveSelection();
            const sel: Selection | null = window.getSelection();
            setLinkText(sel?.toString() ?? '');
            setLinkUrl('');
            setShowLinkDialog(true);
            return;
        }

        if (item.special === 'code') {
            editorRef.current?.focus();
            restoreSelection();
            const sel: Selection | null = window.getSelection();
            if (!sel || sel.rangeCount === 0) return;

            const range: Range = sel.getRangeAt(0);
            const pre: HTMLPreElement = document.createElement('pre');
            pre.style.background = '#f3f4f6';
            pre.style.padding = '12px';
            pre.style.borderRadius = '8px';
            pre.style.overflowX = 'auto';
            const code: HTMLElement = document.createElement('code');
            code.textContent = sel.toString() || 'code here';
            pre.appendChild(code);

            range.deleteContents();
            range.insertNode(pre);

            // Move cursor after the inserted node
            range.setStartAfter(pre);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);

            syncContent();
            return;
        }

        if (item.command === 'formatBlock' && item.value) {
            execCommand(item.command, item.value);
        } else if (item.command) {
            execCommand(item.command);
        }
    };

    /* ─── Dialog handlers ─── */
    const insertImage = (): void => {
        if (!imageUrl.trim()) return;
        editorRef.current?.focus();
        restoreSelection();
        const safeUrl: string = imageUrl.replace(/"/g, '&quot;');
        const safeAlt: string = (imageAlt || '').replace(/"/g, '&quot;');
        const imgHtml = `<img src="${safeUrl}" alt="${safeAlt}" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;" />`;
        exec('insertHTML', imgHtml);
        syncContent();
        setShowImageDialog(false);
        setImageUrl('');
        setImageAlt('');
    };

    const insertLink = (): void => {
        if (!linkUrl.trim()) return;
        editorRef.current?.focus();
        restoreSelection();
        const text: string = linkText.trim() || linkUrl;
        const safeUrl: string = linkUrl.replace(/"/g, '&quot;');
        const safeText: string = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const linkHtml = `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">${safeText}</a>`;
        exec('insertHTML', linkHtml);
        syncContent();
        setShowLinkDialog(false);
        setLinkUrl('');
        setLinkText('');
    };

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
        e.currentTarget.style.display = 'none';
    };

    const handleModeToggle = (): void => {
        if (mode === 'edit' && editorRef.current) {
            setHtmlContent(editorRef.current.innerHTML);
        }
        setMode(mode === 'edit' ? 'preview' : 'edit');
    };

    const handleToolbarMouseDown = (e: MouseEvent<HTMLButtonElement>): void => {
        // Prevent button from stealing focus from the editor
        e.preventDefault();
    };

    const handleDialogBackdrop = (setter: (v: boolean) => void) => (): void => {
        setter(false);
    };

    const stopPropagation = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
    };

    /* ─── Shared prose classes ─── */
    const proseClasses = `prose prose-sm max-w-none
        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2
        [&_blockquote]:border-l-4 [&_blockquote]:border-blue-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500
        [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
        [&_a]:text-blue-600 [&_a]:underline
        [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2`;

    /* ─── Render ─── */
    return (
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden relative">

            {/* Mode toggle */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {mode === 'edit' ? 'Editor' : 'Preview'}
                </span>
                <button
                    type="button"
                    onClick={handleModeToggle}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
                >
                    {mode === 'edit' ? <><Eye size={13} /> Preview</> : <><Edit3 size={13} /> Edit</>}
                </button>
            </div>

            {mode === 'edit' ? (
                <>
                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-1 p-3 bg-gray-50 border-b border-gray-200">
                        {TOOLBAR.map((item) =>
                            item.separator ? (
                                <div key={item.key} className="w-px h-7 bg-gray-300 mx-1 self-center" />
                            ) : (
                                <button
                                    key={item.key}
                                    type="button"
                                    title={item.label}
                                    onMouseDown={handleToolbarMouseDown}
                                    onClick={() => handleToolbar(item)}
                                    className="p-2 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition text-gray-600 hover:text-gray-900"
                                >
                                    {item.icon && <item.icon size={16} />}
                                </button>
                            )
                        )}
                    </div>

                    {/* Editable area */}
                    <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={syncContent}
                        onMouseUp={saveSelection}
                        onKeyUp={saveSelection}
                        className={`p-6 min-h-[400px] outline-none text-gray-700 ${proseClasses}`}
                    />
                </>
            ) : (
                /* Preview mode */
                <div
                    className={`p-6 min-h-[400px] text-gray-700 ${proseClasses}`}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            )}

            {/* Footer */}
            <div className="px-6 py-3 border-t text-xs text-gray-500 flex justify-between">
                <span>{wordCount} words</span>
                <span>{mode === 'edit' ? 'Editing' : 'Previewing'}</span>
            </div>

            {/* ─── Image Dialog ─── */}
            {showImageDialog && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleDialogBackdrop(setShowImageDialog)}>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={stopPropagation}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-bold text-gray-800">Insert Image</h3>
                            <button type="button" onClick={() => setShowImageDialog(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Image URL *</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    value={imageUrl}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
                                    className={dialogInputCls}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Alt Text</label>
                                <input
                                    type="text"
                                    placeholder="Describe the image"
                                    value={imageAlt}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageAlt(e.target.value)}
                                    className={dialogInputCls}
                                />
                            </div>
                            {imageUrl && (
                                <div className="rounded-lg border border-gray-200 overflow-hidden">
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="w-full h-32 object-cover"
                                        onError={handleImageError}
                                    />
                                </div>
                            )}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={insertImage}
                                    className="flex-1 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                                    style={{ background: '#195276' }}>
                                    Insert Image
                                </button>
                                <button type="button" onClick={() => setShowImageDialog(false)}
                                    className="px-5 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Link Dialog ─── */}
            {showLinkDialog && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleDialogBackdrop(setShowLinkDialog)}>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={stopPropagation}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-bold text-gray-800">Insert Link</h3>
                            <button type="button" onClick={() => setShowLinkDialog(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">URL *</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={linkUrl}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value)}
                                    className={dialogInputCls}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Display Text</label>
                                <input
                                    type="text"
                                    placeholder="Click here"
                                    value={linkText}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkText(e.target.value)}
                                    className={dialogInputCls}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={insertLink}
                                    className="flex-1 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                                    style={{ background: '#195276' }}>
                                    Insert Link
                                </button>
                                <button type="button" onClick={() => setShowLinkDialog(false)}
                                    className="px-5 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};