
///////////////Begin Quagga API call///////////////
  let dataValidation = false; //initialize dataValidation variable as false

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
    const readCode = data.codeResult.code;
    console.log(readCode); //this is the barcode output. I think the UPC code would be without the first and last digits, but I could be wrong
    if (readCode.length !== 12){
      console.log('error, UPC code not read, please make sure code being scanned is a UPC type') //TODO: make this a modal alert box
      dataValidation = false;
    } else{
      console.log('UPC code read')
      dataValidation = true;
    }
    Quagga.stop(); //Stop quagga
    $('#play').hide(); //Hide the video area
  })

  ///////////////End Quagga API///////////////