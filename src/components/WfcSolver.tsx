import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';

// Tile definitions with 4-directional sockets: [North, East, South, West]
// Sockets: 0 = Empty/Ground, 1 = Connected Circuit/Track
interface TileDef {
  id: number;
  name: string;
  weight: number;
  sockets: [number, number, number, number]; // [N, E, S, W]
  color: string;
}

// Colors avoiding any yellow/amber: strictly signature neon crimson (#f5005f), cyan (#00e5ff), and violet (#8758ff)
const TILES: TileDef[] = [
  { id: 0, name: 'Empty', weight: 1.5, sockets: [0, 0, 0, 0], color: '#141c28' },
  { id: 1, name: 'Horizontal', weight: 1.0, sockets: [0, 1, 0, 1], color: '#f5005f' },
  { id: 2, name: 'Vertical', weight: 1.0, sockets: [1, 0, 1, 0], color: '#f5005f' },
  { id: 3, name: 'Cross', weight: 0.8, sockets: [1, 1, 1, 1], color: '#8758ff' },
  { id: 4, name: 'Corner NE', weight: 0.9, sockets: [1, 1, 0, 0], color: '#00e5ff' },
  { id: 5, name: 'Corner ES', weight: 0.9, sockets: [0, 1, 1, 0], color: '#00e5ff' },
  { id: 6, name: 'Corner SW', weight: 0.9, sockets: [0, 0, 1, 1], color: '#00e5ff' },
  { id: 7, name: 'Corner WN', weight: 0.9, sockets: [1, 0, 0, 1], color: '#00e5ff' },
  { id: 8, name: 'T-Junction N', weight: 0.7, sockets: [1, 1, 0, 1], color: '#f5005f' },
  { id: 9, name: 'T-Junction S', weight: 0.7, sockets: [0, 1, 1, 1], color: '#f5005f' },
];

const VISIBLE_SIZE = 6;
const PADDING = 1;
const INTERNAL_SIZE = VISIBLE_SIZE + PADDING * 2; // 8x8
const TOTAL_INTERNAL_CELLS = INTERNAL_SIZE * INTERNAL_SIZE;
const TOTAL_VISIBLE_CELLS = VISIBLE_SIZE * VISIBLE_SIZE;

// Direction offsets: 0: North, 1: East, 2: South, 3: West
const OPPOSITE_DIR = [2, 3, 0, 1];
const DIR_OFFSETS: [number, number][] = [
  [-1, 0], // North
  [0, 1],  // East
  [1, 0],  // South
  [0, -1], // West
];

interface CellState {
  possible: number[];
  collapsed: boolean;
  tileId: number | null;
  entropy: number;
}

export default function WfcSolver() {
  const [grid, setGrid] = useState<CellState[]>([]);
  const [isRunning, setIsRunning] = useState(true); // Starts active at the start!
  const [stepCount, setStepCount] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'contradiction'>('running');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Propagator function that applies constraints starting from queue indices
  const propagateFromQueue = (newGrid: CellState[], initialQueue: number[]) => {
    const queue = [...initialQueue];
    const inQueue = new Set(initialQueue);

    while (queue.length > 0) {
      const currentIdx = queue.shift()!;
      inQueue.delete(currentIdx);
      const currentCell = newGrid[currentIdx];
      const r = Math.floor(currentIdx / INTERNAL_SIZE);
      const c = currentIdx % INTERNAL_SIZE;

      for (let dir = 0; dir < 4; dir++) {
        const [dr, dc] = DIR_OFFSETS[dir];
        const nr = r + dr;
        const nc = c + dc;

        if (nr < 0 || nr >= INTERNAL_SIZE || nc < 0 || nc >= INTERNAL_SIZE) continue;

        const neighborIdx = nr * INTERNAL_SIZE + nc;
        const neighbor = newGrid[neighborIdx];

        if (neighbor.collapsed) continue;

        // Allowed sockets from current cell towards neighbor in direction `dir`
        const allowedSockets = new Set<number>();
        for (const tileId of currentCell.possible) {
          allowedSockets.add(TILES[tileId].sockets[dir]);
        }

        const oppDir = OPPOSITE_DIR[dir];
        const initialLen = neighbor.possible.length;
        neighbor.possible = neighbor.possible.filter((nTileId) =>
          allowedSockets.has(TILES[nTileId].sockets[oppDir])
        );

        if (neighbor.possible.length < initialLen) {
          neighbor.entropy = neighbor.possible.length + Math.random() * 0.1;
          if (!inQueue.has(neighborIdx)) {
            queue.push(neighborIdx);
            inQueue.add(neighborIdx);
          }
        }
      }
    }
  };

  // Initialize internal 8x8 grid with border cells fixed to Empty (socket 0)
  const initGrid = useCallback((startRunning = true) => {
    const initial: CellState[] = [];
    const borderIndices: number[] = [];

    for (let r = 0; r < INTERNAL_SIZE; r++) {
      for (let c = 0; c < INTERNAL_SIZE; c++) {
        const idx = r * INTERNAL_SIZE + c;
        const isBorder = r === 0 || r === INTERNAL_SIZE - 1 || c === 0 || c === INTERNAL_SIZE - 1;

        if (isBorder) {
          // Border cells fixed to Empty tile (id 0) -> ensures zero open endpoints to exterior!
          initial.push({
            possible: [0],
            collapsed: true,
            tileId: 0,
            entropy: 0,
          });
          borderIndices.push(idx);
        } else {
          // Inner cells in full superposition
          initial.push({
            possible: TILES.map((t) => t.id),
            collapsed: false,
            tileId: null,
            entropy: TILES.length + Math.random() * 0.1,
          });
        }
      }
    }

    // Propagate boundary constraints inward before user steps or solves
    propagateFromQueue(initial, borderIndices);

    setGrid(initial);
    setStepCount(0);
    setStatus('running');
    setIsRunning(startRunning);
  }, []);

  useEffect(() => {
    initGrid(true);
  }, [initGrid]);

  // Step function
  const stepCollapse = useCallback((): boolean => {
    setGrid((prevGrid) => {
      if (prevGrid.length === 0) return prevGrid;

      // Filter only uncollapsed visible inner cells
      const uncollapsedInner: { cell: CellState; idx: number }[] = [];

      for (let r = 1; r <= VISIBLE_SIZE; r++) {
        for (let c = 1; c <= VISIBLE_SIZE; c++) {
          const idx = r * INTERNAL_SIZE + c;
          const cell = prevGrid[idx];
          if (!cell.collapsed && cell.possible.length > 0) {
            uncollapsedInner.push({ cell, idx });
          }
        }
      }

      if (uncollapsedInner.length === 0) {
        setStatus('completed');
        setIsRunning(false);
        return prevGrid;
      }

      // Check contradiction in inner cells
      const hasContradiction = prevGrid.some((c, i) => {
        const r = Math.floor(i / INTERNAL_SIZE);
        const col = i % INTERNAL_SIZE;
        const isInner = r >= 1 && r <= VISIBLE_SIZE && col >= 1 && col <= VISIBLE_SIZE;
        return isInner && !c.collapsed && c.possible.length === 0;
      });

      if (hasContradiction) {
        setStatus('contradiction');
        setIsRunning(false);
        return prevGrid;
      }

      // Find cell with minimum entropy
      uncollapsedInner.sort((a, b) => a.cell.entropy - b.cell.entropy);
      const chosen = uncollapsedInner[0];

      // Clone grid
      const newGrid = prevGrid.map((c) => ({
        ...c,
        possible: [...c.possible],
      }));

      // Pick weighted tile from remaining possible
      const possibleTiles = chosen.cell.possible.map((id) => TILES[id]);
      const totalWeight = possibleTiles.reduce((sum, t) => sum + t.weight, 0);
      let rand = Math.random() * totalWeight;
      let selectedTileId = possibleTiles[0].id;
      for (const t of possibleTiles) {
        rand -= t.weight;
        if (rand <= 0) {
          selectedTileId = t.id;
          break;
        }
      }

      // Collapse chosen cell
      newGrid[chosen.idx] = {
        possible: [selectedTileId],
        collapsed: true,
        tileId: selectedTileId,
        entropy: 0,
      };

      // Propagate outward
      propagateFromQueue(newGrid, [chosen.idx]);

      setStepCount((s) => s + 1);

      // Check inner completion status
      let allInnerDone = true;
      let innerContradiction = false;

      for (let r = 1; r <= VISIBLE_SIZE; r++) {
        for (let c = 1; c <= VISIBLE_SIZE; c++) {
          const idx = r * INTERNAL_SIZE + c;
          const cell = newGrid[idx];
          if (!cell.collapsed) {
            allInnerDone = false;
            if (cell.possible.length === 0) {
              innerContradiction = true;
            }
          }
        }
      }

      if (innerContradiction) {
        setStatus('contradiction');
        setIsRunning(false);
      } else if (allInnerDone) {
        setStatus('completed');
        setIsRunning(false);
      } else {
        setStatus('running');
      }

      return newGrid;
    });

    return true;
  }, []);

  // Manual cell click to collapse a specific visible cell
  const handleCellClick = (rVisible: number, cVisible: number) => {
    const idx = (rVisible + 1) * INTERNAL_SIZE + (cVisible + 1);
    const target = grid[idx];
    if (!target || target.collapsed || target.possible.length === 0) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((c) => ({
        ...c,
        possible: [...c.possible],
      }));

      const randomTileId = target.possible[Math.floor(Math.random() * target.possible.length)];

      newGrid[idx] = {
        possible: [randomTileId],
        collapsed: true,
        tileId: randomTileId,
        entropy: 0,
      };

      propagateFromQueue(newGrid, [idx]);
      setStepCount((s) => s + 1);
      return newGrid;
    });
  };

  // Auto-run loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        stepCollapse();
      }, 110);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, stepCollapse]);

  // Compute inner cell counts
  let collapsedInnerCount = 0;
  if (grid.length === TOTAL_INTERNAL_CELLS) {
    for (let r = 1; r <= VISIBLE_SIZE; r++) {
      for (let c = 1; c <= VISIBLE_SIZE; c++) {
        const idx = r * INTERNAL_SIZE + c;
        if (grid[idx]?.collapsed) {
          collapsedInnerCount++;
        }
      }
    }
  }

  const progressPercent = Math.round((collapsedInnerCount / TOTAL_VISIBLE_CELLS) * 100);

  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-[#121822] border border-[#212c3d] p-4 text-slate-200 font-mono shadow-2xl relative overflow-hidden">
      {/* Corner Tech Badges */}
      <div className="flex items-center justify-between border-b border-[#1e2838] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f5005f] animate-pulse" />
          <span className="text-xs font-bold text-slate-300 tracking-wider">
            WFC 2D SOLVER
          </span>
        </div>
      </div>

      {/* Grid Canvas - Renders the inner 6x6 visible portion */}
      <div className="grid grid-cols-6 gap-1.5 bg-[#0b0f14] p-2.5 rounded-md border border-[#1e2838]">
        {Array.from({ length: VISIBLE_SIZE }).map((_, r) =>
          Array.from({ length: VISIBLE_SIZE }).map((__, c) => {
            const idx = (r + 1) * INTERNAL_SIZE + (c + 1);
            const cell = grid[idx];
            if (!cell) return null;
            const tile = cell.tileId !== null ? TILES[cell.tileId] : null;

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                disabled={cell.collapsed}
                title={
                  cell.collapsed
                    ? `Tile: ${tile?.name}`
                    : `Superposition: ${cell.possible.length} options`
                }
                className={`relative aspect-square rounded transition-all duration-150 flex items-center justify-center overflow-hidden cursor-pointer ${
                  cell.collapsed
                    ? 'bg-[#141c28] border border-[#253245] shadow-inner'
                    : 'bg-[#0f151f] hover:bg-[#1a2333] border border-[#1a2434] hover:border-[#f5005f]'
                }`}
              >
                {cell.collapsed && tile ? (
                  <svg
                    viewBox="0 0 40 40"
                    className="w-full h-full p-1"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  >
                    {/* Sockets visualization as circuit tracks */}
                    {tile.sockets[0] === 1 && (
                      <line x1="20" y1="20" x2="20" y2="0" stroke={tile.color} />
                    )}
                    {tile.sockets[1] === 1 && (
                      <line x1="20" y1="20" x2="40" y2="20" stroke={tile.color} />
                    )}
                    {tile.sockets[2] === 1 && (
                      <line x1="20" y1="20" x2="20" y2="40" stroke={tile.color} />
                    )}
                    {tile.sockets[3] === 1 && (
                      <line x1="20" y1="20" x2="0" y2="20" stroke={tile.color} />
                    )}
                    {/* Central Node */}
                    {tile.sockets.some((s) => s === 1) ? (
                      <circle cx="20" cy="20" r="3.5" fill={tile.color} />
                    ) : (
                      <circle cx="20" cy="20" r="2" fill="#2d3748" />
                    )}
                  </svg>
                ) : cell.possible.length === 0 ? (
                  <span className="text-[10px] text-[#f5005f] font-bold">ERR</span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-semibold select-none">
                    {cell.possible.length}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Realtime Metrics Bar */}
      <div className="grid grid-cols-3 gap-2 my-3 text-center text-xs">
        <div className="bg-[#0b0f14] p-1.5 rounded border border-[#1e2838]">
          <div className="text-[10px] text-slate-500 uppercase">Step</div>
          <div className="font-bold text-slate-200">#{stepCount}</div>
        </div>
        <div className="bg-[#0b0f14] p-1.5 rounded border border-[#1e2838]">
          <div className="text-[10px] text-slate-500 uppercase">Entropy Left</div>
          <div className="font-bold text-[#00e5ff]">{TOTAL_VISIBLE_CELLS - collapsedInnerCount} cells</div>
        </div>
        <div className="bg-[#0b0f14] p-1.5 rounded border border-[#1e2838]">
          <div className="text-[10px] text-slate-500 uppercase">Progress</div>
          <div className="font-bold text-[#f5005f]">{progressPercent}%</div>
        </div>
      </div>

      {/* Status banner */}
      <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#0b0f14] text-[11px] mb-3 border border-[#1e2838]">
        <div className="flex items-center gap-2">
          {status === 'completed' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : status === 'contradiction' ? (
            <AlertTriangle className="w-3.5 h-3.5 text-[#f5005f]" />
          ) : isRunning ? (
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-slate-500" />
          )}
          <span className="text-slate-300">
            {status === 'completed'
              ? 'CONVERGED TO HARMONIC STATE'
              : status === 'contradiction'
              ? 'CONTRADICTION (RESETTING)'
              : isRunning
              ? 'PROPAGATING CONSTRAINTS...'
              : 'PAUSED // READY'}
          </span>
        </div>
      </div>

      {/* Control Buttons: Play, Pause, Step, Reset all separated */}
      <div className="grid grid-cols-4 gap-2">
        {/* Play Button */}
        <button
          onClick={() => {
            if (status === 'completed' || status === 'contradiction') {
              initGrid(true);
            } else {
              setIsRunning(true);
            }
          }}
          disabled={isRunning && status !== 'completed' && status !== 'contradiction'}
          className={`py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
            !isRunning
              ? 'bg-[#f5005f] text-white hover:bg-[#d60053] shadow-md shadow-[#f5005f]/20'
              : 'bg-[#192230] text-slate-500 border border-[#253245] opacity-50 cursor-not-allowed'
          }`}
          title="Start Solving"
        >
          <Play className="w-3.5 h-3.5" /> Play
        </button>

        {/* Pause Button */}
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className={`py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
            isRunning
              ? 'bg-[#192230] text-slate-200 border border-[#253245] hover:border-[#00e5ff] hover:text-[#00e5ff]'
              : 'bg-[#192230] text-slate-500 border border-[#253245] opacity-50 cursor-not-allowed'
          }`}
          title="Pause Solver"
        >
          <Pause className="w-3.5 h-3.5" /> Pause
        </button>

        {/* Step Button */}
        <button
          onClick={() => {
            setIsRunning(false);
            stepCollapse();
          }}
          disabled={status === 'completed' || status === 'contradiction'}
          className="py-1.5 px-2 rounded text-xs bg-[#192230] text-slate-200 border border-[#253245] hover:bg-[#202b3d] hover:border-[#f5005f] flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          title="Single Step"
        >
          <SkipForward className="w-3.5 h-3.5" /> Step
        </button>

        {/* Reset Button */}
        <button
          onClick={() => initGrid(true)}
          className="py-1.5 px-2 rounded text-xs bg-[#192230] text-slate-200 border border-[#253245] hover:bg-[#202b3d] hover:text-[#00e5ff] hover:border-[#00e5ff] flex items-center justify-center gap-1 transition-all cursor-pointer"
          title="Reset and Re-seed"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
    </div>
  );
}
