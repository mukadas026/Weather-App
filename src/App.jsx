import React, { useEffect, useRef, useState } from "react"
import Search from "./components/Search"
import Current from "./components/Current"
import Hourly from "./components/Hourly"

import normal from './assets/normal.jpg'


import "./index.css"

const key = "6cb7c2997235474faf5192917231001"

const App = () => {
	const [location, setLocation] = useState("")
	const [forecast, setForecast] = useState("")
	const [loading, setLoading] = useState(false)
	const [image, setImage] = useState(null)
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
	
	useEffect(() => {
		if(forecast && !forecast.error){
			// console.log('hhell')
			if(forecast.current.temp_c < 15){
				import('./assets/snow4.jpg')
				.then((res) => setImage(res.default))
				.catch(err => console.log(err))
			}else if(forecast.current.temp_c < 30){
				import('./assets/normal.jpg')
				.then((res) => setImage(res.default))
				.catch(err => console.log(err))
			}else{
				import('./assets/hot.jpg')
				.then((res) => setImage(res.default))
				.catch(err => console.log(err))
			}
		}
	}, [forecast])
	// console.log(image)
	const styles = {
		backgroundImage: `url(${image == null ? normal : image})`,
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
		backgroundPosition: 'right'
	}
// console.log(forecast)
	return (
		<div style={styles} className='w-screen min-h-screen box-border relative pb-5 '>
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
				<div className='border w-11/12 mx-auto flex items-center justify-center h-[500px] my-8 box-border rounded-xl bg-white/30 backdrop-blur-lg text-shadow '>
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
