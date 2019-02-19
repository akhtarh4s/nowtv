import { getMessages, getMembers } from "./data.js";

export default async function getChatLog() {
  let messages = await getMessages();

  messages = messages.sort((x, y) => {
    let date1 = new Date(x.timestamp);
    let date2 = new Date(y.timestamp);
    return date2 - date1;
  });

  let members = await getMembers();
  let logs = [];

  messages.map(message => {
    let member = members.find(m => m.id === message.userId);
    let log = {
      messageId: message.id,
      userId: member.id,
      fullName: member.firstName + " " + member.lastName,
      humanTime:
        message.timestamp.replace("Z", "").split("T")[1] +
        " - " +
        message.timestamp.split("-", 3)[2].split("T")[0] +
        "/" +
        message.timestamp.split("-", 2)[1] +
        "/" +
        message.timestamp.split("-")[0],
      timestamp: message.timestamp,
      email: member.email,
      message: message.message,
      avatar: member.avatar
    };

    logs.push(log);
  });

  return Promise.resolve(logs);
}
