const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // This configuratio server for development.
    return {
      env: {
        mongodb_url: "mongodb://localhost:27017",
        data_base: "nextjs-event-comments",
      },
    };
  }
  return {
    env: {
      mongodb_url: "mongodb://localhost:27017",
      data_base: "nextjs-event-comments",
    },
  };
};
