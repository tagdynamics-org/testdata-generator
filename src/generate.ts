const fs = require("fs");
import { toXML, xmlPre, xmlPost } from "./xmlwriter";

/**
 * --- Various utility functions ---
 */

/** n -> [1,2,..., n] */
const makeRange = (length) => {
  const buffer = [];
  for (let i = 1; i <= length; i++) {
    buffer.push(i);
  }
  return buffer;
};

/** Return a random integer in range [valueMin, ..., valueMax] */
function random(valueMin: number, valueMax: number): number {
  return valueMin + Math.round(Math.random() * (valueMax - valueMin));
}

/**
 * --- Various parameters for generating synthetic map revision data ---
 */

// Number of versions per map element
const getNrVersions = () => random(1, 10);

// Generate random timestamps for revisions so we have both multiple edits on
// the same day and over several days.
function getFirstTimestamp(): number {
  const epochSec0 = new Date(2010, 1, 1).getTime() / 1000;
  const epochSec1 = new Date(2015, 1, 1).getTime() / 1000;
  return random(epochSec0, epochSec1);
}

function deltaTimestamp(): number {
  const secsInHour = 60 * 60;

  if (Math.random() < 0.20) {
    // short time between revisions < one day
    return random(secsInHour, secsInHour * 12);
  }
  return random(secsInHour * 20, secsInHour * 24 * 30);
}

/** Tag key and value generators */
const getRandomTagKey = () => `k${random(1, 10)}`;
const getRandomTagValue = () => `v${random(1, 5)}`;

function getRandomTags(): {[_: string]: string} {
  const result: {[_: string]: string} = {};

  makeRange(random(0, 10)).forEach(() => {
    result[getRandomTagKey()] = getRandomTagValue();
  });

  return result;
}

function evolveTag(tags: {[_: string]: string}): {[_: string]: string} {
  const result = {};

  // randomly modify/delete any existing tags
  Object.keys(tags).forEach(
    (key: string) => {
      const value = tags[key];
      if (Math.random() < 0.30) {
        // keep key-value unchanged
        result[key] = value;
      } else {
        if (Math.random() < 0.50) {
          // new value
          result[key] = getRandomTagValue();
        }
        // delete key-value
      }
    });

  // randomly add new tags
  makeRange(random(0, 2)).forEach(() => {
    const newTagKey: string = getRandomTagKey();
    if (Object.keys(result).indexOf(newTagKey) === -1) {
      result[newTagKey] = getRandomTagValue();
    }
  });

  return result;
}

/**
 * Evolve visible state:
 *  - If currently hidden switch to visible (do not allow two consequtive revisions
 *    to both be hidden).
 *  - If visible, allow state to switch to hidden.
 */
function evolveVisible(visible: boolean): boolean {
  return !visible ? true : Math.random() < 0.85;
}

/**
 * --- Main part ---
 */

const outputFile = process.env.npm_config_output_file;
const nrNodes = parseInt(process.env.npm_config_nodes, 10);

if (!outputFile) {
  console.log("Run as npm run create-test-data --output-file=.. --nodes=<nodes>");
  process.exit(1);
}

console.log(" *** osm-testdata-generator ***");
console.log(` - output file ${outputFile}`);
console.log(` - number of nodes ${outputFile}`);

const outputStream = fs.createWriteStream(outputFile, {});

/** Do not include tag list if revision is deleted. */
function possiblyHideTags(dict) {
  if (dict.visible) {
    return dict;
  } else {
    const res = JSON.parse(JSON.stringify(dict));
    res.tags = {};
    return res;
  }
}

outputStream.write(xmlPre());

["node"].forEach((type) => {
  makeRange(nrNodes).forEach((id) => {
    let ts = getFirstTimestamp();
    let tags = getRandomTags();
    let visible: boolean = true; // first version is visible

    makeRange(getNrVersions()).forEach((version) => {
      const userId = random(1, 1000000);
      const mapRevision = {
        id, type,
        version,
        ts,
        changeset: random(1, 2000),
        user: `user:${userId}`,
        uid: userId,
        lat: (Math.random() - 0.5) * 80,
        lon: (Math.random() - 0.5) * 180,
        visible,
        tags,
      };

      outputStream.write(toXML(possiblyHideTags(mapRevision)));
      ts += deltaTimestamp();
      visible = evolveVisible(visible);
      tags = evolveTag(tags);
    });
  });
});

outputStream.write(xmlPost());
outputStream.end();

console.log(" - Done");
