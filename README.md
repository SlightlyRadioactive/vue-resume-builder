# Vue Resume BuilderAdd commentMore actions

Vue Resume Builder is a web-based tool for quickly creating and customizing professional resumes. Designed to be fast, user-friendly, and flexible, it's ideal for both developers and non-developers.

### 🧰 Built With

- **Vite** – Lightning-fast frontend tooling
- **Vue.js** – For building dynamic and reactive UI components
- **TypeScript** – For type safety and scalable code
- **Tailwind CSS** – For rapid and modern styling
- **Font Awesome** – For high quality icons

# Installation Guide

### 1. Clone the Repository

```sh
git clone https://github.com/SlightlyRadioactive/vue-resume-builder.git
cd cv-maker
```

### Or, if you prefer, download it directly

1. Click on **Code**
2. Choose **Download ZIP**
3. Extract the files
4. Open the extracted folder on your terminal

### 2. Install Node.js

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) if you haven't done so previously.

> **Note**: Requires [Node.js](https://nodejs.org/) version 18 or higher.

### 3. Install Dependencies

```sh
npm install
```

### 4. Run the Development Server

```sh
npm run dev
```

Open the local server URL shown in your terminal (usually [http://localhost:5173/](http://localhost:5173/)).

### 5. (Optional) Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist/` directory.

### 6. (Optional) Preview the Production Build

```sh
npm run preview
```

## 🛠️ To do

- [x] ~~Turn the "Additional info" section into its own component~~
- [x] ~~Add the option to toggle sections visibility~~
- [ ] Add the option to toggle list items within sections visibility
- [ ] Add the option to download resume as a pdf file
- [ ] Add the option to rearrange sections
- [ ] Add the option to rearrange lists within sections
- [ ] Use localStorage to make changes persist if the user closes the page
- [ ] Add option to discard resume completely and begin from the beginning
- [ ] Add full keyboard support for navigation or maybe direct JSON editing inside the page
- [ ] Add confirmation requests when deleting sections
- [ ] Add warnings for when resume's content starts occupying more than one page
- [ ] Add option to insert Font Awesome Icons as text in the resume
