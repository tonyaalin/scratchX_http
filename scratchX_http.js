(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_blynk = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://cloud.blynk.cc:8080/' + location,
              dataType: 'jsonp',
              success: function( blynk_data ) {
                  // Got the data - parse it and return the temperature
                  callback(blynk_data);
              }
        });
    };

     //ext.get_blynk = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
     //   $.ajax({
     //         url: 'http://cloud.blynk.cc:8080/' + location,
     //         dataType: 'jsonp',
     //         success: function( blynk_data ) {
     //             // Got the data - parse it and return the temperature
     //             temperature = blynk_data['main']['temp'];
     //             callback(temperature);
      //        }
     //   });
     // };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'blynk Auth Token %s', 'get_blynk', 'xxxxxxxxxxxxxxxxxx/pin/V10'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('HttpGet extension', descriptor, ext);
})({});