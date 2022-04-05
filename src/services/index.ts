import searchRoutes from "./search/routes";
import jokeRoutes from "./jokes/routes";
import ratingRoutes from "./rating/routes";
import userRoutes from "./users/routes"
import authRoutes from "./auth/routes"


export default [...searchRoutes, ...jokeRoutes, ...ratingRoutes, ...userRoutes, ...authRoutes];