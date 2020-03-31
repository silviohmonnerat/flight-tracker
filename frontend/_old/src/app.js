$(function() {
  // $("document").ready(function() {
  //   setInterval(() => {
  //     $.ajax({
  //       url: "https://api.aviationstack.com/v1/flights",
  //       data: {
  //         access_key: "74761a2594d89fba48dc137b76ae10df",
  //         dep_icao: "SBGR",
  //         flight_date: "2020-03-24",
  //         flight_status: "active",
  //         limit: 1000
  //       },
  //       dataType: "json",
  //       timeout: 3000 * 10 * 100,
  //       success: response => {
  //         response.data.forEach((item, index) => {
  //           if (item.live !== null) {
  //             if (item.live.is_ground) return;

  //             var departure = getAirport(item.departure.icao);
  //             var arrival = getAirport(item.arrival.iata);

  //             data.features.push({
  //               type: "Feature",
  //               properties: {
  //                 id: index,
  //                 origin_id: Math.floor(Math.random() * 100),
  //                 origin_city: departure[0].airport_name,
  //                 origin_country: departure[0].country_name,
  //                 origin_lon: departure[0].longitude,
  //                 origin_lat: departure[0].latitude,
  //                 destination_id: Math.floor(Math.random() * 100),
  //                 destination_city: departure[0].airport_name,
  //                 destination_country: arrival[0].country_name,
  //                 destination_lon: arrival[0].longitude,
  //                 destination_lat: arrival[0].latitude
  //               },
  //               geometry: {
  //                 type: "Point",
  //                 coordinates: [item.live.latitude, item.live.longitude]
  //               }
  //             });
  //           }
  //         });
  //       }
  //     });
  //     if (data.features.length > 0) {
  //       console.log(data);
  //     }
  //   }, 1000);
  // });

  function getAirport(icao) {
    var result = [];

    $.ajax({
      url: "https://api.aviationstack.com/v1/airports",
      data: {
        access_key: "74761a2594d89fba48dc137b76ae10df",
        search: icao
      },
      dataType: "json",
      timeout: 3000 * 10 * 100,
      success: response => {
        response.data.forEach(item => {
          result.push(item);
        });
      }
    });

    return result;
  }

  // initialize the map on the "map" div with a given center and zoom
  var map = new L.Map("map").setView(new L.LatLng(-22.908333, -43.196388), 4);

  map.addLayer(
    new L.TileLayer(
      "https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      {
        maxZoom: 18
      }
    )
  );

  var baseUrl = "https://api.aviationstack.com";
  var endpoint = "flights";
  var key = "access_key=74761a2594d89fba48dc137b76ae10df";
  var dep_icao = "dep_icao=SBGR";
  var flight_date = "flight_date=2020-03-24";
  var flight_status = "flight_status=active";

  // var realtime = L.realtime(
  //   function(success, error) {
  //     fetch(
  //       `${baseUrl}/v1/${endpoint}?${key}&${dep_icao}&${flight_date}&${flight_status}&limit=1000`
  //     )
  //       .then(function(response) {
  //         return response.json();
  //       })
  //       .then(function(result) {
  //         var data = [
  //           {
  //             type: "Feature",
  //             properties: {
  //               id: 1
  //             },
  //             geometry: {
  //               type: "Point",
  //               coordinates: [-22.908333, -43.196388]
  //             }
  //           }
  //         ];
  //         result.data.forEach((item, index) => {
  //           if (item.live !== null) {
  //             if (item.live.is_ground) return;

  //             var departure = getAirport(item.departure.icao);
  //             var arrival = getAirport(item.arrival.iata);

  //             data.push({
  //               type: "Feature",
  //               properties: {
  //                 id: index,
  //                 origin_id: index,
  //                 origin_city: departure[0].airport_name,
  //                 origin_country: departure[0].country_name,
  //                 origin_lon: departure[0].longitude,
  //                 origin_lat: departure[0].latitude,
  //                 destination_id: index,
  //                 destination_city: departure[0].airport_name,
  //                 destination_country: arrival[0].country_name,
  //                 destination_lon: arrival[0].longitude,
  //                 destination_lat: arrival[0].latitude
  //               },
  //               geometry: {
  //                 type: "Point",
  //                 coordinates: [item.live.latitude, item.live.longitude]
  //               }
  //             });
  //           }
  //         });
  //         console.log({
  //           type: "FeatureCollection",
  //           features: data
  //         });

  //         success({
  //           type: "FeatureCollection",
  //           features: data
  //         });
  //       })
  //       .catch(error);
  //   },
  //   {
  //     interval: 1000,
  //     pointToLayer: function(feature, latlng) {
  //       return L.marker(latlng, {
  //         icon: L.icon({
  //           iconUrl: "http://localhost:8088/src/plane.png",
  //           iconSize: [20, 20],
  //           iconAnchor: [22, 94],
  //           shadowAnchor: [4, 62],
  //           popupAnchor: [-3, -76]
  //         })
  //       });
  //     }
  //   }
  // ).addTo(map);

  var realtime = L.realtime(
    {
      url: "http://localhost:8088/src/data.json",
      crossOrigin: true,
      type: "json"
    },
    {
      interval: 3 * 1000,
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "http://localhost:8088/src/plane.png",
            iconSize: [20, 20],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
          })
        });
      }
    }
  ).addTo(map);

  realtime.on("update", function() {
    map.fitBounds(realtime.getBounds(), { maxZoom: 3 });
  });
});
