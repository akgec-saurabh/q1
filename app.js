import Button from "./button.js";
import { fetchEmails } from "./fetch.js";
import EmailItem from "./email-item.js";

const root = document.getElementById("root");
const header = document.getElementById("header");

const nav = document.createElement("nav");
const filter = document.createElement("span");
filter.innerHTML = "Filter :";

const handleUnread = () => {};
const handleRead = () => {};
const handleFavorites = () => {};

const unreadButton = Button({ text: "Unread", onClick: handleUnread });
const readButton = Button({ text: "Read", onClick: handleRead });
const favoritesButton = Button({ text: "Favorites", onClick: handleFavorites });

nav.append(filter, unreadButton, readButton, favoritesButton);
header.appendChild(nav);

const renderEmails = (emails) => {
  emails.forEach((email) => {
    const emailItem = EmailItem(email);
    root.appendChild(emailItem);
  });
};

renderEmails(await fetchEmails({ page: 1 }));
