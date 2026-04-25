export default function WindowView() {
  return (
    <svg
      className="window-view"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skygrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="sky-stop-top" />
          <stop offset="1" className="sky-stop-bottom" />
        </linearGradient>
      </defs>
      <rect className="sky" width="800" height="500" fill="url(#skygrad)" />

      <g className="stars">
        <circle cx="80" cy="60" r="1" />
        <circle cx="170" cy="40" r="1.3" />
        <circle cx="280" cy="90" r="0.9" />
        <circle cx="400" cy="50" r="1.4" />
        <circle cx="520" cy="80" r="1" />
        <circle cx="620" cy="40" r="1.2" />
        <circle cx="720" cy="100" r="1" />
        <circle cx="120" cy="140" r="0.8" />
        <circle cx="350" cy="160" r="0.8" />
        <circle cx="600" cy="170" r="1.1" />
        <circle cx="240" cy="200" r="0.7" />
        <circle cx="460" cy="120" r="0.9" />
      </g>

      <circle className="sun-glow" />
      <circle className="sun" />

      <g className="clouds">
        <ellipse cx="180" cy="120" rx="46" ry="11" />
        <ellipse cx="500" cy="80" rx="58" ry="13" />
        <ellipse cx="700" cy="150" rx="38" ry="10" />
      </g>

      <path
        className="hill-far"
        d="M0,290 Q100,240 220,265 T460,250 T700,275 T800,260 L800,500 L0,500 Z"
      />

      <path
        className="hill-mid"
        d="M0,340 Q140,300 320,325 T580,310 T800,335 L800,500 L0,500 Z"
      />

      <g className="trees">
        <ellipse cx="120" cy="320" rx="14" ry="20" />
        <ellipse cx="155" cy="328" rx="11" ry="15" />
        <ellipse cx="640" cy="320" rx="16" ry="22" />
        <ellipse cx="678" cy="328" rx="12" ry="18" />
        <ellipse cx="245" cy="335" rx="9" ry="13" />
      </g>

      <path
        className="grass"
        d="M0,400 Q200,380 400,395 T800,400 L800,500 L0,500 Z"
      />

      <g className="cottage">
        <rect className="cottage-body" x="430" y="358" width="58" height="38" />
        <polygon className="cottage-roof" points="422,358 459,326 496,358" />
        <rect className="cottage-window" x="440" y="368" width="11" height="11" />
        <rect className="cottage-window" x="466" y="368" width="11" height="11" />
        <rect className="cottage-door" x="476" y="382" width="9" height="14" />
        <rect className="chimney" x="478" y="332" width="7" height="14" />
        <g className="smoke">
          <circle cx="481" cy="324" r="3" />
          <circle cx="479" cy="316" r="3.5" />
          <circle cx="483" cy="308" r="4" />
        </g>
      </g>

      <g className="fg-tree">
        <rect x="118" y="370" width="8" height="44" />
        <ellipse cx="122" cy="358" rx="26" ry="32" />
      </g>

      <g className="birds">
        <path d="M280,140 q6,-6 12,0 q6,-6 12,0" />
        <path d="M340,160 q5,-5 10,0 q5,-5 10,0" />
      </g>

      <g className="fireflies">
        <circle cx="200" cy="430" r="1.6" />
        <circle cx="320" cy="410" r="1.4" />
        <circle cx="560" cy="420" r="1.6" />
        <circle cx="660" cy="440" r="1.3" />
      </g>
    </svg>
  );
}
