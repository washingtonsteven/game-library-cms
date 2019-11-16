import React from "react";
import { action } from "@storybook/addon-actions";
import ConfirmButton from "../components/ConfirmButton";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "ConfirmButton"
};

export const normal = () => (
  <div style={{ padding: "50px" }}>
    <ConfirmButton
      onConfirm={action("confirmDelete")}
      buttonProps={{ variant: "danger" }}
    >
      Delete
    </ConfirmButton>
  </div>
);

export const add = () => (
  <div style={{ padding: "50px" }}>
    <ConfirmButton
      onConfirm={action("confirmAdd")}
      buttonProps={{ variant: "info" }}
      confirmLabel="Sure?"
      confirmedLabel="Added!"
    >
      Add?
    </ConfirmButton>
  </div>
);
