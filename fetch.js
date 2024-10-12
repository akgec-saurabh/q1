export const fetchEmails = async ({ page = 1 }) => {
  const response = await fetch(
    `https://flipkart-email-mock.now.sh/?page=${page}`
  );
  const data = await response.json();
  return data.list;
};

export const fetchEmailBody = async (id) => {
  const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
  const data = await response.json();
  return data.body;
};

export const fetchEmailsDetails = async ({ page = 1, id }) => {
  const response = await fetch(
    `https://flipkart-email-mock.now.sh/?page=${page}`
  );
  const data = await response.json();
  console.log(data, page);

  const email = data.list.find((email) => email.id === id);
  return { subject: email.subject, date: email.date, name: email.from.name };
};
