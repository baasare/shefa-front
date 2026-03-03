'use client';

/**
 * AnimatedTerminal
 * Typewriter-style terminal that loops through AI agent analysis sessions.
 * Each line is printed character-by-character, then the session replays.
 */

import { useEffect, useRef, useState } from 'react';

// ─── Terminal sessions ────────────────────────────────────────────────────────
// Each session is a list of lines. Each line:
//   text  – text to typewrite
//   color – tailwind text color class
//   delay – ms pause BEFORE this line starts printing (for dramatic effect)
//   instant – skip typewriter, print immediately (timestamps etc.)

type TerminalLine = {
    text: string;
    color: string;
    delay?: number;
    instant?: boolean;
};

type Session = TerminalLine[];

const SESSIONS: Session[] = [
    // ── Session 1: BTC/USD momentum analysis ──────────────────────────────────
    [
        { text: '$ shefa analyze --market crypto --pair BTC/USD --strategy momentum', color: 'text-blue-400', delay: 0 },
        { text: '[18:25:22] 🔍 Initializing multi-agent analysis engine...', color: 'text-slate-400', delay: 150, instant: true },
        { text: '[18:25:22] 🤖 Spawning sub-agents: [technical] [sentiment] [onchain]', color: 'text-slate-400', instant: true },
        { text: '[18:25:23] ⏳ Fetching 90-day OHLCV data from Binance...', color: 'text-yellow-400', instant: true },
        { text: '[18:25:23] ✓ 2,160 candles loaded', color: 'text-green-400' },
        { text: '[18:25:24] ⏳ Scanning news headlines & social sentiment (last 24h)...', color: 'text-yellow-400', delay: 200, instant: true },
        { text: '[18:25:24] ✓ Sentiment score: +0.62 (bullish)', color: 'text-green-400' },
        { text: '[18:25:25] ⏳ Processing 1,234,567 on-chain data points...', color: 'text-yellow-400', delay: 200, instant: true },
        { text: '[18:25:25] ✓ Whale inflow detected: +4,200 BTC to exchanges', color: 'text-green-400' },
        { text: '', color: '', delay: 200 },
        { text: '━━━ AGENT CONSENSUS RESULT ━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: 'text-slate-500', instant: true },
        { text: '  Signal     : BUY', color: 'text-cyan-400' },
        { text: '  Confidence : 87.3%  ████████████████░░░░', color: 'text-cyan-400' },
        { text: '  Entry      : $42,150', color: 'text-cyan-400' },
        { text: '  Target     : $45,800  (+8.7%)', color: 'text-green-400' },
        { text: '  Stop Loss  : $40,200  (-4.6%)', color: 'text-red-400' },
        { text: '  R:R Ratio  : 1 : 1.9', color: 'text-cyan-400' },
        { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: 'text-slate-500', instant: true },
        { text: '', color: '', delay: 100 },
        { text: '[18:25:26] ✓ Order queued — awaiting human-in-the-loop approval', color: 'text-green-400' },
        { text: '[18:25:27] 🟢 Approved. Executing market order @ $42,152...', color: 'text-green-400', delay: 600 },
        { text: '[18:25:27] ✓ Position opened. Monitoring...', color: 'text-green-400' },
    ],
    // ── Session 2: ETH/USD risk-off ───────────────────────────────────────────
    [
        { text: '$ shefa analyze --market crypto --pair ETH/USD --strategy mean-reversion', color: 'text-blue-400', delay: 200 },
        { text: '[18:25:42] 🔍 Initializing multi-agent analysis engine...', color: 'text-slate-400', delay: 150, instant: true },
        { text: '[18:25:42] 🤖 Spawning sub-agents: [technical] [sentiment] [onchain]', color: 'text-slate-400', instant: true },
        { text: '[18:25:43] ⏳ Fetching 90-day OHLCV data from Coinbase...', color: 'text-yellow-400', instant: true },
        { text: '[18:25:43] ✓ 2,160 candles loaded', color: 'text-green-400' },
        { text: '[18:25:44] ⚠ RSI overbought at 74.2 — bearish divergence detected', color: 'text-yellow-400', delay: 200 },
        { text: '[18:25:44] ⚠ Fear & Greed Index: 81 (Extreme Greed) — risk elevated', color: 'text-yellow-400' },
        { text: '[18:25:45] ⏳ Checking max drawdown guard...', color: 'text-slate-400', instant: true },
        { text: '[18:25:45] ✓ Portfolio risk within limits (12.4% / 20% cap)', color: 'text-green-400' },
        { text: '', color: '', delay: 100 },
        { text: '━━━ AGENT CONSENSUS RESULT ━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: 'text-slate-500', instant: true },
        { text: '  Signal     : SHORT / HEDGE', color: 'text-orange-400' },
        { text: '  Confidence : 71.8%  ██████████████░░░░░░', color: 'text-orange-400' },
        { text: '  Entry      : $2,340', color: 'text-cyan-400' },
        { text: '  Target     : $2,180  (-6.8%)', color: 'text-green-400' },
        { text: '  Stop Loss  : $2,410  (+3.0%)', color: 'text-red-400' },
        { text: '  R:R Ratio  : 1 : 2.3', color: 'text-cyan-400' },
        { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: 'text-slate-500', instant: true },
        { text: '', color: '', delay: 100 },
        { text: '[18:25:46] ✓ Order queued — awaiting human-in-the-loop approval', color: 'text-green-400' },
        { text: '[18:25:48] 🟢 Approved. Executing limit short @ $2,342...', color: 'text-green-400', delay: 600 },
        { text: '[18:25:48] ✓ Position opened. Monitoring...', color: 'text-green-400' },
    ],
];

const CHAR_DELAY_MS = 22;     // ms per character typed
const LINE_END_PAUSE_MS = 80; // pause after each line finishes
const SESSION_END_PAUSE_MS = 2400; // pause between sessions (hold the result)

// ─── Component ────────────────────────────────────────────────────────────────

export function AnimatedTerminal() {
    // visibleLines = fully printed lines shown above the current one
    const [visibleLines, setVisibleLines] = useState<{ text: string; color: string }[]>([]);
    // currentLine = the line currently being typewritten (partial text)
    const [currentText, setCurrentText] = useState('');
    const [currentColor, setCurrentColor] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    const sessionIdx = useRef(0);
    const lineIdx = useRef(0);
    const charIdx = useRef(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    // Blink the cursor independently
    useEffect(() => {
        const id = setInterval(() => setShowCursor((v) => !v), 530);
        return () => clearInterval(id);
    }, []);

    // Auto-scroll to bottom whenever lines change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleLines, currentText]);

    useEffect(() => {
        let cancelled = false;

        function schedule(fn: () => void, ms: number) {
            timeoutRef.current = setTimeout(() => {
                if (!cancelled) fn();
            }, ms);
        }

        function typeNextChar() {
            const session = SESSIONS[sessionIdx.current];
            const line = session[lineIdx.current];

            if (line.instant || line.text === '') {
                // Print whole line immediately
                finishLine(line);
                return;
            }

            const text = line.text;
            const idx = charIdx.current;

            if (idx < text.length) {
                setCurrentColor(line.color);
                setCurrentText(text.slice(0, idx + 1));
                charIdx.current += 1;
                schedule(typeNextChar, CHAR_DELAY_MS);
            } else {
                finishLine(line);
            }
        }

        function finishLine(line: TerminalLine) {
            setVisibleLines((prev) => [...prev, { text: line.text, color: line.color }]);
            setCurrentText('');
            setCurrentColor('');
            charIdx.current = 0;

            const session = SESSIONS[sessionIdx.current];
            lineIdx.current += 1;

            if (lineIdx.current >= session.length) {
                // Session done — pause then restart with next session, clearing screen
                schedule(() => {
                    if (cancelled) return;
                    sessionIdx.current = (sessionIdx.current + 1) % SESSIONS.length;
                    lineIdx.current = 0;
                    charIdx.current = 0;
                    setVisibleLines([]);
                    setCurrentText('');
                    advanceLine();
                }, SESSION_END_PAUSE_MS);
            } else {
                const nextLine = session[lineIdx.current];
                schedule(advanceLine, LINE_END_PAUSE_MS + (nextLine.delay ?? 0));
            }
        }

        function advanceLine() {
            const session = SESSIONS[sessionIdx.current];
            const line = session[lineIdx.current];
            if (!line) return;
            charIdx.current = 0;
            setCurrentColor(line.color);
            setCurrentText('');
            typeNextChar();
        }

        // Kick off
        advanceLine();

        return () => {
            cancelled = true;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-white/10">
            {/* macOS-style title bar */}
            <div className="bg-slate-100 dark:bg-slate-700 px-6 py-3 border-b border-slate-200 dark:border-slate-600">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
                    </div>
                    <span className="ml-4 text-xs font-mono text-slate-500 dark:text-slate-400 flex-1 text-center">
                        shefa-ai-terminal — zsh
                    </span>
                    {/* Live indicator */}
                    <div className="flex items-center gap-1.5 text-xs text-green-500 dark:text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        LIVE
                    </div>
                </div>
            </div>

            {/* Terminal body */}
            <div
                ref={scrollRef}
                className="bg-slate-900 dark:bg-slate-950 p-6 font-mono text-sm overflow-y-auto"
                style={{ height: '22rem' }}
                aria-live="polite"
                aria-label="Live AI agent terminal output"
            >
                <div className="space-y-0.5">
                    {/* Completed lines */}
                    {visibleLines.map((line, i) => (
                        <div key={i} className={`leading-6 whitespace-pre-wrap ${line.color || 'text-transparent select-none'}`}>
                            {line.text || '\u00A0'}
                        </div>
                    ))}

                    {/* Currently typing line + cursor */}
                    {(currentText !== '' || currentColor) && (
                        <div className={`leading-6 whitespace-pre-wrap ${currentColor}`}>
                            {currentText}
                            <span
                                className={`inline-block w-[2px] h-[1em] bg-current align-middle ml-[1px] transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>
                    )}

                    {/* Idle cursor (when between lines) */}
                    {currentText === '' && !currentColor && (
                        <div className="leading-6 text-slate-400">
                            <span
                                className={`inline-block w-[2px] h-[1em] bg-slate-400 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
