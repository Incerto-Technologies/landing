"use client";

export type UserOS = "windows" | "mac" | "linux";
export type UserArchitecture =
  | "x64"
  | "arm"
  | "x86"
  | "x32"
  | "intel"
  | "apple";

const defaultArchitecture: Record<UserOS, UserArchitecture> = {
  windows: "x64",
  mac: "apple",
  linux: "x86",
};

export const getUserOS = (): { os: UserOS; architecture: UserArchitecture } => {
  if (typeof window === "undefined")
    return { os: "windows", architecture: defaultArchitecture["windows"] };

  const userAgent = window.navigator.userAgent;
  if (userAgent.includes("Win"))
    return { os: "windows", architecture: defaultArchitecture["windows"] };
  if (userAgent.includes("Mac"))
    return { os: "mac", architecture: defaultArchitecture["mac"] };
  if (userAgent.includes("Linux"))
    return { os: "linux", architecture: defaultArchitecture["linux"] };

  return { os: "windows", architecture: defaultArchitecture["windows"] };
};
