# News Feed Documentation

This documentation provides an overview and usage guide for the News-feed, a web application similar to Instagram’s news feed, featuring a news feed with infinite scroll and user details page with grid/list view for their photos.

## Table of Contents

1. Introduction
2. Installation
3. Features
4. Usage
5. Links

## 1. Introduction

The News-feed is a web application built using Next.js, CSS, and the Unsplash API. It aims to replicate some of the core features of the Instagram platform, such as the news feed with infinite scroll and user details page with grid/list view for their photos. In addition to this, there are some more features, including cache, light/dark mode.

## 2. Installation

To run the News-feed locally, follow these steps:

1. Clone the GitHub repository: `git clone https://github.com/Suraj1520/News-Feed.git`
2. Install dependencies: `npm install`
3. Obtain the Unsplash Access key and set it in the environment variable as `NEXT_PUBLIC_ACCESS_KEY` and the website link as `NEXT_PUBLIC_BASE_URL`
4. Start the development server: `npm run dev`

The News-feed clone will now be accessible at http://localhost:3000.

## 3. Features

### News Feed

The News Feed displays random photos fetched from the Unsplash API. It supports infinite scrolling with 10 random photos fetched at a time, loading more photos as the user scrolls down. Each photo includes user information and action buttons.

### User Details

The User Details page displays all photos along with photo descriptions uploaded by a specific user. Users can view their photos in grid or list view. The grid view displays photos in a responsive grid layout, while the list view presents photos in a vertical list.

### Light/Dark Mode

Both pages have a default dark theme, but users can toggle the theme using the toggler button available in the navbar to switch between light and dark mode.

### Cache & Responsive

The API response has been cached for 30 seconds using "local storage," during which page reload will not lead to call the API again and again. Each page of the News-feed web app is responsive.

## 4. Usage

### News Feed Usage

1. Upon opening the application, you will be directed to the News Feed.
2. As you scroll down, the app will automatically fetch more photos using infinite scroll.
3. Click on a user's profile image or name to navigate to their User Details page.

### User Details Usage

1. Click on a user's profile image or name from the News Feed to access their User Details page.
2. By default, the User Details page will display the user's photos in grid view.
3. Click the "List View" button to switch to list view for their photos.
4. Click the "Grid View" button to switch back to grid view.

## 5. Links

- Deployed link: [https://instagram-ui-five.vercel.app/](https://instagram-ui-five.vercel.app/)
- Repository link: [https://github.com/Suraj1520/News-Feed.git](https://github.com/Suraj1520/News-Feed.git)
