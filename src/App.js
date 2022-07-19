import { useState } from "react";
import Values from "values.js";
import Tile from "./components/Tile";

function App() {
    const [val, setVal] = useState("");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("Input cannot be empty");
    const [clr, setClr] = useState("hsl(112.2, 73.53%, 73.33%)");
    const color = new Values(clr).all();
    return (
        <div className="App">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Color"
                    className="color"
                    value={val}
                    onChange={(e) => {
                        setErr(false);
                        setVal(e.target.value);
                    }}
                />
                <small className={err ? "err" : "err hide"}>{errMsg}</small>
                <button
                    onClick={(e) => {
                        if (val.trim() === "") {
                            setErr(true);
                            setErrMsg("Input cannot be empty");
                        } else if (
                            typeof val === "string" &&
                            val.length === 6 &&
                            !isNaN(Number("0x" + val))
                        ) {
                            setErr(true);
                            setErrMsg("Not a valid color");
                        } else {
                            setClr(val);
                            setVal('');
                            setErr(false);
                        }
                    }}
                >
                    Generate
                </button>
            </div>
            <section className="colors">
                {color.map((i, ind) => (
                    <Tile key={ind} obj={i} />
                ))}
            </section>
        </div>
    );
}

export default App;
