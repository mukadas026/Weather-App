import React, { useEffect, useRef, useState } from "react"

const Search = (props) => {
	const [value, setValue] = useState("")
	const [suggestion, setSuggestion] = useState([])
	const list = useRef(null)
	const key = props.api

	

	const handleChange = (e) => {
		setValue(e.target.value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		props.setLocation(value)
        setValue('')
        setSuggestion([])
	}
	const fill = (data) => {
		setValue("")
		props.setLocation(data.name)
		setSuggestion([])
	}
	const locations = suggestion
		? suggestion.map((item) => (
				<p
					key={item.id}
					className='text-center py-2 border-b border-white transition-all hover:bg-white cursor-pointer'
					onClick={() => fill(item)}
				>
					{item.name}, {item.country}
				</p>
		  ))
		: ""
	useEffect(() => {
		value.length >= 3
			? fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${value}`)
					.then((res) => res.json())
					.then((arr) => setSuggestion(arr))
					.catch((err) => console.log(err))
			: setSuggestion([])
	}, [value])

	return (
		<form
			onSubmit={handleSubmit}
			className='relative w-fit flex flex-col mt-12'
		>
			<div className='relative'>
				<div className='w-fit relative flex flex-col'>
					<input
						type='text'
						value={value}
						onChange={handleChange}
						placeholder='Input location here'
						className='bg-blue-500 text-white indent-4 font-bold font-sans text-lg w-64 h-10 peer placeholder:text-white rounded-lg focus:placeholder:text-transparent transition-all'
					/>
					<span className='text-white font-bold font-sans text-lg absolute translate-y-1 indent-4 transition-all peer-focus:translate-y-[-25px] peer-focus:text-blue-500 -z-10'>
						Input location here
					</span>
				</div>
				<div ref={list} className='bg-yellow-500 absolute w-full top-full mt-4 text-white font-bold rounded-xl text-md'>
					{locations}
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<button className='py-2 px-4 bg-blue-500 rounded mt-2 text-white font-bold '>Get Weather</button>
			</div>
		</form>
	)
}

export default Search
