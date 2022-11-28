import React from 'react';
/*
 useful reference for iframes.
 works, but sadly speechSynthesis doesnt let us get around having one utterance at a time in an iframe.
 if really want this, save synth speak to localStorage.

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
const Speaker = ({ announce }) => {
  const speakFn = (saythis) => {
    var msg = new SpeechSynthesisUtterance(saythis);
    speechSynthesis.speak(msg);
  };
  return (
    <iframe
      srcDoc={`<script>const speakFn =${speakFn}; speakFn("${announce}");</script>`}
      title={announce}
      width="100"
      height="100"
    />
  );
};

export default Speaker;
