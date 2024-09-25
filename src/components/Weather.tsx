import React, { useState } from 'react';

export interface WeatherProps {}

type WeatherData = {
  raw_text: string;
  station_id: string;
  observation_time: string;
  latitude: string;
  longitude: string;
  temp_c: string;
  dewpoint_c: string;
  wind_dir_degrees: string;
  wind_speed_kt: string;
  visibility_statute_mi: string;
  altim_in_hg: string;
  sea_level_pressure_mb: string;
  quality_control_flags: {
    auto_station: string;
  };
  sky_condition: {
    sky_cover: string;
    cloud_base_ft_agl: string;
  }[];
  flight_category: string;
  metar_type: string;
  elevation_m: string;
}[];

const Weather: React.FC<WeatherProps> = (): JSX.Element => {
  const [weatherData, setWeatherData] = useState<WeatherData>([]);

  const handleGetWeather = async () => {
    const currentWeatherResponse = await fetch('https://avwx.fekke.com/metar/kcrg');
    const currentWeatherData = await currentWeatherResponse.json() as WeatherData;
    setWeatherData(currentWeatherData);
  }

  return (
    <div>
      <button 
        className="bg-[#3448b4] text-white p-3 rounded-xl drop-shadow-xl hover:bg-[#2a3a8a] my-3" 
        onClick={handleGetWeather}>Get Weather</button>
      <h3 className="text-xl font-bold">Weather</h3>
      {weatherData.length === 0 && <p>No weather data</p>}
      {weatherData.length > 0 && (<>
        {/* <strong>raw_text</strong>: {weatherData[0].raw_text}<br /> */}
        <strong>station_id</strong>: {weatherData[0].station_id}<br />
        <strong>observation_time</strong>: {weatherData[0].observation_time}<br />
        <strong>latitude</strong>: {weatherData[0].latitude}<br />
        <strong>longitude</strong>: {weatherData[0].longitude}<br />
        <strong>temp_c</strong>: {weatherData[0].temp_c}<br />
        <strong>dewpoint_c</strong>: {weatherData[0].dewpoint_c}<br />
        <strong>wind_dir_degrees</strong>: {weatherData[0].wind_dir_degrees}<br />
        <strong>wind_speed_kt</strong>: {weatherData[0].wind_speed_kt}<br />
        <strong>visibility_statute_mi</strong>: {weatherData[0].visibility_statute_mi}<br />
        <strong>altim_in_hg</strong>: {weatherData[0].altim_in_hg}<br />
        <strong>sea_level_pressure_mb</strong>: {weatherData[0].sea_level_pressure_mb}<br />
        <strong>quality_control_flags</strong>: 
        {weatherData[0].quality_control_flags.auto_station}<br />
          
        
        <strong>sky_condition</strong>: <br />
        {weatherData[0].sky_condition.map((sky, index) => (
          <div key={index}>
            <strong>sky_cover</strong>: {sky.sky_cover}<br />
            <strong>cloud_base_ft_agl</strong>: {sky.cloud_base_ft_agl}<br />
          </div>
        ))}
          
          <strong>flight_category</strong>: {weatherData[0].flight_category}<br />
          <strong>metar_type</strong>: {weatherData[0].metar_type}<br />
          <strong>elevation_m</strong> : {weatherData[0].elevation_m}<br />
      </>)}
      
    </div>
  );
};

Weather.displayName = 'Weather';

export default Weather;
