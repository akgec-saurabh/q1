import Button from "./button.js";
import { fetchEmailBody, fetchEmails, fetchEmailsDetails } from "./fetch.js";
import EmailItem from "./email-item.js";
import EmailBody from "./email-body.js";
import Pagination from "./pagination.js";

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

const emailList = document.createElement("div");
emailList.classList.add("email-list");
root.appendChild(emailList);

const renderEmails = (emails) => {
  emails.forEach((email) => {
    const emailItem = EmailItem({
      ...email,
      onClick: () => handleEmailClick(email.id),
    });
    emailList.appendChild(emailItem);
  });
};

const handleEmailClick = async (id) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set("id", id);
  window.history.pushState({}, "", `?${urlSearchParams.toString()}`);
  emailBodyContainer.innerHTML = "";
  renderEmailBody(id);
};

renderEmails(await fetchEmails({ page: 1 }));

const emailBodyContainer = document.createElement("div");
emailBodyContainer.classList.add("email-body");
root.appendChild(emailBodyContainer);

const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

const renderEmailBody = async (id) => {
  const { subject, date, name } = await fetchEmailsDetails({ id });
  const body = await fetchEmailBody(id);
  const emailBody = EmailBody({ name, subject, date, body });
  emailBodyContainer.appendChild(emailBody);
};

if (urlSearchParams.has("id")) {
  renderEmailBody(id);
}

addEventListener("popstate", () => {
  console.log("popstate");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  if (id) {
    renderEmailBody(id);
  }
});
