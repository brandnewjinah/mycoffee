import React from "react";

export const ArrowLeft = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
};

export const ArrowRight = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
};

export const Blob = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M142.9 44.6c10.4 13.1 15.1 28.7 21.4 46.7 6.3 18 14.2 38.3 8.3 52.7-5.8 14.4-25.5 23-44.8 28.2-19.3 5.2-38.3 7-55.1 1.5-16.7-5.6-31.2-18.6-40.5-34.6S18.8 104 23.8 88.5c5.1-15.4 19.4-27.3 33.6-39.7C71.6 36.4 85.8 23.5 101 22.3c15.2-1.2 31.4 9.2 41.9 22.3z"
      />
    </svg>
  );
};

export const Blob2 = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M157.2 51.6c13.4 19.5 18.1 43.1 12.2 62.2-6 19.1-22.7 33.7-40.3 39.3-17.5 5.7-35.9 2.3-57.1-4.3-21.2-6.7-45.2-16.6-52.1-34.1-6.8-17.5 3.5-42.5 19.8-62.7 16.2-20.2 38.2-35.5 60.2-35.5 22 .1 44 15.6 57.3 35.1z"
      />
    </svg>
  );
};

export const Check = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

export const Checkmark = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

export const ChevronDown = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export const ChevronRight = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export const Close = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

export const Coffee = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
  );
};

export const Eye = ({ width, height, stroke, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
};

export const EyeOff = ({ width, height, stroke, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
    </svg>
  );
};

export const Heart = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
};

export const Image = ({ width, height, stroke, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
      <circle cx={8.5} cy={8.5} r={1.5} />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
};

export const Logo = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.224 14.256c-1.067 0-2.037-.25-2.912-.752a5.759 5.759 0 01-2.064-2.08 5.839 5.839 0 01-.752-2.928c0-1.088.245-2.07.736-2.944a5.314 5.314 0 012.016-2.048c.853-.501 1.813-.752 2.88-.752.576 0 1.141.07 1.696.208a4.69 4.69 0 011.424.592l-.432 2.48c-.768-.288-1.461-.432-2.08-.432-.853 0-1.51.25-1.968.752-.459.49-.688 1.2-.688 2.128 0 .907.24 1.616.72 2.128.49.501 1.168.752 2.032.752.33 0 .64-.032.928-.096.288-.064.64-.181 1.056-.352l.448 2.528a5.904 5.904 0 01-3.04.816zm9.613 0c-1.152 0-2.176-.245-3.072-.736a5.366 5.366 0 01-2.08-2.032c-.49-.875-.736-1.867-.736-2.976 0-1.12.245-2.117.736-2.992a5.222 5.222 0 012.08-2.032c.896-.49 1.92-.736 3.072-.736 1.152 0 2.17.245 3.056.736a5.09 5.09 0 012.08 2.032c.502.864.752 1.861.752 2.992 0 1.11-.25 2.101-.752 2.976a5.224 5.224 0 01-2.08 2.032c-.896.49-1.915.736-3.056.736zm0-2.912a2.03 2.03 0 001.648-.784c.438-.523.656-1.21.656-2.064 0-.565-.101-1.067-.304-1.504-.192-.448-.464-.795-.816-1.04a1.989 1.989 0 00-1.2-.384c-.437 0-.832.128-1.184.384-.352.245-.624.592-.816 1.04-.192.437-.288.939-.288 1.504 0 .853.213 1.541.64 2.064.427.523.982.784 1.664.784zm7.422-8.352h7.584v2.432h-4.144v2.224h3.84v2.016h-3.84V14h-3.44V2.992zM1.17 15.616h8.532v2.736H5.04v2.502h4.32v2.268H5.04V28H1.17V15.616zm10.266 0h8.694v2.736h-4.32v2.25h3.942v2.268H15.81v2.394h4.32V28h-8.694V15.616zm10.705 0h8.694v2.736h-4.32v2.25h3.942v2.268h-3.942v2.394h4.32V28H22.14V15.616z"
        fill={color}
      />
    </svg>
  );
};

export const Minus = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export const Plus = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
};

export const Question = ({ width, height, stroke, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
  );
};

export const SearchIcon = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
};

export const Store = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
};

//width="20" height="20" color="#000" stroke="2"
