import React from "react";
import Button from "react-bootstrap/Button";

const CollapsibleText = ({ children, numWords = 15 }) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const collapsedText = React.useCallback(() => {
    if (!children || typeof children !== "string") {
      return children;
    }
    const regex = new RegExp(`([\\S]+?\\s){${numWords}}`);
    const results = children.match(regex);
    if (!results || !results[0]) {
      return children.trim();
    }

    return results[0].trim();
  }, [children, numWords]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <React.Fragment>
      <span> {collapsed ? collapsedText() : children} </span>
      {children && (
        <span>
          <Button
            variant="link"
            onClick={toggleCollapsed}
            style={{
              padding: 0,
              verticalAlign: "baseline",
              fontSize: "inherit"
            }}
          >
            {collapsed ? "+ more" : "- less"}
          </Button>
        </span>
      )}
    </React.Fragment>
  );
};

export default CollapsibleText;
