import { resolvePath } from "mlly";

export const checkPackages = async (packages: string[]) => {
  return (
    await Promise.all(
      packages.map(async (packageName) => {
        try {
          await resolvePath(packageName);
          return { type: "installed" as const, installed: packageName };
        } catch {
          return { type: "noInstalled" as const, noInstalled: packageName };
        }
      })
    )
  ).reduce(
    (acc, cur) => {
      if (cur.type === "installed") {
        return { ...acc, installed: [...acc.installed, cur.installed] };
      } else {
        return { ...acc, noInstalled: [...acc.noInstalled, cur.noInstalled] };
      }
    },
    { installed: [] as string[], noInstalled: [] as string[] }
  );
};
