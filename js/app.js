function initOpenLayers() {
  var projection = ol.proj.get('EPSG:900913');
  var projectionExtent = projection.getExtent();
  var size = ol.extent.getWidth(projectionExtent) / 256;
  var n = 26;
  var resolutions = new Array(n);
  var matrixIds = new Array(n);
  for (var z = 0; z < n; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = 'EPSG:900913:' + z;
  }

  map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.WMTS({
          url: 'http://demo.opengeo.org/geoserver/gwc/service/wmts/',
          layer: 'osm:osm',
          matrixSet: 'EPSG:900913',
          format: 'image/png',
          projection: projection,
          tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
          }),
          style: '_null',
          extent: [-16643092.788385,4534550.2653588,-5988382.5431409,11207197.085613]
        })
      })
    ],
    target: 'map',
    ol3Logo: false,
    view: new ol.View2D({
      center: [-13684979.794159984, 6302920.914480455],
      zoom: 11
    })
  });
}