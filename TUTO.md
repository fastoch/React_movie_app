# Correction du prof

https://git.alt-tools.tech/bettercallsoul-bytemerenf/allocine/-/tree/correction-session3?ref_type=heads

---

Ce qui suit correspond à ma version.

# The `updateWishlist` function in the `App` component

```tsx
const updateWishlist = (movieId: number) => {
  const movie = movies.find((m) => m.id === movieId);
  if (!movie) return; 

  setWishlist((currentWishlist) => {
    // if the movie is not already in the wishlist, add it
    if (!currentWishlist.includes(movie.title)) {
      return [...currentWishlist, movie.title];;
    } 
    // else, remove it
    return currentWishlist.filter((title) => title !== movie.title);
  })
}
```

## The first two lines

- we start by looking for the movie in the `movies` array using the built-in `find` method
  - the `movies` array has been imported in the `App` component from /src/data/movies.ts
- the result of the `find` method is stored in the `movie` variable
- `if (!movie)` acts as a "**guard clause**" that is `true` only if `movies.find()` returns `undefined`
  - if the above condition is true (no movie was found), `return` exits the `updateWishlist` function

### Important note

The `if (!movie) return;` line is a crucial safety check that stops the function from proceeding if the movie doesn't exist, which prevents potential errors from trying to access properties (like `movie.title`) on an `undefined` value later in the `updateWishlist` function.

## The setWishlist function

This is the setter function for the `wishlist` state.  


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

---

# About react-hook-form

React-hook-form simplifies state management, handles **validation** efficiently, and can improve 
performance by reducing re-renders.  

To use it, we need to remove the manual state management (`useState`) for form fields and errors.  
Instead, we'll be using the `useForm` hook for a cleaner and more robust implementation.  

- first, we need to install it with `npm i react-hook-form`

## Signup Component Refactor

In Signup.tsx, we'll replace the multiple `useState` calls for fields and their errors with a single `useForm` hook.  
This hook provides: 
- methods to **register** inputs and handle submission, 
- along with an `errors` object for validation messages.  

For the "Confirm Password" field, we'll use the `watch` function from `useForm` to validate that it matches 
the "Password" field.  

## Signin Component Refactor

Same as for Signup.tsx, except for the password confirmation.

## The `FormInputs` type

To integrate react-hook-form with TypeScript effectively, we need to define a type that will
act as a **"schema"** or a **"blueprint"** for our form's data.  

```tsx
type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
```

This type tells TypeScript the exact shape of the data that react-hook-form will be managing.  

When we provide this type to the useForm hook (`useForm<FormInputs>()`), we unlock full TypeScript (TS) support:
- when we call `register()`, TS will only suggest valid field names: email, password, or confirmPassword
- if we make a typo, like `register('emial')`, TS will immediately show an error because `emial` is not 
a valid key in the `FormInputs` type. 
- the `errors` object returned by `useForm` is also typed, and we get autocomplete for `errors.email`, `errors.password`, etc. And TS knows that `errors.email.message` is a valid property.  

## About the `useForm()` hook

```tsx
const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting },
} = useForm<FormInputs>();
```

The above snippet is a JavaScript feature called **object destructuring**.  
We are calling the `useForm()` hook, which returns a **large object** full of useful **methods** and **properties**.  
Destructuring lets us pull out only the **specific** pieces we need and assign them to local constants.

## The `register` method

When we spread `{...register('email', { ...rules })}` onto an <input>, we are giving control of that input to the 
`react-hook-form` library. It automatically handles the `onChange`, `onBlur`, `name`, and `ref` **props** needed to 
track the input's value and **validation** state.  

The second argument (`{ ...rules }`) is an object where we define **validation rules** (`required`, `pattern`, `minLength`, etc.)

## About the `handleSubmit` method

We use it on the `<form>` element: `<form onSubmit={handleSubmit(onSubmit)}`  

The `handleSubmit` method runs all our validation rules, and:
- if validation passes, it then calls our `onSubmit` function witht the collected form data
- if validation fails, it populates the `errors` object and stops

## About the `watch` function

It lets us "watch" the value of a form field in real-time.  
In our case, it's used for the "Confirm Password" validation.  
The rule `validate: (value) => value === watch('password')` uses `watch('password')` to get the current 
value of the password field to ensure the two passsword fields match.

## About the `formState` object

It contains information about the form's current state (whether it's been modified, currently submitting, etc.).  
By writing `formState: { errors, isSubmitting }`, we are destructuring again to pull the `errors` object and 
the `isSubmitting` property out of the `formState` object.  

---

# Mardi 26 août

On veut remplacer nos données statiques (/src/data/movies.ts) par des appels à l'API de TMDB.  
TMDB = https://themoviedb.org  

## Axios

En premier lieu, nous allons installer `axios`: `npm i axios`  
Pour faire des requêtes HTTP vers l'API, nous allons utiliser la bibliothèque `axios`

## Configurer la clé d'API TMDB

Pour des raisons de sécurité, nous allons créer un fichier `.env` pour stocker la clé d'API.  
Dans ce fichier (situé à la racine du projet), nous allons créer une variable d'environnement:
```
VITE_TMDB_API_KEY="votre_clé_API_TMDB_ici"
```
Le nom de la variable commence par `VITE_` parce qu'on a utilisé Vite pour initialiser le projet.  

NE PAS OUBLIER d'ajouter `.env` au fichier `.gitignore` pour ne pas exposer la clé.  

## Mise à jour du composant `Movies.tsx`

Nous devons le modifier de sorte à ce qu'il récupère la liste des films populaires depuis 
l'API de TMDB au lieu du fichier statique.  

### imports

On commence par supprimer l'importation statique `import { movies } from '../data/movies';`  
On ajoute également axios aux imports.  
Enfin, on importe `useState` et `useEffect` de React.  

Nous créons un état local de `movies` avec `useState` pour stocker les films récupérés depuis l'API.  

Le hook `useEffect` servira à lancer la requête `axios` vers l'**endpoint** des films populaires
de TMDB. Ceci aura lieu une seule fois lorsque le composant sera monté.  

La réponse de l'API, qui se trouve dans `response.data.results`, sera utilisée pour mettre à jour
notre état `movies`.  

## Mise à jour du composant `MovieDetails.tsx`

Ici, nous voulons que ce composant récupère sur TMDB les détails d'un film spécifique via son `id`.  

Comme pour `Movies.tsx`, nous allons utiliser `useState` et `useEffect` pour gérer l'état et le cycle
de vie du composant.  

Un état `loading` a été ajouté pour améliorer l'expérience utilisateyr (UX) pendant la récupération des 
données.  

Le `useEffect` dépend maintenant de l'`id` du film.  
Si cet `id` change, la requête est relancée pour chercher les infos du nouveau film.  

La logique de recherche `movies.find(...)` est remplacée par un appel `axios.get` à l'endpoint
qui fournit les détails d'un film sur TMDB.  

## Note importante

Après ces modifications, les composants `Movies` et `MovieDetails` sont autonomes pour la récupération de leurs données.  
Cependant, d'autres parties de notre application comme la page d'accueil (`Home.tsx`) ou la page `Wishlist.tsx` qui dépendaient du fichier `data/movies.ts` ne fonctionneront plus correctement. Il faudra également les adapter pour qu'elles utilisent les données de l'API.

La logique de la wishlist, notamment pour la suppression d'un film, devra être revue car elle se base sur la recherche d'un film par son titre dans la liste statique pour retrouver son ID.

