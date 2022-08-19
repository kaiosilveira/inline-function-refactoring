function reportLines(aCustomer) {
  const lines = [];
  lines.push(['name', aCustomer.name]);
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(lines, aCustomer) {
  lines.push(['location', aCustomer.location]);
}

module.exports = { reportLines, gatherCustomerData };
