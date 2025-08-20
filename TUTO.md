# The "Add to wishlist" button in the Movie component

For the "Add to wishlist" button in our `Movie` component to update the **counter** in our `NavigationBar`, 
the state needs to be managed by their **closest common parent** component, which is `App.tsx`. 
This is a common and **important pattern** in React called "**lifting state up**".  

- `App.tsx` now holds the `wishlist` state and the function `updateWishlist` to modify it.  
- `NavigationBar.tsx` receives the wishlist as a prop and displays its length (counter)
- `Movie.tsx` receives the wishlist and the function to modify it, allowing the button to:
  - update the counter 
  - show the correct text

---

# The Wishlist component

Pour que la liste de souhaits se ferme lorsqu'on clique en dehors, nous devons détecter ces clics.  
La meilleure approche dans React est d'utiliser les hooks `useRef` et `useEffect`.

## `useRef` pour référencer l'élément 

Nous créons une "référence" à l'élément `div` principal du composant.   
Cela nous permet de vérifier si un clic a eu lieu à l'intérieur ou à l'extérieur de cet élément.

## `useEffect` pour gérer les clics 

Ce hook nous permet d'ajouter un écouteur d'événements sur tout le document lorsque la liste est visible.  
Quand un clic est détecté, nous vérifions s'il a eu lieu en dehors de notre composant.  
Si c'est le cas, nous mettons à jour l'état pour cacher la liste.  

Pour éviter des fuites de mémoire, l'écouteur d'événements est automatiquement retiré lorsque la liste est 
cachée ou que le composant est "démonté".