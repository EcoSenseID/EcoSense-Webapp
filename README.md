# EcoSense Web Application
[![issues](https://img.shields.io/github/issues/EcoSenseID/EcoSense-Webapp)](https://github.com/EcoSenseID/EcoSense-Webapp/issues)
[![language](https://img.shields.io/github/languages/count/EcoSenseID/EcoSense-Webapp)](https://github.com/EcoSenseID/EcoSense-Webapp/search?l=typescript)
[![top-language](https://img.shields.io/github/languages/top/EcoSenseID/EcoSense-Webapp)](https://github.com/EcoSenseID/EcoSense-Webapp/search?l=typescript)
[![commit](https://img.shields.io/github/commit-activity/m/EcoSenseID/EcoSense-Webapp)](https://github.com/EcoSenseID/EcoSense-Webapp/commits/main)
[![last-commit](https://img.shields.io/github/last-commit/EcoSenseID/EcoSense-Webapp)](https://github.com/EcoSenseID/EcoSense-Webapp/commits/main)

## Introduction
EcoSense Web Application is an application for managing campaigns and users.\
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Technologies
[![HTML5](https://img.shields.io/badge/-HTML5-black?style=for-the-badge&logo=html5&logoColor=orange)](https://github.com/EcoSenseID?tab=repositories&language=html)
[![CSS3](https://img.shields.io/badge/-CSS3-black?style=for-the-badge&logo=css3&logoColor=blue)](https://github.com/EcoSenseID?tab=repositories&language=css)
[![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=for-the-badge&logo=javascript)](https://github.com/EcoSenseID?tab=repositories&language=javascript)
[![React](https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react)](https://github.com/EcoSenseID?tab=repositories&language=javascript)
[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://github.com/EcoSenseID?tab=repositories)
[![TypeScript](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript&logoColor=%23007ACC)](https://github.com/EcoSenseID?tab=repositories&language=typescript)

## Dependencies
[![next](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/next)](https://www.npmjs.com/package/next)
[![react](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/react)](https://www.npmjs.com/package/react)
[![react-dom](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/react-dom)](https://www.npmjs.com/package/react-dom)
[![react-icons](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/react-icons)](https://www.npmjs.com/package/react-icons)
[![firebase](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/firebase)](https://www.npmjs.com/package/firebase)
[![framer-motion](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/framer-motion)](https://www.npmjs.com/package/framer-motion)
[![nprogress](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/nprogress)](https://www.npmjs.com/package/nprogress)
[![sass](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/sass)](https://www.npmjs.com/package/sass)
[![typescript](https://img.shields.io/github/package-json/dependency-version/EcoSenseID/EcoSense-Webapp/typescript)](https://www.npmjs.com/package/typescript)

[Go to List of Dependencies](https://github.com/EcoSenseID/EcoSense-Webapp/network/dependencies)

## Try the App
Visit our deployed web application through:
- Vercel ([https://ecosense.vercel.app](https://ecosense.vercel.app))
- Google Cloud Run ([https://ecosense-web-of7z476jgq-as.a.run.app/](https://ecosense-web-of7z476jgq-as.a.run.app/)) - `Latest`

## Infrastructure
- Artifact Registry (Docker) `cloud-run-source-deploy/ecosense-web`
- Cloud Build (Latest: `e6446ccb`)
- Google Cloud Storage `ecosense-bangkit_cloudbuild/source`
- Cloud Run `ecosense-web`
  - Revision `ecosense-web-00001-bik` (100% traffic)
  - Autoscaling - max instances `100`

```mermaid
graph LR;
    A([Local Repository])-->B([Run Cloud Build]);
    B([Run Cloud Build])-->C([Push to GCS]);
    C([Push to GCS])-->D([Build Container]);
    D([Build Container])-->E([Deploy to Cloud Run]);
```

## Screenshot
![screenshot-ecosense vercel app-2022 06 02-15_42_07](https://user-images.githubusercontent.com/60643640/171591720-82c1d59a-6c15-4f64-931c-b12754b7db6a.png)

## 
&#169; EcoSense 2022.