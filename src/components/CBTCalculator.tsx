import React, { useState } from 'react';
import { X, Delete, RotateCcw } from 'lucide-react';

interface CBTCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CBTCalculator: React.FC<CBTCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  const [hasMemory, setHasMemory] = useState(false);
  const [isNewNumber, setIsNewNumber] = useState(true);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (isNewNumber || display === '0') {
      setDisplay(digit);
      setIsNewNumber(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDot = () => {
    if (isNewNumber) {
      setDisplay('0.');
      setIsNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setIsNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const handleOperator = (op: string) => {
    setDisplay((prev) => `${prev} ${op} `);
    setIsNewNumber(false);
  };

  const handleEquals = () => {
    try {
      // Safe evaluation of standard arithmetic expression
      const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${sanitized})`)();
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        setDisplay(String(Number(result.toFixed(8))));
        setIsNewNumber(true);
      } else {
        setDisplay('Error');
        setIsNewNumber(true);
      }
    } catch {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const handleSquareRoot = () => {
    try {
      const val = parseFloat(display);
      if (val >= 0) {
        setDisplay(String(Number(Math.sqrt(val).toFixed(8))));
        setIsNewNumber(true);
      } else {
        setDisplay('Invalid');
      }
    } catch {
      setDisplay('Error');
    }
  };

  const handleSquare = () => {
    try {
      const val = parseFloat(display);
      setDisplay(String(Number((val * val).toFixed(8))));
      setIsNewNumber(true);
    } catch {
      setDisplay('Error');
    }
  };

  const handleReciprocal = () => {
    try {
      const val = parseFloat(display);
      if (val !== 0) {
        setDisplay(String(Number((1 / val).toFixed(8))));
        setIsNewNumber(true);
      } else {
        setDisplay('Cannot divide by 0');
      }
    } catch {
      setDisplay('Error');
    }
  };

  // Memory functions
  const handleMemoryStore = () => {
    const val = parseFloat(display) || 0;
    setMemory(val);
    setHasMemory(true);
  };

  const handleMemoryRecall = () => {
    if (hasMemory) {
      setDisplay(String(memory));
      setIsNewNumber(true);
    }
  };

  const handleMemoryClear = () => {
    setMemory(0);
    setHasMemory(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-xs sm:max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm tracking-wide">OAU CBT Scientific Calculator</span>
            {hasMemory && (
              <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-md font-mono font-bold">
                M: {memory}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display Screen */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="text-right text-xs text-slate-400 dark:text-slate-500 font-mono h-4 overflow-hidden">
            {display.length > 20 ? '...' + display.slice(-20) : ''}
          </div>
          <div className="text-right text-2xl sm:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 truncate tracking-tight">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="p-4 grid grid-cols-4 gap-2 text-sm font-semibold bg-white dark:bg-slate-900">
          
          {/* Row 1: Memory & Specials */}
          <button
            onClick={handleMemoryClear}
            className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
          >
            MC
          </button>
          <button
            onClick={handleMemoryRecall}
            className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
          >
            MR
          </button>
          <button
            onClick={handleMemoryStore}
            className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
          >
            MS
          </button>
          <button
            onClick={handleClear}
            className="py-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-bold"
          >
            C
          </button>

          {/* Row 2: Scientific Tools */}
          <button
            onClick={handleSquareRoot}
            className="py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300"
          >
            √x
          </button>
          <button
            onClick={handleSquare}
            className="py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300"
          >
            x²
          </button>
          <button
            onClick={handleReciprocal}
            className="py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs"
          >
            1/x
          </button>
          <button
            onClick={() => handleOperator('÷')}
            className="py-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-lg"
          >
            ÷
          </button>

          {/* Row 3: 7 8 9 × */}
          <button
            onClick={() => handleDigit('7')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            7
          </button>
          <button
            onClick={() => handleDigit('8')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            8
          </button>
          <button
            onClick={() => handleDigit('9')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            9
          </button>
          <button
            onClick={() => handleOperator('×')}
            className="py-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-lg"
          >
            ×
          </button>

          {/* Row 4: 4 5 6 - */}
          <button
            onClick={() => handleDigit('4')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            4
          </button>
          <button
            onClick={() => handleDigit('5')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            5
          </button>
          <button
            onClick={() => handleDigit('6')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            6
          </button>
          <button
            onClick={() => handleOperator('-')}
            className="py-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-lg"
          >
            -
          </button>

          {/* Row 5: 1 2 3 + */}
          <button
            onClick={() => handleDigit('1')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            1
          </button>
          <button
            onClick={() => handleDigit('2')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            2
          </button>
          <button
            onClick={() => handleDigit('3')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            3
          </button>
          <button
            onClick={() => handleOperator('+')}
            className="py-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-lg"
          >
            +
          </button>

          {/* Row 6: 0 . ⌫ = */}
          <button
            onClick={() => handleDigit('0')}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            0
          </button>
          <button
            onClick={handleDot}
            className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-base"
          >
            .
          </button>
          <button
            onClick={handleBackspace}
            className="flex items-center justify-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={handleEquals}
            className="py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md shadow-purple-500/25 text-lg"
          >
            =
          </button>
        </div>

      </div>
    </div>
  );
};
