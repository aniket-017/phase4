import React, { useState } from "react";
import filters from "./setting.png";
import "./filters.css";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {
  const dispatch = useDispatch();
  const { c } = useSelector((state) => state.filter.filters);

  const [specifiedStandard, setSpecifiedStandard] = useState("");
  const [certificationStatus, setCertificationStatus] = useState("");
  const [surfaceFinish, setSurfaceFinish] = useState("");
  const [hotForge, setHotForge] = useState(false);
  const [coldForge, setColdForge] = useState(false);
  const [shade, setShade] = useState([]);
  const [coatedMaterial, setCoatedMaterial] = useState(["BLACK PASSIVATION", "BLUE PASSIVATION"]);
  const [brand, setBrand] = useState("");
  const [mildSteelGrade, setMildSteelGrade] = useState([0, 10]);
  const [alloySteelGrade, setAlloySteelGrade] = useState([0, 10]);

  const hotForgeValue = hotForge ? "yes" : "";
  const coldForgeValue = coldForge ? "yes" : "";

  // State variable to track if filters have been applied
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFiltersApplied(true);
    dispatch({
      type: "setFilterValues",
      payload: {
        specifiedStandard,
        certificationStatus,
        surfaceFinish,
        hotForge: hotForgeValue,
        coldForge: coldForgeValue,
        shade,
        coatedMaterial,
        brand,
        mildSteelGrade,
        alloySteelGrade,
        // Add other filter properties here
      },
    });
  };

  const priceHandler = (event, newMildSteelGrade) => {
    setMildSteelGrade(newMildSteelGrade);
  };

  var value = 20;
  const addBtn = () => {
    dispatch({
      type: "increment",
    });
  };
  const addBtn25 = () => {
    dispatch({
      type: "incrementByValue",
      payload: 25,
    });
  };
  const subBtn = () => {
    dispatch({
      type: "decrement",
    });
  };

  return (
    <div className="container">
      <h2 className="header">
        Filters
        <img src={filters} alt="Logo" />
      </h2>
      {/* <div>
      <h2>{c}</h2>
        <button onClick={addBtn}>Increment</button>
        <button onClick={addBtn25}>Increment by 25</button>
        <button onClick={subBtn}>Decrement</button>
      </div> */}
      <form onSubmit={handleFilterSubmit}>
        <div className="select">
          <label className="label">Specified Standard:</label>
          <select
            className="select-box"
            value={specifiedStandard}
            onChange={(e) => setSpecifiedStandard(e.target.value)}
          >
            <option value="">Select</option>
            <option value="IS">IS</option>
            <option value="DIN">DIN</option>
            <option value="ISO">ISO</option>
          </select>
        </div>
        <div className="select">
          <label className="label">Certification Status:</label>
          <select
            className="select-box"
            value={certificationStatus}
            onChange={(e) => setCertificationStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>
        {/* Add similar controls for other filters */}

        <div className="select">
          <label className="label">Surface Finish:</label>
          <select className="select-box" value={surfaceFinish} onChange={(e) => setSurfaceFinish(e.target.value)}>
            <option value="">Select</option>
            <option value="SMOOTH">Smooth</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
        <div className="checkbox">
          <label className="label">Hot Forge:</label>
          <input type="checkbox" checked={hotForge} onChange={(e) => setHotForge(e.target.checked)} />
        </div>
        <div className="checkbox">
          <label className="label">Cold Forge:</label>
          <input type="checkbox" checked={coldForge} onChange={(e) => setColdForge(e.target.checked)} />
        </div>
        <div className="select">
          <label className="label">Shade:</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="shade"
                value="GREY"
                checked={shade === "GREY"}
                onChange={(e) => setShade(e.target.value)}
              />
              Grey
            </label>
            <label>
              <input
                type="radio"
                name="shade"
                value="BLACK"
                checked={shade === "BLACK"}
                onChange={(e) => setShade(e.target.value)}
              />
              Black
            </label>
            <label>
              <input
                type="radio"
                name="shade"
                value="BLUE"
                checked={shade === "BLUE"}
                onChange={(e) => setShade(e.target.value)}
              />
              Blue
            </label>
            <label>
              <input
                type="radio"
                name="shade"
                value="YELLOW"
                checked={shade === "YELLOW"}
                onChange={(e) => setShade(e.target.value)}
              />
              Yellow
            </label>
            <label>
              <input
                type="radio"
                name="shade"
                value="GREEN"
                checked={shade === "GREEN"}
                onChange={(e) => setShade(e.target.value)}
              />
              Green
            </label>
          </div>
        </div>

        <div className="select">
          <label className="label">Coated Material:</label>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value="GALVANISED COATING"
                checked={coatedMaterial.includes("GALVANISED COATING")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCoatedMaterial([...coatedMaterial, "GALVANISED COATING"]);
                  } else {
                    setCoatedMaterial(coatedMaterial.filter((item) => item !== "GALVANISED COATING"));
                  }
                }}
              />
              GALVANISED COATING
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value="BLACK PASSIVATION"
                checked={coatedMaterial.includes("BLACK PASSIVATION")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCoatedMaterial([...coatedMaterial, "BLACK PASSIVATION"]);
                  } else {
                    setCoatedMaterial(coatedMaterial.filter((item) => item !== "BLACK PASSIVATION"));
                  }
                }}
              />
              BLACK PASSIVATION
            </label>
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value="BLUE PASSIVATION"
                checked={coatedMaterial.includes("BLUE PASSIVATION")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCoatedMaterial([...coatedMaterial, "BLUE PASSIVATION"]);
                  } else {
                    setCoatedMaterial(coatedMaterial.filter((item) => item !== "BLUE PASSIVATION"));
                  }
                }}
              />
              BLUE PASSIVATION
            </label>
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value="YELLOW PASSIVATION"
                checked={coatedMaterial.includes("YELLOW PASSIVATION")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCoatedMaterial([...coatedMaterial, "YELLOW PASSIVATION"]);
                  } else {
                    setCoatedMaterial(coatedMaterial.filter((item) => item !== "YELLOW PASSIVATION"));
                  }
                }}
              />
              YELLOW PASSIVATION
            </label>
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value="MAGNI COATING"
                checked={coatedMaterial.includes("MAGNI COATING")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCoatedMaterial([...coatedMaterial, "MAGNI COATING"]);
                  } else {
                    setCoatedMaterial(coatedMaterial.filter((item) => item !== "MAGNI COATING"));
                  }
                }}
              />
              MAGNI COATING
            </label>
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value="GREY PASSIVATION"
                checked={coatedMaterial.includes("GREY PASSIVATION")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCoatedMaterial([...coatedMaterial, "GREY PASSIVATION"]);
                  } else {
                    setCoatedMaterial(coatedMaterial.filter((item) => item !== "GREY PASSIVATION"));
                  }
                }}
              />
              GREY PASSIVATION
            </label>
          </div>

          {/* Repeat similar code for other options */}
        </div>

        <div className="select">
          <label className="label">Brand:</label>
          <select className="select-box" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select</option>
            <option value="Fourpower">Fourpower</option>
            <option value="threepower">threepower</option>
          </select>
        </div>
        <div className="select">
          <label className="label">Mild Steel Grade:</label>
          <input
            type="number"
            className="select-box"
            value={mildSteelGrade[0]}
            onChange={(e) => setMildSteelGrade([parseInt(e.target.value), mildSteelGrade[1]])}
          />
          <input
            type="number"
            className="select-box"
            value={mildSteelGrade[1]}
            onChange={(e) => setMildSteelGrade([mildSteelGrade[0], parseInt(e.target.value)])}
          />
        </div>
        <div className="select">
          <label className="label">Alloy Steel Grade:</label>
          <input
            type="number"
            className="select-box"
            value={alloySteelGrade[0]}
            onChange={(e) => setAlloySteelGrade([parseInt(e.target.value), alloySteelGrade[1]])}
          />
          <input
            type="number"
            className="select-box"
            value={alloySteelGrade[1]}
            onChange={(e) => setAlloySteelGrade([alloySteelGrade[0], parseInt(e.target.value)])}
          />
        </div>

        <div className="filterBox">
          <Typography>Mild Steel Grade</Typography>
          <Slider
            value={mildSteelGrade}
            onChange={priceHandler}
            valueLabelDisplay="auto" //'on' //'auto'
            aria-labelledby="range-slider"
            min={0}
            max={10}
          />
        </div>

        <button type="submit" className="button">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default Filters;
