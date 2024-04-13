export const metadata = {
  name: "eval",
  description: "Executes NodeJS code instantly.",
  usage: "[command] ...code",
  author: "Liane",
  hasPrefix: true,
  botAdmin: true,
};

export async function onRun(context) {
  const code = context.args.join(" ");

  const { onRun } = await eval(code);
  await onRun?.(context);
}
