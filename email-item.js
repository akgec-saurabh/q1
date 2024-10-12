import Button from "./button.js";

const EmailItem = ({
  from,
  date,
  subject,
  short_description,
  isRead,
  isFavorite,
}) => {
  const emailItem = document.createElement("div");
  emailItem.classList.add("email-item");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("email-item-image");

  const image = document.createElement("span");
  image.innerHTML = from.name[0];
  imageContainer.appendChild(image);

  emailItem.appendChild(imageContainer);

  const dataContainer = document.createElement("div");
  dataContainer.classList.add("email-item-data");

  const fromContainer = document.createElement("div");
  const fromLabel = document.createElement("span");
  fromLabel.innerHTML = "From:";

  const fromValue = document.createElement("span");
  fromValue.innerHTML = `${from.name} &lt;${from.email}&gt;`;
  fromValue.classList.add("email-item-from-value");
  fromContainer.append(fromLabel, fromValue);
  dataContainer.appendChild(fromContainer);

  const subjectContainer = document.createElement("div");
  const subjectLabel = document.createElement("span");
  subjectLabel.innerHTML = "Subject:";

  const subjectValue = document.createElement("span");
  subjectValue.innerHTML = subject;
  subjectValue.classList.add("email-item-subject-value");
  subjectContainer.append(subjectLabel, subjectValue);
  dataContainer.appendChild(subjectContainer);

  const shortDescriptionContainer = document.createElement("p");
  shortDescriptionContainer.innerHTML = short_description;
  shortDescriptionContainer.classList.add("email-item-short-description");
  dataContainer.appendChild(shortDescriptionContainer);

  const dateContainer = document.createElement("div");
  const dateData = document.createElement("time");
  dateData.innerHTML = date;
  dateData.classList.add("email-item-date");
  dateContainer.appendChild(dateData);

  const favoritesButton = Button({
    text: isFavorite ? "Unfavorite" : "Favorite",
    onClick: () => {},
  });

  dateContainer.appendChild(favoritesButton);
  dataContainer.appendChild(dateContainer);

  emailItem.appendChild(dataContainer);

  if (!isRead) {
    emailItem.classList.add("email-item-unread");
  }

  return emailItem;
};

export default EmailItem;
