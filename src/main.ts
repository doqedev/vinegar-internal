import { GetAllVersions } from "./fs.ts";
import { DownloadPatcher } from "./net.ts";
import { Divider, PatchVersion } from "./utils.ts";

console.log("Internal Studio Patcher for Vinegar!")
console.log("Made by doqe.")
console.log("Patcher made by 7ap on github!")
console.log(Divider)

console.log("Downloading patcher...")
const Patcher = await DownloadPatcher()
console.log("Downloaded patcher!")
console.log(Divider)

const Versions = GetAllVersions().map((Entry) => Entry.name).toArray()

console.log(`Patching ${Versions.length} versions!\n`)

for(const Version of Versions){
    const Command = await PatchVersion(Version, Patcher)
    const {code} = await Command.output()

    console.log(`${Version} ${code === 1 ? "✅" : "❌"}`) // honestly do not know if this works
}

console.log(Divider)
console.log("Successfully patched all Vinegar versions! (i think)")