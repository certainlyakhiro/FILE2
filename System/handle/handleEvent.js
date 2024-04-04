module.exports = async function ({ ...entryObj }) {
  const { events } = global.Akhiro;
  const { api, event, box } = entryObj;

  try {
    for (const { metadata, onEvent } of events.values()) {
      if (event && metadata.name) {
        const args = event.body?.split("");
        await onEvent({
          ...entryObj,
          args
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
