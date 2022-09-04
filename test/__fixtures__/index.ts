import is from 'is-lite';

export default function checkTypes() {
  return [
    {
      value: 'foo',
      isString: is.string('foo'),
    },
    {
      value: ['foo'],
      isArray: is.array(['foo']),
    },
  ];
}
