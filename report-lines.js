function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(lines, aCustomer) {
  lines.push(['name', aCustomer.name]);
  lines.push(['location', aCustomer.location]);
}

module.exports = { reportLines, gatherCustomerData };
