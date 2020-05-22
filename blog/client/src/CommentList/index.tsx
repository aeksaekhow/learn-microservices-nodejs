import React, {useState, useEffect} from 'react'
import axios from 'axios'

interface Props {
    postId: string
}
const CommentList: React.FC<Props> = (props) => {

    const [comments, setComments] = useState<any[]>([])

    const fetchComments = async () => {
        const response = await axios.get(`http://localhost:5001/posts/${props.postId}/comments`)
        setComments(response.data)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const renderedComments = comments.map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
        )
    })

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList
