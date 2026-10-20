import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  maxWidth?: string;
}

/** Accessible modal: Escape closes, page scroll is locked, focus moves into the dialog. */
export const Modal: React.FC<ModalProps> = ({ open, onClose, labelledBy, children, maxWidth = 'max-w-3xl' }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const lenis = (window as any).__lenis;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lenis?.start();
      previouslyFocused?.focus();
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-[var(--ink)]/50 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            data-lenis-prevent
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${maxWidth} max-h-[92vh] overflow-y-auto overscroll-contain bg-[var(--paper)] text-[var(--ink)] shadow-2xl outline-none`}
          >
            <button
              onClick={onClose}
              className="sticky top-0 ml-auto -mb-12 z-10 flex w-fit h-12 px-5 items-center label !text-[var(--paper)] bg-[var(--ink)] hover:bg-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              Close ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
