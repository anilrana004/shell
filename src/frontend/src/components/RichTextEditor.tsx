import { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const EMOJIS = [
  "🏔️",
  "🎒",
  "⛺",
  "🌸",
  "🌿",
  "❄️",
  "☀️",
  "🎉",
  "🔥",
  "⭐",
  "🏕️",
  "🗻",
  "🌄",
  "🌊",
  "🦅",
  "✅",
  "⚠️",
  "📅",
  "💰",
  "👥",
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Type here...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isInternalUpdate = useRef(false);

  // Only sync innerHTML from props when editor is NOT focused and value differs
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (isFocused) return; // skip while user is typing
    if (editor.innerHTML === value) return;
    isInternalUpdate.current = true;
    editor.innerHTML = value;
    isInternalUpdate.current = false;
  }, [value, isFocused]);

  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;
    if (isInternalUpdate.current) return;
    onChange(editor.innerHTML);
  };

  const exec = (command: string, valueArg: string | undefined = undefined) => {
    document.execCommand(command, false, valueArg);
    handleInput();
    editorRef.current?.focus();
  };

  const handleLink = () => {
    const url = window.prompt("Enter URL:", "https://");
    if (url) {
      exec("createLink", url);
    }
  };

  const insertEmoji = (emoji: string) => {
    exec("insertText", emoji);
    setShowEmoji(false);
  };

  const isEmpty = !value || value === "<br>" || value === "";

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="flex items-center gap-1 rounded-t border border-[#D4EDE0] bg-[#EDF7F2] px-2 py-1">
        <button
          type="button"
          onClick={() => exec("bold")}
          className="rounded px-2 py-1 text-sm font-bold text-[#1A2A1E] transition-colors hover:bg-[#E8541A] hover:text-white"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className="rounded px-2 py-1 text-sm italic text-[#1A2A1E] transition-colors hover:bg-[#E8541A] hover:text-white"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          className="rounded px-2 py-1 text-sm underline text-[#1A2A1E] transition-colors hover:bg-[#E8541A] hover:text-white"
          title="Underline"
        >
          U
        </button>
        <button
          type="button"
          onClick={handleLink}
          className="rounded px-2 py-1 text-sm text-[#1A2A1E] transition-colors hover:bg-[#E8541A] hover:text-white"
          title="Insert Link"
        >
          🔗
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmoji((v) => !v)}
            className="rounded px-2 py-1 text-sm text-[#1A2A1E] transition-colors hover:bg-[#E8541A] hover:text-white"
            title="Insert Emoji"
          >
            😊
          </button>
          {showEmoji && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowEmoji(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowEmoji(false);
                }}
                role="button"
                tabIndex={0}
                aria-label="Close emoji picker"
              />
              <div className="absolute left-0 top-full z-50 mt-1 grid grid-cols-5 gap-1 rounded border border-[#D4EDE0] bg-white p-2 shadow-lg">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => insertEmoji(emoji)}
                    className="rounded p-1 text-lg transition-colors hover:bg-[#FEF4F0]"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Editor area */}
      <div className="relative">
        {isEmpty && !isFocused && (
          <span className="pointer-events-none absolute left-3 top-3 text-sm text-[#7A8E80]">
            {placeholder}
          </span>
        )}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-h-[80px] rounded-b border border-t-0 border-[#D4EDE0] bg-white p-3 text-sm text-[#1A2A1E] focus:outline-none focus:ring-1 focus:ring-[#E8541A]"
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
}
