import React from 'react';
import NewProfileForm from './NewProfileForm';


const TopComponents = ({profiles, setProfiles})=>{
    const [showCreateForm, setShowCreateForm] = React.useState(false);

    return (
        <div className='top-section-inner'>
            <div className='search-container'>
                <div className='search-input-box'>
                    <input type='text' placeholder='Search profile by email...' />
                </div>
                <div className='search-icon-box'>
                    <span className='material-symbols-rounded'>search</span>
                </div>
            </div>
            <div className='create-profile-container'>
                <div className='create-profile-button' onClick={ () => setShowCreateForm(!showCreateForm) }>Create Profile</div>
            </div>
            { showCreateForm && <NewProfileForm profiles={profiles} setProfiles={setProfiles} onClose= { ()=> setShowCreateForm(false) } /> }     
        </div>
    );
}

export default TopComponents;