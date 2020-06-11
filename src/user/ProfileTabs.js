import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from "../images/profilepic.jpg";

// With each user, a list of their followers and the 
// users they are following wil be added
//
//The ProfileTabs component
// It will take a list of users as props
// display the avatars of the users with their names
// and on click, links to each user's profile

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">
                            {followers.length} Followers
                            </h3>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/$(person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={(i) => (i.target.src = `${DefaultProfile}`)}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">{person.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <h3 className="text-primary">
                            {following.length} Following</h3>
                        <hr />
                        {following.map((person, i) =>
                            (
                                <div key={i}>
                                    <div>
                                        <Link to={`/user/$(person._id}`}>
                                            <img
                                                style={{
                                                    borderRadius: "50%",
                                                    border: "1px solid black"
                                                }}
                                                className="float-left mr-2"
                                                height="30px"
                                                width="30px"
                                                onError={(i) => (i.target.src = `${DefaultProfile}`)}
                                                src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                                alt={person.name}
                                            />
                                            <div>
                                                <p className="lead">{person.name}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                    
                    <div className="col-md-4">
                        <h3 className="text-primary">Posts</h3>
                        <hr />
                    </div>
                </div>
            </div> 
        );
    }
}

export default ProfileTabs;