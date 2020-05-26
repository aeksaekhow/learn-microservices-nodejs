import React from 'react'

interface Props {
    comments: any[]
}
const CommentList: React.FC<Props> = (props) => {

    const renderedComments = props.comments.map(comment => {

        let content = comment.content;
        if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation'
        }
        else if (comment.status === 'rejected') {
            content = 'This comment has been rejected'
        }

        return (
            <li key={comment.id}>{content}</li>
        )
    })

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList
