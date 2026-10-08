import os

os.makedirs('public/assets/projects', exist_ok=True)

# 1. WFC Tool SVG
wfc_svg = '''<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="#0C1017"/>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E2838" stroke-width="1"/>
    </pattern>
    <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5005F"/>
      <stop offset="100%" stop-color="#8758FF"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#grid)" opacity="0.6"/>
  
  <!-- System HUD Header -->
  <rect x="40" y="30" width="720" height="34" rx="4" fill="#141B26" stroke="#253245" stroke-width="1"/>
  <text x="60" y="52" fill="#F5005F" font-family="monospace" font-size="12" font-weight="bold">MODULE::WFC_SOLVER</text>
  <text x="230" y="52" fill="#94A3B8" font-family="monospace" font-size="12">STATUS: PROPAGATING</text>
  <text x="430" y="52" fill="#00E5FF" font-family="monospace" font-size="12">ENTROPY: 0.142 (MIN)</text>
  <text x="630" y="52" fill="#94A3B8" font-family="monospace" font-size="12">ITER: #1024</text>

  <!-- Algorithm Grid Matrix -->
  <g transform="translate(160, 95)">
    <!-- Resolved Cells -->
    <rect x="0" y="0" width="90" height="90" rx="6" fill="#141B26" stroke="#F5005F" stroke-width="2"/>
    <path d="M 45 0 L 45 90 M 0 45 L 90 45" stroke="#F5005F" stroke-width="3" stroke-linecap="round"/>
    <circle cx="45" cy="45" r="8" fill="#F5005F"/>
    <text x="12" y="80" fill="#94A3B8" font-family="monospace" font-size="10">E: 0.0</text>

    <rect x="100" y="0" width="90" height="90" rx="6" fill="#141B26" stroke="#324259" stroke-width="1"/>
    <path d="M 0 45 L 90 45" stroke="#8758FF" stroke-width="3" stroke-linecap="round"/>
    <text x="112" y="80" fill="#94A3B8" font-family="monospace" font-size="10">E: 0.0</text>

    <rect x="200" y="0" width="90" height="90" rx="6" fill="#141B26" stroke="#324259" stroke-width="1"/>
    <path d="M 45 45 L 45 90 M 45 45 L 90 45" stroke="#8758FF" stroke-width="3" stroke-linecap="round"/>
    <text x="212" y="80" fill="#94A3B8" font-family="monospace" font-size="10">E: 0.0</text>

    <rect x="300" y="0" width="90" height="90" rx="6" fill="#141B26" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="4 2"/>
    <circle cx="345" cy="45" r="20" fill="none" stroke="#00E5FF" stroke-width="1.5"/>
    <text x="325" y="49" fill="#00E5FF" font-family="monospace" font-size="12">?</text>
    <text x="312" y="80" fill="#00E5FF" font-family="monospace" font-size="10">E: 2.1</text>

    <rect x="390" y="0" width="90" height="90" rx="6" fill="#10151E" stroke="#222C3A" stroke-width="1"/>
    <text x="415" y="49" fill="#4B5E78" font-family="monospace" font-size="12">[4]</text>

    <!-- Row 2 -->
    <rect x="0" y="100" width="90" height="90" rx="6" fill="#141B26" stroke="#324259" stroke-width="1"/>
    <path d="M 45 0 L 45 90" stroke="#F5005F" stroke-width="3" stroke-linecap="round"/>
    <text x="12" y="180" fill="#94A3B8" font-family="monospace" font-size="10">E: 0.0</text>

    <!-- Active Collapse Cell (Glowing) -->
    <rect x="100" y="100" width="90" height="90" rx="6" fill="#1A1528" stroke="#F5005F" stroke-width="2.5"/>
    <rect x="104" y="104" width="82" height="82" rx="4" fill="none" stroke="#F5005F" stroke-width="1" opacity="0.4"/>
    <circle cx="145" cy="145" r="14" fill="#F5005F" opacity="0.2"/>
    <path d="M 145 125 L 145 165 M 125 145 L 165 145" stroke="#F5005F" stroke-width="2"/>
    <text x="112" y="180" fill="#F5005F" font-family="monospace" font-size="10">OBSERVE</text>

    <rect x="200" y="100" width="90" height="90" rx="6" fill="#10151E" stroke="#00E5FF" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="225" y="149" fill="#00E5FF" font-family="monospace" font-size="12">?</text>
    <text x="212" y="180" fill="#00E5FF" font-family="monospace" font-size="10">E: 1.4</text>

    <rect x="300" y="100" width="90" height="90" rx="6" fill="#10151E" stroke="#222C3A" stroke-width="1"/>
    <text x="325" y="149" fill="#4B5E78" font-family="monospace" font-size="12">[6]</text>

    <rect x="390" y="100" width="90" height="90" rx="6" fill="#10151E" stroke="#222C3A" stroke-width="1"/>
    <text x="415" y="149" fill="#4B5E78" font-family="monospace" font-size="12">[8]</text>

    <!-- Row 3 -->
    <rect x="0" y="200" width="90" height="90" rx="6" fill="#141B26" stroke="#324259" stroke-width="1"/>
    <path d="M 45 0 L 45 45 M 45 45 L 90 45" stroke="#F5005F" stroke-width="3" stroke-linecap="round"/>

    <rect x="100" y="200" width="90" height="90" rx="6" fill="#10151E" stroke="#00E5FF" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="125" y="249" fill="#00E5FF" font-family="monospace" font-size="12">?</text>

    <rect x="200" y="200" width="90" height="90" rx="6" fill="#10151E" stroke="#222C3A" stroke-width="1"/>
    <text x="225" y="249" fill="#4B5E78" font-family="monospace" font-size="12">[4]</text>

    <rect x="300" y="200" width="90" height="90" rx="6" fill="#10151E" stroke="#222C3A" stroke-width="1"/>
    <text x="325" y="249" fill="#4B5E78" font-family="monospace" font-size="12">[8]</text>

    <rect x="390" y="200" width="90" height="90" rx="6" fill="#10151E" stroke="#222C3A" stroke-width="1"/>
    <text x="415" y="249" fill="#4B5E78" font-family="monospace" font-size="12">[8]</text>
  </g>

  <!-- Coordinate marks -->
  <line x1="140" y1="90" x2="140" y2="390" stroke="#F5005F" stroke-width="1" opacity="0.3"/>
  <line x1="155" y1="95" x2="655" y2="95" stroke="#F5005F" stroke-width="1" opacity="0.3"/>
  <text x="50" y="415" fill="#64748B" font-family="monospace" font-size="11">WFC_RESEARCH // ADJACENCY_PROPAGATOR // UJI & BACKTOBITS</text>
  <text x="650" y="415" fill="#F5005F" font-family="monospace" font-size="11">ALGORITHM v2.4</text>
</svg>'''

# 2. Procedural Spline Tool SVG
spline_svg = '''<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="#0C1017"/>
  <defs>
    <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E2838" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#grid2)" opacity="0.6"/>

  <!-- System HUD Header -->
  <rect x="40" y="30" width="720" height="34" rx="4" fill="#141B26" stroke="#253245" stroke-width="1"/>
  <text x="60" y="52" fill="#F5005F" font-family="monospace" font-size="12" font-weight="bold">TOOL::PROCEDURAL_SPLINE</text>
  <text x="260" y="52" fill="#94A3B8" font-family="monospace" font-size="12">MODE: HERMITE CURVE</text>
  <text x="450" y="52" fill="#00E5FF" font-family="monospace" font-size="12">VERTICES: 1,842</text>
  <text x="620" y="52" fill="#94A3B8" font-family="monospace" font-size="12">SUBDIV: 32</text>

  <!-- 3D Spline Path & Cross Sections -->
  <g transform="translate(60, 80)">
    <!-- Extruded mesh ribs (cross sections) -->
    <path d="M 60 260 L 60 200 M 130 180 L 140 120 M 240 140 L 260 80 M 380 180 L 400 120 M 520 250 L 530 190 M 640 210 L 650 150" stroke="#324259" stroke-width="1.5"/>
    <path d="M 60 200 C 130 120, 240 80, 380 120 C 480 150, 560 170, 650 150" fill="none" stroke="#8758FF" stroke-width="2" opacity="0.7"/>
    <path d="M 60 260 C 130 180, 240 140, 380 180 C 480 210, 560 230, 650 210" fill="none" stroke="#8758FF" stroke-width="2" opacity="0.7"/>
    
    <!-- Extrusion Wireframe Fill -->
    <path d="M 60 200 C 130 120, 240 80, 380 120 C 480 150, 560 170, 650 150 L 650 210 C 560 230, 480 210, 380 180 C 240 140, 130 180, 60 260 Z" fill="#F5005F" fill-opacity="0.08"/>

    <!-- Central Spline Curve (Bold Highlight) -->
    <path d="M 60 230 C 130 150, 240 110, 380 150 C 480 180, 560 200, 650 180" fill="none" stroke="#F5005F" stroke-width="4" stroke-linecap="round"/>

    <!-- Tangent and Normal Gizmos -->
    <!-- Point 1 -->
    <circle cx="60" cy="230" r="6" fill="#F5005F"/>
    <line x1="60" y1="230" x2="100" y2="190" stroke="#00E5FF" stroke-width="2"/>
    <circle cx="100" cy="190" r="4" fill="#00E5FF"/>

    <!-- Point 2 (Active Selected Gizmo) -->
    <circle cx="280" cy="120" r="7" fill="#F5005F" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="210" y1="140" x2="350" y2="100" stroke="#00E5FF" stroke-width="2" stroke-dasharray="3 3"/>
    <circle cx="210" cy="140" r="4.5" fill="#00E5FF"/>
    <circle cx="350" cy="100" r="4.5" fill="#00E5FF"/>
    <!-- 3D Transform Rings -->
    <circle cx="280" cy="120" r="28" fill="none" stroke="#F5005F" stroke-width="1.5" opacity="0.5"/>
    <ellipse cx="280" cy="120" rx="34" ry="14" fill="none" stroke="#00E5FF" stroke-width="1.5" opacity="0.8"/>

    <!-- Point 3 -->
    <circle cx="500" cy="188" r="6" fill="#F5005F"/>
    <line x1="450" y1="175" x2="550" y2="200" stroke="#00E5FF" stroke-width="2"/>
    <circle cx="450" cy="175" r="4" fill="#00E5FF"/>
    <circle cx="550" cy="200" r="4" fill="#00E5FF"/>

    <!-- Point 4 -->
    <circle cx="650" cy="180" r="6" fill="#F5005F"/>
  </g>

  <!-- Bottom Details -->
  <text x="50" y="415" fill="#64748B" font-family="monospace" font-size="11">CURVE_EVALUATOR // MESH_EXTRUSION // COLLISION_BAKER</text>
  <text x="630" y="415" fill="#00E5FF" font-family="monospace" font-size="11">TANGENT_FRAME: AUTO</text>
</svg>'''

# 3. K-Boom Level Editor SVG
editor_svg = '''<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="#0C1017"/>
  <defs>
    <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E2838" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#grid3)" opacity="0.6"/>

  <!-- Window Header -->
  <rect x="40" y="30" width="720" height="34" rx="4" fill="#141B26" stroke="#253245" stroke-width="1"/>
  <text x="60" y="52" fill="#F5005F" font-family="monospace" font-size="12" font-weight="bold">K-BOOM! LEVEL EDITOR</text>
  <text x="250" y="52" fill="#94A3B8" font-family="monospace" font-size="12">MAP: [LEVEL_CHAMBER_09]</text>
  <text x="470" y="52" fill="#00E5FF" font-family="monospace" font-size="12">UNDO STACK: 18</text>
  <text x="630" y="52" fill="#94A3B8" font-family="monospace" font-size="12">TEST MODE: [F5]</text>

  <!-- Left Sidebar Palette -->
  <rect x="40" y="80" width="160" height="300" rx="4" fill="#121822" stroke="#1E2838" stroke-width="1"/>
  <text x="55" y="105" fill="#F5005F" font-family="monospace" font-size="11" font-weight="bold">TILE PALETTE</text>
  
  <!-- Palette Items -->
  <rect x="55" y="120" width="60" height="50" rx="4" fill="#192230" stroke="#F5005F" stroke-width="2"/>
  <circle cx="85" cy="145" r="12" fill="#F5005F"/>
  <text x="75" y="149" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="11">💣</text>

  <rect x="125" y="120" width="60" height="50" rx="4" fill="#192230" stroke="#253245" stroke-width="1"/>
  <rect x="140" y="135" width="30" height="20" rx="2" fill="#00E5FF" opacity="0.8"/>

  <rect x="55" y="180" width="60" height="50" rx="4" fill="#192230" stroke="#253245" stroke-width="1"/>
  <circle cx="85" cy="205" r="10" fill="#8758FF"/>

  <rect x="125" y="180" width="60" height="50" rx="4" fill="#192230" stroke="#253245" stroke-width="1"/>
  <path d="M 140 215 L 155 195 L 170 215 Z" fill="#F59E0B"/>

  <rect x="55" y="240" width="130" height="28" rx="4" fill="#192230" stroke="#253245" stroke-width="1"/>
  <text x="65" y="258" fill="#94A3B8" font-family="monospace" font-size="10">VALIDATE PUZZLE</text>

  <rect x="55" y="278" width="130" height="28" rx="4" fill="#192230" stroke="#253245" stroke-width="1"/>
  <text x="65" y="296" fill="#94A3B8" font-family="monospace" font-size="10">EXPORT JSON</text>

  <!-- Level Grid Canvas -->
  <g transform="translate(220, 80)">
    <rect x="0" y="0" width="540" height="300" rx="4" fill="#0E141D" stroke="#1E2838" stroke-width="1"/>
    
    <!-- 8x5 Tile Grid -->
    <g stroke="#1A2433" stroke-width="1">
      <line x1="67" y1="0" x2="67" y2="300"/>
      <line x1="134" y1="0" x2="134" y2="300"/>
      <line x1="201" y1="0" x2="201" y2="300"/>
      <line x1="268" y1="0" x2="268" y2="300"/>
      <line x1="335" y1="0" x2="335" y2="300"/>
      <line x1="402" y1="0" x2="402" y2="300"/>
      <line x1="469" y1="0" x2="469" y2="300"/>

      <line x1="0" y1="60" x2="540" y2="60"/>
      <line x1="0" y1="120" x2="540" y2="120"/>
      <line x1="0" y1="180" x2="540" y2="180"/>
      <line x1="0" y1="240" x2="540" y2="240"/>
    </g>

    <!-- Placed Elements on Grid -->
    <!-- Chameleon Spawn -->
    <circle cx="33" cy="30" r="18" fill="#00E5FF" opacity="0.3"/>
    <circle cx="33" cy="30" r="12" fill="#00E5FF"/>
    <text x="24" y="34" fill="#0B0F14" font-family="sans-serif" font-weight="bold" font-size="10">PLY</text>

    <!-- Bombs Placed -->
    <circle cx="167" cy="90" r="14" fill="#F5005F"/>
    <circle cx="234" cy="90" r="14" fill="#F5005F"/>
    <circle cx="301" cy="90" r="14" fill="#F5005F"/>
    <!-- Chain Reaction Wire (Red glowing line) -->
    <path d="M 167 90 L 234 90 L 301 90 L 301 150" stroke="#F5005F" stroke-width="2" stroke-dasharray="4 2"/>

    <!-- Bomb 4 -->
    <circle cx="301" cy="150" r="14" fill="#F5005F"/>
    <!-- Blast Radius Preview Indicator -->
    <circle cx="301" cy="150" r="45" fill="none" stroke="#F5005F" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.8"/>

    <!-- Exit Portal -->
    <rect x="420" y="200" width="36" height="36" rx="4" fill="#8758FF" opacity="0.4" stroke="#8758FF" stroke-width="2"/>
    <circle cx="438" cy="218" r="10" fill="#8758FF"/>

    <!-- Cursor Placement Gizmo -->
    <rect x="201" y="120" width="67" height="60" fill="none" stroke="#F5005F" stroke-width="2"/>
    <circle cx="234" cy="150" r="4" fill="#F5005F"/>
  </g>

  <!-- Bottom Details -->
  <text x="50" y="415" fill="#64748B" font-family="monospace" font-size="11">COMMAND_PATTERN // LEVEL_SERIALIZATION // DESIGNER_WORKFLOW</text>
  <text x="640" y="415" fill="#F5005F" font-family="monospace" font-size="11">BACKTOBITS IN-HOUSE</text>
</svg>'''

# 4. One Last Delivery SVG
delivery_svg = '''<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="#0C1017"/>
  <defs>
    <radialGradient id="headlight" cx="60%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE885" stop-opacity="0.5"/>
      <stop offset="60%" stop-color="#FF9E0B" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0C1017" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid4" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E2838" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#grid4)" opacity="0.5"/>

  <!-- Window Header -->
  <rect x="40" y="30" width="720" height="34" rx="4" fill="#141B26" stroke="#253245" stroke-width="1"/>
  <text x="60" y="52" fill="#F5005F" font-family="monospace" font-size="12" font-weight="bold">GAME::ONE_LAST_DELIVERY</text>
  <text x="280" y="52" fill="#94A3B8" font-family="monospace" font-size="12">MODE: CO-OP 3 PLAYERS</text>
  <text x="500" y="52" fill="#F59E0B" font-family="monospace" font-size="12">PHASE: NIGHT SURVIVAL</text>
  <text x="680" y="52" fill="#94A3B8" font-family="monospace" font-size="12">BATTERY: 42%</text>

  <!-- Fog & Night Street Scene -->
  <g transform="translate(60, 85)">
    <!-- Road Perspective -->
    <path d="M 100 280 L 280 60 L 400 60 L 580 280 Z" fill="#101622" stroke="#1E2838" stroke-width="1"/>
    <!-- Road Lane Markings -->
    <path d="M 340 60 L 340 280" stroke="#F59E0B" stroke-width="3" stroke-dasharray="14 14" opacity="0.6"/>

    <!-- Light Cone from Van -->
    <polygon points="340,160 160,280 520,280" fill="url(#headlight)"/>

    <!-- The Delivery Van (Stylized Top-Down/Isometric View) -->
    <g transform="translate(300, 110)">
      <rect x="0" y="0" width="80" height="120" rx="10" fill="#1A2433" stroke="#F5005F" stroke-width="2"/>
      <!-- Windshield -->
      <rect x="10" y="20" width="60" height="24" rx="4" fill="#00E5FF" opacity="0.4"/>
      <!-- Glover Delivery Decal -->
      <rect x="15" y="60" width="50" height="40" rx="3" fill="#243144"/>
      <text x="22" y="84" fill="#F5005F" font-family="monospace" font-weight="bold" font-size="9">GLOVER</text>
      <!-- Headlights -->
      <circle cx="12" cy="6" r="6" fill="#FFE885"/>
      <circle cx="68" cy="6" r="6" fill="#FFE885"/>
    </g>

    <!-- Enemy Proximity Radar Blips in Fog -->
    <circle cx="180" cy="120" r="16" fill="#F5005F" opacity="0.2"/>
    <circle cx="180" cy="120" r="6" fill="#F5005F"/>
    <text x="160" y="150" fill="#F5005F" font-family="monospace" font-size="10">PROXIMITY: 8m</text>

    <!-- Destination / Package drop point -->
    <circle cx="500" cy="90" r="20" fill="none" stroke="#00E5FF" stroke-width="2" stroke-dasharray="4 2"/>
    <circle cx="500" cy="90" r="4" fill="#00E5FF"/>
    <text x="460" y="125" fill="#00E5FF" font-family="monospace" font-size="10">DROP POINT #3</text>
  </g>

  <!-- Bottom Details -->
  <text x="50" y="415" fill="#64748B" font-family="monospace" font-size="11">CO-OP_NETWORKING // VEHICLE_PHYSICS // DAY_NIGHT_CYCLE</text>
  <text x="610" y="415" fill="#F59E0B" font-family="monospace" font-size="11">GUERRILLA FESTIVAL 2024</text>
</svg>'''

with open('public/assets/projects/wfc-tool.svg', 'w', encoding='utf-8') as f: f.write(wfc_svg)
with open('public/assets/projects/procedural-spline-tool.svg', 'w', encoding='utf-8') as f: f.write(spline_svg)
with open('public/assets/projects/k-boom-level-editor.svg', 'w', encoding='utf-8') as f: f.write(editor_svg)
with open('public/assets/projects/one-last-delivery.svg', 'w', encoding='utf-8') as f: f.write(delivery_svg)

print('Generated project visuals')
