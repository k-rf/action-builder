import { resolvePath } from "mlly";

import { checkPackages } from "./check-packages";

jest.mock("mlly", () => ({
  resolvePath: jest.fn(),
}));

describe("checkPackages", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("インストールされているパッケージを返す", async () => {
    (resolvePath as jest.Mock).mockImplementation(() => Promise.resolve());

    const packages = ["package1", "package2"];
    const result = await checkPackages(packages);

    expect(result).toEqual({
      installed: ["package1", "package2"],
      noInstalled: [],
    });
  });

  it("インストールされていないパッケージを返す", async () => {
    (resolvePath as jest.Mock).mockImplementation(() => Promise.reject());

    const packages = ["package1", "package2"];
    const result = await checkPackages(packages);

    expect(result).toEqual({
      installed: [],
      noInstalled: ["package1", "package2"],
    });
  });

  it("インストールされている/インストールされていないパッケージを返す", async () => {
    (resolvePath as jest.Mock).mockImplementation((packageName) =>
      packageName === "package1" ? Promise.resolve() : Promise.reject()
    );

    const packages = ["package1", "package2"];
    const result = await checkPackages(packages);

    expect(result).toEqual({
      installed: ["package1"],
      noInstalled: ["package2"],
    });
  });
});
