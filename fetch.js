export const fetchEmails = async ({ page = 1 }) => {
  const response = await fetch(
    `https://flipkart-email-mock.now.sh/?page=${page}`
  );
  const data = await response.json();
  return data.list;
};
