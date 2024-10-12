import Button from "./button.js";

const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  const pagination = document.createElement("div");

  const previousButton = Button({
    text: "Previous",
    onClick: onPrev,
  });
  pagination.appendChild(previousButton);

  const pageNumber = document.createElement("span");
  pageNumber.innerHTML = page;
  pagination.appendChild(pageNumber);

  const of = document.createElement("span");
  of.innerHTML = `of ${totalPages}`;
  pagination.appendChild(of);

  const nextButton = Button({ text: "Next", onClick: onNext });
  pagination.appendChild(nextButton);

  return pagination;
};

export default Pagination;

export const getCurrentPage = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return parseInt(urlSearchParams.get("page")) || 1;
};
