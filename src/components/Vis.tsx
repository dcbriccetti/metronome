import Sketch, { VisSettings } from "../visualization";
import React, { useRef, useEffect } from "react";

interface Props {
  getTime: () => number;
  visSettings: VisSettings;
}

export default function Vis({ getTime, visSettings }: Props) {
  const sketchRef = useRef<Sketch | null>(null);

  useEffect(() => {
    if (!sketchRef.current) {
      sketchRef.current = new Sketch(getTime, visSettings);
    } else {
      // sketchRef.current.updateVisSettings(visSettings);
    }
  }, [visSettings]);

  return <div id="visualization" className="col-sm"></div>;
};

