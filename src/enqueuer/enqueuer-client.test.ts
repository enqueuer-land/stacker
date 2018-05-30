
describe('test example', () => {
  it('it description', () => {
    expect(true).toBeTruthy();
  });

  it('Another test', () => {
    expect(false).toBeFalsy();
  });

  it('test descrption', () => {
    expect(() => { throw new Error('Corsino') }).toThrow();
  });

});