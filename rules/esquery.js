const esquery = require("@suchipi/esquery").configure({
  getKeys(node) {
    return Object.keys(node);
  },
});

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      category: "suggestion",
      description: "User-configurable rule to disallow certain patterns.",
      url:
        "https://github.com/suchipi/eslint-plugin-esquery/tree/master/README.md",
    },
    schema: [
      {
        type: "object",
        properties: {},
        additonalProperties: true,
      },
    ],
  },
  create: function(context) {
    return {
      Program(programNode) {
        const config = context.options[0] || {};

        Object.keys(config).forEach((key) => {
          let matches = [];

          programNode.body.concat(programNode.comments).forEach((node) => {
            matches = matches.concat(esquery.query(node, key));
          });

          matches.forEach((node) => {
            const description =
              typeof config[key] === "function"
                ? config[key](node, programNode)
                : config[key];
            context.report(node, description);
          });
        });
      },
    };
  },
};
