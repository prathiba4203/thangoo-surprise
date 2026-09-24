# Thangoo Surprise ❤️

A romantic surprise website built with HTML5, CSS3, and vanilla JavaScript. It is designed to run directly through VS Code Live Server.

## Add your media

Keep these folders and filenames exactly as shown:

```text
thangoo-surprise/
├── index.html
├── style.css
├── script.js
├── README.md
├── photos/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   └── photo4.jpg
├── video/
│   └── cute-video.mp4
└── song/
    └── lali-lali.mp3
```

Replace the four JPG files in `photos/`, the MP4 in `video/`, and the MP3 in `song/` with your own files. The media folders include placeholder instructions until those binary files are added.

## Run in VS Code

1. Open the `thangoo-surprise` folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey if it is not installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The project opens in your browser. Use the login `thangoo` and password `332023`, then enter `100`.

Live Server is useful for local development. A phone cannot use your computer's `file:///` path as a QR destination.

## Use a QR code

1. Host the complete folder online using GitHub Pages or another static hosting service.
2. Copy the public website URL.
3. Generate a QR code for that public URL using a QR-code service or app.
4. Scan the QR code with a phone.
5. The website opens and runs: Login -> 100% -> sentences -> video -> photos -> Lali Lali.

Do not make a QR code for a local path such as `file:///D:/...`. The site must be hosted first.

## Customize

- Edit the `sentences` array near the top of `script.js` to change the timed messages.
- Change `name === "thangoo"` and `password === "332023"` in `script.js` to change the login.
- Change the image, video, or audio filenames only if you also update their paths in `index.html` or `script.js`.
