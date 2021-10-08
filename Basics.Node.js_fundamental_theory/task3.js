import path from 'path';
import { pipeline } from 'stream';
import csv from 'csvtojson';
import fs from 'fs';

const INPUT_FILENAME = 'csv/nodejs-hw1-ex1.csv';
const OUTPUT_FILENAME = 'csv/output.txt';

const inputPath = path.join(__dirname, INPUT_FILENAME);
const outputPath = path.join(__dirname, OUTPUT_FILENAME);

pipeline(
  csv({ delimiter: ';' })
    .fromFile(inputPath)
    .subscribe((json) => {
      delete json['Amount'];
    }),
  fs.createWriteStream(outputPath),
  (err) => {
    if (err) {
      console.error('Processing file failed.', err);
    }
  },
);
