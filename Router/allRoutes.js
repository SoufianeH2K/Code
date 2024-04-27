import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", "/js/home.js"),
  new Route("/services", "Nos services", "/pages/services.html"),
  new Route("/habitats", "Nos habitats", "/pages/habitats.html"),
  new Route("/connection", "Connexion", "/pages/connection.html"),
  new Route("/contact", "Contactez nous", "/pages/contact.html"),
  new Route("/reservation", "Réservation", "/pages/reservation.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Arcadia";
