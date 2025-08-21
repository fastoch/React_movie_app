# 21 août

L'idée est d'améliorer notre app avec react-router:
- installer react-router-dom via `npm i react-router-dom` (FAIT)
- déplacer la logique de App dans Movies (FAIT)
- le composant App contiendra
  - la Navbar 
  - le routage vers les différentes pages
- modifier les liens de la navbar pour naviguer entre les différentes pages (utiliser `<Link>`)
- créer une page wishlist dédiée au lieu d'un menu caché
- des formulaires de signin et signup permettront à un user d’entrer ses données (email, password, confirm passord).
- Un bouton permettra de naviguer signup => signin au succès simulé du signup.

# Modification de App et de Movies

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

# Modification de la NavigationBar

Pour une barre de navigation, il est recommandé d'utiliser `<NavLink>` plutôt que `<Link>`.  
C'est un composant spécial de `react-router-dom` qui sait s'il est "actif" (c'est-à-dire si son lien correspond à l'URL actuelle). Cela permet de lui appliquer un style différent, ce qui est parfait pour indiquer sur quelle page se trouve l'utilisateur.