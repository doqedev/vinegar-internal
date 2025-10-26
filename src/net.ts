export async function DownloadPatcher(Url: string = "https://github.com/7ap/internal-studio-patcher/releases/latest/download/internal-studio-patcher.exe") {
    const Response = await fetch(Url);
    if (!Response.ok) throw new Error(`Failed to download file: ${Response.status}`);

    return new Uint8Array(await Response.arrayBuffer());
}