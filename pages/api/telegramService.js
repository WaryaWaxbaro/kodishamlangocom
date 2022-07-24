export default async function handler(req, res) {
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
    let url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${bot_chat_id}&text=${message}`;
    let options = {
      method: "POST",
      body: {},
      json: true,
    };

    await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(200).json({ message: "Message sent" });
  } else {
    res.status(400).json({ message: "Message is required" });
  }
}
