import { DataPath, GetVersionFolder } from "./fs.ts";
import { DownloadPatcher } from "./net.ts";
import {join} from "mod"

export async function FileExists(path: string): Promise<boolean> {
  try {
    const Stat = await Deno.stat(path);
    return Stat.isFile;
  } catch (Error) {
    if (Error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw Error;
  }
}

export async function PatchVersion(Version: string, Patcher?: Uint8Array<ArrayBuffer>){
    const ExecutableData = Patcher ?? await DownloadPatcher()
    const VersionFolder = GetVersionFolder(Version)

    const Path = join(VersionFolder, "patch.exe")
    await Deno.writeFile(Path,ExecutableData)
    console.log("Patching!")

    const Command = new Deno.Command("flatpak",{
        args: [
            "run",
            "--command=wine64",
            "org.vinegarhq.Vinegar",
            "cmd",
            "/c",
            `cd Z:${VersionFolder} && patch.exe RobloxStudioBeta.exe`
        ],
        env: {
            WINEPREFIX: join(DataPath, "prefixes/studio"),
            ...Deno.env.toObject()
        },
        stdout: "piped",
        stderr: "piped",
    });

    return Command
}

export const Divider = "------------------------"