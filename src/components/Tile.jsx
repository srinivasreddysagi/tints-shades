import React, { useState } from "react";
import "./tile.css";

function Tile({ obj, clip }) {
    const [show, setShow] = useState(false);
    return (
        <article
            className="tile"
            style={{ backgroundColor: `#${obj.hex}` }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={() => {
                clip();
                navigator.clipboard.writeText(`#${obj.hex}`);
            }}
        >
            <div
                className={
                    show
                        ? obj.type === "tint"
                            ? "details tint"
                            : "details shade"
                        : "details hide"
                }
            >
                <p>{obj.weight}%</p>
                <p>#{obj.hex}</p>
                <p>
                    rgb({obj.rgb[0]}%, {obj.rgb[1]}%, {obj.rgb[2]}%)
                </p>
            </div>
        </article>
    );
}

export default Tile;
