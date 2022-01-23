export function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  let formattedDate = yyyy + "-" + mm + "-" + dd;
  return formattedDate;
}

function sortTimeStamp(responseData) {
  responseData.sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });
}

export function isFuture(requestDate) {
  if (Date.parse(requestDate) >= Date.now()) return true;
}

export default formatDate;
