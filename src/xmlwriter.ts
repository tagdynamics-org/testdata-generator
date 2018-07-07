// Helper methods to output OSM XML. See,
//  https://wiki.openstreetmap.org/wiki/OSM_XML

export function xmlPre() {
  const line1 = '<?xml version="1.0" encoding="UTF-8"?>';
  const line2 = '<osm version="0.6" generator="https://github.com/tagdynamics-org/testdata-generator">';
  return `${line1}\n${line2}\n`;
}

export function xmlPost() {
  return "</osm>\n";
}

export function toXML({ id, type, version, ts, changeset, user, uid, lat, lon, visible, tags }): string {
  let output = "";

  output += `id="${id}" lat="${lat}" lon="${lon}" user="${user}" uid="${uid}" visible="${visible}" `;
  output += `version="${version}" timestamp="${new Date(ts * 1000).toISOString()}" `;
  output += `changeset="${changeset}" `;

  if (type !== "node") {
    throw new Error("Only nodes are supported for now");
  }

  const tagKeys: string[] = Object.keys(tags);
  if (tagKeys.length === 0) {
    output = `  <node ${output}/>\n`;
  } else {
    output = `  <node ${output}>\n`;
    tagKeys.forEach((tag) => {
      output += `    <tag k="${tag}" v="${tags[tag]}"/>\n`;
    });
    output += "  </node>\n";
  }
  return output;
}
