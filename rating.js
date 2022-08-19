function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}

module.exports = { getRating };
