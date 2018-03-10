import { Injectable } from '@angular/core';
import {Map} from "leaflet";

@Injectable()
export class MapService {
  public map: Map;
  constructor() { }

     public baseMaps = [
         //googleSattelite: 
            {   name: "googleSattelite", 
                tile: L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{ maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']}),
                icon: '../../assets/icons/satellitenbild.png',
                description: "SATTELITE",
            }, 
         //googleRelief:
            {   name: "googleRelief",
                tile: L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{ maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'] }),
                icon: '../../assets/icons/relief_maps4free.png',
                description: "RELIEF",
            },  
         //thunderforestLandscape:
            {   name: "thunderforestLandscape", 
                tile: L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=ce1b82f48efd47b6bc58e40d7aeec1bb', { maxZoom: 20 }),
                icon: '../../assets/icons/thunderforest_landscape.png',
                description: "LANDSCAPE",
            }, 
         //esriWorldTopoMap:
            {   name: "esriWorldTopoMap", 
                tile: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri', maxZoom: 20 }),
                icon: '../../assets/icons/esri_world_topomap.png',
                description: "TOPO MAP",
            },  
         //openStreetMap:
            {   name: "openStreetMap", 
                tile: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }),
                icon: '../../assets/icons/openstreetmap_de.png',
                description: "OSM",
            }, 
        ];
        
} // Map Service Class


