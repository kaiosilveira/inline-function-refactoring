const { getRating } = require('./rating');

describe('rating', () => {
  it('should return 1 if the driver has less than five late deliveries', () => {
    const driver = { numberOfLateDeliveries: 4 };
    const rating = getRating(driver);
    expect(rating).toEqual(1);
  });

  it('should return 1 if the driver has five late deliveries', () => {
    const driver = { numberOfLateDeliveries: 5 };
    const rating = getRating(driver);
    expect(rating).toEqual(1);
  });

  it('should return 2 if the driver has more than five late deliveries', () => {
    const driver = { numberOfLateDeliveries: 6 };
    const rating = getRating(driver);
    expect(rating).toEqual(2);
  });
});
