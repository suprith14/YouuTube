# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




1. npm create vite@latest youTubo -- --template react

2. create all the required folder-> components,utils,store

3. create main appStore.jsx

4. install npm install @reduxjs/toolkit react-redux -->> redux
5. install npm install react-router-dom             -->> router
6. install 
            npm install -D tailwindcss@3 postcss autoprefixer
            npx tailwindcss init -p

            update tailwind.config file
                content: [
                    "./index.html",
                    "./src/**/*.{js,ts,jsx,tsx}",
                    ],
            
            update index.css file
                @tailwind base;
                @tailwind components;
                @tailwind utilities;


            1. Press Ctrl + , to open Settings
            2. Search for tailwindCSS.includeLanguages
            3. add these 
                "javascript": "javascript",
                "javascriptreact": "javascript",

7. setup the redux store
    1.configureStore() ->> this takes object of slices
    2.export the store
    3. add the store to the app using Provder component in main.js file


Features in the APP
1. Developed App using Vite + React
2. Central State Mangement is implement for easire management
3. Multiple Language select feature in emplements
4. Integrated Live Youtube App to show image and details
5. Developed MenuDrawer for toggleing purpose
6. Integrated Auto Suggestion Api is for searching 
7. Developed watch page page to view the vedio 
8. 


