import Button from "./button.js";
import { fetchEmailBody, fetchEmails, fetchEmailsDetails } from "./fetch.js";
import EmailItem from "./email-item.js";
import EmailBody from "./email-body.js";
import Pagination, { getCurrentPage } from "./pagination.js";

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
      onClick: () => handleEmailClick({ id: email.id, page: getCurrentPage() }),
    });
    emailList.appendChild(emailItem);
  });
};

const handleEmailClick = async ({ id, page }) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set("id", id);
  window.history.pushState({}, "", `?${urlSearchParams.toString()}`);
  emailBodyContainer.innerHTML = "";
  renderEmailBody({ id, page });
};

const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");
const page = parseInt(urlSearchParams.get("page"));

renderEmails(await fetchEmails({ page: page || 1 }));

const emailBodyContainer = document.createElement("div");
emailBodyContainer.classList.add("email-body");
root.appendChild(emailBodyContainer);

const renderEmailBody = async ({ id, page }) => {
  const { subject, date, name } = await fetchEmailsDetails({ page, id });
  const body = await fetchEmailBody(id);
  const emailBody = EmailBody({ name, subject, date, body });
  emailBodyContainer.appendChild(emailBody);
};

if (urlSearchParams.has("id")) {
  renderEmailBody({ id, page });
}

const handlePrev = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  let page = parseInt(urlSearchParams.get("page"));
  urlSearchParams.delete("id");
  if (!page || page === 1) {
    page = 1;
  }
  urlSearchParams.set("page", page - 1);
  window.history.pushState({}, "", `?${urlSearchParams.toString()}`);
  renderEmails(await fetchEmails({ page: page - 1 }));
};
const handleNext = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.delete("id");
  let page = parseInt(urlSearchParams.get("page"));
  if (!page) {
    page = 1;
  }

  urlSearchParams.set("page", page + 1);
  window.history.pushState({}, "", `?${urlSearchParams.toString()}`);
  renderEmails(await fetchEmails({ page: page + 1 }));
};

const pagination = Pagination({
  page: 1,
  totalPages: 10,
  onPrev: handlePrev,
  onNext: handleNext,
});
root.appendChild(pagination);
