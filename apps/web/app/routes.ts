import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/base-layout.tsx", [
    index("./routes/home.tsx"),
    layout("./components/layouts/auth-layout.tsx", [
      route("/register", "./routes/register.tsx"),
      route("/login", "./routes/login.tsx"),
    ]),

    route("/details/:slug", "./routes/details.tsx"),
    route("/keranjang", "./routes/cart.tsx"),
    layout("./components/layouts/protected-layout.tsx", [
      route("/order", "./routes/order.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
