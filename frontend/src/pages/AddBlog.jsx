import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
function AddBlog() {
    const navigate = useNavigate()
    const forms = useRef()
    const [file, setFile] = useState(null)
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const [user, setUser] = useState(null)
    const [success, setSucces] = useState('')
    const [error, setError] = useState('')
    const submitBlog = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('title', title)
        form.append('body', body)
        form.append('user', user._id)
        const data = Object.keys(file).forEach(key => {
            form.append(file.item(key), file.item(key))
        })
        try {
            const { data } = await axios.post('http://localhost:5000/blog/create', form)
            setSucces(data.message)
            setTimeout(() => {
                forms.current.reset()
                setSucces('')
            }, 1200);
        } catch (error) {
            setError(error?.response?.message)
        }
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('blog-user'))
        if (!user) {
            navigate('/auth')
        } else {
            setUser(user)
        }
    }, [])
    return (
        <div className="flex items-center flex-col py-2 relative gap-1">
            {success && <p className="bg-white fixed w-64 z-10 h-8 text-green-500 font-bold py-1 px-4 rounded-sm">{success}</p>}
            {error && <p className="bg-white fixed w-64 z-10 h-8 text-red-500 font-bold py-1 px-4 rounded-sm">${error}</p>}
            <form ref={forms} onSubmit={submitBlog} className="my-8 flex w-4/5 flex-col gap-1" encType="multipart/form-data">
                <input type="file" name="coverImageURL" onChange={(e) => setFile(e.target.files)} accept="image/*" />
                <label className="text-lg font-bold my-1">Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} name="title" className="border-none outline-none py-1 px-2 text-black my-1 text-base font-bold" />
                <label className="text-lg font-bold my-1">Body</label>
                <textarea name="body" onChange={(e) => setBody(e.target.value)} className="border-none outline-none resize-none w-full h-80 overflow-y-scroll py-1 px-2 text-lg font-semibold text-black"></textarea>
                <button type="submit" className="my-2 rounded-md bg-green-600 mx-auto py-1 px-4 text-base font-bold">Create</button>
            </form>
        </div>
    )
}

export default AddBlog