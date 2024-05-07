window.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById("audioFile");
    const canvas = document.getElementById("audioCanvas");
    const ctx = canvas.getContext('2d')
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let audioSource = null;
    let analyser = null;
    

    fileInput.addEventListener('change', function () {
        const files = this.files;
        if (files.length === 0) return;
        const file = files[0];
    })
});