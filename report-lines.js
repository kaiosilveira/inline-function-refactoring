function reportLines(aCustomer) {
  const lines = [];
  lines.push(['name', aCustomer.name]);
  lines.push(['location', aCustomer.location]);
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(lines, aCustomer) {}

module.exports = { reportLines, gatherCustomerData };
