import React from 'react';
import * as ol from 'openlayers';
import 'openlayers/css/ol.css';
import styles from './BaseMap.scss';
import * as TianMapLayer from './tianmap';
import * as BingMapLayer from './bingmap';


const app = {};
const MAX_ZOOM = 18;
const MIN_ZOOM = 5;


class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
    this.state = {
    };
  }

  componentDidMount() {

    this.options.view = new ol.View({
      projection: 'EPSG:4326',
      center: [115.419424103804, 37.3923711993825],
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      zoom: 8
    });

    this.options.controls = [
      new ol.control.Zoom()
    ];
    this.initLayers();

    this.map = new ol.Map(this.options);

    this.bindEvent();
    this.pointerVisibility = true;
  }

  componentWillUpdate(props) {
  }

  initLayers() {

    this.options.layers = [
      BingMapLayer.AerialLayer,
      new ol.layer.Tile({
        zIndex: 2,
        source: new ol.source.TileWMS({
        url: '/geoserver/demo_publish_tiff/wms',
          params: { LAYERS: 'hbxm_base_map' },
        }),
      }),
      TianMapLayer.RoadLayer
    ];

    this.options.layers.push(new ol.layer.Group({
      name: 'target-layers',
      layers: [],
    }));
  }

  bindEvent() {
    this.map.getView().on('change:resolution', (e) => {
    });

    this.map.on('moveend', (e) => {
    });
  }

  render() {
    return (
      <div className={`agro-map agro-window ${styles.wrapper}`} ref={(e) => { this.options.target = e; }}>
        { this.props.children }
      </div>
    );
  }
}


export default BaseMap;
