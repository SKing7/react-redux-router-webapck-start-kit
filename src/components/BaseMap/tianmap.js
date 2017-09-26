import ol from 'openlayers';

const projectionExtent = ol.proj.get('EPSG:4326').getExtent();
const size = ol.extent.getWidth(projectionExtent) / 256;
const resolutions = new Array(18);
const matrixIds = new Array(14);

for (let z = 0; z < 18; ++z) {
  resolutions[z] = size / (2 ** z);
  matrixIds[z] = z;
}

export const RoadLayer = new ol.layer.Tile({
  name: 'road-layer',
  cacheSize: 4096,
  //visible: this.props.roadLayer,
  zIndex: 10,
  source: new ol.source.WMTS({
    url: 'http://t0.tianditu.cn/cia_c/wmts',
    layer: 'cia',
    format: 'tiles',
    style: 'default',
    matrixSet: 'c',
    tileGrid: new ol.tilegrid.WMTS({
      origin: ol.extent.getTopLeft(projectionExtent),
      resolutions,
      matrixIds,
    }),
  }),
})

