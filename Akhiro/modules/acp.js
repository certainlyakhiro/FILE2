module.exports = {
  metadata: {
    name: "acp",
    role: 2,
    author: "AkhiroDEV",
    hasPrefix: false,
    botAdmin: true,
    description: "Accepts the request from the user"
  },
  async onRun({ api, event, text, box }) {
    const moment = require("moment-timezone");

    const handleApprove = async (targetUID) => {
      const form = {
        av: api.getCurrentUserID(),
        fb_api_req_friendly_name: "FriendingCometFriendRequestConfirmMutation",
        doc_id: "3147613905362928",
        variables: JSON.stringify({
          input: {
            source: "friends_tab",
            actor_id: api.getCurrentUserID(),
            friend_requester_id: targetUID,
            client_mutation_id: Math.round(Math.random() * 19).toString(),
          },
          scale: 3,
          refresh_num: 0,
        }),
      };
      const success = [];
      const failed = [];
      try {
        const friendRequest = await api.httpPost(
          "https://www.facebook.com/api/graphql/",
          form
        );
        if (JSON.parse(friendRequest).errors) failed.push(targetUID);
        else success.push(targetUID);
      } catch (e) {
        failed.push(targetUID);
      }
      return { success, failed };
    };

    if (text[0] === "approve") {
      if (text.length !== 2 || isNaN(text[1])) {
        return box.reply(
          `Invalid syntax. Use: acc approve <UID>`);
      }
      const targetUID = text[1];
      const { success, failed } = await handleApprove(targetUID);
      if (success.length > 0) {
        box.reply(
          `Approved friend request for UID ${success.join(", ")}`);
      }
      if (failed.length > 0) {
        box.reply(
          `Failed to approve friend request for UID ${failed.join(", ")}`,
          event.threadID,
          event.messageID
        );
      }
      return;
    }

    if (text.includes("list")) {
      const form = {
        av: api.getCurrentUserID(),
        fb_api_req_friendly_name:
          "FriendingCometFriendRequestsRootQueryRelayPreloader",
        fb_api_caller_class: "RelayModern",
        doc_id: "4499164963466303",
        variables: JSON.stringify({ input: { scale: 3 } }),
      };
      try {
        const listRequest = JSON.parse(
          await api.httpPost("https://www.facebook.com/api/graphql/", form)
        ).data.viewer.friending_possibilities.edges;
        let msg = "";
        let i = 0;
        for (const user of listRequest) {
          i++;
          msg +=
            `\n${i}. Name: ${user.node.name}` +
            `\nID: ${user.node.id}` +
            `\nUrl: ${user.node.url.replace("www.facebook", "fb")}` +
            `\nTime: ${moment(user.time * 1000)
              .tz("Asia/Manila")
              .format("DD/MM/YYYY HH:mm:ss")}\n`;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await box.edit("Processing");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await box.reply(
          `${msg}\nApprove friend request using UID: acc approve <UID>`,
          event.threadID,
          event.messageID
        );
      } catch (error) {
        console.error("Error fetching friend requests:", error);
        box.reply(
          "Failed to fetch friend requests. Please try again later.",
          event.threadID,
          event.messageID
        );
      }
      return;
    }

    box.reply(
      `Invalid command. Use: acc approve <UID> or acc list to view pending friend requests.`,
      event.threadID,
      event.messageID
    );
  },
};