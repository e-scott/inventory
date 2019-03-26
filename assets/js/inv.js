$(document).ready(function(){


//Initialize Firebase
var config = {
  apiKey: "AIzaSyAqmUpbmR_CpPZg4Fx6PsYnXdiEKJ52uek",
  authDomain: "inventory-cc9b8.firebaseapp.com",
  databaseURL: "https://inventory-cc9b8.firebaseio.com",
  projectId: "inventory-cc9b8",
  storageBucket: "inventory-cc9b8.appspot.com",
  messagingSenderId: "560743834764"
};
firebase.initializeApp(config);
var database = firebase.database();
const invDB = { //object to track uniqueIDs for each beer TODO update placeholder with beer type
  B0854141006410: '-LarLGv5K2cwCBNSFMfg',
  B0860000660402: '-LarLGv8o4ozan6yH0W7',
  B0853249004373: '-LarLGv9tfyPEicnD6Mw',
  B0859490002427: '-LarLGv9tfyPEicnD6Mx',
  B0856765007194: '-LarLGv9tfyPEicnD6My',
  B0011711276370: '-LarLGvA4iLxGlDv0f6F',
  B0709870876387: '-LarLGvA4iLxGlDv0f6G',
  B0635797791963: '-LarLGvBTjhbUoe-GwMd',
  B0853249004106: '-LarLGvBTjhbUoe-GwMe',
  placeHolder9: '-LarLGvBTjhbUoe-GwMf',
}
database.ref('/inventory/' + invDB.B0854141006410).update({ 'qty': 1234567 });

///////////////Begin Quagga API call///////////////

  $('#play').hide(); //hides the video area upon script execution. TODO: This might be better as a default CSS property

  $('#startButton').on('click', function(){ //When the start/barcode scan button is clicked
    $('#play').show(); //shows the video area TODO: do we need to actually show this video feed?
    Quagga.init({ //initializes the library for configuration (config) and callback (err)
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#play')    // choose the div which contains the <video> tag
      },
      decoder : {
        readers : ["upc_reader"]/* other reader types: code_128_reader (default), ean_reader, ean_8_reader, code_39_reader, code_39_vin_reader, codabar_reader, upc_reader, upc_e_reader, i2of5_reader, 2of5_reader, code_93_reader */
      }
    }, function(err) {//error handling
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start(); //this method actually starts looking for the barcode in the video feed. Without Quagga.start(), it will never find a barcode!
    });
  });

  Quagga.onDetected(function(data){ //When a barcode is detected
    console.log(data.codeResult.code); //this is the barcode output. I think the UPC code would be without the first and last digits, but I could be wrong
    Quagga.stop(); //Stop quagga
    $('#play').hide(); //Hide the video area
  })

  ///////////////End Quagga API///////////////
var upc = codeResult;
var getURL = `http://cors-anywhere.herokuapp.com/https://api.upcdatabase.org/product/${upc}/9C632CDFED6A28A6814FF46FB527C84D`;
$.ajax({
url: getURL,
  method: 'GET',
}).then(function(response){
  console.log(response);
  var result = response.data;
  var name = response.title;
  // var dTitle = $('#dTitle').val();
  $('#result').empty();
  //console.log(name);
  console.log("NAME IS : " + name)
  var resultDiv = $('<div>');
  $('#result').html(resultDiv);
  var p = $('<p>').html(`<h1>Title: ${name}</h1>`);
  resultDiv.append(p);
});
});
/*$.ajax({
  url: 'https://first-project-ab6df.firebaseio.com',
  method : "POST",
  data: JSON.stringify(result),
  success: function () {
    alert('success');
  },
  error: function(err) {
    alert('error: ' + err);
  }
});*/