# Za tebe, Nibbles ♡

A phone-first birthday album with all 15 slides from `Plan_za_rodenden.txt`. No build step, dependencies, or external services are needed.

## Music

The album uses **`Zdravko Čolić - Tebe čuvam za kraj - (Official Video 2018) - (128 Kbps).mp3`** beside `index.html`. Keep this filename when uploading, or update the audio `src` in `index.html` if you rename it.

Her first tap on **Vidi ja cestitkata** opens the album and starts the song. It loops across all slides and when replaying the album. iOS may suspend audio when Safari is in the background or the phone is locked; a website cannot guarantee playback in those circumstances.

## Preview

Open `index.html` in a browser, or run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

To preview on an iPhone on the same Wi-Fi, visit `http://YOUR-COMPUTER-LAN-IP:8000` and allow the server through your local firewall if needed.

## Publish on GitHub Pages

1. Commit and push these files, the `pictures` folder, and the MP3 named above to your GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the branch containing this website (usually `main`), select **/ (root)**, and save.
5. Once GitHub finishes deploying, use the link displayed in Pages settings. It normally looks like `https://YOUR-USERNAME.github.io/Sreken-rodenden-Dance/`.

All asset paths are relative so this works under a repository URL. GitHub Pages hosting makes the photos and music publicly accessible. The `noindex` tag requests that search engines not list the album; it does not provide access control.

## Edit the album

The `slides` array in `album.js` contains the text and photo filenames in order, following all 15 pages in `Plan_za_rodenden.txt`. Slide 4 uses `afterText` for the message below its screenshot. The chat screenshot and Dojran church names in the plan are mapped to the actual files. Slide 3 uses the new `slika_nas_4.jpg` couple photo; slide 13 uses `slika_nas_4.png`, the video call screenshot. The last slide includes the closing message followed by the Moscow and Prague photos.

Swipe left/right or use the arrows to turn pages. Longer slides scroll vertically to show every photo. Tap photos for a full-screen view; close with × or Escape. Desktop arrow keys also work. The final arrow replays the album without restarting the music.
