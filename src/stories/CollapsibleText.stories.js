import React from "react";
import { action } from "@storybook/addon-actions";
import CollapsibleText from "../components/CollapsibleText";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "CollapsibleText"
};

export const normal = () => (
  <div style={{ padding: "2rem", border: "solid 2px #333", borderRadius: 15 }}>
    <CollapsibleText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at erat et
      arcu vehicula laoreet ut sit amet metus. Proin ultricies, urna at
      venenatis hendrerit, purus risus consectetur purus, nec tempus dui eros ac
      diam. Sed ut convallis dolor. Pellentesque ut neque eget ligula commodo
      efficitur. Donec sed risus tortor. In sagittis turpis nulla. Duis eu justo
      pharetra, viverra mauris vitae, pretium neque. Cras at suscipit nunc, ac
      aliquet nulla. Curabitur rhoncus, leo nec convallis condimentum, velit
      elit sollicitudin enim, non mattis quam est et mauris. Etiam hendrerit est
      pellentesque ipsum finibus venenatis. Praesent sit amet ultricies justo,
      at tincidunt felis. Duis id odio ex. Nullam tempor arcu ante, at cursus
      lorem porttitor sit amet. Phasellus dignissim tempor sapien vel mattis.
      Quisque vitae dictum purus. Aenean blandit blandit sapien, a molestie
      lorem tincidunt eu.
    </CollapsibleText>
  </div>
);
