import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

// LocalStorage utilities
const HISTORY_KEY = 'codeEdHistory';
function saveHistoryItem(item) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  history.unshift(item); // newest first
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}
function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}
function deleteHistoryItem(timestamp) {
  const history = getHistory().filter(item => item.timestamp !== timestamp);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function encodeReviewForShare(item) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(item))));
}
function decodeReviewFromShare(str) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
  } catch {
    return null;
  }
}

function App() {
  const [ code, setCode ] = useState(`function sum() {
  return 1 + 1
}`)
  const [ review, setReview ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ prompt, setPrompt ] = useState("")
  const [promptResponse, setPromptResponse] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState([])
  const [selectedHistory, setSelectedHistory] = useState(null)
  const [showSharedReview, setShowSharedReview] = useState(null);

  // On app load, check for #share=...
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#share=')) {
      const encoded = hash.replace('#share=', '');
      const review = decodeReviewFromShare(encoded);
      if (review) setShowSharedReview(review);
      // Optionally, clear the hash so it doesn't persist
      // window.location.hash = '';
    }
  }, []);

  useEffect(() => {
    prism.highlightAll()
  }, [review, promptResponse])

  useEffect(() => {
    if (showHistory) setHistory(getHistory())
  }, [showHistory])

  function saveCurrentToHistory(newReview, newPromptResponse) {
    saveHistoryItem({
      code,
      prompt,
      review: newReview,
      promptResponse: newPromptResponse,
      timestamp: Date.now()
    });
  }

  const API_URL = import.meta.env.VITE_API_URL;

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/ai/get-review`, { code })
      setReview(response.data.review || response.data)
      setPromptResponse(null)
      saveCurrentToHistory(response.data.review || response.data, null)
    } catch {
      setReview('Error fetching review. Please try again.')
      setPromptResponse(null)
    }
    setLoading(false)
  }

  async function improviseCode() {
    if (!prompt.trim()) return;
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/ai/get-review`, { code, prompt })
      setReview(response.data.review)
      setPromptResponse(response.data.promptResponse)
      saveCurrentToHistory(response.data.review, response.data.promptResponse)
    } catch {
      setReview('Error fetching review. Please try again.')
      setPromptResponse(null)
    }
    setLoading(false)
  }

  function handleLoadHistory(item) {
    setCode(item.code)
    setPrompt(item.prompt)
    setReview(item.review)
    setPromptResponse(item.promptResponse)
    setShowHistory(false)
    setSelectedHistory(null)
  }

  function handleDeleteHistory(ts) {
    deleteHistoryItem(ts)
    setHistory(getHistory())
    setSelectedHistory(null)
  }

  function handleShareHistory(item) {
    const encoded = encodeReviewForShare(item);
    const url = `${window.location.origin}${window.location.pathname}#share=${encoded}`;
    navigator.clipboard.writeText(url);
    alert('Shareable link copied to clipboard!');
  }

  // Custom renderer for code blocks with copy button
  const renderers = {
    code({className, children}) {
      let codeString = String(children).replace(/\n$/, "");
      // If codeString contains [object Object], show a warning
      if (codeString.includes('[object Object]')) {
        codeString = '// Error: AI returned invalid code. Please try again.';
      }
      return (
        <div className="code-block-wrapper">
          <pre className={className}><code>{codeString}</code></pre>
          <button className="copy-btn" onClick={() => {
            navigator.clipboard.writeText(codeString)
          }}>Copy</button>
        </div>
      )
    }
  }

  // Helper to ensure only strings are rendered in Markdown
  function safeMarkdown(content) {
    if (typeof content === 'string') return content;
    if (content && typeof content === 'object') return '// Error: AI returned invalid content. Please try again.';
    return String(content || '');
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleString()
  }

  return (
    <>
      <SignedOut>
        <div className="auth-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="app-container">
          {/* Navigation Bar */}
          <nav className="navbar">
            <div className="navbar-title">AI Code Review Tool</div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <button className="history-btn" onClick={() => setShowHistory(true)} title="View History">
                History
              </button>
              <UserButton />
            </div>
          </nav>
          {/* Main Content */}
          <main className="main-content">
            <section className="editor-section">
              <div className="editor-scrollable" style={{height: '80%', minHeight: 0}}>
                <div className="code-editor-border">
                  <Editor
                    value={code}
                    onValueChange={setCode}
                    highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                    padding={16}
                    style={{
                      fontFamily: 'Fira Mono, monospace',
                      fontSize: 16,
                      borderRadius: "8px",
                      minHeight: "400px",
                      background: "#18181a",
                      color: "#fff"
                    }}
                  />
                </div>
              </div>
              <div className="review-btn-bar">
                <button
                  className="review-btn"
                  onClick={reviewCode}
                  disabled={loading}
                >
                  {loading ? "Reviewing..." : "Review"}
                </button>
              </div>
              <div className="prompt-block" style={{height: '20%', minHeight: 0}}>
                <textarea
                  className="prompt-input"
                  placeholder="(Optional) Add a prompt to guide the AI review..."
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={2}
                />
                <button
                  className="improvise-btn"
                  onClick={improviseCode}
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? "Improvising..." : "Improvise"}
                </button>
              </div>
            </section>
            <section className="review-section">
              <div className="review-scrollable">
                <Markdown
                  rehypePlugins={[ rehypeHighlight ]}
                  components={renderers}
                >{safeMarkdown(review)}</Markdown>
                {promptResponse && (
                  <div className="prompt-response-block">
                    <h3>Prompt-based Response</h3>
                    <Markdown
                      rehypePlugins={[ rehypeHighlight ]}
                      components={renderers}
                    >{safeMarkdown(promptResponse)}</Markdown>
                  </div>
                )}
              </div>
            </section>
          </main>

          {/* History Modal */}
          {showHistory && (
            <div className="history-modal-bg" onClick={() => {setShowHistory(false); setSelectedHistory(null)}}>
              <div className="history-modal" onClick={e => e.stopPropagation()}>
                <div className="history-modal-header">
                  <h2>Review History</h2>
                  <button className="close-btn" onClick={() => {setShowHistory(false); setSelectedHistory(null)}}>×</button>
                </div>
                {!selectedHistory ? (
                  <div className="history-list">
                    {history.length === 0 && <div className="history-empty">No history yet.</div>}
                    {history.map(item => (
                      <div className="history-item" key={item.timestamp}>
                        <div className="history-item-main" onClick={() => setSelectedHistory(item)}>
                          <div className="history-item-title">{item.code.slice(0, 40).replace(/\n/g, ' ') || 'Untitled'}</div>
                          <div className="history-item-date">{formatDate(item.timestamp)}</div>
                        </div>
                        <button className="delete-btn" onClick={() => handleDeleteHistory(item.timestamp)} title="Delete">🗑️</button>
                        <button className="share-btn" onClick={() => handleShareHistory(item)} title="Share">🔗</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="history-detail">
                    <div className="history-detail-header">
                      <div className="history-detail-title">{selectedHistory.code.slice(0, 40).replace(/\n/g, ' ') || 'Untitled'}</div>
                      <div className="history-detail-date">{formatDate(selectedHistory.timestamp)}</div>
                    </div>
                    <div className="history-detail-section">
                      <b>Prompt:</b> <span>{selectedHistory.prompt || <i>None</i>}</span>
                    </div>
                    <div className="history-detail-section">
                      <b>Review:</b>
                      <Markdown rehypePlugins={[ rehypeHighlight ]} components={renderers}>{safeMarkdown(selectedHistory.review)}</Markdown>
                    </div>
                    {selectedHistory.promptResponse && (
                      <div className="history-detail-section">
                        <b>Prompt-based Response:</b>
                        <Markdown rehypePlugins={[ rehypeHighlight ]} components={renderers}>{safeMarkdown(selectedHistory.promptResponse)}</Markdown>
                      </div>
                    )}
                    <div className="history-detail-section">
                      <b>Code:</b>
                      <pre className="history-detail-code">{selectedHistory.code}</pre>
                    </div>
                    <div className="history-detail-actions">
                      <button className="load-btn" onClick={() => handleLoadHistory(selectedHistory)}>Load to Editor</button>
                      <button className="back-btn" onClick={() => setSelectedHistory(null)}>Back to List</button>
                      <button className="share-btn" onClick={() => handleShareHistory(selectedHistory)} title="Share">🔗 Share</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shared Review Modal */}
          {showSharedReview && (
            <div className="history-modal-bg" onClick={() => setShowSharedReview(null)}>
              <div className="history-modal" onClick={e => e.stopPropagation()}>
                <div className="history-modal-header">
                  <h2>Shared Review</h2>
                  <button className="close-btn" onClick={() => setShowSharedReview(null)}>×</button>
                </div>
                <div className="history-detail">
                  <div className="history-detail-header">
                    <div className="history-detail-title">{showSharedReview.code.slice(0, 40).replace(/\n/g, ' ') || 'Untitled'}</div>
                    <div className="history-detail-date">{formatDate(showSharedReview.timestamp)}</div>
                  </div>
                  <div className="history-detail-section">
                    <b>Prompt:</b> <span>{showSharedReview.prompt || <i>None</i>}</span>
                  </div>
                  <div className="history-detail-section">
                    <b>Review:</b>
                    <Markdown rehypePlugins={[ rehypeHighlight ]} components={renderers}>{safeMarkdown(showSharedReview.review)}</Markdown>
                  </div>
                  {showSharedReview.promptResponse && (
                    <div className="history-detail-section">
                      <b>Prompt-based Response:</b>
                      <Markdown rehypePlugins={[ rehypeHighlight ]} components={renderers}>{safeMarkdown(showSharedReview.promptResponse)}</Markdown>
                    </div>
                  )}
                  <div className="history-detail-section">
                    <b>Code:</b>
                    <pre className="history-detail-code">{showSharedReview.code}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SignedIn>
    </>
  )
}

export default App