import { parse, Parser } from 'csv-parse';

export interface CSVRow {
  number: string;
  name: string;
  country: string;
}
export interface SurferData {
  name: string;
  country: string;
}

export function parseSurfers(): Parser {
  return parse({ columns: true }, function (err, records) {
    if (Boolean(err)) throw new Error(err?.message);
    for (let index = 0; index < 3; index++) {
      const element = records[index];
      // Each row of the CSV represents a single Pokemon extract the
      // name, description, type, attack, defense, speed, and number.
      const name = element.Surfer as string;
      const country = element.Country as string;
      return { name, country };
    }
  });
}
