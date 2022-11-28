import fs from 'fs';
import path from 'path';

import { parse } from 'csv-parse';
import dotenv from 'dotenv';
import { NFTStorage, File } from 'nft.storage';
import voca from 'voca';

dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;
const SURFER_CSV_PATH = path.join(__dirname, '../assets/surfer_metadata.csv');

const SURFER_PHOTO_PATH = path.join(__dirname, '../assets/surfer-images/');
// Process CSV file
const parser = parse({ columns: true }, async function (err, records) {
  if (Boolean(err)) throw err;
  for (let index = 0; index < 3; index++) {
    const element = records[index];
    // Each row of the CSV represents a single Pokemon extract the
    // name, description, type, attack, defense, speed, and number.
    const name = element.Surfer as string;
    const country = element.Country as string;
    const picture = `${SURFER_PHOTO_PATH}${voca.snakeCase(name)}.png`;
    const description = '';

    const attributes = createAttributes(country);
    // store the metadata for this Pokemon
    await storeAsset(name, description, attributes, picture);
  }
});

fs.createReadStream(SURFER_CSV_PATH).pipe(parser);

function createAttributes(country: string): string[] {
  const countryAttr = JSON.parse(`{ "trait_type": "Country", "value": "${country}" }`) as string;
  return [countryAttr];
}

// Store metadata for one Pokemon on IPFS
async function storeAsset(name: string, description: string, attributes: string[], picturePath: string): Promise<void> {
  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store({
    name,
    description: description,
    attributes: attributes,
    image: new File([await fs.promises.readFile(picturePath)], `${name}Photo.png`, { type: 'image/png' }),
  });
  console.log(`${name}: ${metadata.url}`);
}
