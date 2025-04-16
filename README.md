This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.]]]

## Approach

I chose to use the create-next-app antd library to help with quick designs. The next app already comes with typescript and other tooling installed, which would save me time from needing to do extra set up. I had used the antd most recently.

The way I approached building this was to start with creating a skeleton of what pages were neede according to the requirements and how they would connect with one another. I modeled the designs off of most music apps, where playlists are on the left hand side (in dark mode) and content is to the right.

Below are the list of user stories. An asterisk (*) indicates what was not complete, but where I was heading.

As a user I can:
- View a side menu of my playlists
- View an option for creating a new playlist
- Clicking on the Add playlist button shows me an input to enter my playlist name
- Clicking on the Playlist name from the menu shows me my playlist

On the playlist view, I can:
- View the list of songs
- View an option to shuffle my playlist
- View an option to sort my playlist
- Clicking the artist name on one of the songs will take me to the artist page
- Clicking shuffle will shuffle the playlist order
- *Clicking sort would give me a dropdown to sort the playlist by length, album, or title
- *Clicking a sort option will sort the playlist

On the artist page view, I can:
- See the list of songs
- *Only the songs for that selected artist should appear
- *The songs should be grouped by album
- *The album art is shown with each grouping


To display the pages, I made the artist and playlist pages into their own routes with a slug based on the artist name and playlist name. I'll admit, I am not as familiar with Next.js ability for dynamic routing. I chose to make the Menu a reusable component to put on each page to maintain the idea of a side menu with only the content updating. Other reusable components created was the Song for display a Song and the Song type. 

To abstract away api calls, I put the fetch for songs into it's own hook. Since the same song list was being used for a POC, I would have liked to have cached the song list instead of needing to fetch it on each page load. I would have stored it in a model and added all of the methods for shuffling, sorting, and separating the songs by album into methods on the model. I would also memoize the results of the sorting.

Not all of the functionality was done in time. I decided to make trade offs to prioritize showing how the pages would work and a general sense of being able to click through the app and see some results.


### Explanation of Approach for Missing Items
1. Adding a playlist doesn't fully work. I was blocked by how the menu items are set up in the antd Menu component. I made the assumption I could build in a input on the side menu, and add the new playlist to the existing list. However, the menu items are set as a constant and passed in before they are set to the playlist state. Had I had more time, I would have found a work around or chosen to make a separate view for adding a playlist.

2. On the playlist view, I wasn't able to complete the sort functionality. I chose to implement the shuffle and then start to work on the artist page. To implement the sort, I would have added a drop down to choose which sort option. Selecting an option would have sorted the array based on the criteria. There would be a useMemo for each sort option to reduce needing to sort over and over.

3. The artist page was the last thing to be implemented since is was lower on the requirements. I was in the process of begining to prepare to sort the songs based on album and utilizing the Song component to display them. I had a skeleton of grouping the album and songs together, but wasn't able to fully implement some designs to have a placeholder for the album art, and display all the groupings on the page.
