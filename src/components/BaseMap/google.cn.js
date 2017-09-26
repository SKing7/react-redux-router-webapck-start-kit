import ol from 'openlayers';

const RoadLayer = new ol.layer.Tile({
  name: 'road-layer',
  cacheSize: 4096,
  visible: props.roadLayer,
  zIndex: 10,
  source: new ol.source.XYZ({
    urls: [
      'http://mt0.google.cn/vt/imgtp=png32&lyrs=h@205000000&x={x}&y={y}&z={z}',
      'http://mt1.google.cn/vt/imgtp=png32&lyrs=h@205000000&x={x}&y={y}&z={z}',
      'http://mt2.google.cn/vt/imgtp=png32&lyrs=h@205000000&x={x}&y={y}&z={z}',
      'http://mt3.google.cn/vt/imgtp=png32&lyrs=h@205000000&x={x}&y={y}&z={z}',
    ]
  }),
});

export const RoadLayer;
