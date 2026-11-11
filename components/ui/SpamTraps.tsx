"use client";

import { useEffect, useRef } from "react";

// Hidden fields checked by lib/spam.ts: a honeypot only bots fill in, and the
// time the form was opened (set after load, so it reflects a real visit).
export function SpamTraps({ idPrefix }: { idPrefix: string }) {
  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" />
    </>
  );
}
