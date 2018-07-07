# testdata-generator

When writing tools that process OpenStreetMap data, it usally useful to
have realistic testing data. `testdata-generator` is a utility to
generate synthetic (or random) OpenStreetMap data in XML format.

In particular, this data will not contain any private data that may be subject
to the [GDPR](https://gdpr-info.eu/). It will neither be restricted
by the [ODbL](https://www.openstreetmap.org/copyright).

## Notes

 - At the moment, the output contains only nodes (no ways, and no relations).
 - The output format mimics historical data dumps (the output XML file may contain multiple revisions for each node).
 - For further details about the OSM XML format, see the [osm wiki](https://wiki.openstreetmap.org/wiki/OSM_XML).

## Example output with two nodes

```
<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6" generator="https://github.com/tagdynamics-org/testdata-generator">
  <node id="1" lat="-31.01199178603734" lon="-23.28243891196546" user="user:877190" uid="877190" visible="true" version="1" timestamp="2014-02-17T05:26:31.000Z" changeset="1874" >
    <tag k="k3" v="v4"/>
    <tag k="k8" v="v2"/>
  </node>
  <node id="1" lat="7.681346776417115" lon="20.07010370630553" user="user:528535" uid="528535" visible="false" version="2" timestamp="2014-03-20T15:37:41.000Z" changeset="1213" />
  <node id="1" lat="29.623443261148612" lon="56.898029435431624" user="user:249698" uid="249698" visible="true" version="3" timestamp="2014-04-18T03:32:03.000Z" changeset="940" >
    <tag k="k6" v="v1"/>
  </node>
  <node id="2" lat="-17.0314741231641" lon="24.8830634664466" user="user:965015" uid="965015" visible="true" version="1" timestamp="2011-08-27T18:08:58.000Z" changeset="1470" >
    <tag k="k2" v="v4"/>
    <tag k="k3" v="v1"/>
    <tag k="k9" v="v3"/>
    <tag k="k4" v="v3"/>
  </node>
</osm>
```

## Running

```
  npm install
  npm run create-test-data --output-file=<filename.xml> --nodes=<number of nodes to output>
```

## Contributing

Ideas, questions or contributions are welcome. Please file an issue.

## License

Copyright 2018 Matias Dahl, distributed under the [MIT](LICENSE.md) license.
