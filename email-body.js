import Button from "./button.js";

const EmailBody = ({ name, subject, date, body, handleFavoriteClick }) => {
  const emailBody = document.createElement("div");
  emailBody.classList.add("email-body");

  const emailBodyHeader = document.createElement("div");
  emailBodyHeader.classList.add("email-body-header");
  emailBody.appendChild(emailBodyHeader);

  const image = document.createElement("span");
  image.innerHTML = name[0];
  emailBodyHeader.appendChild(image);

  const emailBodyHeaderData = document.createElement("div");
  emailBodyHeaderData.classList.add("email-body-header-data");
  emailBodyHeader.appendChild(emailBodyHeaderData);

  const subjectData = document.createElement("h1");
  subjectData.innerHTML = subject;
  emailBodyHeaderData.appendChild(subjectData);

  const dateData = document.createElement("time");
  dateData.innerHTML = date;
  emailBodyHeaderData.appendChild(dateData);

  const favoritesButton = Button("Favorites", handleFavoriteClick);
  emailBodyHeader.appendChild(favoritesButton);

  const emailBodyContent = document.createElement("p");
  emailBodyContent.classList.add("email-body-content");
  emailBodyContent.innerHTML = body;
  emailBody.appendChild(emailBodyContent);

  return emailBody;
};

export default EmailBody;
