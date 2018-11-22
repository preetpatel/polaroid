import * as React from "react";

interface IProps {
    userName: any
    userEmail: any
    userAvatar: any
}

class Profile extends React.Component<IProps, {}>{
    
    public render() {
         require('./Profile.css');
        return (
            <div className="Profile-view">
                <header>

                    <div className="container">

                        <div className="profile">

                            <div className="profile-image">

                                <img src={this.props.userAvatar} alt="" />

                            </div>

                            <div className="profile-user-settings">

                                <h1 className="profile-user-name">{this.props.userName}</h1>

                                <button className="btn profile-edit-btn">Edit Profile</button>

                                <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true" /></button>

                            </div>

                            <div className="profile-stats">

                                <ul>
                                    <li><span className="profile-stat-count">164</span> posts</li>
                                    <li><span className="profile-stat-count">188</span> followers</li>
                                    <li><span className="profile-stat-count">206</span> following</li>
                                </ul>

                            </div>

                            <div className="profile-bio">

                                <p><span className="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p>

                            </div>

                        </div>


                    </div>


                </header>

                <main>

                    <div className="container">

                        <div className="gallery">

                            <div className="gallery-item" >

                                <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                                <div className="gallery-item-info">

                                    <ul>
                                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 56</li>
                                        <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 2</li>
                                    </ul>

                                </div>

                            </div>

                            <div className="gallery-item" >

                                <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                                <div className="gallery-item-info">

                                    <ul>
                                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 89</li>
                                        <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 5</li>
                                    </ul>

                                </div>

                            </div>







                        </div>

                        <div className="loader" />

                    </div>


                </main>
            </div>
        )
    }

    public handleClose = () => {
        console.log("Logout")
    }
}
export default Profile;