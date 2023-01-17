import React, { useEffect, useRef, useState } from "react"
import {BsSearch} from 'react-icons/bs'

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
			className='relative w-fit h-0 flex flex-col mt-12 border-transparent outline-transparent ring-transparent'
		>
			<div className='relative border-0 outline-0 ring-0'>
				<div className='w-fit relative flex flex-col'>
					<input
						type='text'
						value={value}
						onChange={handleChange}
						// placeholder='Input location here'
						className='bg-white/30 backdrop-blur-lg text-shadow text-white indent-4 pr-4 font-bold font-sans text-lg w-72 h-10 peer placeholder:text-white rounded-lg focus:placeholder:text-transparent transition-all'
					/>
					<span className='text-white font-bold font-sans text-lg absolute translate-y-1 indent-4 transition-all peer-focus:translate-y-[-30px] text-shadow z-10'>
						Input location here
					</span>
				</div>
				<button className='mr-4 rounded mt-2 text-white font-bold absolute top-0 right-0'><BsSearch size='25' /></button>

				<div ref={list} className='bg-yellow-500 absolute w-full top-full mt-4 text-white font-bold rounded-xl text-md z-10'>
					{locations}
				</div>

			</div>
			{/* <div className='flex items-center justify-center'>
				<button className='py-2 px-4 bg-blue-500 rounded mt-2 text-white font-bold '><BsSearch size='25' /></button>
			</div> */}
		</form>
	)
}

export default Search
