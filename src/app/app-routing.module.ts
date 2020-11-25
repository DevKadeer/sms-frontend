import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CityComponent } from "./city/city.component";
import { CityResolver } from "./services/city.resolver";

const routes: Routes = [
  {
    path: "",
    component: CityComponent,
    resolve: {
      city: CityResolver,
    },
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
