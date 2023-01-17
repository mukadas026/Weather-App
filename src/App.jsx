import React, { useEffect, useRef, useState } from "react"
import Search from "./components/Search"
import Current from "./components/Current"
import Hourly from "./components/Hourly"
import Card from "./components/Card"
import ErrorBoundary from "./components/ErrorBoundary"
import Loading from "./components/Loading"

import snow from './assets/sun.jpg'
import dc from './assets/darkclouds.jpg'

import "./index.css"

const key = "6cb7c2997235474faf5192917231001"

const App = () => {
	const [location, setLocation] = useState("")
	const [forecast, setForecast] = useState("")
	const [loading, setLoading] = useState(false)

	const loadingRef = useRef(null)

	useEffect(() => {
		// loadingRef.current.classList.remove('hidden')
		if (location) {
			loadingRef.current.classList.remove("hidden")
			fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}`)
				.then((res) => res.json())
				.then((obj) => {
					loadingRef.current.classList.add('hidden')
					// console.log(obj)
					return setForecast(obj)
				})
				.catch((err) => {
					setForecast('')
					loadingRef.current.classList.add('hidden')
					console.log(err)
				})
		}
		// loadingRef.current.classList.add('hidden')
	}, [location])
	
	const styles = {
		backgroundImage: `url(${dc})`,
	}

	return (
		<div style={styles} className='w-screen box-border relative pb-5 '>
			<div
				ref={loadingRef}
				className='absolute top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 hidden z-10'
			>
				<div className='w-full h-full rounded-full border-8 border-transparent border-t-8 border-t-red-600 animate-spin'></div>
			</div>
			<div className='h-32 w-screen flex items-start justify-center'>
				<Search
					setLocation={setLocation}
					api={key}
				/>
			</div>
			{forecast !== "" && !forecast.error ? (
				<div className='w-full h-max box-border px-4 '>
					<Current
						current={forecast.current}
						location={forecast.location}
					/>

					<Hourly
						hourly={forecast.forecast}
						lastUpdated={forecast.current.last_updated}
					/>
				</div>
			) : (
				<div className='border w-11/12 mx-auto flex items-center justify-center h-[500px] my-8 box-border rounded-xl bg-white/30 backdrop-blur-lg text-shadow p-4'>
					<p className='text-5xl text-center font-bold text-white'>
						Type a location in the search bar to know the current weather of your local area
					</p>
				</div>
			)}

			<p className='text-xl font-bold text-center flex items-center justify-center space-x-4 mb-0 text-green-700'>
				Powered by
				<a
					href='https://www.weatherapi.com/'
					title='Free Weather API'
				>
					<img
						src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png'
						alt='Weather data by WeatherAPI.com'
						border='0'
					/>
				</a>
			</p>
		</div>
	)
}

export default App
