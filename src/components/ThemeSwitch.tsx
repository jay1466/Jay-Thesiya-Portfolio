import React from 'react';
import { useTheme } from '../hooks/useTheme';

/** Light/dark switch: a small track + knob with a mono label. */
export const ThemeSwitch: React.FC = () => {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      className="group inline-flex items-center gap-2.5 cursor-pointer label !text-[var(--ink)]"
    >
      <span className="hidden sm:inline w-9 text-right">{dark ? 'Dark' : 'Light'}</span>
      <span className="relative h-[18px] w-[34px] border border-[var(--ink)] transition-colors">
        <span
          className={`absolute top-[2px] h-3 w-3 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
            dark ? 'left-[18px] bg-[var(--accent)]' : 'left-[2px] bg-[var(--ink)]'
          }`}
        />
      </span>
    </button>
  );
};
