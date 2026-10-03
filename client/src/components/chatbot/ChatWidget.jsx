import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Minus, Send, HardHat } from 'lucide-react'
import { sendChatMessage } from '../../api/client.js'

const GREETING = {
  role: 'assistant',
  text: "Hello! Welcome to Spell Innovation. I'm your AI assistant. How can I help you today?",
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false) // Whether the chat widget is open or closed 
  const [minimized, setMinimized] = useState(false) // Whether the chat widget is minimized or expanded
  const [messages, setMessages] = useState([GREETING]) // The chat history, starting with a greeting from the assistant
  const [input, setInput] = useState('') // The current text input from the user
  const [sending, setSending] = useState(false) // Whether a message is currently being sent to the assistant
  const scrollRef = useRef(null) // Ref to the scrollable chat container, used to auto-scroll to the bottom when new messages arrive

  useEffect(() => { // Auto-scroll to the bottom of the chat when messages change, or when the widget is opened or minimized
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open, minimized])

  async function handleSend() { // Handle sending a message to the assistant. It adds the user's message to the chat history, sends it to the server, and appends the assistant's reply to the chat history.
    const text = input.trim() 
    if (!text || sending) return

    const nextMessages = [...messages, { role: 'user', text }] // this creates a new array of messages that includes the user's new message
    setMessages(nextMessages) // update the chat history with the user's message
    setInput('') 
    setSending(true) // will check it wheather the message is being sent 

    try { 
      const reply = await sendChatMessage( 
        text,
        nextMessages.map((m) => ({ role: m.role, text: m.text })), 
      )
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]) 
    } catch (err) { 
      setMessages((prev) => [ 
        ...prev,
        { 
          role: 'assistant',
          text: "Sorry, I couldn't reach the assistant just now. Check that the server is running and GEMINI_API_KEY is set.",
        },
      ])
    } finally { 
      setSending(false)
    }
  }

  function handleKeyDown(e) { 
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Construction Assistant"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-nt-red hover:bg-red-700 transition-colors text-white shadow-xl flex items-center justify-center"
      >
        <MessageCircle size={24} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[92vw] rounded-card shadow-2xl overflow-hidden border border-ink-900/10 bg-white flex flex-col">
      <div className="bg-leaf-600 text-white px-4 py-3 flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium text-sm">
          <HardHat size={16} /> AI Construction Assistant
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => setMinimized((v) => !v)} className="p-1 hover:bg-white/15 rounded" aria-label="Minimize">
            <Minus size={15} />
          </button>
          <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/15 rounded" aria-label="Close">
            <X size={15} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          <div ref={scrollRef} className="h-80 overflow-y-auto px-4 py-3 space-y-3 bg-paper/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-leaf-500 text-white rounded-br-sm'
                      : 'bg-white border border-ink-900/8 text-ink-900 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white border border-ink-900/8 rounded-lg rounded-bl-sm px-3 py-2 text-sm text-ink-400">
                  Typing…
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-ink-900/8 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your project…"
              className="flex-1 border border-ink-900/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-300"
            />
            <button
              onClick={handleSend}
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="h-9 w-9 shrink-0 rounded-full bg-nt-red hover:bg-red-700 disabled:opacity-50 transition-colors text-white flex items-center justify-center"
            >
              <Send size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
