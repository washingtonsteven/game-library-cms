import React from "react";
import { action } from "@storybook/addon-actions";
import StarRating from "../components/StarRating";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "StarRating"
};

export const normal = () => (
  <div>
    <StarRating onUpdate={action("updated")} />
  </div>
);

export const tenStars = () => (
  <div>
    <StarRating totalStars={10} onUpdate={action("updated")} />
  </div>
);
