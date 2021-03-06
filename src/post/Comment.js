// A component for Comments

import React, { Component } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/profilepic.png';
import Trash from '../images/trash.png';


class Comment extends Component {
    state = {
        text: "",
        error: ""
    }

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (text.length <= 0) {
            this.setState({ error: "Comment cannot be empty."});
            return false;
        }
        if (text.length > 500) {
            this.setState({ error: "Comment has to be less than 500 characters."});
            return false;
        }
        return true;
    };

    addComment = event => {
        // Prevents the page from reloading when we hit submit.
        event.preventDefault();

        // If the user is not signed up (authenticated) then the error message shows up.
        if (!isAuthenticated()) {
            this.setState({ error: "Please sign in to leave a comment." });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;
    
            comment(userId, token, postId, { text: this.state.text }).then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({ text: '' })
                    // Dispatch fresh list of comments to parent component (SinglePost)
                    this.props.updateComments(data.comments);
                }
            })
        }
    };

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are you sure you want to delete your post?");
        if (answer) {
            this.deleteComment(comment);
        }
    }

    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>
                <h3 className="mt-5 mb-4">Leave a comment</h3>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            placeholder="Comment here."
                        />
                    </div>

                    <button className="postBtn mt-2 mb-3">Post</button>
                </form>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                <div className="col-md-12">
                    <h4 style={{ color: '#333'}}>{comments.length} Comments</h4>
                    <hr />
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <Link to={`/user/${comment.postedBy._id}`}>
                                <img
                                    style={{ borderRadius: "50%" }}
                                    className="float-left mr-2"
                                    height="30px"
                                    width="30px"
                                    onError={i => (i.target.src = `${DefaultProfile}`)}
                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                    alt={comment.postedBy.name}
                                />
                            </Link>
                            <div>
                                <p className="lead">{comment.text}</p>
                                    <p className="font-italic mark">
                                        Posted by{" "}
                                        <Link to={`/user/${comment.postedBy._id}`}>
                                            {comment.postedBy.name}{" "}
                                        </Link>
                                        on{" "}
                                        {new Date(comment.created).toDateString()}

                                        <span>
                                            {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                                                    <>
                                                        <img 
                                                            src={`${Trash}`}
                                                            className="text-danger float-right mr-1.5"
                                                            onClick={() => this.deleteConfirmed(comment)}
                                                            style={{ 
                                                                cursor: 'pointer',
                                                                height: '26px',
                                                                width: '25px',
                                                                paddingBottom: '2.5px'
                                                            }}
                                                        />
                                                    </>
                                                )}
                                        </span>
                                    </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Comment;
