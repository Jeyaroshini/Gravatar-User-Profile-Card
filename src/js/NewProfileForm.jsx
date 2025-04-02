import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    className: "user-pro-toast",
    bodyClassName: "user-pro-toast-body",
    progressClassName: "user-pro-toast-progress"
}

const socialOptions = [ "Facebook", "LinkedIn", "GitHub", "YouTube", ];
  
const CustomDropdown = ({ className, optionsList, initValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={`custome-dropdown ${className}`}>
        <div className="cus-dd-btn" onClick={() => setIsOpen(!isOpen)} > {initValue || "Select Social"} </div>
        {isOpen && (
            <div className="cus-dd-opt-list">
                { optionsList.map((option) => (
                    <div key={option} className="cus-dd-opt-i" onClick={() => { onChange(option); setIsOpen(false); }} > {option} </div>
                )) }
            </div>
        )}
      </div>
    );
};
  
const WaveSVG = () => {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 100" width="900" height="100" version="1.1" > <path d="M0 22L25 25C50 28 100 34 150 43.3C200 52.7 250 65.3 300 64.7C350 64 400 50 450 44.3C500 38.7 550 41.3 600 46.7C650 52 700 60 750 64.8C800 69.7 850 71.3 875 72.2L900 73L900 0L875 0C850 0 800 0 750 0C700 0 650 0 600 0C550 0 500 0 450 0C400 0 350 0 300 0C250 0 200 0 150 0C100 0 50 0 25 0L0 0Z" fill="#7764ff" strokeLinecap="round" strokeLinejoin="miter" /> </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 100" width="900" height="100" version="1.1" className="svg2 absolute top-0 opacity-40 scale-[1.7]" > <path d="M0 22L25 25C50 28 100 34 150 43.3C200 52.7 250 65.3 300 64.7C350 64 400 50 450 44.3C500 38.7 550 41.3 600 46.7C650 52 700 60 750 64.8C800 69.7 850 71.3 875 72.2L900 73L900 0L875 0C850 0 800 0 750 0C700 0 650 0 600 0C550 0 500 0 450 0C400 0 350 0 300 0C250 0 200 0 150 0C100 0 50 0 25 0L0 0Z" fill="#7764ff" strokeLinecap="round" strokeLinejoin="miter" /> </svg>
        </>
    );
};

const NewProfileForm = ({profiles, setProfiles, onClose})=>{

    const [formData, setFormData] = useState({ email: "", fullName: "", userName: "", phoneNumber: "", city: "", country: "", bio: "", socialLinks: [{label: "", url: ""}] });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)

    const handleChange = (event)=>{
        const { name:key, value } = event.target;
        setFormData({...formData, [key]: value});
        const validation = validateForm(key);
        if(!validation.valid) setErrors({...errors, [key]: validation.error});
        else setErrors({...errors, [key]: null});
    };

    const handleSocialLinkChange = (event, index, key, value)=>{
        const updatedSocialLinks = [...formData.socialLinks];
        updatedSocialLinks[index][key] = value;
        setFormData({...formData, socialLinks: updatedSocialLinks});
        const validation = validateForm("socialLinks");
        if(!validation.valid) setErrors({...errors, socialLinks: validation.error});
        else setErrors({...errors, socialLinks: null});
    };

    const validateForm = (property=null) => {
        let newErrors = {};
    
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.userName.trim()) newErrors.userName = "Username is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
        if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.bio.trim()) newErrors.bio = "Bio is required";
        // if (formData.socialLinks.length === 0) newErrors.socialLinks = "At least one social link is required";
    
        
        formData.socialLinks.forEach((link, index) => {
            if(!newErrors.socialLinks) newErrors.socialLinks = [];
            if(!newErrors.socialLinks[index]) newErrors.socialLinks[index] = {};
            if(!link.label) newErrors.socialLinks[index].label = "Select a platform";
            if(!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}\/?.*$/.test(link.url)) newErrors.socialLinks[index].url = "Invalid URL";
            if(JSON.stringify(newErrors.socialLinks[index]) === '{}') newErrors.socialLinks.splice(index, 1);
        });
        if(newErrors.socialLinks.length == 0) delete newErrors.socialLinks;
        
        if(property){
            return { 
                valid: newErrors[property] ? false : true,
                error: newErrors[property]? newErrors[property]: null
            };
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();
        console.log(formData);
        if (!validateForm()) return;
        setLoading(true)

        try{
            const response = await axios.post('http://127.0.0.1:5001/gravatar-user-profiles/us-central1/v1/users/profiles', formData)
            console.log(response);
            if (response.status === 201 && response.data) {
                toast.success("Profile created successfully! 🎉", toastOptions);
                profiles[response.data.email] = response.data;
                setProfiles({...profiles})
                setLoading(false)
                onClose();
            } 
            else {
                setLoading(false)
                toast.warning("Unexpected response from server. Please try again.", toastOptions);
            }
        }
        catch(err){
            console.log(err);
            if(err.status === 400 && err.response && err.response.data && err.response.data == "User already exists"){
                toast.error("User already exists. Please try again with different email!", toastOptions);
                return;
            }
            toast.error("Failed to create profile. Please try again.", toastOptions);
            setLoading(false)
        }
    }

    return ReactDOM.createPortal(
        <div className='profile-form-container'>
            <div className='profile-form-inner'>
                <div className='prfl-form-header'>
                    <WaveSVG />
                    <div className='prfl-form-ttl'>Create Profile</div>
                    <div className='prfl-form-close' onClick={onClose}>
                        <span className='material-symbols-rounded'>close</span>
                    </div>
                </div>

                <div className='prfl-form-body'>
                    <div className='prfl-form-body-inner'>
                        <div className='prfl-form-group fullName'>
                            <div className='prfl-form-lable'>Full Name</div>
                            <div className='prfl-form-input'>
                                <input type='text' placeholder='Enter your full name' name='fullName' value={formData.fullName} onChange={handleChange} />
                                {  errors.fullName && <div className='prfl-form-error'>{errors.fullName}</div> }
                            </div>
                        </div>
                        <div className='prfl-form-group email'>
                            <div className='prfl-form-lable'>Email</div>
                            <div className='prfl-form-input'>
                                <input type='email' placeholder='Enter your email' name='email' value={formData.email} onChange={handleChange} />
                                {  errors.email && <div className='prfl-form-error'>{errors.email}</div> }
                            </div>
                        </div>
                        <div className='prfl-form-group userName'>
                            <div className='prfl-form-lable'>User Name</div>
                            <div className='prfl-form-input'>
                                <input type='text' placeholder='Enter your username' name='userName' value={formData.userName} onChange={handleChange} />
                                {  errors.userName && <div className='prfl-form-error'>{errors.userName}</div> }
                            </div>
                        </div>
                        <div className='prfl-form-group phoneNumber'>
                            <div className='prfl-form-lable'>Phone Number</div>
                            <div className='prfl-form-input'>
                                <input type='text' placeholder='Enter your phone number' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />
                                {  errors.phoneNumber && <div className='prfl-form-error'>{errors.phoneNumber}</div> }
                            </div>
                        </div>
                        <div className='prfl-form-group city'>
                            <div className='prfl-form-lable'>City</div>
                            <div className='prfl-form-input'>
                                <input type='text' placeholder='Enter your city' name='city' value={formData.city} onChange={handleChange} />
                                {  errors.city && <div className='prfl-form-error'>{errors.city}</div> }
                            </div>
                        </div>
                        <div className='prfl-form-group country'>
                            <div className='prfl-form-lable'>Country</div>
                            <div className='prfl-form-input'>
                                <input type='text' placeholder='Enter your country' name='country' value={formData.country} onChange={handleChange} />
                                {  errors.country && <div className='prfl-form-error'>{errors.country}</div> }
                            </div>
                        </div>
                        <div className='prfl-form-group bio'>
                            <div className='prfl-form-lable'>Bio/Short Description</div>
                            <div className='prfl-form-input'>
                                <textarea name='bio' placeholder='Tell us about yourself' value={formData.bio} onChange={handleChange}></textarea>
                                {  errors.bio && <div className='prfl-form-error'>{errors.bio}</div> }
                            </div>
                        </div>
                        <div className='prfl-form-group links'>
                            <div className='prfl-form-lable'>
                                Social Links
                                <div className='social-link-form-add' onClick={() => setFormData({...formData, socialLinks: [...formData.socialLinks, {label: "", url: ""}]} )}>
                                    <span className='material-symbols-rounded'>add</span>
                                </div>
                            </div>

                            <div className='social-links-form-box'>
                                {formData.socialLinks.map((link, index)=>(
                                    <div key={index} className='social-link-form'>
                                        <div className={`social-link-form-type ${errors.socialLinks && errors.socialLinks[index] && errors.socialLinks[index].label ? 'error' : ''}`}>
                                            <CustomDropdown className='social-link-form-type-dd' optionsList={socialOptions} initValue={link.label} onChange={(value) => handleSocialLinkChange(null, index, "label", value)} />
                                        </div>
                                        <div className='social-link-form-url'>
                                            <input type='text' placeholder='Enter social link URL' name='social-link-url' value={link.url} onChange={(event) => handleSocialLinkChange(event, index, "url", event.target.value)} />
                                            {  errors.socialLinks && errors.socialLinks[index] && errors.socialLinks[index].url && <div className='prfl-form-error'>{errors.socialLinks[index].url}</div> }
                                        </div>
                                        <div className='social-link-form-remove' onClick={()=> setFormData({...formData, socialLinks: formData.socialLinks.filter((link, i) => i !== index)})}>
                                            <span className='material-symbols-rounded'>delete</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className='prfl-form-footer'>
                    <div className='prfl-form-submit-btn' onClick={handleSubmit}>
                        {loading ? "Creating..." : "Create Profile"}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default NewProfileForm;