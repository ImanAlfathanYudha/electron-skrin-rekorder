# 🎥 Skrin Rekorder

A desktop screen recording app built with Electron.

---

## Prerequisites

Make sure you have these installed before setting up the project:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

---

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/skrin-rekorder.git
   cd skrin-rekorder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

---

## How to Use

### 1. Select a Video Source
Click the **"Choose a Video Source"** dropdown and pick which screen or window you want to record.

### 2. Start Recording
Click the **Start** button. The button will turn red and display "Recording" to indicate the recording is in progress.

### 3. Stop Recording
Click the **Stop** button to end the recording. A save dialog will appear asking where you want to save the file.

### 4. Save the Recording
Choose a location and filename. The recording will be saved in `.webm` format, which is playable in most modern media players.

---

## Tech Stack

- [Electron](https://www.electronjs.org/) — desktop app framework
- [Webpack](https://webpack.js.org/) — module bundler
- Web APIs — `MediaRecorder`, `desktopCapturer`, `getUserMedia`

---

## Project Structure

```
src/
├── assets/          # images and static files
├── components/      # web components (e.g. buttonControl.js)
├── main.js          # main process — app lifecycle, IPC handlers
├── preload.js       # bridge between main and renderer
├── renderer.js      # renderer process — UI logic
└── index.css        # styles
```

---

## Notes

- The app records **video only** by default. Audio is captured via microphone if enabled.
- Recordings are saved in `.webm` format (VP9 codec).
- Screen recording permission is automatically granted by the app.
