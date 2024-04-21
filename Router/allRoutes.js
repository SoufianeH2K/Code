import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/services", "Nos services", "/pages/services.html"),
  new Route("/habitats", "Nos habitats", "/pages/habitats.html"),
  new Route("/contact", "Contactez nous", "/pages/contact.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";
