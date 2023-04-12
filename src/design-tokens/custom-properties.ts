import { clampGenerator } from "../utils/clamp-generator";
import { tokensToCustomProperties } from "../utils/tokens-to-custom-properties";
import colors from "./tokens/colors.json";
import spacing from "./tokens/spacing.json";
import textSizes from "./tokens/text-sizes.json";
import fonts from "./tokens/fonts.json";
import breakpoints from "./tokens/breakpoints.json";

export const customPropertyConfig = [
  ...tokensToCustomProperties(colors.items, "color"),
  ...tokensToCustomProperties(clampGenerator(spacing.items), "space"),
  ...tokensToCustomProperties(clampGenerator(textSizes.items)),
  ...tokensToCustomProperties(fonts.items, "font"),
  ...tokensToCustomProperties(breakpoints.items, "screen"),
];

export const customProperties = `
:root {
    ${customPropertyConfig.join("\n    ")}
}
`;
