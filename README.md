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

## Example output

```xml
<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6" generator="https://github.com/tagdynamics-org/testdata-generator">
  <node id="1" lat="8.777569624453143" lon="-64.61018886501364" user="user:954411" uid="954411" visible="true" version="1" timestamp="2011-04-24T22:51:47Z" changeset="979" >
    <tag k="k10" v="v4"/>
    <tag k="k3" v="v4"/>
    <tag k="k9" v="v1"/>
    <tag k="k1" v="v4"/>
    <tag k="k5" v="v4"/>
  </node>
  <node id="1" lat="26.891512687619006" lon="72.81853960822097" user="user:614179" uid="614179" visible="false" version="2" timestamp="2011-04-30T21:13:37Z" changeset="1806" />
  <node id="1" lat="25.415733628726382" lon="64.6564632352781" user="user:208974" uid="208974" visible="true" version="3" timestamp="2011-05-27T08:52:50Z" changeset="459" >
    <tag k="k10" v="v2"/>
    <tag k="k9" v="v1"/>
    <tag k="k1" v="v5"/>
    <tag k="k5" v="v2"/>
    <tag k="k4" v="v2"/>
  </node>
  <node id="1" lat="-34.71022411780396" lon="15.296605141851597" user="user:673661" uid="673661" visible="true" version="4" timestamp="2011-06-05T17:23:28Z" changeset="30" >
    <tag k="k10" v="v3"/>
    <tag k="k9" v="v1"/>
    <tag k="k1" v="v5"/>
    <tag k="k5" v="v2"/>
    <tag k="k3" v="v4"/>
    <tag k="k7" v="v3"/>
  </node>
  <node id="2" lat="-22.24055836203025" lon="-47.29869159793307" user="user:453782" uid="453782" visible="true" version="1" timestamp="2010-10-22T20:53:22Z" changeset="435" >
    <tag k="k3" v="v1"/>
    <tag k="k7" v="v4"/>
    <tag k="k4" v="v1"/>
    <tag k="k2" v="v5"/>
  </node>
  ...
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
