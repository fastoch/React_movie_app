# Travail du jeudi 21 août

L'idée est d'améliorer notre app avec react-router:
- installer react-router-dom via `npm i react-router-dom` - **FAIT**
- déplacer la logique de App dans Movies - **FAIT**
- le composant App contiendra la Navbar et le routage vers les différentes pages - **FAIT**
- modifier les liens de la navbar pour naviguer entre les différentes pages - **FAIT**
- cliquer sur le poster d'un film permettra de voir les détails du film dans MovieDetails - **FAIT**
- créer une page wishlist dédiée au lieu d'un menu caché - **FAIT**
- un formulaire sign-up permettra à un user de créer un compte (email, password, confirm passord) - **FAIT**
- Un bouton permettra de naviguer signup => signin au succès simulé du signup. - **FAIT**
- un formulaire sign-in permettra de simuler une connexion en redirigeant vers la page Home - **FAIT**
- coder le contenu de la page Home - **FAIT**

## Modification de App et de Movies

En déplaçant la logique de la wishlist dans le composant Movies, le composant NavigationBar ne peut plus 
accéder à la wishlist pour afficher le compteur de films ajoutés.  

La solution est de remonter l'état ("lifting state up") de la wishlist dans le composant parent commun le 
plus proche, qui est App.tsx. Ainsi, App devient la "source de vérité" et peut distribuer l'état de la 
wishlist et la fonction updateWishlist à la fois à NavigationBar et à Movies.

J'ai donc dû déplacer la logique de l'état de la wishlist de Movies vers App.  
```tsx
const App = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const updateWishlist = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return;

    setWishlist((currentWishlist) => {
      if (!currentWishlist.includes(movie.title)) {
        return [...currentWishlist, movie.title];
      }
      return currentWishlist.filter((title) => title !== movie.title);
    });
  };
```

Ensuite, j'ai mis à jour Movies pour qu'il reçoive la wishlist et la fonction updateWishlist en tant que props depuis App.

## Modification de la NavigationBar

Pour une barre de navigation, il est recommandé d'utiliser `<NavLink>` plutôt que `<Link>`.  
C'est un composant spécial de `react-router-dom` qui sait s'il est "actif" (c'est-à-dire si son lien correspond à l'URL actuelle). Cela permet de lui appliquer un style différent, ce qui est parfait pour indiquer sur quelle page se trouve l'utilisateur.

## Rendre le poster du film cliquable

Dans Movie.tsx, on importe Link pour créer un lien vers la page MovieDetails.  
```tsx
import { Link } from 'react-router-dom';
```

On encapsule ensuite le poster du film dans un Link pour rendre l'image cliquable:
```tsx
<Link to={`/movies/${movieData.id}`}>
  <img className="w-[350px]" src={'https://image.tmdb.org/t/p/w500' + movieData.poster_path} alt={movieData.title} />
</Link>
```      
Notez que la prop `to` est configurée avec un *template literal* pour construire l'URL dynamique en utilisant l'id du film.  

## Implémenter la page (composant) MovieDetails

Ceci est la page qui s'affiche lorsqu'on clique sur le poster d'un film.  

Pour afficher les infos du bon film, on utilise le **hook** `useParams` afin de lire l'id depuis l'URL.  
Ce hook de `react-router-dom` nous permet d'extraire les paramètres de l'URL.  
Ici, on récupère `id` car notre route est définie comme `/movies/:id`.

Puis nous cherchons le film correspondant dans nos données à l'aide de `find`.  
On utilise `find()` sur le tableau `movies` pour trouver le film qui correspond à l'ID récupéré.  
Ne pas oublier de convertir l'id (qui est une chaîne de caractères) en nombre avec `Number()`.

Pour faire ça, on doit d'abord importer userParams et nos données:
```tsx
import { useParams } from 'react-router-dom';
import { movies } from '../data/movies';
```  

## Transformer la wishlist en une page dédiée

On déplace d'abord le fichier Wishlist.tx depuis /src/components vers /src/pages.  
Il faudra retirer de Wishlist.tsx la logique du menu déroulant.  

Ensuite, on met à jour NavigationBar en remplaçant le composant Wishlist par un lien
`<NavLink>` qui pointera vers la nouvelle page `/wishlist` et affichera le nombre de films ajoutés.  

Enfin, on ajoute la nouvelle route dans App.tsx.  

## The sign-up page/component

We need to create a form for new users to register with their email and password.  
Upon a simulated successful registration, they should have a success message, and 
a button to allow them to access the sign-in page.  

For this sign-up page, we'll need the following imports:
```tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
```
- The first import is for our state variables (email, password, confirmPassword, and pwdError)
- The second import is to add an event listener on the form (`handleSubmit`)
- The last import is a module that allows us to redirect the user to the sign-in page

Then, we create our states variables:
```tsx
const Signup = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();
```
- the `isSignedUp` state variable will help us toggle between showing the signup form and the success message.

After that, we implement the handleSubmit function: 
```tsx
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // prevents the page from reloading on form submit

  // reset the error messages for the next submission
  setPwdError(null);
  setEmailError(null);

  // A simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setEmailError('Please enter a valid email address.');
    return;
  }

  if (password.length < 8) {
    setPwdError('Password must be at least 8 characters long.');
    return;
  }

  if (password !== confirmPassword) {
    setPwdError("Passwords don't match.");
    return;
  }

  // On successful signup, update the state variable to true
  setIsSignedUp(true);
};
```

### email address validation

`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`  
which can be broken down in this way: `/^` + `[^\s@]+` + `@` + `[^\s@]+` + `\.` + `[^\s@]+` + `$/`  

Let's explain the above regex:
- the slashes `/` mark the beginning and the end of the regular expression
- the first anchor `^` indicates the start of the pattern (nothing can come before it)
- `[^\s@]+`: one or more characters that are not a whitespace character or an @ symbol
- `@`: the @ symbol that separates the username from the domain
- another `[^\s@]+` for the domain name (the first one was for the username)
- `\.`: the backslash is an escape character that is needed because a simple dot would mean 'any character'
- another `[^\s@]+`for the top-level domain (TLD), such as `com`, `net`
- the final `$` indicates the end of the pattern (nothing can come after it)

## The sign-in page/component

- We need the same imports as for the sign-up page.  
- we add `useState` hooks to manage the email, password, and any potential error messages.  
- The `useNavigate` hook is used to redirect the user to the home page (/) after a successful sign-in.
-  The `handleSubmit` function performs basic validation, and then simulates the login.

## The Home page/component

- a full-page hero section that sits right below the navigation bar
- a title with a nice gradient effect to draw the user's attention
- a prominent 'Explore Movies' button to engage the user to visit our `/movies` page

For the layout, we use `min-h-[calc(100vh-64px)]` to ensure the content fills the screen's height below
a standard 64px navbar, providing a clean full-page experience without unnecessary scrolling.

---

# Travail du lundi 25 août

Installer et utiliser react-hook-form pour valider les données des formulaires utilisés dans les pages 
Signin et Signup.  

---

# Travail du mardi 26 août

- fetch popular movies + display movieDetails using TMDB's API
- use `axios` and `useEffect(() => {}, [])`