export {}
import { join } from "mod";
const DIV = "------------------------"

console.log("Internal Studio Patcher for Vinegar!")
console.log("Made by doqe.")
console.log("Patcher made by 7ap on github!")
console.log(DIV)

async function FileExists(path: string): Promise<boolean> {
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

console.log("Downloading patcher.exe...")

const Url = "https://github.com/7ap/internal-studio-patcher/releases/latest/download/internal-studio-patcher.exe"

const Response = await fetch(Url);
if (!Response.ok) throw new Error(`Failed to download file: ${Response.status}`);

const ExecutableData = new Uint8Array(await Response.arrayBuffer());
console.log("Downloaded patcher.exe!")

const Home = Deno.env.get("HOME")
if(!Home) throw new Error("Missing HOME")

const DataPath = join(Home, ".var/app/org.vinegarhq.Vinegar/data/vinegar/")
const StateFilePath = join(DataPath, "state.json")
if(!FileExists(StateFilePath)) throw new Error("Vinegar is not installed!")

const State = await Deno.readTextFile(StateFilePath).then((Content) => JSON.parse(Content))
const VersionFolder = join(DataPath, "versions", State.Studio.Version)

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

const {code} = await Command.output()

console.log(DIV)
console.log("Exit code:", code);
console.log("Successfully patched Vinegar! (i think)")