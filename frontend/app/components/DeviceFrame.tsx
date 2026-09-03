import type { ReactNode } from "react";

export default function DeviceFrame({ children, offset = false }: { children: ReactNode; offset?: boolean }) {
  return (
    <div className={offset ? "device device-offset" : "device"}>
      <div className="device-screen">{children}</div>
    </div>
  );
}
