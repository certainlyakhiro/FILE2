import fs from "fs";
import axios from "axios";
import { PasteClient } from "pastebin-api";

export const metadata: { [key: string]: any } = {
  name: "system",
  author: "Liane Cagara",
  hasPrefix: true,
  description: "Reload, send, upload, install, or delete modules",
  usage: "[install/reload/file/bin] <filename>",
  botAdmin: true,
  version: "1.2.0",
};

interface Errors {
  [key: string]: Error;
}

export async function onRun({
  api,
  event,
  args,
  box,
}: {
  api: any;
  event: any;
  args: string[];
  box: any;
}): Promise<boolean> {
  const system: string = `⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠
━━━━━━━━━━━━━━━`;

  const { loadAll }: { loadAll: () => Promise<Errors | boolean> } =
    global.Akhiro.utils;

  async function handleLoad(): Promise<boolean> {
    const i: any = await box.reply(`${system}
⚙️ | Getting started..`);
    await new Promise<void>((r) => setTimeout(r, 1000));
    await box.edit(
      `${system}
🔃 | Reloading the latest edited codes.`,
      i.messageID,
    );
    const errs: Errors | boolean = await loadAll();

    let res: string = `${system}
❌ | Failed to reload ${errs && typeof errs === "object" ? Object.keys(errs).length : 0} modules:\n\n`;
    await new Promise<void>((r) => setTimeout(r, 1000));
    let num: number = 1;
    if (errs) {
      for (const [file, error] of Object.entries(errs)) {
        res += `${num}. ${file}\n--> ${error.message}\n`;
        num++;
      }
      await box.edit(res, i.messageID);
      return false;
    }

    await new Promise<void>((r) => setTimeout(r, 1000));
    await box.edit(
      `${system}
📥 | Updating the system..`,
      i.messageID,
    );
    await new Promise<void>((r) => setTimeout(r, 1000));
    await box.edit(
      `${system}
📥 | Almost there...`,
      i.messageID,
    );
    await new Promise<void>((r) => setTimeout(r, 1000));
    await box.edit(
      `${system}
🟢 | Loaded All modules!`,
      i.messageID,
    );
    return true;
  }

  if (args[0] === "reload") {
    return await handleLoad();
  } else if (args[0] === "install" && args[1] && args[2]) {
    if (!args[1].endsWith(".js") && !args[1].endsWith(".ts")) {
      await box.reply(`❌ | Only .js or .ts file extensions were allowed!`);
      return false;
    }

    const fileName: string = args[1];
    const filePath: string = `Akhiro/modules/${fileName}`;

    if (fs.existsSync(filePath)) {
      await box.waitForReaction(
        `⚠️ The file ${fileName} already exists, please react with any emoji to proceed, this will replace the file and this action cannot he undone.`,
        `✅ Proceeding...`,
      );
    }

    let code: string = args.slice(2).join(" ");

    if (args[2].startsWith(`https://`) || args[2].startsWith(`http://`)) {
      try {
        const response = await axios.get(args[2]);
        code = response.data;
      } catch (err) {
        await box.reply(`❌ | Failed to download the file from the given URL.`);
        return false;
      }
    }

    fs.writeFileSync(filePath, code);
    await box.reply(`✅ | Successfully installed ${fileName}!`);
    return await handleLoad();
  } else if (args[0] === "file") {
    const fileName: string = args[1];
    const filePath: string = `Akhiro/modules/${fileName}`;
    if (!fs.existsSync(filePath)) {
      await box.reply(`❌ | The file ${fileName} does not exist.`);
      return false;
    }
    const content: string = fs.readFileSync(filePath, "utf-8");
    await box.reply(`//file: ${fileName}

${content}`);
    return true;
  } else if (args[0] === "delete") {
    const fileName: string = args[1];
    const filePath: string = `Akhiro/modules/${fileName}`;
    if (!fs.existsSync(filePath)) {
      await box.reply(`❌ | The file ${fileName} does not exist.`);
      return false;
    }
    await box.waitForReaction(
      `⚠️ Are you sure you want to delete ${fileName}? You cannot undo this action.
Please react to this message to confirm!`,
      `✅ Proceeding to deletion...`,
    );
    fs.unlinkSync(filePath);
    await box.reply(`✅ Successfully deleted ${fileName}!`);
    return true;
  } else if (args[0] === "bin") {
    const fileName: string = args[1];
    const filePath: string = `Akhiro/modules/${fileName}`;
    if (!fs.existsSync(filePath)) {
      await box.reply(`❌ | The file ${fileName} does not exist.`);
      return false;
    }
    const data: string = fs.readFileSync(filePath, "utf-8");
    const client: typeof PasteClient = new PasteClient(
      "R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb",
    );
    const url: string = await client.createPaste({
      code: data,
      expireDate: "N",
      format: "javascript",
      name: fileName,
      publicity: 1,
    });
    if (!url) {
      await box.reply(
        `❌ | Failed to upload the file to pastebin, please check if the api key is working.`,
      );
      return false;
    }
    const id = url.split("/")[3];
    const rawPaste = "https://pastebin.com/raw/" + id;
    await box.reply(`✅ | Successfully uploaded ${fileName} to pastebin!
Url: ${rawPaste}`);
  } else {
    await box.reply(`${system}
reload
install <filename> <link|code>
file <filename>
delete <filename>
bin <filename>`);
    return false;
  }
}
