import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

type MainType = {
    url: string
    width: number
    height: number
    fileSize: number
}

type imagesType = {
    main: Array<MainType>
}

type TagsType = {
    addedDate: string
    description: string
    id: string
    images: imagesType
    isImportant: boolean
    order: number
    title: string
}

function App() {
    const [todoLists, setTodoLists] = useState<Array<TagsType>>([]);

    useEffect(() => {
        axios.get('https://todolists.samuraijs.com/api/1.0/todolists')
            .then(res => setTodoLists(res.data.items))
    }, [])


    return (
        <div className="App">
            <h1>Hello world</h1>
            {todoLists.map(tag => {
                const url = tag.images.main.length>1? tag.images.main[1].url:'https://placehold.co/48'
                return <div key={tag.id}>
                    <img src={url} alt="task" />
                    <h3>{tag.isImportant ? '🔥' : ''}{tag.title}</h3>
                    <p>{tag.description}</p>
                </div>
            })}
        </div>
    )
}

export default App
