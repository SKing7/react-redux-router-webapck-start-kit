import React from 'react';
import * as ol from 'openlayers';
import 'openlayers/css/ol.css';
import styles from './BaseMap.scss';
import * as TianMapLayer from './tianmap';
import * as BingMapLayer from './bingmap';
import MapControllerPanel from '../MapControllerPanel'; 


const app = {};
const MAX_ZOOM = 18;
const MIN_ZOOM = 5;


class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
    this.state = {
      controllerType: ''
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
  resetDrawBox() {
    this.map.removeInteraction(this.drawBox);
    this.drawBox = null;
    this.map.getLayers().forEach((layer) => {
      if (layer && layer.get('name') === 'draw-polygon-layer') {
        this.map.removeLayer(layer);
      }
    });
    controlDoubleClickZoom(false, this.map);
    setTimeout(() => controlDoubleClickZoom(true, this.map), 251);
  }
  handleControllerChange(type, status) {
    // TODO hack 解决tab之间切换，没有触发上个tab的cancel事件
    this.resetDrawBox();
    if (status) {
      if (type === 'polygon') {
        const drawBox = new ol.interaction.Draw({
          source: this.drawPolygonSource,
          type: 'Polygon',
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#b6cdff',
              width: 4
            })
          })
        });

        drawBox.on('drawend', (e) => {
          var coord = e.feature.getGeometry().getCoordinates();
          this.resetDrawBox();
          this.mapControllerPanel.getInstance().resetController();
        });
        this.drawBox = drawBox;
        this.map.addInteraction(drawBox);
      }
    }
  }
  initLayers() {

    const source = new ol.source.Vector({wrapX: false});
    const vector = new ol.layer.Vector({
      name: 'draw-polygon-layer',
      source: source
    });

    this.options.layers = [
      BingMapLayer.AerialLayer,
      new ol.layer.Tile({
        zIndex: 2,
        source: new ol.source.TileWMS({
        url: '/geoserver/demo_publish_tiff/wms',
          params: { LAYERS: 'hbxm_base_map' },
        }),
      }),
      TianMapLayer.RoadLayer,
      vector
    ];

    this.options.layers.push(new ol.layer.Group({
      name: 'target-layers',
      layers: [],
    }));
    this.drawPolygonSource = source;
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
        <div className="map-controller-wrapper">
          <MapControllerPanel ref={(comp) => { this.mapControllerPanel = comp }} onChange={this.handleControllerChange.bind(this)}/>
        </div>
      </div>
    );
  }
}

function controlDoubleClickZoom(active, map){
  var interactions = map.getInteractions();
  for (var i = 0; i < interactions.getLength(); i++) {
    var interaction = interactions.item(i);                          
    if (interaction instanceof ol.interaction.DoubleClickZoom) {
      interaction.setActive(active);
    }
  }
}

export default BaseMap;
