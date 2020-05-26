import React, {useState} from 'react'
import axios from 'axios'

const PostCreate = () => {

    const [title, setTitle] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await axios.post('http://posts.com/posts/ceate', {
            title
        })

        setTitle('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate