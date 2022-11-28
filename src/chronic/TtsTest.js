import React from 'react';
/*
 if really want this, save synth speak to localStorage.
 options:
    saas service: https://ttsfree.com/pricing -not expensive.$20 a month or 200 a year. unlimited converts.
    fuck doing myself - use this service.
    will need a server(less) for the api key, throttling.

             var synth = new Windows.Media.SpeechSynthesis.SpeechSynthesizer();

            SpeechSynthesisStream stream = await synth.SynthesizeTextToStreamAsync("Hello World");

            using (var reader = new DataReader(stream))
            {
                await reader.LoadAsync((uint)stream.Size);
                IBuffer buffer = reader.ReadBuffer((uint)stream.Size);
                await FileIO.WriteBufferAsync(outputFile, buffer);
                //but to localstorage instead, something like: https://wellsb.com/csharp/aspnet/blazor-write-to-localstorage/
            }
*/
const TtsTest = () => {
  return <div>TtsTest</div>;
};

export default TtsTest;
