import React, {useState} from 'react'
import axios from 'axios'

interface Props {
    postId: string
}
const CommentCreate: React.FC<Props> = (props) => {

    const [content, setContent] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await axios.post(`http://localhost:5001/posts/${props.postId}/comments`, {content})

        setContent('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} type="text" className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate