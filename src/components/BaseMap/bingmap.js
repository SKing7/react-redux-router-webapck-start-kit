const KEY = 'Ati0nhXDrwdHqcauJHAzRHmJbpopSrx5HqJkivElb7dz6OgIxQnngQk6_0DazoyX';
import ol from 'openlayers';

export const RoadLayer = new ol.layer.Tile({
  preload: Infinity,
  source: new ol.source.BingMaps({
    key: KEY,
    imagerySet: 'Road'
  })
});

export const AerialLayer = new ol.layer.Tile({
  preload: Infinity,
  source: new ol.source.BingMaps({
    key: KEY,
    imagerySet: 'Aerial',
  })
});

