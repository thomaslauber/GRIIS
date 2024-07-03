
// Load the national boundaries from GAUL 
var gaul_0 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
var gaul_1 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");

// Load the national boundaries from GADM for smaller island nations
var gadm_0 = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level0');
var gadm_1 = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level1');
var gadm_2 = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level2');
var gadm_3 = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level3');
var gadm_4 = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level4');

// Load the World Protected Areas
var wdpa = ee.FeatureCollection("WCMC/WDPA/current/polygons");

// Define some helper functions for big geometries 
var addVariables = function(element, griisCountryCode, checklist, level) {
  return ee.Feature(element).set('griisCountryCode', griisCountryCode)
                .set('checklist', checklist)
                .set('level', level);
};
var addVariablesWrapper = function(griisCountryCode, checklist, level) {
  return function(element) {
    return addVariables(element, griisCountryCode, checklist, level).select(['griisCountryCode','checklist','level']);
  };
};

Map.addLayer(gaul_0,{},'gaul_0',false)
  
// Get the geometries of the GRIIS checklists
var griis = gaul_1.filter(ee.Filter.and(ee.Filter.eq('ADM0_NAME','United States of America'),ee.Filter.neq('ADM1_NAME','Alaska'),ee.Filter.neq('ADM1_NAME','Hawaii'))).map(addVariablesWrapper('US_C', 'GRIIS', 0))
          .merge(gaul_1.filter(ee.Filter.eq('ADM1_NAME','Alaska')).map(addVariablesWrapper('US-AK', 'GRIIS', 0)))
          .merge(gaul_1.filter(ee.Filter.eq('ADM1_NAME','Hawaii')).map(addVariablesWrapper('US-HI', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Australia')).map(addVariablesWrapper('AU', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Japan')).map(addVariablesWrapper('JP', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Canada')).map(addVariablesWrapper('CA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Mexico')).map(addVariablesWrapper('MX', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Russian Federation')).map(addVariablesWrapper('RU', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','New Zealand')).map(addVariablesWrapper('NZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','China')).map(addVariablesWrapper('CN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Chile')).map(addVariablesWrapper('CL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Belgium')).map(addVariablesWrapper('BE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Norway')).map(addVariablesWrapper('NO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','France')).map(addVariablesWrapper('FR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','U.K. of Great Britain and Northern Ireland')).map(addVariablesWrapper('GB', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Denmark')).map(addVariablesWrapper('DK', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Sweden')).map(addVariablesWrapper('SE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','South Africa')).map(addVariablesWrapper('ZA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Austria')).map(addVariablesWrapper('AT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Poland')).map(addVariablesWrapper('PL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','India')).map(addVariablesWrapper('IN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Italy')).map(addVariablesWrapper('IT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Czech Republic')).map(addVariablesWrapper('CZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Ireland')).map(addVariablesWrapper('IE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Germany')).map(addVariablesWrapper('DE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Brazil')).map(addVariablesWrapper('BR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Turkey')).map(addVariablesWrapper('TR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Portugal')).map(addVariablesWrapper('PT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Estonia')).map(addVariablesWrapper('EE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Croatia')).map(addVariablesWrapper('HR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Israel')).map(addVariablesWrapper('IL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Spain')).map(addVariablesWrapper('ES', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Slovenia')).map(addVariablesWrapper('SI', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Ukraine')).map(addVariablesWrapper('UA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Latvia')).map(addVariablesWrapper('LV', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Slovakia')).map(addVariablesWrapper('SK', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Argentina')).map(addVariablesWrapper('AR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Madagascar')).map(addVariablesWrapper('MG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Bulgaria')).map(addVariablesWrapper('BG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Greece')).map(addVariablesWrapper('GR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Cyprus')).map(addVariablesWrapper('CY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Ecuador')).map(addVariablesWrapper('EC', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Cuba')).map(addVariablesWrapper('CU', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Singapore')).map(addVariablesWrapper('SG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Romania')).map(addVariablesWrapper('RO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Belarus')).map(addVariablesWrapper('BY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Lithuania')).map(addVariablesWrapper('LT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Egypt')).map(addVariablesWrapper('EG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Colombia')).map(addVariablesWrapper('CO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Libya')).map(addVariablesWrapper('LY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Georgia')).map(addVariablesWrapper('GE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Philippines')).map(addVariablesWrapper('PH', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Algeria')).map(addVariablesWrapper('DZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Switzerland')).map(addVariablesWrapper('CH', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Peru')).map(addVariablesWrapper('PE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Costa Rica')).map(addVariablesWrapper('CR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Guatemala')).map(addVariablesWrapper('GT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Indonesia')).map(addVariablesWrapper('ID', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Iceland')).map(addVariablesWrapper('IS', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Lebanon')).map(addVariablesWrapper('LB', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Venezuela')).map(addVariablesWrapper('VE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Netherlands')).map(addVariablesWrapper('NL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Dominican Republic')).map(addVariablesWrapper('DO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Honduras')).map(addVariablesWrapper('HN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Zimbabwe')).map(addVariablesWrapper('ZW', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Viet Nam')).map(addVariablesWrapper('VN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Democratic Republic of the Congo')).map(addVariablesWrapper('CD', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Papua New Guinea')).map(addVariablesWrapper('PG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Malaysia')).map(addVariablesWrapper('MY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Armenia')).map(addVariablesWrapper('AM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Timor-Leste')).map(addVariablesWrapper('TL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Jamaica')).map(addVariablesWrapper('JM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Malta')).map(addVariablesWrapper('MT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Swaziland')).map(addVariablesWrapper('SZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Bolivia')).map(addVariablesWrapper('BO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Bosnia and Herzegovina')).map(addVariablesWrapper('BA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','El Salvador')).map(addVariablesWrapper('SV', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME',"Lao People's Democratic Republic")).map(addVariablesWrapper('LA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Moldova, Republic of')).map(addVariablesWrapper('MD', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Panama')).map(addVariablesWrapper('PA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Namibia')).map(addVariablesWrapper('NA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Iran  (Islamic Republic of)')).map(addVariablesWrapper('IR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Albania')).map(addVariablesWrapper('AL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Kenya')).map(addVariablesWrapper('KE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Serbia')).map(addVariablesWrapper('RS', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Syrian Arab Republic')).map(addVariablesWrapper('SY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Angola')).map(addVariablesWrapper('AO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','United Arab Emirates')).map(addVariablesWrapper('AE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Nepal')).map(addVariablesWrapper('NP', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','United Republic of Tanzania')).map(addVariablesWrapper('TZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Zambia')).map(addVariablesWrapper('ZM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Burundi')).map(addVariablesWrapper('BI', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Chad')).map(addVariablesWrapper('TD', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Rwanda')).map(addVariablesWrapper('RW', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Mozambique')).map(addVariablesWrapper('MZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Tunisia')).map(addVariablesWrapper('TN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Yemen')).map(addVariablesWrapper('YE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Burkina Faso')).map(addVariablesWrapper('BF', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Sri Lanka')).map(addVariablesWrapper('LK', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Guyana')).map(addVariablesWrapper('GY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Malawi')).map(addVariablesWrapper('MW', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Hungary')).map(addVariablesWrapper('HU', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','French Guiana')).map(addVariablesWrapper('GF', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Trinidad and Tobago')).map(addVariablesWrapper('TT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Morocco')).map(addVariablesWrapper('MA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Iraq')).map(addVariablesWrapper('IQ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Thailand')).map(addVariablesWrapper('TH', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Myanmar')).map(addVariablesWrapper('MM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Uganda')).map(addVariablesWrapper('UG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Bhutan')).map(addVariablesWrapper('BT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Uzbekistan')).map(addVariablesWrapper('UZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Cambodia')).map(addVariablesWrapper('KH', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Cameroon')).map(addVariablesWrapper('CM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Belize')).map(addVariablesWrapper('BZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Pakistan')).map(addVariablesWrapper('PK', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Suriname')).map(addVariablesWrapper('SR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Saudi Arabia')).map(addVariablesWrapper('SA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Haiti')).map(addVariablesWrapper('HT', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Finland')).map(addVariablesWrapper('FI', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Liechtenstein')).map(addVariablesWrapper('LI', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Bangladesh')).map(addVariablesWrapper('BD', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Nigeria')).map(addVariablesWrapper('NG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Kyrgyzstan')).map(addVariablesWrapper('KG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Luxembourg')).map(addVariablesWrapper('LU', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Nicaragua')).map(addVariablesWrapper('NI', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Senegal')).map(addVariablesWrapper('SN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Brunei Darussalam')).map(addVariablesWrapper('BN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Qatar')).map(addVariablesWrapper('QA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Guadeloupe')).map(addVariablesWrapper('GP', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME',"Dem People's Rep of Korea")).map(addVariablesWrapper('KP', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Botswana')).map(addVariablesWrapper('BW', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Uruguay')).map(addVariablesWrapper('UY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Ghana')).map(addVariablesWrapper('GH', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Ethiopia')).map(addVariablesWrapper('ET', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Lesotho')).map(addVariablesWrapper('LS', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Paraguay')).map(addVariablesWrapper('PY', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME',"Côte d'Ivoire")).map(addVariablesWrapper('CI', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Svalbard and Jan Mayen Islands')).map(addVariablesWrapper('SJ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Faroe Islands')).map(addVariablesWrapper('FO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Sierra Leone')).map(addVariablesWrapper('SL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Turkmenistan')).map(addVariablesWrapper('TM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Montenegro')).map(addVariablesWrapper('ME', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Gabon')).map(addVariablesWrapper('GA', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Sudan')).map(addVariablesWrapper('SD', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Kazakhstan')).map(addVariablesWrapper('KZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Togo')).map(addVariablesWrapper('TG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Equatorial Guinea')).map(addVariablesWrapper('GQ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Guinea')).map(addVariablesWrapper('GN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Mongolia')).map(addVariablesWrapper('MN', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Republic of Korea')).map(addVariablesWrapper('KR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','The former Yugoslav Republic of Macedonia')).map(addVariablesWrapper('MK', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Central African Republic')).map(addVariablesWrapper('CF', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Azerbaijan')).map(addVariablesWrapper('AZ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Gambia')).map(addVariablesWrapper('GM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Oman')).map(addVariablesWrapper('OM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Kuwait')).map(addVariablesWrapper('KW', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Congo')).map(addVariablesWrapper('CG', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Benin')).map(addVariablesWrapper('BJ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Afghanistan')).map(addVariablesWrapper('AF', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Greenland')).map(addVariablesWrapper('GL', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Liberia')).map(addVariablesWrapper('LR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Somalia')).map(addVariablesWrapper('SO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Jordan')).map(addVariablesWrapper('JO', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Tajikistan')).map(addVariablesWrapper('TJ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Djibouti')).map(addVariablesWrapper('DJ', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Bahrain')).map(addVariablesWrapper('BH', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Mali')).map(addVariablesWrapper('ML', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Niger')).map(addVariablesWrapper('NE', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Guinea-Bissau')).map(addVariablesWrapper('GW', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','South Sudan')).map(addVariablesWrapper('SS', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Monaco')).map(addVariablesWrapper('MC', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','San Marino')).map(addVariablesWrapper('SM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Clipperton Island')).map(addVariablesWrapper('SM', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Mauritania')).map(addVariablesWrapper('MR', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Eritrea')).map(addVariablesWrapper('ER', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('STATUS','Occupied Palestinian Territory')).map(addVariablesWrapper('PS', 'GRIIS', 0)))
          .merge(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Andorra')).map(addVariablesWrapper('AD', 'GRIIS', 0)))
          .merge(ee.FeatureCollection([ee.Feature(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Antarctica')).geometry().intersection(ee.Geometry.Polygon([[[-80, -60],[-80, -89.9],[-20, -89.9],[-20, -60]]], null, false), 30)).set('griisCountryCode','BAT').set('checklist','GRIIS').set('level',0).select(['griisCountryCode','checklist','level'])]))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Portugal')).map(addVariablesWrapper('PT-30', 'GRIIS', 1)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).map(addVariablesWrapper('SC', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Micronesia')).map(addVariablesWrapper('FM', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Comoros')).map(addVariablesWrapper('KM', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Fiji')).map(addVariablesWrapper('FJ', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).map(addVariablesWrapper('MH', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Tonga')).map(addVariablesWrapper('TO', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Mauritius')).map(addVariablesWrapper('MU', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Cook Islands')).map(addVariablesWrapper('CK', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Palau')).map(addVariablesWrapper('PW', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Samoa')).map(addVariablesWrapper('WS', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','American Samoa')).map(addVariablesWrapper('AS', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Falkland Islands')).map(addVariablesWrapper('FK', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Niue')).map(addVariablesWrapper('NU', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Reunion')).map(addVariablesWrapper('NU', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Vanuatu')).map(addVariablesWrapper('VU', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','French Polynesia')).map(addVariablesWrapper('PF', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Solomon Islands')).map(addVariablesWrapper('SB', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Montserrat')).map(addVariablesWrapper('MS', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Mayotte')).map(addVariablesWrapper('YT', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Saint-Barthélemy')).map(addVariablesWrapper('BL', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Maldives')).map(addVariablesWrapper('MV', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','British Indian Ocean Territory')).map(addVariablesWrapper('IO', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Barbados')).map(addVariablesWrapper('BB', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','São Tomé and Príncipe')).map(addVariablesWrapper('ST', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Bahamas')).map(addVariablesWrapper('BS', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Dominica')).map(addVariablesWrapper('DM', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Anguilla')).map(addVariablesWrapper('AI', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Curaçao')).map(addVariablesWrapper('CW', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Kiribati')).map(addVariablesWrapper('KI', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Saint-Martin')).map(addVariablesWrapper('MF', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Nauru')).map(addVariablesWrapper('NR', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Tuvalu')).map(addVariablesWrapper('TV', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','French Southern Territories')).map(addVariablesWrapper('TF', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Antigua and Barbuda')).map(addVariablesWrapper('AG', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Saint Kitts and Nevis')).map(addVariablesWrapper('KN', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Wallis and Futuna')).map(addVariablesWrapper('WF', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Saint Lucia')).map(addVariablesWrapper('LC', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','New Caledonia')).map(addVariablesWrapper('NC', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Saint Vincent and the Grenadines')).map(addVariablesWrapper('VC', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Sint Maarten')).map(addVariablesWrapper('SX', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Bermuda')).map(addVariablesWrapper('BM', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Pitcairn Islands')).map(addVariablesWrapper('PN', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Grenada')).map(addVariablesWrapper('GD', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Martinique')).map(addVariablesWrapper('MQ', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Aruba')).map(addVariablesWrapper('AW', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Cape Verde')).map(addVariablesWrapper('CV', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Cayman Islands')).map(addVariablesWrapper('KY', 'GRIIS', 0))) 
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Turks and Caicos islands')).map(addVariablesWrapper('TC', 'GRIIS', 0))) 
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','South Georgia and the South Sandwich Islands')).map(addVariablesWrapper('GS', 'GRIIS', 0))) 
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Saint Pierre et Miquelon')).map(addVariablesWrapper('PM', 'GRIIS', 0))) 
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','Tokelau')).map(addVariablesWrapper('TK', 'GRIIS', 0)))
          .merge(gadm_0.filter(ee.Filter.eq('NAME_0','British Virgin Islands')).map(addVariablesWrapper('VG', 'GRIIS', 0)))
          .merge(ee.FeatureCollection([ee.Feature(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Yemen')).geometry().intersection(ee.Geometry.Polygon([[[51.75211594064196, 13.117969673328727],[51.75211594064196, 11.787747687730997],[54.97111008126696, 11.787747687730997],[54.97111008126696, 13.117969673328727]]], null, false),30)).set('griisCountryCode','YE-SU').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level'])]))
;

var pa_griis = ee.FeatureCollection([
  ee.Feature(gadm_4.filter(ee.Filter.stringContains('NAME_2','Las Palmas')).filterBounds(ee.Geometry.Polygon([[[-15.900751485060006, 28.267059711371076],[-15.900751485060006, 27.62165885817312],[-15.164667500685006, 27.62165885817312],[-15.164667500685006, 28.267059711371076]]], null, false)).union().first()).set('griisCountryCode','ES-CN-TF').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_4.filter(ee.Filter.stringContains('NAME_2','Las Palmas')).filterBounds(ee.Geometry.Polygon([[[-14.615166932749824, 28.804598163089025],[-14.615166932749824, 27.954002973013672],[-13.554986268687324, 27.954002973013672],[-13.554986268687324, 28.804598163089025]]], null, false)).union().first()).set('griisCountryCode','ES-CN-FV').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_4.filter(ee.Filter.stringContains('NAME_2','Las Palmas')).filterBounds(ee.Geometry.Polygon([[[-13.98680390074525, 29.564167417131383],[-13.98680390074525, 28.81125463336455],[-13.08043183043275, 28.81125463336455],[-13.08043183043275, 29.564167417131383]]], null, false)).union().first()).set('griisCountryCode','ES-CN-LZ').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_4.filter(ee.Filter.stringContains('NAME_2','Tenerife')).filterBounds(ee.Geometry.Polygon([[[-17.010429171468786, 28.680032593925123],[-17.010429171468786, 27.930403792246413],[-16.043632296468786, 27.930403792246413],[-16.043632296468786, 28.680032593925123]]], null, false)).union().first()).set('griisCountryCode','ES-CN-TF').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_4.filter(ee.Filter.stringContains('NAME_2','Tenerife')).filterBounds(ee.Geometry.Polygon([[[-18.06248301788907, 28.873049784082305],[-18.06248301788907, 28.429561137906795],[-17.66422862335782, 28.429561137906795],[-17.66422862335782, 28.873049784082305]]], null, false)).union().first()).set('griisCountryCode','ES-CN-LP').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_4.filter(ee.Filter.stringContains('NAME_2','Tenerife')).filterBounds(ee.Geometry.Polygon([[[-17.39231700226407, 28.243415804876197],[-17.39231700226407, 27.984206309750665],[-17.06822032257657, 27.984206309750665],[-17.06822032257657, 28.243415804876197]]], null, false)).union().first()).set('griisCountryCode','ES-CN-LG').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_4.filter(ee.Filter.stringContains('NAME_2','Tenerife')).filterBounds(ee.Geometry.Polygon([[[-18.218682557749826, 27.89818774486138],[-18.218682557749826, 27.563910306288896],[-17.7723629776717, 27.563910306288896],[-17.7723629776717, 27.89818774486138]]], null, false)).union().first()).set('griisCountryCode','ES-CN-HI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Galápagos')).first()).set('griisCountryCode','EC-W').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Azores')).first()).set('griisCountryCode','PT-20').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1',"Ha'apai")).first()).set('griisCountryCode','TO-02').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Tongatapu')).first()).set('griisCountryCode','TO-04').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1',"Vava'u")).first()).set('griisCountryCode','TO-05').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Saint Helena')).first()).set('griisCountryCode','SH-HL').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Ascension')).first()).set('griisCountryCode','SH-AC').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Tristan da Cunha')).first()).set('griisCountryCode','SH-TA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Pohnpei')).first()).set('griisCountryCode','FM-PNI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Kosrae')).first()).set('griisCountryCode','FM-KSA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Yap')).first()).set('griisCountryCode','FM-YAP').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Chuuk')).first()).set('griisCountryCode','FM-TRK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Njazídja')).first()).set('griisCountryCode','KM-G').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Mwali')).first()).set('griisCountryCode','KM-A').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Nzwani')).first()).set('griisCountryCode','KM-M').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Saba')).first()).set('griisCountryCode','BQ-SA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Sint Eustatius')).first()).set('griisCountryCode','BQ-SE').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Bonaire')).first()).set('griisCountryCode','BQ-BO').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Valparaíso')).geometry().intersection(ee.Geometry.Polygon([[[-81.17185083521326, -33.0906509790771],[-81.17185083521326, -34.36069880007874],[-78.30991235865076, -34.36069880007874],[-78.30991235865076, -33.0906509790771]]], null, false), 30)).set('griisCountryCode','CL_JNF').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Îles Éparses')).first()).set('griisCountryCode','TF_IE').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_2.filter(ee.Filter.eq('NAME_2','ísla de Pascua')).geometry().intersection(ee.Geometry.Polygon([[[-109.5222308816809, -27.014973740483516],[-109.5222308816809, -27.245356641560658],[-109.14800907992309, -27.245356641560658],[-109.14800907992309, -27.014973740483516]]], null, false),30)).set('griisCountryCode','CL_RN').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(ee.Geometry.Polygon([[[169.10018920635423, 5.66037342434639],[169.10018920635423, 5.627745052557503],[169.1475677463933, 5.627745052557503],[169.1475677463933, 5.66037342434639]]], null, false)).set('griisCountryCode','MH-KIL').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Tuvalu')).geometry().intersection(ee.Geometry.Polygon([[[179.00142612070792, -8.41107485083799],[179.00142612070792, -8.664355191973117],[179.24106540293448, -8.664355191973117],[179.24106540293448, -8.41107485083799]]], null, false), 30)).set('griisCountryCode','TV-FUN').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Tuvalu')).geometry().intersection(ee.Geometry.Polygon([[[177.12293598097233, -7.182647002489326],[177.12293598097233, -7.265412181488882],[177.18765232008366, -7.265412181488882],[177.18765232008366, -7.182647002489326]]], null, false), 30)).set('griisCountryCode','TV-NUI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Tuvalu')).geometry().intersection(ee.Geometry.Polygon([[[179.73878017414665, -9.301310212597317],[179.73878017414665, -9.484896054718954],[179.94683376301384, -9.484896054718954],[179.94683376301384, -9.301310212597317]]], null, false), 30)).set('griisCountryCode','TV-NKL').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Tuvalu')).geometry().intersection(ee.Geometry.Polygon([[[179.46205075470584, -10.780623254467821],[179.46205075470584, -10.797654568923296],[179.48505337921756, -10.797654568923296],[179.48505337921756, -10.780623254467821]]], null, false), 30)).set('griisCountryCode','TV-NIT_INK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Tuvalu')).geometry().intersection(ee.Geometry.Polygon([[[176.02789549898864, -5.609810920180938],[176.02789549898864, -5.7280196078993315],[176.1899438388324, -5.7280196078993315],[176.1899438388324, -5.609810920180938]]], null, false), 30)).set('griisCountryCode','TV-NMA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Tonga')).geometry().intersection(ee.Geometry.Polygon([[[-176.13796249254554, -15.195928008669137],[-176.13796249254554, -16.34305826453791],[-173.36940780504554, -16.34305826453791],[-173.36940780504554, -15.195928008669137]]], null, false), 30)).set('griisCountryCode','TO-03').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filterBounds(gaul_0.filter(ee.Filter.eq('ADM0_NAME','Tonga'))).union().first()).set('griisCountryCode','TO_PA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Cayman Islands')).geometry().intersection(ee.Geometry.Polygon([[[-81.45590296360614, 19.420617248896264],[-81.45590296360614, 19.22428315256228],[-81.04048243137957, 19.22428315256228],[-81.04048243137957, 19.420617248896264]]], null, false), 30)).set('griisCountryCode','KY-GC').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[170.99481578968243, 7.246116905733394],[170.99481578968243, 7.038315170696883],[171.432208978159, 7.038315170696883],[171.432208978159, 7.246116905733394]]], null, false), 30)).set('griisCountryCode','MH-MAJ').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[166.7230224576837, 9.486087158263274],[166.7230224576837, 8.620851393447138],[168.02215575846495, 8.620851393447138],[168.02215575846495, 9.486087158263274]]], null, false), 30)).set('griisCountryCode','MH-KWA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[169.2348145592301, 6.370377349796004],[169.2348145592301, 5.732627583997324],[169.88438120962073, 5.732627583997324],[169.88438120962073, 6.370377349796004]]], null, false), 30)).set('griisCountryCode','MH-JAL').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[171.48147583084327, 7.326656968726944],[171.48147583084327, 6.896036315520213],[171.98547363357764, 6.896036315520213],[171.98547363357764, 7.326656968726944]]], null, false), 30)).set('griisCountryCode','MH-ARN').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[169.80468751196986, 9.587865008499175],[169.80468751196986, 9.310160339445465],[170.30593873267298, 9.310160339445465],[170.30593873267298, 9.587865008499175]]], null, false), 30)).set('griisCountryCode','MH-WTJ').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[171.61730284588728, 6.284429753512421],[171.61730284588728, 5.803719876388274],[172.27922911541853, 5.803719876388274],[172.27922911541853, 6.284429753512421]]], null, false), 30)).set('griisCountryCode','MH-MIL').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[161.9638824769622, 11.737405978834419],[161.9638824769622, 11.252939393436426],[162.51594546524345, 11.252939393436426],[162.51594546524345, 11.737405978834419]]], null, false), 30)).set('griisCountryCode','MH-ENI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[168.91530984958223, 10.095496711915244],[168.91530984958223, 9.750546828733967],[169.38909524997285, 9.750546828733967],[169.38909524997285, 10.095496711915244]]], null, false), 30)).set('griisCountryCode','MH-LIK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[168.62498721435523, 4.70459824399124],[168.62498721435523, 4.552660126547674],[168.7993951733396, 4.552660126547674],[168.7993951733396, 4.70459824399124]]], null, false), 30)).set('griisCountryCode','MH-EBO').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[165.1598569762453, 11.755983098964933],[165.1598569762453, 11.429081057317214],[165.64462870476092, 11.429081057317214],[165.64462870476092, 11.755983098964933]]], null, false), 30)).set('griisCountryCode','MH-L_BK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[170.75706476043248, 8.932170790888314],[170.75706476043248, 8.435309607608062],[171.4011382467606, 8.435309607608062],[171.4011382467606, 8.932170790888314]]], null, false), 30)).set('griisCountryCode','MH-MAL').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[170.84699389724983, 10.306131197543719],[170.84699389724983, 10.25850012271376],[170.894029114535, 10.25850012271376],[170.894029114535, 10.306131197543719]]], null, false), 30)).set('griisCountryCode','MH-MEJ').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[169.71714012431073, 11.300144472170436],[169.71714012431073, 11.168140687917685],[169.9135207395451, 11.168140687917685],[169.9135207395451, 11.300144472170436]]], null, false), 30)).set('griisCountryCode','MH-UTI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[169.78788855880626, 10.514090916674176],[169.78788855880626, 10.14120407081694],[170.10099891036876, 10.14120407081694],[170.10099891036876, 10.514090916674176]]], null, false), 30)).set('griisCountryCode','MH-ALK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[165.32772250868157, 9.391914332765392],[165.32772250868157, 8.757261675504191],[165.92647739149407, 8.757261675504191],[165.92647739149407, 9.391914332765392]]], null, false), 30)).set('griisCountryCode','MH-UJA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[168.4550695660747, 7.7862233633434625],[168.4550695660747, 7.1544280462506755],[169.0648107770122, 7.1544280462506755],[169.0648107770122, 7.7862233633434625]]], null, false), 30)).set('griisCountryCode','MH-ALL').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[160.73981501751751, 9.930037401137115],[160.73981501751751, 9.670213387039293],[161.06116511517376, 9.670213387039293],[161.06116511517376, 9.930037401137115]]], null, false), 30)).set('griisCountryCode','MH-L_UJ').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[169.51703835818887, 10.086297396045618],[169.51703835818887, 10.072945458515532],[169.53111459109903, 10.072945458515532],[169.53111459109903, 10.086297396045618]]], null, false), 30)).set('griisCountryCode','MH-T_JI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[166.17733131821717, 8.990244145470376],[166.17733131821717, 8.879679102802726],[166.3325132029828, 8.879679102802726],[166.3325132029828, 8.990244145470376]]], null, false), 30)).set('griisCountryCode','MH-LAE').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[167.32169209900206, 11.463824675364942],[167.32169209900206, 11.25109380262924],[167.56339131775206, 11.25109380262924],[167.56339131775206, 11.463824675364942]]], null, false), 30)).set('griisCountryCode','MH-L_RA').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[170.90527428645697, 8.41857657250879],[170.90527428645697, 8.035294599365862],[171.3186348821601, 8.035294599365862],[171.3186348821601, 8.41857657250879]]], null, false), 30)).set('griisCountryCode','MH-AUR').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[169.49141046736895, 11.255343621182222],[169.49141046736895, 11.0539152515778],[169.7200634214705, 11.0539152515778],[169.7200634214705, 11.255343621182222]]], null, false), 30)).set('griisCountryCode','MH-T_TK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[168.74762300924868, 14.802131016639834],[168.74762300924868, 14.477927698163276],[169.18020967917056, 14.477927698163276],[169.18020967917056, 14.802131016639834]]], null, false), 30)).set('griisCountryCode','MH-T_BK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[168.96160328210306, 7.76627127736101],[168.96160328210306, 7.736334931222059],[168.99284565270852, 7.736334931222059],[168.99284565270852, 7.76627127736101]]], null, false), 30)).set('griisCountryCode','MH-JAB').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[169.86186702986492, 9.296831169591496],[169.86186702986492, 8.965995170151068],[170.17497738142742, 8.965995170151068],[170.17497738142742, 9.296831169591496]]], null, false), 30)).set('griisCountryCode','MH-T_EK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[170.02156243920274, 12.337965574459156],[170.02156243920274, 12.137995199937142],[170.21038995385118, 12.137995199937142],[170.21038995385118, 12.337965574459156]]], null, false), 30)).set('griisCountryCode','MH-T_BI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[166.22270482640351, 11.232734831698215],[166.22270482640351, 11.071051643006715],[166.56465428929414, 11.071051643006715],[166.56465428929414, 11.232734831698215]]], null, false), 30)).set('griisCountryCode','MH-L_AI').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[167.99146022276625, 5.7401377352346605],[167.99146022276625, 5.47226040530902],[168.2798513360475, 5.47226040530902],[168.2798513360475, 5.7401377352346605]]], null, false), 30)).set('griisCountryCode','MH-NMK').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Marshall Islands')).geometry().intersection(ee.Geometry.Polygon([[[167.7854665704225, 8.411040562665239],[167.7854665704225, 7.665876913745049],[168.48309840636, 7.665876913745049],[168.48309840636, 8.411040562665239]]], null, false), 30)).set('griisCountryCode','MH-NMU').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Akrotiri and Dhekelia')).first()).set('griisCountryCode','CY_AD').set('checklist','GRIIS').set('level',1).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).geometry().intersection(ee.Geometry.Polygon([[[46.12875985071494, -9.320592713268159],[46.12875985071494, -9.535996200803492],[46.58331917688682, -9.535996200803492],[46.58331917688682, -9.320592713268159]]], null, false), 30)).set('griisCountryCode','SC_AA').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).geometry().intersection(ee.Geometry.Polygon([[[55.63950333797709, -4.345230315545339],[55.63950333797709, -4.357211977408052],[55.656326152918496, -4.357211977408052],[55.656326152918496, -4.345230315545339]]], null, false), 30)).set('griisCountryCode','SC_COUI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).geometry().intersection(ee.Geometry.Polygon([[[53.282225328815066, -5.404044546899792],[53.282225328815066, -5.426431822563108],[53.312437731158816, -5.426431822563108],[53.312437731158816, -5.404044546899792]]], null, false), 30)).set('griisCountryCode','SC_DA').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).geometry().intersection(ee.Geometry.Polygon([[[53.00970094125023, -6.205887030826933],[53.00970094125023, -6.263224121712366],[53.079738783047105, -6.263224121712366],[53.079738783047105, -6.205887030826933]]], null, false), 30)).set('griisCountryCode','SC_DI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).geometry().intersection(ee.Geometry.Polygon([[[55.928858165831166, -4.576618448051678],[55.928858165831166, -4.596724064801275],[55.95829809197863, -4.596724064801275],[55.95829809197863, -4.576618448051678]]], null, false), 30)).set('griisCountryCode','SC_FI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).geometry().intersection(ee.Geometry.Polygon([[[55.19830305478604, -3.710379971036507],[55.19830305478604, -3.7307646210166245],[55.21701414487393, -3.7307646210166245],[55.21701414487393, -3.710379971036507]]], null, false), 30)).set('griisCountryCode','SC_IAVNR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_0.filter(ee.Filter.eq('NAME_0','Seychelles')).geometry().intersection(ee.Geometry.Polygon([[[55.356503352004175, -4.655628877349793],[55.356503352004175, -4.672310440645383],[55.37916265376199, -4.672310440645383],[55.37916265376199, -4.655628877349793]]], null, false), 30)).set('griisCountryCode','SC_CI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','Jeju')).first()).set('griisCountryCode','KR-49').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(gadm_1.filter(ee.Filter.eq('NAME_1','La Digue and Inner Islands')).geometry().intersection(ee.Geometry.Polygon([[[55.818399837997035, -4.332325544105446],[55.818399837997035, -4.39017908026962],[55.862345150497035, -4.39017908026962],[55.862345150497035, -4.332325544105446]]], null, false), 30)).set('griisCountryCode','SC_LDI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Galápagos')).union().first()).set('griisCountryCode','EC_GP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Kruger National Park')).first()).set('griisCountryCode','ZA_KNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Garden Route National Park')).first()).set('griisCountryCode','ZA_GRNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Table Mountain National Park')).union().first()).set('griisCountryCode','ZA_TMNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Tankwa-Karoo National Park')).union().first()).set('griisCountryCode','ZA_TKNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.or(ee.Filter.stringContains('NAME','Mara North'), ee.Filter.stringContains('NAME','Masai Mara'), ee.Filter.stringContains('NAME','Serengeti'))).union().first()).set('griisCountryCode','KE_TZ_SEMAES').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Golden Gate Highlands National Park')).union().first()).set('griisCountryCode','ZA_GGHNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Lord Howe Island')).union().first()).set('griisCountryCode','AU_LHI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Waddenzee')).union().first()).set('griisCountryCode','NL_WS').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Addo-Elephant National Park')).union().first()).set('griisCountryCode','ZA_AENP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Socotra')).union().first()).set('griisCountryCode','YE_SA').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Augrabies Falls National Park')).union().first()).set('griisCountryCode','ZA_AFNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Agulhas National Park')).union().first()).set('griisCountryCode','ZA_ANP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Juan Fernández')).union().first()).set('griisCountryCode','CL_AJF').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Rapa Nui')).union().first()).set('griisCountryCode','CL_RNNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Mountain Zebra National Park')).union().first()).set('griisCountryCode','ZA_MZNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Curieuse')).union().first()).set('griisCountryCode','SC_CRSR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Bontebok National Park')).union().first()).set('griisCountryCode','ZA_BNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Prince Edward Islands')).union().first()).set('griisCountryCode','ZA_PEI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Huvalu Conservation Area')).union().first()).set('griisCountryCode','NU_HCA').set('checklist','GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Mare Aux Cochons')).union().first()).set('griisCountryCode','SC_MAC').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filterBounds(ee.Geometry.Polygon([[[38.685501731196105, -4.810101999775137],[38.675030387201964, -4.801549106034604],[38.641041434565246, -4.799667455012494],[38.57016346225673, -4.899581836862673],[38.527591440772355, -5.129411543856465],[38.555057261084855, -5.256603365078346],[38.67522022495204, -5.229252456140356],[38.72328541049892, -5.100003352593226],[38.84138843784267, -5.05417860506643],[38.85306141147548, -4.844848688300456],[38.83383533725673, -4.7175770711974785],[38.75212452182704, -4.742896422504297],[38.71229908237392, -4.796953545921137],[38.692899773342674, -4.813135242024204]]])).union().first()).set('griisCountryCode','TZ_EU').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Morne Seychellois National Park')).union().first()).set('griisCountryCode','SC_MSNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Mokala National Park')).union().first()).set('griisCountryCode','ZA_MONP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Mapungupwe National Park')).union().first()).set('griisCountryCode','ZA_MANP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Camdeboo National Park')).union().first()).set('griisCountryCode','ZA_CANP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Silhouette National Park')).union().first()).set('griisCountryCode','SC_SNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','La Digue')).union().first()).set('griisCountryCode','SC_LDI').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','West Coast National Park')).union().first()).set('griisCountryCode','ZA_WCNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Vallée de Mai Nature Reserve')).union().first()).set('griisCountryCode','SC_VDMNR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Marakele National Park')).union().first()).set('griisCountryCode','ZA_MKNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Karoo National Park')).union().first()).set('griisCountryCode','ZA_KANP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Cousin')).union().first()).set('griisCountryCode','SC_CSR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Amani')).union().first()).set('griisCountryCode','TZ_AFNR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Praslin National Park')).union().first()).set('griisCountryCode','SC_PNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Richtersveld National Park')).union().first()).set('griisCountryCode','ZA_RVNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.and(ee.Filter.eq('NAME','Namdrik'), ee.Filter.eq('DESIG','Ramsar Site, Wetland of International Importance'))).union().first()).set('griisCountryCode','MH-NMK_RS').set('checklist','GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Namaqua National Park')).union().first()).set('griisCountryCode','ZA_NQNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Ngorongoro Conservation Area')).union().first()).set('griisCountryCode','TZ_NCA').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Kalahari Gemsbok National Park')).union().first()).set('griisCountryCode','ZA_KGNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Serengeti National Park')).union().first()).set('griisCountryCode','TZ_SNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Queen Elizabeth National Park')).union().first()).set('griisCountryCode','UG_QENP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Aride')).union().first()).set('griisCountryCode','SC_ASR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Farquhar')).union().first()).set('griisCountryCode','SC_FQA').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Wilderness National Lake Area')).union().first()).set('griisCountryCode','ZA_WINP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Port Launay Wetland')).union().first()).set('griisCountryCode','SC_PLW').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Murchison Falls')).union().first()).set('griisCountryCode','UG_MFNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Cosmoledo')).union().first()).set('griisCountryCode','SC_CO').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Verloren Valei Nature Reserve')).union().first()).set('griisCountryCode','ZA_VVNR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.or(ee.Filter.eq('NAME','Serengeti National Park'), ee.Filter.eq('NAME','Ngorongoro Conservation Area'))).union().first()).set('griisCountryCode','TZ_SENBR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.stringContains('NAME','Lake Mbur')).union().first()).set('griisCountryCode','UG_LM').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Victoria Falls National Park')).union().first()).set('griisCountryCode','ZW_VFNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','St Lucia System')).union().first()).set('griisCountryCode','ZA_SLS').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Nyanga')).union().first()).set('griisCountryCode','ZW_NNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Mlawula Nature Reserve')).union().first()).set('griisCountryCode','SZ_MWNR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Mantenga Nature Reserve')).union().first()).set('griisCountryCode','SZ_MTNR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Malalotja Nature Reserve')).union().first()).set('griisCountryCode','SZ_MJNR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.and(ee.Filter.eq('NAME','Chimanimani'), ee.Filter.eq('DESIG_ENG','National Park'), ee.Filter.eq('ISO3','ZWE'))).union().first()).set('griisCountryCode','ZW_CNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.and(ee.Filter.eq('NAME','Bazaruto'), ee.Filter.eq('DESIG_ENG','National Park'))).union().first()).set('griisCountryCode','MZ_BZNP').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Hawane Nature Reserve and Dam')).union().first()).set('griisCountryCode','SZ_HNRD').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Mabamba Bay Wetland System')).union().first()).set('griisCountryCode','UG_MBWS').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.and(ee.Filter.eq('NAME','Mount Elgon'), ee.Filter.eq('ISO3','UGA'))).union().first()).set('griisCountryCode','UG_ME').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','Recif')).union().first()).set('griisCountryCode','SC_SSR').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level']),
  ee.Feature(wdpa.filter(ee.Filter.eq('NAME','African Banks')).union().first()).set('griisCountryCode','SC_AB').set('checklist','PA-GRIIS').set('level',2).select(['griisCountryCode','checklist','level'])
  ]);

// Combine the GRIIS and the PA-GRIIS datasets
var griis_combined = griis.merge(pa_griis);

// Export the asset
Export.table.toAsset({
  collection: griis_combined, 
  description: 'GRIIS_geometries', 
  assetId: 'users/crowtherlab/GRIIS/GRIIS_geometries', 
  // maxVertices: 1e6
});


