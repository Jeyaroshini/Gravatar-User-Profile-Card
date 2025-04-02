import React, { useState, useEffect } from 'react';
import { db } from "../firebase"
import userLogo from '../images/user-3331256.svg';


const getSocialLinkSVGIcon = (label)=>{
    switch(label) {
        case 'Facebook':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="social-link svg-facebook" viewBox="0 0 24 24"><path fill="black" d="M19.116 4H4.883A.883.883 0 0 0 4 4.883v14.232c0 .489.396.883.883.883h7.66v-6.195h-2.081v-2.417h2.085V9.608c0-2.066 1.262-3.19 3.105-3.19.883 0 1.642.064 1.863.094v2.16h-1.278c-1.003 0-1.196.477-1.196 1.176v1.541h2.39l-.31 2.415h-2.08v6.194h4.076a.883.883 0 0 0 .883-.882V4.883A.883.883 0 0 0 19.117 4z"></path></svg>;
        case 'GitHub':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="social-link svg-github" viewBox="0 0 24 24"><path fill="black" fillRule="evenodd" d="M12 4c-4.42 0-8 3.67-8 8.201 0 3.625 2.293 6.696 5.47 7.784.399.075.546-.177.546-.398 0-.196-.005-.71-.01-1.395-2.225.494-2.696-1.097-2.696-1.097-.363-.947-.889-1.203-.889-1.203-.727-.509.054-.499.054-.499.8.06 1.228.846 1.228.846.712 1.253 1.871.891 2.328.68.073-.529.28-.892.505-1.098-1.772-.201-3.639-.906-3.639-4.048 0-.896.31-1.626.826-2.2-.084-.211-.359-1.042.073-2.17 0 0 .673-.221 2.2.841A7.6 7.6 0 0 1 12 7.967a7.6 7.6 0 0 1 2.004.277c1.527-1.062 2.2-.84 2.2-.84.437 1.127.162 1.963.078 2.17.511.573.82 1.303.82 2.2 0 3.15-1.87 3.84-3.653 4.047.285.252.545.755.545 1.52 0 1.098-.01 1.98-.01 2.25 0 .223.143.474.55.394C17.712 18.897 20 15.826 20 12.206 20 7.67 16.42 4 12 4" clipRule="evenodd"></path></svg>;
        case 'YouTube':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="social-link svg-youtube" viewBox="0 0 24 24"><path fill="black" d="M17.077 5.633c-2.403-.178-7.754-.177-10.154 0C4.325 5.825 4.02 7.525 4 12c.02 4.467.323 6.174 2.923 6.367 2.4.177 7.751.178 10.154 0C19.675 18.175 19.98 16.475 20 12c-.02-4.467-.323-6.174-2.923-6.367M10 14.889V9.11l5.333 2.884z"></path></svg>;
        case 'LinkedIn':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="social-link svg-linkedin" viewBox="0 0 24 24"><path fill="#000" d="M16.667 4H7.333A3.334 3.334 0 0 0 4 7.333v9.334A3.334 3.334 0 0 0 7.333 20h9.334A3.333 3.333 0 0 0 20 16.667V7.333A3.333 3.333 0 0 0 16.667 4M9.333 16.667h-2V9.333h2zm-1-8.179a1.17 1.17 0 0 1-1.166-1.176c0-.65.522-1.176 1.166-1.176S9.5 6.663 9.5 7.312c0 .65-.522 1.176-1.167 1.176m9 8.179h-2V12.93c0-2.246-2.666-2.076-2.666 0v3.736h-2V9.333h2v1.177c.93-1.724 4.666-1.851 4.666 1.65z"></path></svg>;   
        default:
            return null;
    }
};

const BackWaveSVG = () => {
    return (
        <>
            <svg className="card-back-wave-svg svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 900" width="400" height="900" version="1.1"><path d="M0 430L11.2 435.7C22.3 441.3 44.7 452.7 66.8 449.8C89 447 111 430 133.2 425C155.3 420 177.7 427 200 437.7C222.3 448.3 244.7 462.7 266.8 459.3C289 456 311 435 333.2 428.3C355.3 421.7 377.7 429.3 388.8 433.2L400 437L400 0L388.8 0C377.7 0 355.3 0 333.2 0C311 0 289 0 266.8 0C244.7 0 222.3 0 200 0C177.7 0 155.3 0 133.2 0C111 0 89 0 66.8 0C44.7 0 22.3 0 11.2 0L0 0Z" fill="#7764ff80" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
            <svg className="card-back-wave-svg svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 900" width="400" height="900" version="1.1"><path d="M0 430L11.2 435.7C22.3 441.3 44.7 452.7 66.8 449.8C89 447 111 430 133.2 425C155.3 420 177.7 427 200 437.7C222.3 448.3 244.7 462.7 266.8 459.3C289 456 311 435 333.2 428.3C355.3 421.7 377.7 429.3 388.8 433.2L400 437L400 0L388.8 0C377.7 0 355.3 0 333.2 0C311 0 289 0 266.8 0C244.7 0 222.3 0 200 0C177.7 0 155.3 0 133.2 0C111 0 89 0 66.8 0C44.7 0 22.3 0 11.2 0L0 0Z" fill="#e3cca282" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
            <svg className="card-back-wave-svg svg3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 900" width="400" height="900" version="1.1"><path d="M0 430L11.2 435.7C22.3 441.3 44.7 452.7 66.8 449.8C89 447 111 430 133.2 425C155.3 420 177.7 427 200 437.7C222.3 448.3 244.7 462.7 266.8 459.3C289 456 311 435 333.2 428.3C355.3 421.7 377.7 429.3 388.8 433.2L400 437L400 0L388.8 0C377.7 0 355.3 0 333.2 0C311 0 289 0 266.8 0C244.7 0 222.3 0 200 0C177.7 0 155.3 0 133.2 0C111 0 89 0 66.8 0C44.7 0 22.3 0 11.2 0L0 0Z" fill="#90ee9054" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
            <svg className="card-back-wave-svg svg4" xmlns="http://www.w3.org/2000/svg" version="1.1" height="900" width="400" viewBox="0 0 400 900"><path d="M0 430L11.2 435.7C22.3 441.3 44.7 452.7 66.8 449.8C89 447 111 430 133.2 425C155.3 420 177.7 427 200 437.7C222.3 448.3 244.7 462.7 266.8 459.3C289 456 311 435 333.2 428.3C355.3 421.7 377.7 429.3 388.8 433.2L400 437L400 0L388.8 0C377.7 0 355.3 0 333.2 0C311 0 289 0 266.8 0C244.7 0 222.3 0 200 0C177.7 0 155.3 0 133.2 0C111 0 89 0 66.8 0C44.7 0 22.3 0 11.2 0L0 0Z" fill="#7527b0ab" strokeLinejoin="miter" strokeLinecap="round"></path></svg>
        </>
    );
};



const MainComponents = ({profiles, setProfiles})=>{

    const [loading, setLoading] = useState(false);
    const [lastDocRef, setLastDocRef] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    async function fetchProfiles(loadFromStart=false){
        try{
            console.log("Fetching profiles...");
            if ((!loadFromStart && !hasMore) || loading) return;
            setLoading(true);
            let dbPath = db.collection('users-profiles').orderBy('createdTime', 'desc').limit(10);
            if(!loadFromStart){
                dbPath = dbPath.startAfter(lastDocRef);
            }
            await dbPath.get().then((docs)=>{
                if(docs.empty){
                    setHasMore(false);
                    setLoading(false);
                    return;
                }
                let profilesData = {};
                setLastDocRef(docs.docs[docs.docs.length - 1].ref);
                if(docs.docs.length < 10) setHasMore(false);
                docs.docs.forEach((doc)=>{
                    profilesData[doc.id] = doc.data();
                    console.log(doc.data());
                });
                setProfiles({...profiles, ...profilesData});
                setLoading(false);
            });
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    const handleScroll = (event)=>{
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if(hasMore && !loading && scrollTop + clientHeight >= scrollHeight - 20)
            fetchProfiles();
    };

    useEffect(()=>{
        fetchProfiles(true);
    }, []);

    return (
        <div className='main-section-inner'>
            <div className='main-section-header'> Saved Profiles </div>
            <div className='main-section-body'>
                <div className='main-section-list' onScroll={handleScroll}>
                    {Object.keys(profiles).map(profileId => (
                        <div key={profileId} className='profile-card-item'>
                            <div className='profile-card-item-inner'>
                                <div className='profile-card-item-avatar-box'>
                                    {/* avatar background waves */}
                                    <BackWaveSVG />
                                    {/* avatar background waves */}
                                    <div className='profile-card-item-avatar'>
                                        <img src={profiles[profileId].gravatar?.avatar_url?.url || userLogo} alt={profiles[profileId].userName} />
                                    </div>
                                </div>
                                <div className='profile-card-item-details'>
                                    <div className='profile-card-item-details-name-container'>
                                        <div className='profile-card-item-details-fullname'> {profiles[profileId].fullName} </div>
                                        <div className='profile-card-item-details-username'> @{profiles[profileId].gravatar?.userName || profiles[profileId].userName} | { profiles[profileId].gravatar?.location || profiles[profileId].location } </div>
                                    </div>

                                    <div className="profile-card-item-contact-details">
                                        <div className="profile-card-item-contact-email-box">
                                            <div className="profile-card-item-contact-email-icon"><span class="material-symbols-rounded"> mail </span></div>
                                            <div className="profile-card-item-contact-email-txt">{profiles[profileId].email}</div>
                                        </div>
                                        <div className="profile-card-item-contact-dtl-divid"></div>
                                        <div className="profile-card-item-contact-phone-box">
                                            <div className="profile-card-item-contact-phone-icon"><span class="material-symbols-rounded"> call </span></div>
                                            <div className="profile-card-item-contact-phone-txt">{profiles[profileId].phoneNumber}</div>
                                        </div>
                                    </div>

                                    <div className='profile-card-item-details-bio-box'> 
                                        <div className='profile-card-item-details-bio'> {profiles[profileId].bio} </div>
                                    </div>

                                    {
                                        profiles[profileId].socialLinks && profiles[profileId].socialLinks.length > 0 &&
                                        <div className='profile-card-item-details-social-links'>
                                            {profiles[profileId].socialLinks.map((socialLink, index)=>(
                                                socialLink.label && getSocialLinkSVGIcon(socialLink.label) && socialLink.url &&
                                                <a key={index} className={`profile-card-item-details-social-link ${socialLink.label}`} href={socialLink.url} target='_blank' rel='noreferrer noopener'> 
                                                    <div className='profile-card-item-details-social-link-icon'> 
                                                        { getSocialLinkSVGIcon(socialLink.label) }
                                                    </div>
                                                </a>
                                                
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainComponents;