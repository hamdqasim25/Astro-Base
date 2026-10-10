import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the LAN hostname used to test AstroBase on a physical mobile device.
  allowedDevOrigins: ["192.168.1.242"],
};

export default nextConfig;
