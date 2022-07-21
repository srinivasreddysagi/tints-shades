import { useState } from "react";
import Values from "values.js";
import Tile from "./components/Tile";
import { TiTick } from "react-icons/ti";

function App() {
    const [val, setVal] = useState("");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("Input cannot be empty");
    const [clr, setClr] = useState("hsl(112.2, 73.53%, 73.33%)");
    const [clip, setClip] = useState("clip hide");
    const color = new Values(clr).all();

    async function clipboard() {
        setClip("clip");
        setTimeout(() => {
            setClip("clip hide");
        }, 1500);
    }

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
                    onClick={() => {
                        if (val.trim() === "") {
                            setErr(true);
                            setErrMsg("Input cannot be empty");
                        } else if (/^#([(0-9)(a-f)]{3}|[(0-9)(a-f)]{6})$/i.test(val)) {
                            setClr(val);
                            setVal("");
                            setErr(false);
                        } else if (/^rgb/i.test(val) || /^hsl/i.test(val)) {
                            setErr(true);
                            setErrMsg("Only HEX values are accepted");
                        } else {
                            setErr(true);
                            setErrMsg("Not a valid color");
                        }
                    }}
                >
                    Generate
                </button>
            </div>
            <section className="colors">
                {color.map((i, ind) => (
                    <Tile key={ind} obj={i} clip={clipboard} />
                ))}
            </section>
            <p className={clip}>
                Copied to clipboard <TiTick className="TiTick" />
            </p>
        </div>
    );
}

export default App;
