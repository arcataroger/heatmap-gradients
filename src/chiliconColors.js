

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

/*
<option value='p_out_avg'>Average Output Power (W)</option>
								<option value='adc_vpv_last_sum'>PV Voltage (V)</option>
								<option value='i_pv'>PV Current (A)</option>
								<option value='flash_page_total_energy'>Total Energy Produced (kWh)</option>
								<option value='sensor_temp_1'>DC/DC Temperature (&#176;C)</option>
								<option value='sensor_temp_3'>Board Temperature (&#176;C)</option>
								<option value='v_grid_sum_sq_ema'>Grid Voltage (Vrms)</option>
								<option value='v_grid_thd'>Grid Voltage THD (%)</option>
								<option value='i_grid_thd_slow_ema'>Grid Current THD (%)</option>
								<option value='cycle_duration_jitter_average'>Cycle Duration Jitter (&mu;s)</option>
								<option value='max_cycle_duration_error_abs'>Cycle Duration Max Error (&mu;s)</option>
								<option value='flash_page_decoded_packet_cnt'>Decoded Packet Count</option>
								<option value='flash_page_comm_check_sum_error'>Checksum Error Count</option>
								<option value='flash_page_operating_time'>Operating Time (Hrs)</option>
								<option value='flash_page_firmware_version_id'>Firmware Version</option>
							{% else %} {# only for admins #}
								<option value='p_out_avg'>Average Output Power (W)</option>
								<option value='adc_vpv_last_sum'>PV Voltage (V)</option>
								<option value='i_pv'>PV Current (A)</option>
								<option value='input_power_integral_old'>Input Power (W)</option>
								<option value='efficiency'>Efficiency (%)</option>
								<option value='gain'>Gain (%)</option>
								<option value='flash_page_total_energy'>Total Energy Produced (kWh)</option>
								<option value='sensor_temp_1'>DC/DC Temperature (&#176;C)</option>
								<option value='sensor_temp_3'>Board Temperature (&#176;C)</option>
								<option value='flyback_ton'>Flyback Duty Cycle (%)</option>
								<option value='flyback_voltage_slow_ema'>Flyback Voltage (V)</option>
								<option value='v_grid_sum_sq_ema'>Grid Voltage (Vrms)</option>
								<option value='v_grid_thd'>Grid Voltage THD (%)</option>
								<option value='i_grid_thd_slow_ema'>Grid Current THD (%)</option>
								<option value='cycle_duration_jitter_average'>Cycle Duration Jitter (&mu;s)</option>
								<option value='max_cycle_duration_error_abs'>Cycle Duration Max Error (&mu;s)</option>
								<option value='flash_page_decoded_packet_cnt'>Decoded Packet Count</option>
								<option value='flash_page_comm_check_sum_error'>PV Module Impedance</option>
								<option value='decoded_golay_bit_err_cnt'>Golay Bit Error Count</option>
								<option value='decoded_golay_word_cnt'>Decoded Golay Word Count</option>
								<option value='flash_page_operating_time'>Operating Time (Hrs)</option>
								<option value='ms_ticks'>ms Ticks (seconds)</option>
								<option value='ac_over_current_event_count_max'>Over Current Even Count (max)</option>
								<option value='process'>Process ID</option>
								<option value='flash_page_firmware_upgrade_error_status'>Firmware Upgrade Error Status</option>
								<option value='high_word'>High Word</option>
								<option value='flash_page_firmware_version_id'>Firmware Version</option>
								<option value='hardware_version'>Hardware Version</option>
								<option value='status'>Status Word</option>
								<option value='status2'>Status Word 2</option>
								<option value='frame_counter_save'>Frame Counter Saved</option>
								<option value='status_save'>Status Word Saved At Disconnect</option>
								<option value='status2_save'>Status Word 2 Saved At Disconnect</option>
 */