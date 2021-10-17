const { stdin, stdout } = require('process');
const stream = require('stream');

class ReverseStream extends stream.Transform {
  _transform(chunk, encoding, callback) {
    const str = chunk.toString().replace('\n', '');
    const reverseStr = str.split('').reverse().join('');

    this.push(`${reverseStr}\n\n`);
    callback();
  }
}

const transformStream = new ReverseStream();

stdin.pipe(transformStream).pipe(stdout);
