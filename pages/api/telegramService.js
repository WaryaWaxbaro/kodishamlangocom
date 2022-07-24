export default function handler(req, res) {
  let { host, cookie } = req.headers;
  let { message } = req.body;
  let bot_token = process.env.BOT_TOKEN;
  let bot_chat_id = process.env.BOT_CHAT_ID;
  let current_host = process.env.CURRENT_HOST;

  if (host !== current_host || !cookie) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (message) {
    let options = {
      method: "POST",
      uri: `https://api.telegram.org/bot${bot_token}/sendMessage`,
      body: {
        chat_id: bot_chat_id,
        text: message,
      },
      json: true,
    };

    request(options)
      .then((response) => {
        res.status(200).json({ message: "Message sent" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error sending message" });
      });
  } else {
    res.status(400).json({ message: "Message is required" });
  }
}
