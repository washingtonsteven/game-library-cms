import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Overlay from "react-bootstrap/Overlay";

const ConfirmState = {
  OFF: "OFF",
  UNCONFIRMED: "UNCONFIRMED",
  CONFIRMED: "CONFIRMED"
};

export default ({
  onConfirm = () => {},
  children,
  label,
  confirmLabel = "Confirm?",
  confirmedLabel = "Done!",
  cancelLabel = "Cancel",
  buttonProps = { variant: "secondary" }
}) => {
  const [confirmState, setConfirmState] = React.useState(ConfirmState.OFF);
  const target = React.useRef(null);

  const initiateConfirm = () => {
    if (confirmState === ConfirmState.OFF) {
      setConfirmState(ConfirmState.UNCONFIRMED);
    } else {
      setConfirmState(ConfirmState.OFF);
    }
  };

  const completeConfirm = () => {
    if (confirmState === ConfirmState.UNCONFIRMED) {
      setConfirmState(ConfirmState.CONFIRMED);
      onConfirm();
    }
  };

  const cancelConfirm = () => setConfirmState(ConfirmState.OFF);

  return (
    <>
      <Button
        {...buttonProps}
        onClick={initiateConfirm}
        disabled={confirmState === ConfirmState.CONFIRMED}
        ref={target}
      >
        {confirmState !== ConfirmState.CONFIRMED
          ? children || label
          : confirmedLabel}
      </Button>
      <Overlay
        show={confirmState === ConfirmState.UNCONFIRMED}
        placement="top"
        target={target.current}
      >
        {({
          placement,
          scheduleUpdate,
          arrowProps,
          outOfBoundaries,
          show,
          ...props
        }) => (
          <div {...props} style={{ ...props.style, padding: 5 }}>
            <ButtonGroup>
              <Button
                onClick={completeConfirm}
                variant={buttonProps.variant || "danger"}
                size="sm"
              >
                {confirmLabel}
              </Button>
              <Button onClick={cancelConfirm} variant="secondary" size="sm">
                {cancelLabel}
              </Button>
            </ButtonGroup>
          </div>
        )}
      </Overlay>
    </>
  );
};
