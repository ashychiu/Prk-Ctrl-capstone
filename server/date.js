export function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  let formattedDate = yyyy + "-" + mm + "-" + dd;
  return formattedDate;
}

module.exports = { formatDate };
