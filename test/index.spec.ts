/* eslint-disable no-console */
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

describe('index', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    import('../src/index');
  });

  it('should return the help', () => {
    // @ts-ignore
    expect(console.log.mock.calls[0][0]).toMatchSnapshot();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(0);
  });
});
