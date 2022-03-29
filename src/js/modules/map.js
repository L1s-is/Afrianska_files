let myMap;
let myPlacemark;

export function init () {
    myMap = new ymaps.Map("map", {
        center: [37.53, 126.97],
        zoom: 13,
        behaviors:['default', 'scrollZoom']
    })

    myPlacemark = new ymaps.Placemark([37.54, 126.98], {
        content: 'Afrianska',
        balloonContent: 'Afrianska' });
    myMap.geoObjects.add(myPlacemark);
}
