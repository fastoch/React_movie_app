## 21 août

L'idée est d'améliorer notre app avec react-router:
- déplacer la logique de App dans Movies
- le composant App contiendra
  - la Navbar avec des `<Link></Link>` pointant vers Home, Signin, Signup et Movies
  - le routage vers les différentes pages
- créer une page wishlist dédiée au lieu d'un menu caché
- modifier les liens de la navbar pour naviguer entre les différentes pages
- des formulaires de signin et signup permettront à un user d’entrer ses données (email, password, confirm passord).
- Un bouton permettra de naviguer signup => signin au succès simulé du signup.