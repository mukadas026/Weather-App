import React from "react"
import { BsSunFill, BsMoonFill, BsSnow2 } from "react-icons/bs"

const Hourly = ({ hourly, lastUpdated }) => {
	const data = hourly.forecastday[0].hour
	const startHour = new Date(lastUpdated).getHours()
	// console.log(data)
	const hourEl = data.map((item, i) => {
		const time = new Date(item.time).getHours()
		return (
			i >= startHour && (
				<div
					key={i}
					className='mt-4 mx-auto w-11/12 flex items-center justify-around rounded-2xl h-12 bg-white text-xl font-semibold'
				>
					<div className='w-2/5 flex items-center justify-around'>
						{time < 17 ? <BsSunFill className='text-yellow-300' />:<BsMoonFill className='text-gray-700' />}
						<p>{time < 10 && '0'}{time}:00</p>
					</div>
					-
					<div className="w-2/5 flex items-center justify-around">
						<p>
							{item.temp_c}
							<span className='-translate-y-[1ch] text-sm inline-block w-fit h-fit'>o</span>C
						</p>
						{item.temp_c < 20 ? <p>🥶</p>: item.temp_c < 30 ?<p>🥹</p> : <p>🥵</p>}
					</div>
				</div>
			)
		)
	})

	return (
		<div className='border w-full min-h-[500px] h-fit pb-8 my-8 box-border rounded-xl shadow-md bg-blue-500'>
			<h2 className='text-3xl font-extrabold mt-4 text-center text-white border-b-2 mx-4'>Hourly</h2>
			<div className='w-full '>{hourEl}</div>
		</div>
	)
}

export default Hourly
