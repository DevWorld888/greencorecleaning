"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckBadge } from "@/components/ui/CheckBadge";
import type { Room } from "@/config/cleaning-checklist";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// ARIA tabs: arrow keys move between rooms, only the active tab is in the tab
// order. Every panel stays in the HTML (inactive ones are `hidden`), so search
// engines read all the checklists, not just the visible one.
export function RoomChecklist({ rooms }: { rooms: Room[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectTab(index: number) {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const last = rooms.length - 1;
    const keyMap: Record<string, number> = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keyMap) {
      event.preventDefault();
      selectTab(keyMap[event.key]);
    }
  }

  return (
    <div>
      <div className="-mx-5 flex overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="Rooms"
          onKeyDown={handleKeyDown}
          className="flex gap-1 rounded-control bg-white/[0.06] p-1.5"
        >
          {rooms.map((room, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={room.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`room-tab-${room.id}`}
                aria-selected={selected}
                aria-controls={`room-panel-${room.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className={`h-11 shrink-0 whitespace-nowrap rounded-[8px] px-4 text-[0.9375rem] font-semibold transition-colors ${
                  selected ? "bg-white text-primary shadow-soft" : "text-white/75 hover:text-white"
                }`}
              >
                {room.name}
              </button>
            );
          })}
        </div>
      </div>

      {rooms.map((room, index) => {
        const selected = index === activeIndex;
        return (
          <div
            key={room.id}
            role="tabpanel"
            id={`room-panel-${room.id}`}
            aria-labelledby={`room-tab-${room.id}`}
            hidden={!selected}
            className="mt-8"
          >
            <motion.div
              initial={false}
              animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                <h3 className="text-2xl font-bold text-white">{room.name}</h3>
                <p className="text-sm text-white/70">{room.tasks.length} tasks included</p>
              </div>
              <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1 xl:grid-cols-2">
                {room.tasks.map((task) => (
                  <li
                    key={task}
                    className="flex items-start gap-3 border-b border-white/10 py-4 leading-snug text-white/90"
                  >
                    <CheckBadge onDark />
                    {task}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
