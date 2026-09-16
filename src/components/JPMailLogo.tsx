function JPMailLogo() {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer select-none">
      {/* 4-Color Gmail-style Ribbon Envelope */}
      <svg
        width="36"
        height="28"
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Top Fold Blue */}
        <path
          d="M3 6C3 4.34315 4.34315 3 6 3H30C31.6569 3 33 4.34315 33 6V9L18 19L3 9V6Z"
          fill="#4285F4"
        />
        {/* Left Fold Red */}
        <path
          d="M3 6V22C3 23.6569 4.34315 25 6 25H11V12.5L3 6Z"
          fill="#EA4335"
        />
        {/* Right Fold Green */}
        <path
          d="M33 6V22C33 23.6569 31.6569 25 30 25H25V12.5L33 6Z"
          fill="#34A853"
        />
        {/* Bottom Center Yellow */}
        <path
          d="M11 25H25V16L18 21L11 16V25Z"
          fill="#FBBC04"
        />
      </svg>
      <span className="text-xl font-medium tracking-tight text-[#444746] font-sans">
        <span className="font-bold text-[#0B57D0]">JP</span>mail
      </span>
    </div>
  );
}