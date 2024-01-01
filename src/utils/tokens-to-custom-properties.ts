import slugify from "slugify";

export const tokensToCustomProperties = (
  tokens: Array<{ name: string; value: string | number }>,
  prefix = ""
) => {
  const nameSlug = (text: string) => slugify(text, { lower: true });
  return tokens.map(
    ({ name, value }) =>
      `--${nameSlug(prefix ? `${prefix} ${name}` : name)}: ${value};`
  );
};
