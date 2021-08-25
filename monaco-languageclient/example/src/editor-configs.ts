export const EDITOR_CONFIG = {
  ENABLE_COPY_PASTE: false,
  ENABLE_AUTOCOMPLETE: true,
  SHOW_HELP_DESCRIPTION: false,
  EDITABLE_AREA: [
    [1, 5],
    [10, 15],
  ],
  SURROUNDING_PAIRS: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "<", close: ">" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
  AUTO_CLOSING_PAIRS: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'", notIn: ["string", "comment"] },
    { open: '"', close: '"', notIn: ["string", "comment"] },
  ],
};