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

---

# The X button to remove movies from the wishlist

## Pass the update function from App to Wishlist

Il faut faire descendre la fonction `updateWishlist()` depuis App.tsx jusqu'au composant Wishlist.tsx
afin que ce dernier puisse lui aussi modifier la wishlist.  

Pour cela, on doit passer la fonction `updateWishlist` de App à NavigationBar puis de NavigationBar à Wishlist, 
car App est le composant parent de NavigationBar et NavigationBar est le composant parent de Wishlist.  

Dans le `return` de `App`, on passe d'abord la fonction `updateWishlist` au composant `NavigationBar`:
```tsx
return (
  <>
    <NavigationBar wishlist={wishlist} updateWishlist={updateWishlist} />
```

Ensuite, `NavigationBar` doit accepter cette nouvelle fonction et la passer à `Wishlist`.  
Pour ça on doit updater le type des props et les props elles-mêmes en ajoutant `updateWishlist`:
```tsx
type NavigationBarProps = {
    wishlist: string[];
    updateWishlist: (movieId: number) => void;
}

const NavigationBar = ({ wishlist, updateWishlist }: NavigationBarProps) => {
    return (
```

Toujours dans `NavigationBar`, on doit passer la fonction `updateWishlist` à `Wishlist`:
```tsx
<WishList movieList={wishlist} updateWishlist={updateWishlist} />
```

## Add an 'X' button to each movie 

On importe d'abord les films dans le composant Wishlist:
```tsx
import { movies } from '../data/movie';
```

Ensuite, on modifie les props en ajoutant `updateWishlist`:
```tsx
type WishListProps = {
  movieList: string[];
  updateWishlist: (movieId: number) => void;
}

const WishList = ( { movieList, updateWishlist }: WishListProps) => {
```

On modifie enfin l'élément `<li>` qui affiche chaque film en ajoutant un bouton X de suppresion.  
Et on ajoute à ce bouton un `onClick` event qui déclenche une fonction `handleRemove`:
```tsx
<li className="flex justify-between items-center px-4 py-2 hover:bg-amber-100" key={movie}>
  <span>{movie}</span>
  <button
    onClick={() => handleRemove(movie)}
    className="ml-4 p-1 text-lg leading-none text-red-500 hover:text-red-700"
    aria-label={`Remove ${movie} from wishlist`}>
    &times;
  </button>
</li>
```

## Bind the X button click to the `updateWishlist` function

La fonction `handleRemove` est bien évidemment définie en amont du `return` du composant `Wishlist`:
```tsx
const handleRemove = (movieTitle: string) => {
  const movie = movies.find((m) => m.title === movieTitle);
  if (movie) {
    updateWishlist(movie.id);
  }
};
```