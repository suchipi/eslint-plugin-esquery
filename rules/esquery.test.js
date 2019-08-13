const dedent = require("dedent");
const RuleTester = require("eslint").RuleTester;
const rule = require("./esquery");

const ruleTester = new RuleTester();

ruleTester.run("esquery", rule, {
  valid: [
    {
      code: dedent`
        console.log("hello world");
      `,
    },
  ],

  invalid: [
    {
      code: dedent`
        var foo = 5;
      `,
      options: [
        {
          "VariableDeclaration[kind='var']": "No var please >:(",
        },
      ],
      errors: [
        {
          message: "No var please >:(",
        },
      ],
    },
    {
      code: dedent`
        shit;
      `,
      options: [
        {
          "Identifier[name='shit']": (node) =>
            `Don't swear please ('${node.name}')`,
        },
      ],
      errors: [
        {
          message: "Don't swear please ('shit')",
        },
      ],
    },
    {
      code: dedent`
        // idk lol
        lol;
      `,
      options: [
        {
          "Line[value=/lol/]": "such lol",
        },
      ],
      errors: [
        {
          message: "such lol",
        },
      ],
    },
  ],
});
