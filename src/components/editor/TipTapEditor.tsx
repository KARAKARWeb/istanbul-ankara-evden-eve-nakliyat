'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect, useState } from 'react';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Link as LinkIcon, Code } from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  minHeight?: number; // px cinsinden, default 200
}

export function TipTapEditor({ content, onChange, minHeight = 200 }: TipTapEditorProps) {
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [htmlContent, setHtmlContent] = useState(content);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent hover:text-accent-hover underline',
        },
      }),
    ],
    content: content,
    immediatelyRender: false, // SSR fix
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-gray max-w-none focus:outline-none p-4 text-text-secondary leading-relaxed',
        style: `min-height: ${minHeight}px`,
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
      setHtmlContent(content);
    }
  }, [content, editor]);

  const handleModeSwitch = (newMode: 'visual' | 'html') => {
    if (newMode === 'html' && editor) {
      // Visual'dan HTML'e geçiş
      setHtmlContent(editor.getHTML());
    } else if (newMode === 'visual' && editor) {
      // HTML'den Visual'e geçiş
      editor.commands.setContent(htmlContent);
      onChange(htmlContent);
    }
    setMode(newMode);
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtmlContent(newHtml);
    onChange(newHtml);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      <style jsx global>{`
        .ProseMirror {
          color: #737373;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 1rem;
          margin-top: 1.25rem;
        }
        .ProseMirror p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
          color: #737373;
        }
        .ProseMirror ul, .ProseMirror ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          color: #737373;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror li {
          margin-bottom: 0.5rem;
          color: #737373;
        }
        .ProseMirror strong {
          font-weight: 600;
          color: #1A1A1A;
        }
        .ProseMirror em {
          font-style: italic;
          color: #737373;
        }
        .ProseMirror a {
          color: #16A34A;
          text-decoration: underline;
        }
        .ProseMirror a:hover {
          color: #15803D;
        }
      `}</style>
      {/* Toolbar */}
      <div className="border-b border-border bg-surface p-2 flex flex-wrap gap-1 items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {/* Mode Toggle */}
          <button
            onClick={() => handleModeSwitch('visual')}
            className={`px-3 py-1.5 text-xs font-medium rounded ${mode === 'visual' ? 'bg-accent text-white' : 'bg-background text-text-secondary hover:bg-accent/10'}`}
            type="button"
          >
            Visual
          </button>
          <button
            onClick={() => handleModeSwitch('html')}
            className={`px-3 py-1.5 text-xs font-medium rounded ${mode === 'html' ? 'bg-accent text-white' : 'bg-background text-text-secondary hover:bg-accent/10'}`}
            type="button"
          >
            HTML
          </button>
          <div className="w-px bg-border mx-1" />
        </div>

        {mode === 'visual' && (
          <div className="flex flex-wrap gap-1">
            <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-background ${editor.isActive('bold') ? 'bg-accent/20 text-accent' : ''}`}
          type="button"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-background ${editor.isActive('italic') ? 'bg-accent/20 text-accent' : ''}`}
          type="button"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-background ${editor.isActive('heading', { level: 2 }) ? 'bg-accent/20 text-accent' : ''}`}
          type="button"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-background ${editor.isActive('heading', { level: 3 }) ? 'bg-accent/20 text-accent' : ''}`}
          type="button"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-background ${editor.isActive('bulletList') ? 'bg-accent/20 text-accent' : ''}`}
          type="button"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-background ${editor.isActive('orderedList') ? 'bg-accent/20 text-accent' : ''}`}
          type="button"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px bg-border mx-1" />
            <button
              onClick={() => {
                const url = window.prompt('URL:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`p-2 rounded hover:bg-background ${editor.isActive('link') ? 'bg-accent/20 text-accent' : ''}`}
              type="button"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Editor Content */}
      {mode === 'visual' ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          value={htmlContent}
          onChange={handleHtmlChange}
          className="w-full p-4 font-mono text-sm bg-background text-text-primary focus:outline-none resize-none"
          style={{ minHeight: `${minHeight}px` }}
          placeholder="HTML kodunu buraya yapıştırın..."
          spellCheck={false}
        />
      )}
    </div>
  );
}
