'use client'

import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface BlogContentProps {
  content: string
}

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 'font-bold mb-4 mt-8',
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: 'text-gray-700 leading-relaxed mb-6 text-lg',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc pl-6 mb-6 space-y-2',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal pl-6 mb-6 space-y-2',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'text-gray-700 text-lg',
      },
    },
    bold: {
      HTMLAttributes: {
        class: 'font-bold text-gray-900',
      },
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-600 hover:text-blue-500 underline',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'my-4 rounded-lg shadow-md w-full h-[400px] object-cover',
    },
    allowBase64: true, // This is crucial for base64 images
  }),
]

export default function BlogContentRenderer({ content }: BlogContentProps) {
  const editor = useEditor({
    extensions,
    content: '', // Start with empty content and set it after initialization
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  })

  useEffect(() => {
    // Ensure the editor has initialized
    if (editor) {
      // Set content after initialization
      editor.commands.setContent(content)
    }
  }, [editor, content])

  // Add some debugging if needed
  // useEffect(() => {
  //   if (editor && process.env.NODE_ENV === 'development') {
  //     console.log('Editor content:', editor.getHTML())
  //   }
  // }, [editor])

  return (
    <article className='article-content space-y-6 [&_.ProseMirror]:!outline-none'>
      <div className='text-gray-700 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_p]:mb-6 [&_.ProseMirror_p]:text-lg'>
        <EditorContent editor={editor} />
      </div>
    </article>
  )
}
