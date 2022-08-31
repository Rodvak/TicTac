import React from 'react'
import './Descriptions.css'

import {FaArrowDown, FaArrowUp} from 'react-icons/fa'
import {TiWeatherWindy, TiWeatherDownpour} from 'react-icons/ti'
import {MdOutlineWaterDrop} from 'react-icons/md'
import {TbTemperature} from 'react-icons/tb'

const Descriptions = ({weather, units}) => {

    const tempUnit = units === 'metric' ? '°C' : '°F'
    const windUnit = units === 'metric' ? 'm/s' : 'm/h'

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown/>,
            title: 'min',
            data: weather.temp_min.toFixed(),
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowUp/>,
            title: 'max',
            data: weather.temp_max.toFixed(),
            unit: tempUnit,
        },
        {
            id: 3,
            icon: <TbTemperature/>,
            title: 'feels like',
            data: weather.feels_like.toFixed(),
            unit: tempUnit,
        },
        {
            id: 4,
            icon: <TiWeatherDownpour/>,
            title: 'preassure',
            data: weather.pressure,
            unit: "hPa",
        },
        {
            id: 5,
            icon: <MdOutlineWaterDrop/>,
            title: 'humidity',
            data: weather.humidity,
            unit: "%",
        },
        {
            id: 6,
            icon: <TiWeatherWindy/>,
            title: 'wind speed',
            data: weather.speed.toFixed(),
            unit: windUnit,
        },

    ]

  return (
    <div className='section section__description'>
        {
            cards.map(({id,icon,title, data, unit}) => (
        <div key={id} className="card">
            <div className="description__card-icon">
                {icon}
                <small>{title}</small>
            </div>
            <h2>{`${data} ${unit}`}</h2>
        </div>
            ))
        }
    </div>
  )
}

export default Descriptions