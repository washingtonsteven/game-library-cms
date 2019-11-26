import React from "react";

const Star = ({
  active,
  activeColor = "#ffd700",
  inactiveColor = "#ccc",
  onClick = () => {}
}) => {
  return (
    <div onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
          fill={active ? activeColor : inactiveColor}
        />
      </svg>
    </div>
  );
};

const initialStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  justifyItems: "center"
};

const StarRating = ({ totalStars = 5, initialRating = 0, onUpdate }) => {
  const [currentRating, setCurrentRating] = React.useState(initialRating);
  const [style, setStyle] = React.useState(initialStyle);
  const latestOnUpdate = React.useRef(onUpdate);

  React.useEffect(() => {
    setStyle(s => ({
      ...s,
      gridTemplateColumns: `repeat(${totalStars}, 1fr)`
    }));
  }, [totalStars]);

  React.useEffect(() => {
    latestOnUpdate.current = onUpdate;
  }, [onUpdate]);

  React.useEffect(() => {
    latestOnUpdate.current && latestOnUpdate.current(currentRating);
  }, [currentRating, latestOnUpdate]);

  return (
    <div style={style}>
      {[...Array(totalStars)].map((v, i) => (
        <Star
          key={i}
          active={i < currentRating}
          onClick={() => {
            setCurrentRating(i + 1); // 0-based
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
