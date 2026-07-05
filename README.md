# Updating Your Portfolio

Welcome to your filmmaker portfolio, Hussain Ahmad!

All of your project data, including titles, descriptions, PDFs, and YouTube videos, is managed from a single file.

## Where to find the data file
Open the code editor and navigate to:
`src/data/projects.ts`

## How to add/update your PDFs (Scripts & Storyboards)
To display your script and storyboard PDFs securely using Google Drive embeds:
1. Upload your PDF to your Google Drive.
2. Right-click the file in Google Drive and select **Share**.
3. Under "General access", make sure it is set to **Anyone with the link** (this is required for the embed to work).
4. Click **Copy link**.
5. Paste that entire link into either the `scriptpdfurl` or `storyboardpdfurl` field for the relevant project in `src/data/projects.ts`. 

*(Note: The site automatically extracts the necessary file ID from your Google Drive link to render the iframe, so you can paste the full share URL directly.)*

## How to update YouTube Videos
To update the video that plays in the "Motion_Sequence" section:
1. Go to your video on YouTube.
2. Look at the URL in your browser's address bar. The Video ID is the string of letters and numbers that comes after `v=`.
   *(Example: For `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the Video ID is `dQw4w9WgXcQ`)*
3. Paste **only this Video ID** into the `youtubevideoid` field in `src/data/projects.ts`.

## Example Project Entry in `src/data/projects.ts`
```typescript
{
  title: "My New Film",
  year: 2024,
  description: "A description of the film.",
  scriptpdfurl: "https://drive.google.com/file/d/YOUR_SCRIPT_FILE_ID/view?usp=sharing",
  storyboardpdfurl: "https://drive.google.com/file/d/YOUR_STORYBOARD_FILE_ID/view?usp=sharing",
  substackurl: "https://hussainahmad.substack.com/",
  youtubevideoid: "dQw4w9WgXcQ" // Just the ID, not the full URL!
}
```
