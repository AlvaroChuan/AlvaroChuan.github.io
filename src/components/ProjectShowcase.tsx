import React, { useState, useRef } from 'react';
import { ExternalLink, ArrowRight, Code2, Gamepad2, Wrench, Layers, ChevronDown, Play, Globe } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: 'tools' | 'gameplay' | 'research';
  tags: string[];
  engine: string;
  language: string;
  role: string;
  timeline?: string;
  image: string;
  video?: string;
  previewGif?: string;
  links?: {
    steam?: string;
    itch?: string;
    github?: string;
    paper?: string;
    demo?: string;
    studio?: string;
    video?: string;
    assetStore?: string;
  };
}

interface Props {
  projects: ProjectData[];
}

const INITIAL_VISIBLE_COUNT = 6;

function SteamIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
    </svg>
  );
}

function ItchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-3.253-.114-5.508-.134-8.87-.133-3.362 0-7.945.053-8.87.133zm6.376 6.477a2.74 2.74 0 0 1-.468.602c-.5.49-1.19.795-1.947.795a2.786 2.786 0 0 1-1.95-.795c-.182-.178-.32-.37-.446-.59-.127.222-.303.412-.486.59a2.788 2.788 0 0 1-1.95.795c-.092 0-.187-.025-.264-.052-.107 1.113-.152 2.176-.168 2.95v.005l-.006 1.167c.02 2.334-.23 7.564 1.03 8.85 1.952.454 5.545.662 9.15.663 3.605 0 7.198-.21 9.15-.664 1.26-1.284 1.01-6.514 1.03-8.848l-.006-1.167v-.004c-.016-.775-.06-1.838-.168-2.95-.077.026-.172.052-.263.052a2.788 2.788 0 0 1-1.95-.795c-.184-.178-.36-.368-.486-.59-.127.22-.265.412-.447.59a2.786 2.786 0 0 1-1.95.794c-.76 0-1.446-.303-1.948-.793a2.74 2.74 0 0 1-.468-.602 2.738 2.738 0 0 1-.463.602 2.787 2.787 0 0 1-1.95.794h-.16a2.787 2.787 0 0 1-1.95-.793 2.738 2.738 0 0 1-.464-.602zm-2.004 2.59v.002c.795.002 1.5 0 2.373.953.687-.072 1.406-.108 2.125-.107.72 0 1.438.035 2.125.107.873-.953 1.578-.95 2.372-.953.376 0 1.876 0 2.92 2.934l1.123 4.028c.832 2.995-.266 3.068-1.636 3.07-2.03-.075-3.156-1.55-3.156-3.025-1.124.184-2.436.276-3.748.277-1.312 0-2.624-.093-3.748-.277 0 1.475-1.125 2.95-3.156 3.026-1.37-.004-2.468-.077-1.636-3.072l1.122-4.027c1.045-2.934 2.545-2.934 2.92-2.934zM12 12.714c-.002.002-2.14 1.964-2.523 2.662l1.4-.056v1.22c0 .056.56.033 1.123.007.562.026 1.124.05 1.124-.008v-1.22l1.4.055C14.138 14.677 12 12.713 12 12.713z" />
    </svg>
  );
}

function UnityIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function PaperIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10" />
      <path d="M6 10h10" />
    </svg>
  );
}

function DemoIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="6" />
    </svg>
  );
}

function ProjectCard({ proj }: { proj: ProjectData }) {
  const isTool = proj.category === 'tools';
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <a
      href={`/projects/${proj.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-[#121822] hover:bg-[#151c29] border border-[#1e2838] hover:border-[#f5005f]/70 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-[#f5005f]/15 block cursor-pointer no-underline text-inherit"
    >
      {/* Media Container with Thumbnail and Hover Video/Gif Support */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0c1017] border-b border-[#1e2838]">
        {/* Base Thumbnail Image */}
        <img
          src={proj.image}
          alt={proj.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />

        {/* Hover Video Preview */}
        {proj.video && (
          <video
            ref={videoRef}
            src={proj.video}
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        )}

        {/* Optional Hover Gif Preview */}
        {proj.previewGif && (
          <img
            src={proj.previewGif}
            alt={`${proj.title} preview`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Category Top Overlay */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold backdrop-blur-md border ${
              isTool
                ? 'bg-[#f5005f]/20 text-[#f5005f] border-[#f5005f]/40'
                : 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40'
            }`}
          >
            {isTool ? '[TOOL / SYSTEM]' : '[GAME / MECHANICS]'}
          </span>
          {proj.video && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-[#f5005f] border border-[#f5005f]/40 backdrop-blur-md flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>PREVIEW</span>
            </span>
          )}
        </div>

        {/* Tech Badge Top Right */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-slate-300 border border-slate-700 backdrop-blur-md">
            {proj.language}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
          <span>{proj.engine}</span>
          {proj.timeline && <span>{proj.timeline}</span>}
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#f5005f] transition-colors flex items-center gap-1.5">
          {proj.title}
        </h3>

        <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed flex-1">
          {proj.subtitle}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 my-4">
          {proj.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0b0f14] text-slate-300 border border-[#1e2838]"
            >
              {tag}
            </span>
          ))}
          {proj.tags.length > 3 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#0b0f14] text-slate-500 border border-[#1e2838]">
              +{proj.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer Action Links */}
        <div className="pt-3 border-t border-[#1e2838] flex items-center justify-between mt-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 group-hover:text-[#f5005f] transition-colors font-medium">
            <span>Inspect</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>

          {/* External quick links with dedicated brand/type icons (stopPropagation prevents navigating to case study) */}
          <div className="flex items-center gap-1">
            {proj.links?.steam && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.steam, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-[#66c0f4] hover:bg-[#66c0f4]/15 p-1.5 rounded transition-all cursor-pointer"
                title="View on Steam"
                aria-label="View on Steam"
              >
                <SteamIcon className="w-4 h-4" />
              </button>
            )}

            {proj.links?.demo && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.demo, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-[#00e5ff] hover:bg-[#00e5ff]/15 p-1.5 rounded transition-all cursor-pointer"
                title="Play Demo"
                aria-label="Play Demo"
              >
                <DemoIcon className="w-4 h-4" />
              </button>
            )}

            {proj.links?.itch && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.itch, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-[#fa5c5c] hover:bg-[#fa5c5c]/15 p-1.5 rounded transition-all cursor-pointer"
                title="Play on itch.io"
                aria-label="Play on itch.io"
              >
                <ItchIcon className="w-4 h-4" />
              </button>
            )}

            {proj.links?.assetStore && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.assetStore, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-white hover:bg-white/15 p-1.5 rounded transition-all cursor-pointer"
                title="Unity Asset Store"
                aria-label="Unity Asset Store"
              >
                <UnityIcon className="w-4 h-4" />
              </button>
            )}

            {proj.links?.github && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.github, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-white hover:bg-white/15 p-1.5 rounded transition-all cursor-pointer"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </button>
            )}

            {proj.links?.paper && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.paper, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-[#a78bfa] hover:bg-[#a78bfa]/15 p-1.5 rounded transition-all cursor-pointer"
                title={proj.links?.paper.toLowerCase().includes('thesis') ? "Bachelor's Thesis" : "Research Paper"}
                aria-label={proj.links?.paper.toLowerCase().includes('thesis') ? "Bachelor's Thesis" : "Research Paper"}
              >
                <PaperIcon className="w-4 h-4" />
              </button>
            )}

            {proj.links?.video && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.video, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-[#ff0000] hover:bg-[#ff0000]/15 p-1.5 rounded transition-all cursor-pointer"
                title="Watch Video"
                aria-label="Watch Video"
              >
                <YoutubeIcon className="w-4 h-4" />
              </button>
            )}

            {proj.links?.studio && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(proj.links?.studio, '_blank', 'noopener,noreferrer');
                }}
                className="text-slate-400 hover:text-[#f5005f] hover:bg-[#f5005f]/15 p-1.5 rounded transition-all cursor-pointer"
                title="Studio Website"
                aria-label="Studio Website"
              >
                <Globe className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function ProjectShowcase({ projects }: Props) {
  const [filter, setFilter] = useState<'all' | 'tools' | 'gameplay'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  const handleFilterChange = (newFilter: 'all' | 'tools' | 'gameplay') => {
    setFilter(newFilter);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const filtered = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const toolsCount = projects.filter((p) => p.category === 'tools').length;
  const gameplayCount = projects.filter((p) => p.category === 'gameplay').length;

  return (
    <div className="w-full">
      {/* Filter Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2838] pb-4 mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'all'
                ? 'bg-[#f5005f] text-white shadow-lg shadow-[#f5005f]/25 border border-[#f5005f]'
                : 'bg-[#121822] text-slate-400 hover:text-slate-200 border border-[#1e2838]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Projects</span>
            <span className="text-[10px] opacity-75">({projects.length})</span>
          </button>

          <button
            onClick={() => handleFilterChange('gameplay')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'gameplay'
                ? 'bg-[#f5005f] text-white shadow-lg shadow-[#f5005f]/25 border border-[#f5005f]'
                : 'bg-[#121822] text-slate-400 hover:text-slate-200 border border-[#1e2838]'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Gameplay Systems</span>
            <span className="text-[10px] opacity-75">({gameplayCount})</span>
          </button>

          <button
            onClick={() => handleFilterChange('tools')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'tools'
                ? 'bg-[#f5005f] text-white shadow-lg shadow-[#f5005f]/25 border border-[#f5005f]'
                : 'bg-[#121822] text-slate-400 hover:text-slate-200 border border-[#1e2838]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Tools & Engine</span>
            <span className="text-[10px] opacity-75">({toolsCount})</span>
          </button>
        </div>

        <div className="text-xs font-mono text-slate-500 hidden sm:block">
          STATUS: <span className="text-emerald-400">ACTIVE REPOSITORIES</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((proj) => (
          <ProjectCard key={proj.id} proj={proj} />
        ))}
      </div>

      {/* Load More Button if more than visibleCount projects exist */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2.5 rounded-md bg-[#121822] hover:bg-[#18212e] text-slate-200 border border-[#1e2838] hover:border-[#f5005f] font-mono text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Load More Projects ({filtered.length - visibleCount} remaining)</span>
            <ChevronDown className="w-4 h-4 text-[#f5005f]" />
          </button>
        </div>
      )}
    </div>
  );
}
