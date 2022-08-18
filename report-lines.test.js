const { reportLines } = require('./report-lines');

describe('reportLines', () => {
  it('should return the name and location lines for a given customer', () => {
    const aCustomer = { name: 'Kaio', location: 'Lisbon' };
    const result = reportLines(aCustomer);
    expect(result).toHaveLength(2);

    const [nameField, nameValue] = result[0];
    expect(nameField).toEqual('name');
    expect(nameValue).toEqual(aCustomer.name);

    const [locationField, locationValue] = result[1];
    expect(locationField).toEqual('location');
    expect(locationValue).toEqual(aCustomer.location);
  });
});
