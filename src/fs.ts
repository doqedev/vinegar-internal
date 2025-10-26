import { join } from "mod";

const HomePath = Deno.env.get("HOME")
if(!HomePath) throw new Error("Missing HOME")

export const DataPath = join(HomePath, ".var/app/org.vinegarhq.Vinegar/data/vinegar/")
export const GetVersionFolder = (Version: string) => join(DataPath, 'versions', Version) 
export const GetAllVersions = () => Deno.readDirSync(join(DataPath, "versions"))
