const defaults = {
    h0: 115,
    s0: 85,
    l0: 10,
    h1: 0,
    s1: 8,
    l1: 83
}

const metrics = [
    {
        param: 'p_out_avg',
        l1: 92
    },
    {
        param: 'efficiency',
        h0: 0,
        h1: 120,
        s0: 100,
        s1: 0,
        l0: 50,
        l1: 0
    },
    {
        param: 'adc_vpv_lat_sum',
        h0: 190,
        h1: -190,
        s0: 100,
        s1: 0,
        l0: 0,
        l1: 80
    },
    {
        param: 'frame_counter_saved',
        h0: 0,
        h1: 330,
        s0: 100,
        s1: 0,
        l0: 75,
        l1: 0,
    },
    {
        param: 'sensor_temp_1',
        h0: 240,
        h1: -240,
        s0: 100,
        s1: 0,
        l0: 50,
        l1: 0,
    }
]

const metricColors = steps => metrics.map(metric => {
    let colors = []
    for (let i = 0; i <= steps; i++) {
        colors.push(
            {
                h: ((metric.h0 ?? defaults.h0) + ((metric.h1 ?? defaults.h1) * i) / steps),
                s: ((metric.s0 ?? defaults.s0) + ((metric.s1 ?? defaults.s1) * i) / steps),
                l: ((metric.l0 ?? defaults.l0) + ((metric.l1 ?? defaults.l1) * i) / steps),
            }
        )
    }
    return ({name: metric.param, colors})
})

const ColorDisplay = props => <>
    <h2>Gradient steps: {props.steps}</h2>
    {
        metricColors(props.steps).map(metric => {

            const hslColors = metric.colors.map(color => `hsl(${color.h}deg, ${color.s}%, ${color.l}%)`).join()

            return <>
                <div style={{
                    width: '90vw',
                    background: `linear-gradient(to right, ${hslColors})`,
                    margin: '10px',
                    padding: '10px',
                    color: 'black',
                }}>
                    <span style={{font: "bold 20pt sans-serif", background: 'white'}}>{metric.name}</span>
                    {/*<span style={{font: "10pt sans-serif", marginLeft: "1em"}}>{hslColors}</span>*/}
                </div>
            </>
        })
    }
</>


function App() {
    return <>

        <h1>Chilicon original gradients</h1>
        <ColorDisplay steps={10}/>

        <h1>Our test gradients</h1>
        <ColorDisplay steps={3}/>
        <ColorDisplay steps={2}/>
        <ColorDisplay steps={1}/>

        {/*

        <h2>JSON Dump</h2>
        <pre>{JSON.stringify(metricColors, null, 2)}</pre>
*/}

    </>
}

export default App;

/*

// returns a hex string from a decimal number (positive of negative). The HEX string will have at least 2 digits
function decimalToHexString(number) {
    if (number < 0) {
        number = 0xffffffff + number + 1;
    }
    let hex = number.toString(16).toUpperCase();
    return hex.length < 2 ? "0" + hex : hex;
}


// Assumes h, s, and l are contained in the set [0, 1] and returns a color of format #RRGGBB
function hslToRgb(h, s, l) {
    var r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return (
        "#" +
        decimalToHexString(Math.round(r * 255)) +
        decimalToHexString(Math.round(g * 255)) +
        decimalToHexString(Math.round(b * 255))
    );
}


let previousParamName = ""; // used to compare previous and current values of the parameter selection box to avoid repeating calculations

// returns an array of values depening on the passed paramName which is a strign corresponding to the attributeSelection0
function setupParamVariables(param) {
  let min = 0;
  let delta = 0;
  let unit = "";
  let precision = 1; // no digit
  let h0 = 115,
      h1 = 0;
  let s0 = 85,
      s1 = 8;
  let l0 = 10,
      l1 = 83;
  if (param === "p_out_avg" || param === "input_power_integral_old") {
    min = 0;
    delta = 400;
    unit = "W";
    l1 = 92;
  } else if (param === "efficiency") {
    min = 75;
    delta = 25;
    unit = "%";
    precision = 100;
    h0 = 0;
    h1 = 120;
    s0 = 100;
    s1 = 0;
    l0 = 50;
    l1 = 0;
  } else if (param === "adc_vpv_last_sum") {
    min = 8;
    delta = (chartMaxValue < 50 ? 45 : 90) - min;
    unit = "V";
    precision = 10;
    h0 = 190;
    h1 = -190;
    s0 = 100;
    s1 = 0;
    l0 = 0;
    l1 = 80;
  } else if (param === "i_pv") {
    min = 0;
    unit = "A";
    precision = 10;
  } else if (param === "gain") {
    min = 0;
    delta = 100;
    unit = "%";
    precision = 100;
    h0 = -23;
    h1 = 86;
    s0 = 100;
    s1 = 0;
    l0 = 50;
    l1 = 0;
  } else if (param === "sensor_temp_1" || param === "sensor_temp_3") {
    min = -30;
    delta = 130;
    unit = "°C";
    h0 = 240;
    h1 = -240;
    s0 = 100;
    s1 = 0;
    l0 = 50;
    l1 = 0;
  } else if (param === "flyback_ton") {
    min = 40;
    delta = 35;
    unit = "%";
    precision = 10;
    h0 = 30;
    h1 = 0;
    s0 = 100;
    s1 = 0;
    l0 = 25;
    l1 = 33;
  } else if (param === "flyback_voltage_slow_ema") {
    min = 10;
    delta = 5;
    unit = "V";
    precision = 10;
    h0 = 0;
    h1 = -60;
    s0 = 100;
    s1 = 0;
    l0 = 60;
    l1 = 15;
  } else if (param === "v_grid_sum_sq_ema") {
    min = 150;
    delta = 130;
    unit = "Vrms";
    h0 = 240;
    h1 = -240;
    s0 = 100;
    s1 = 0;
    l0 = 55;
    l1 = 0;
  } else if (param === "v_grid_thd") {
    min = 0;
    delta = 15;
    unit = "%";
    precision = 10;
    h0 = 120;
    h1 = -120;
    s0 = 100;
    s1 = 0;
    l0 = 50;
    l1 = 0;
  } else if (param === "i_grid_thd_slow_ema") {
    min = 0;
    delta = 200;
    unit = "%";
    h0 = 120;
    h1 = -120;
    s0 = 100;
    s1 = 0;
    l0 = 50;
    l1 = 0;
  } else if (
      param === "cycle_duration_jitter_average" ||
      param === "max_cycle_duration_error_abs"
  ) {
    precision = 10;
    unit = "µs";
  } else if (param === "ac_over_current_event_count_max") {
    min = 0;
    delta = 60;
    h0 = 120;
    h1 = -120;
    s0 = 100;
    s1 = 0;
    l0 = 60;
    l1 = 0;
  } else if (param === "process" || param === "frame_counter_save") {
    h0 = 0;
    h1 = 330;
    s0 = 100;
    s1 = 0;
    l0 = 75;
    l1 = 0;
  } else if (param === "flash_page_firmware_version_id") {
    min = 234;
    delta = 25;
    h0 = 0;
    h1 = 360;
    s0 = 100;
    s1 = 0;
    l0 = 70;
    l1 = 0;
  } else if (param === "hardware_version") {
    min = 0;
    delta = 36;
    h0 = 0;
    h1 = 360;
    s0 = 100;
    s1 = 0;
    l0 = 70;
    l1 = 0;
  } else if (param === "flash_page_total_energy") {
    unit = "kWh";
    precision = 100;
    delta = 2;
  }
  return {
    min: min,
    delta: delta,
    unit: unit,
    precision: precision,
    h0: h0,
    h1: h1,
    s0: s0,
    s1: s1,
    l0: l0,
    l1: l1
  };
}


// Update panel color based on the cursor location x (date = pos.x/1000)
function setPanelColorsBasedOnPlotCursor(x) {
  let i;
  var paramName = document.getElementById("attributeSelection0").value;
  var param = setupParamVariables(paramName);
  // $("#minScalePanels").text(humanReadableUnit(param.min) + param.unit);
  // $("#maxScalePanels").text(humanReadableUnit(param.min + param.delta) + param.unit);
  if (paramName !== previousParamName) {
    // change of parameter has occurred
    var listOfColors = "";
    for (i = 0; i <= 10; i++) {
      if (listOfColors !== "") {
        // not the first one
        listOfColors += ",";
      }
      var color = hslToRgb(
          (param.h0 + (param.h1 * i) / 10) / 360.0,
          (param.s0 + (param.s1 * i) / 10) / 100.0,
          (param.l0 + (param.l1 * i) / 10) / 100.0
      );
      listOfColors += color;
    }
    $(".table_scale_gradient_darker").css(
        "background",
        "linear-gradient(to right, " + listOfColors + ")"
    );
  }
  previousParamName = paramName;
  for (i = 0; i < gatewayCount; i++) {
    const data = plot0.getData();
    const invs = inverters[i];
    const length = invs !== undefined ? invs.gid.length : 0;
    for (let inv = 0; inv < length; inv++) {
      const divBy2 =
          invs.isTwin[inv] &&
          (paramName === "p_out_avg" ||
              paramName === "input_power_integral_old" ||
              paramName === "flash_page_total_energy");
      let gid = invs.gid[inv];
      const index = findInverterDataArrayIndexFromGid(gid, data);
      if (index !== -1) {
        // find the right date
        let value = binarySearchInFlatArray(
            data[index].datapoints.points,
            x * 1000
        );
        if (value !== -0.000000001) {
          // found the right date
          if (divBy2) {
            // twins for certain params
            value /= 2;
          }
          const intens = Math.max(0.0, value - param.min) / param.delta;
          const h = Math.floor(param.h0 + param.h1 * intens);
          const s = Math.floor(param.s0 + param.s1 * intens);
          const l = Math.floor(param.l0 + param.l1 * intens);
          inverters[0].color[inv] = "hsl(" + h + "," + s + "%," + l + "%)";
          inverters[0].show[inv] = true;
          inverters[0].value[inv] =
              Math.round(value * param.precision) / param.precision;
          if (l > 33) {
            inverters[0].fontColor[inv] = "#000000";
          } else {
            inverters[0].fontColor[inv] = "#FFFFFF";
          }
        } else {
          inverters[0].show[inv] = false;
        }
      } else {
        inverters[0].show[inv] = false;
      }
    }
  }
}


 */