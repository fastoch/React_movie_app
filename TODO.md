# Travail du 21 août

L'idée est d'améliorer notre app avec react-router:
- installer react-router-dom via `npm i react-router-dom` (FAIT)
- déplacer la logique de App dans Movies (FAIT)
- le composant App contiendra la Navbar et le routage vers les différentes pages (FAIT)
- modifier les liens de la navbar pour naviguer entre les différentes pages (FAIT)
- cliquer sur le poster d'un film permettra de voir les détails du film dans MovieDetails (FAIT)
- créer une page wishlist dédiée au lieu d'un menu caché (FAIT)

---

- des formulaires de signin et signup permettront à un user d’entrer ses données (email, password, confirm passord)
- Un bouton permettra de naviguer signup => signin au succès simulé du signup.

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

