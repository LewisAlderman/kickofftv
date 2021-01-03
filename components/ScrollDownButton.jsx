import React from 'react';
import SVG from './SVG';

const ScrollDownButton = ({ visible }) => {
  if (!visible) return null;

  return (
    <button
      style={{ flexBasis: 300 }}
      className="flex items-center flex-1 w-full px-12 py-3 mx-auto font-mono rounded bg-emerald-400 text-emerald-900 w-96 whitespace-nowrap hover:bg-emerald-300 md:border-2 md:border-emerald-300 md:bg-transparent"
      onClick={() =>
        visible?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }>
      <span className="relative mx-auto">
        Scroll To Latest{' '}
        <span className="text-white md:text-emerald-400">
          <SVG.ArrowDown
            className="absolute fill-current top-1 -right-9 bg-none"
            width="1em"
            height="1em"
          />
        </span>
      </span>
    </button>
  );
};

export default ScrollDownButton;
