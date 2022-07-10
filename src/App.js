import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Home from './components/Home';
import Search from './components/Search';
import Header from './components/Header';
import Footer from './components/Footer';
const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'first note',
			date: '21/06/2022',
		},
		{
			id: nanoid(),
			text: 'second note',
			date: '21/06/2022',
		},

	]);

	const [searchText, setSearchText] = useState('');



	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		<div className="dark-mode">
			<div className='container'>
				<Header />
				<Search handleSearchNote={setSearchText} />
				<Home
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
				<Footer/>
			</div>
		</div>
	);
};

export default App;
