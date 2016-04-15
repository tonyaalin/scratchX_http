(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_blynk = function(blynkau, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              //url: 'http://cloud.blynk.cc:8080/' + blynkau,
              url: 'http://cloud.blynk.cc:8080/e07c5fad00ac4bb5a477c31a7c06c6eb/pin/V10',
              dataType: 'jsonp',
              timeout: 1000,
             success: function( blynk_data ) {
                  // Got the data - parse it and return the temperature
                //  callback(blynk_data);
                return(blynk_data);
              }
        });
        
    };

     ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };

     ext.lass = function(device, callback){
        $.ajax({
              url: 'http://nrl.iis.sinica.edu.tw/LASS/last.php?device_id='+device,
              success: function( data ) {
                  var jsonObj = JSON.parse(data);
                  //console.log(jsonObj);
                  lassData.C = jsonObj.s_t0;
                  lassData.H = jsonObj.s_h0;
                  lassData.PM25 = jsonObj.s_d0;
                  callback(true);
              },
              error: function(e){
                  callback(e);
              }
        });
    };
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'blynk Auth Token %s', 'get_blynk', 'e07c5fad00ac4bb5a477c31a7c06c6eb/pin/V10'],
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
            [' ', 'LASS DEVICE= %s PM2.5', 'lass', 'FT1_001'],
            ['R', 'LASS C', 'lassData.C'],
            ['R', 'LASS H', 'lassData.H'],
            ['R', 'LASS PM25', 'lassData.PM25'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('HttpGet extension', descriptor, ext);
})({});
