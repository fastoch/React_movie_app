# "Add to wishlist" button

For the "Add to wishlist" button in our `Movie` component to update the **counter** in our `NavigationBar`, 
the state needs to be managed by their **closest common parent** component, which is `App.tsx`. 
This is a common and **important pattern** in React called "**lifting state up**".  

- `App.tsx` now holds the `wishlist` state and the function to modify it.  
- `NavigationBar.tsx` receives the wishlist **count** as a prop and displays it.
- `Movie.tsx` receives the wishlist and the function to modify it, allowing the button to work and show the correct text