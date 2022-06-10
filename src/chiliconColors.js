function setupParamVariables(param) {
    let min = chartMinValue;
    let delta = chartMaxValue - chartMinValue;
    let unit = '';
    let precision = 1; // no digit
    let h0 = 115, h1 = 0;
    let s0 = 85, s1 = 8;
    let l0 = 10, l1 = 83;
    if ((param === 'p_out_avg') || (param === 'input_power_integral_old')) {
        min = 0;
        delta = 400;
        unit = 'W';
        l1 = 92;
    } else if (param === 'efficiency') {
        min = 75;
        delta = 25;
        unit = '%';
        precision = 100;
        h0 = 0;
        h1 = 120;
        s0 = 100;
        s1 = 0;
        l0 = 50;
        l1 = 0;
    } else if (param === 'adc_vpv_last_sum') {
        min = 8;
        delta = (chartMaxValue < 50 ? 45 : 90) - min;
        unit = 'V';
        precision = 10;
        h0 = 190;
        h1 = -190;
        s0 = 100;
        s1 = 0;
        l0 = 0;
        l1 = 80;
    } else if (param === 'i_pv') {
        min = 0;
        unit = 'A';
        precision = 10;
    } else if (param === 'gain') {
        min = 0;
        delta = 100;
        unit = '%';
        precision = 100;
        h0 = -23;
        h1 = 86;
        s0 = 100;
        s1 = 0;
        l0 = 50;
        l1 = 0;
    } else if ((param === 'sensor_temp_1') || (param === 'sensor_temp_3')) {
        min = -30;
        delta = 130;
        unit = '°C';
        h0 = 240;
        h1 = -240;
        s0 = 100;
        s1 = 0;
        l0 = 50;
        l1 = 0;
    } else if (param === 'flyback_ton') {
        min = 40;
        delta = 35;
        unit = '%';
        precision = 10;
        h0 = 30;
        h1 = 0;
        s0 = 100;
        s1 = 0;
        l0 = 25;
        l1 = 33;
    } else if (param === 'flyback_voltage_slow_ema') {
        min = 10;
        delta = 5;
        unit = 'V';
        precision = 10;
        h0 = 0;
        h1 = -60;
        s0 = 100;
        s1 = 0;
        l0 = 60;
        l1 = 15;
    } else if (param === 'v_grid_sum_sq_ema') {
        min = 150;
        delta = 130;
        unit = 'Vrms';
        h0 = 240;
        h1 = -240;
        s0 = 100;
        s1 = 0;
        l0 = 55;
        l1 = 0;
    } else if (param === 'v_grid_thd') {
        min = 0;
        delta = 15;
        unit = '%';
        precision = 10;
        h0 = 120;
        h1 = -120;
        s0 = 100;
        s1 = 0;
        l0 = 50;
        l1 = 0;
    } else if (param === 'i_grid_thd_slow_ema') {
        min = 0;
        delta = 200;
        unit = '%';
        h0 = 120;
        h1 = -120;
        s0 = 100;
        s1 = 0;
        l0 = 50;
        l1 = 0;
    } else if ((param === 'cycle_duration_jitter_average') || (param === 'max_cycle_duration_error_abs')) {
        precision = 10;
        unit = 'µs';
    } else if (param === 'ac_over_current_event_count_max') {
        min = 0;
        delta = 60;
        h0 = 120;
        h1 = -120;
        s0 = 100;
        s1 = 0;
        l0 = 60;
        l1 = 0;
    } else if ((param === 'process') || (param === 'frame_counter_save')) {
        h0 = 0;
        h1 = 330;
        s0 = 100;
        s1 = 0;
        l0 = 75;
        l1 = 0;
    } else if (param === 'flash_page_firmware_version_id') {
        min = 234;
        delta = 25;
        h0 = 0;
        h1 = 360;
        s0 = 100;
        s1 = 0;
        l0 = 70;
        l1 = 0;
    } else if (param === 'hardware_version') {
        min = 0;
        delta = 36;
        h0 = 0;
        h1 = 360;
        s0 = 100;
        s1 = 0;
        l0 = 70;
        l1 = 0;
    } else if (param === 'flash_page_total_energy') {
        unit = 'kWh';
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
        l1: l1,
    }
}
