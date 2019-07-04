import React, {Component} from 'react';

class PostView extends Component {

    render () {
        return (
            <div className = "postView"> 
            {this.props.comment && this.props.comment.name && <div className="comment">
                    <div>Subject: {this.props.comment.name}</div>
                    <div>Comment: {this.props.comment.body}</div>
                    <div>Email: {this.props.comment.email}</div>
                    <button className="pointer close" onClick={this.props.disablePostView}>Close</button>
                </div>}
            </div>
        );
    }
}

export default PostView;