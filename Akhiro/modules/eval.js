export const metadata = {
  name: "eval",
  description: "Executes NodeJS code instantly.",
  usage: "[command] ...code",
  author: "Liane",
  hasPrefix: true,
  botAdmin: true,
};

export async function onRun(context) {
  context.code = context.args.join(" ");
  // i know 'with' is risky, but it's helpful.
  with (context) {
    await eval(`(async () => {${code}})()`);
  }
}
