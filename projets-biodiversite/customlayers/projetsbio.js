{
  // Définition des variables realtives à la couche.
  const GEOSERVER_URL = "https://geobretagne.fr/geoserver";
  const WORKSPACE = "abb";
  const LAYER = "projets_biodiversite";
  const LAYER_URL = `${GEOSERVER_URL}/${WORKSPACE}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeNames=${LAYER}&outputFormat=application/json&srsName=EPSG:4326`;
  // Définition de la variable customlayer. 
  const LAYER_ID = "projets_biodiversite";

  // Function to pattern Hatch

  function createHatchPattern(color = 'black', spacing = 3, direction = 'diagonal') {
  const canvas = document.createElement('canvas');
  const size = spacing * 2; // Taille du motif liée à l'espacement
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = color;
  ctx.lineWidth = 0.7;

  ctx.beginPath();

  switch (direction) {
    case 'diagonal': // ↘
      ctx.moveTo(0, 0);
      ctx.lineTo(size, size);
      break;

    case 'anti-diagonal': // ↙
      ctx.moveTo(size, 0);
      ctx.lineTo(0, size);
      break;

    case 'horizontal':
      ctx.moveTo(0, size / 2);
      ctx.lineTo(size, size / 2);
      break;

    case 'vertical':
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size / 2, size);
      break;

    default:
      ctx.moveTo(0, 0);
      ctx.lineTo(size, size);
  }

  ctx.stroke();

  return ctx.createPattern(canvas, 'repeat');
}

const hatchFill = new ol.style.Fill({
  color: createHatchPattern('#267687', 3, 'diagonal'),
});

const hatchFill2 = new ol.style.Fill({
  color: createHatchPattern('#3dbea4', 3, 'anti-diagonal'),
});

  // Style des entités.
  const legend = {
    items: [
      {
        label: "SafN",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            zIndex: 5,
            stroke: new ol.style.Stroke({ color: "rgba(27, 33, 141, 1)", width: 1 }),
            fill: new ol.style.Fill({ color: "rgba(27, 33, 141, 0.7)" }),
          }),
        ],
      },
      {
        label: "Stratégie - plan d'actions",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            zIndex: 2,
            stroke: new ol.style.Stroke({ color: "rgba(61, 190, 164, 1)", width: 1 }),
            fill: hatchFill2,
          }),
        ],
      },
      {
        label: "TEN",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            zIndex: 4,
            stroke: new ol.style.Stroke({ color: "rgba(229, 217, 53, 1)", width: 1 }),
            fill: new ol.style.Fill({ color: "rgba(229, 217, 53, 0.7)" }),
          }),
        ],
      },
      {
        label: "TVB",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            zIndex: 6,
            stroke: new ol.style.Stroke({ color: "rgba(38, 118, 135, 1)", width: 1 }),
            fill: hatchFill,
          }),
        ],
      },
      {
        label: "ABC",
        geometry: "Polygon",
        styles: [
          new ol.style.Style({
            zIndex: 3,
            stroke: new ol.style.Stroke({ color: "rgba(186, 224, 82, 1)", width: 1 }),
            fill: new ol.style.Fill({ color: "rgba(186, 224, 82, 0.8)" }),
          }),
        ],
      },
      {
        label: "AME",
        geometry: "Point",
        styles: [
          new ol.style.Style({
            zIndex: 8,
            image: new ol.style.Circle({
              fill: new ol.style.Fill({
                color: "#0025FF",
              }),
              stroke: new ol.style.Stroke({
                color: "#ffffff",
                width: 3,
              }),
              radius: 6,
            }),
          }),
        ],
      },
      {
        label: "ATE",
        geometry: "Point",
        styles: [
          new ol.style.Style({
            zIndex: 7,
            image: new ol.style.Circle({
              fill: new ol.style.Fill({
                color: "rgba(67, 215, 150, 1)",
              }),
              stroke: new ol.style.Stroke({
                color: "#ffffff",
                width: 3,
              }),
              radius:6,
            }),
          }),
        ],
      }
    ],
  };

  //Appel de la donnée
  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: LAYER_URL,
      format: new ol.format.GeoJSON(),
    }),
    //Analyse thématique ici sur l'attribut secteur_li
    style: function (feature, resolution) {
      var stl;      
      if (feature.get("type_projet")) {        
        switch (feature.get("type_projet")) {        
        case "Solutions d'adaptation fondées sur la Nature":
            stl = legend.items[0].styles;
            break;
        case "Stratégie – plan d’actions":
            stl = legend.items[1].styles;
            break;
        case "Territoires Engagés pour la Nature":
            stl = legend.items[2].styles;
            break;
        case "Projet TVB - Diag et plan d'actions":
            stl = legend.items[3].styles;
            break;
        case "Projet TVB - Phase opérationnelle":
            stl = legend.items[3].styles;
            break;
        case "Atlas de la Biodiversité Communale et Intercommunale":
            stl = legend.items[4].styles;
            break;
        case "Aire marine éducative":
            stl = legend.items[5].styles;
            break;
        case "Aire terrestre éducative":
            stl = legend.items[6].styles;
            break;
        }
      }
      return stl;
    },
  });
  handle = false;
  new CustomLayer(LAYER_ID, layer, legend);
}
