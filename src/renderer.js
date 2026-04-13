import successImage from './assets/success-alert-img.png';
import failedImage from './assets/failed-alert-img.png';
import titleImage from './assets/title-alert-img.jpg';
import './components/buttonControl';
import './index.css';


let mediaRecorder;
const recordedChunks = [];

const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
document.getElementById('titleImg').src = titleImage;

startBtn.onclick = () => {
  console.log('tes startBtn.onclick');
  if (!mediaRecorder) {
    showToast('✖ Please select a video source first!', 'error');
    return;
  } else {
    mediaRecorder.start();
    startBtn.classList.add('is-danger');
    startBtn.innerText = 'Recording';
  }
};

stopBtn.onclick = () => {
  console.log('tes stopBtn.onclick');
  if (!mediaRecorder) {
    showToast('✖ Please select a video source first!', 'error');
    return;
  } else {
    mediaRecorder.stop();
    startBtn.classList.remove('is-danger');
    startBtn.innerText = 'Start';
  }

};

videoSelectBtn.onclick = getVideoSources;

async function getVideoSources() {
  const sources = await window.electronAPI.getSources();
  console.log('sources', sources);

  // build a simple dropdown instead of Menu
  const select = document.createElement('select');
  select.id = 'sourceSelect';

  // add placeholder as first option
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.text = '🎥 Select a source...';
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  sources.forEach(source => {
    const option = document.createElement('option');
    option.value = source.id;
    option.text = source.name;
    select.appendChild(option);
  });

  select.onchange = () => {
    const selected = sources.find(s => s.id === select.value);
    if (selected) selectSource(selected);
  };

  // replace button with dropdown
  videoSelectBtn.replaceWith(select);
}

async function selectSource(source) {
  const audioStream = await navigator.mediaDevices.getUserMedia({
    audio: true, // this captures microphone
    video: false,
  });

  // get screen video stream
  const videoStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
      },
    },
  });


  // combine both streams into one
  const combinedStream = new MediaStream([
    ...videoStream.getVideoTracks(),
    ...audioStream.getAudioTracks(),
  ]);

  videoElement.srcObject = combinedStream;
  videoElement.play();

  const options = { mimeType: 'video/webm; codecs=vp9,opus' };
  mediaRecorder = new MediaRecorder(combinedStream, options);
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
}

function handleDataAvailable(e) {
  console.log('video data available');
  recordedChunks.push(e.data);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <img src="${type === 'success' ? successImage : failedImage}" 
         style="width:40px; height:40px; object-fit:cover; border-radius:4px;" 
    />
    <span>${message}</span>
  `;

  // red for error, green for success
  if (type === 'error') toast.style.background = '#ff3c3c';

  document.body.appendChild(toast);

  // trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

async function handleStop() {
  if (recordedChunks.length === 0) {
    showToast('✖ No recording data found.', 'error');
    return;
  }

  const blob = new Blob(recordedChunks, { type: 'video/webm; codecs=vp9' });
  const arrayBuffer = await blob.arrayBuffer();
  const filePath = await window.electronAPI.showSaveDialog();

  if (filePath) {
    const finalPath = filePath.endsWith('.webm') ? filePath : `${filePath}.webm`;
    try {
      await window.electronAPI.saveFile(finalPath, arrayBuffer);
      showToast('Video saved successfully!');
      recordedChunks.length = 0;
    } catch (err) {
      console.error('Save error:', err);
      showToast('✖ Failed to save video.', 'error');
    }
  } else {
    showToast('Save cancelled.', 'error');
  }
}