import React, { Children } from "react"
import Card from "./Card"
// import ErrorBoundary from "./ErrorBoundary"
// import Child from "./Children"

const Current = ({ current, location }) => {
	let date = new Date(current.last_updated)
	let lastUpdated = `${date.getHours() > 10 ? date.getHours() : "0" + date.getHours()}:${
		date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
	}`
	let currentTemp = Math.round(current.temp_c)

	return (
		<div className='border border-transparent w-full h-[500px] my-8 box-border rounded-xl bg-white/30 backdrop-blur-lg text-shadow'>
			<h2 className='text-6xl font-extrabold mt-4 text-center text-white border-b-2 mx-4'>Current</h2>
			{current && (
				<div className='w-full h-max'>
					<div className='w-fit h-max font-extrabold text-[150px] mt-5 mx-auto text-white space-x-5'>
						<span>{currentTemp}</span>
						<span>
							<span className='text-4xl relative bottom-20'>o</span>C
						</span>
					</div>
					<div className='text-2xl pl-2 m-2 text-white '>
						{location.name}, {location.country}
						<span className='text-md font-normal block '>Last Updated at {lastUpdated}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default Current
