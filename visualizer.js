window.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("audioFile");
  const canvas = document.getElementById("audioCanvas");
  const ctx = canvas.getContext("2d");

  const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
  let audioSource = null;
  let analyser = null;

  fileInput.addEventListener("change", function () {
      const files = this.files;
      if (files.length === 0) return;
      const file = files[0];

      const reader = new FileReader();
      reader.onload = function (e) {
          if (audioSource) {
              audioSource.disconnect();
          }
          audioContext.decodeAudioData(e.target.result, function (buffer) {
              audioSource = audioContext.createBufferSource();
              audioSource.buffer = buffer;
              analyser = audioContext.createAnalyser();
              analyser.fftSize = 256;

              audioSource.connect(analyser);
              analyser.connect(audioContext.destination);
              audioSource.start();

              animate();
          });
      };
      reader.readAsArrayBuffer(file);
  });

  function animate() {
      requestAnimationFrame(animate);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          ctx.fillRect(
              x,
              canvas.height - barHeight / 2,
              barWidth,
              barHeight / 2
          );
          x += barWidth + 1;
      }
  }
});
