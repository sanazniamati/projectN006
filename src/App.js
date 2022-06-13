import Rectangle from "./Rectangle";
import { useState } from "react";
import { Layer, Stage } from "react-konva";

const initialRectangles = [
  {
    x: 100,
    y: 100,
    points: [0, 0, 200, 0, 100, 300],
    tension: 0.5,
    stroke: "black",
    fill: "red",
    closed: true,
    id: "rect1",
  },
];

function App() {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}

export default App;
