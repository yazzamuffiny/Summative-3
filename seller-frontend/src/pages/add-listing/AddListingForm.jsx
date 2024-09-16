import { useNavigate } from "react-router-dom"
import './add-listing.scss'
import { useState } from "react";
import axios from "axios";

const AddListingForm = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [number, setNumber] = useState('');
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  // handling the submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('added');

    const formData = new FormData();
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('size', size);
    formData.append('location', location);
    formData.append('number', number);
    formData.append('info', info);
    formData.append('price', price);
    formData.append('user_id', user_id);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${baseURL}/api/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setBreed('');
      setAge('');
      setGender('');
      setSize('');
      setLocation('');
      setNumber('');
      setInfo('');
      setPrice('');
      setImage(null);
      setError(null);
      console.log('New listing added', response.data);
      // dispatch({ type: 'CREATE_LISTINGS', payload: response.data }); // Uncomment if using Redux
      navigate('/somewhere'); // Redirect after successful submission
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='add-listing-page'>
      {/* back button and title */}
      <div className='backbtn-title'>
      <button onClick={() => navigate(-1)} className='back-button'> Back </button>
      <h1> Add New Listing </h1>
      </div>

      {/* add new listing form */}
      <form className="add-listing-form" onSubmit={handleSubmit}>
        <h2> Your Dogs Information: </h2>

        {/* inputs */}
        <div className="input-grid">
          <div className="form-input">
            <label htmlFor=""> Breed Name: </label>
            <input 
              type="text" 
              onChange={(e) => setBreed(e.target.value)}
              value={breed}
            />
          </div>

          <div className="form-input">
            <label htmlFor="age"> Age: </label>
            <select name="age" id="age" onChange={(e) => setAge(e.target.value)} value={age}>
            <option value=''>Please Select</option>
              <option value='baby'>2 months - 6 months</option>
              <option value='puppy'>6 month - 1 year</option>
              <option value='teen'>1 - 2 years</option>
              <option value='youngAdult'>2 - 5 years</option>
              <option value='adult'>5 - 10 years</option>
              <option value='senior'>10+ years</option>
            </select>
          </div>

          <div className="form-input">
            <label htmlFor="gender"> Gender: </label>
            <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
              <option> Please Select... </option>
              <option value='male'> Male </option>
              <option value='female'> Female </option>
              <option value='mixed'> Mixed </option>
            </select>
          </div>
          
          <div className="form-input">
            <label htmlFor="size"> Dog Size: </label>
            <select name="size" id="size" onChange={(e) => setSize(e.target.value)} value={size}>
              <option value=""> Please Select... </option>
              <option value="small"> Small </option>
              <option value="medium"> Medium </option>
              <option value="large"> Large </option>
            </select>
          </div>

          <div className="form-input">
            <label htmlFor="number"> Number Available: </label>
            <input 
            type="number"
              onChange={(e) => setNumber(e.target.value)}
              value={number} />
          </div>

          <div className="form-input">
            <label htmlFor="location"> Location: </label>
            <select name="location" id="location" onChange={(e) => setLocation(e.target.value)} value={location}>
            <option value=''>Please Select</option>
                      <option value='northland'>Northland</option>
                      <option value='auckland'>Auckland</option>
                      <option value='waikato'>Waikato</option>
                      <option value='bayOfPlenty'>Bay of Plenty</option>
                      <option value='gisbourne'>Gisbourne</option>
                      <option value='hawkesBay'>Hawkes Bay</option>
                      <option value='taranaki'>Taranaki</option>
                      <option value='manawatuWhanganui'>Manawatū-Whanganui</option>
                      <option value='wellington'>Wellington</option>
                      <option value='tasman'>Tasman</option>
                      <option value='nelson'>Nelson</option>
                      <option value='marlborough'>Marlborough</option>
                      <option value='westCoast'>West Coast</option>
                      <option value='canterbury'>Canterbury</option>
                      <option value='otago'>Otago</option>
                      <option value='southland'>Southland</option>
            </select>
          </div>
        </div>
        

        <h2> Listing Information: </h2>

        <div className="input-grid">
        <div className="form-input">
          <label htmlFor=""> Price: </label>
          <input type="text" 
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          />
        </div>

        <div className="form-input">
          <label htmlFor=""> Image Upload: </label>
          <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
          </div>

        <div className="form-input">
          <label htmlFor=""> Further Information: </label>
          <input 
            type="text"
            onChange={(e) => setInfo(e.target.value)}
            value={info} 
            placeholder="Max 100 Characters"
            maxLength={100}
            />
        </div>
        </div>
        {/* end of second input grid */}
        <button type="submit">Add New Listing</button>
        {error && <div className='error'>{error}</div>}
     
     {/* end of add listing form */}
      </form>

      {/* end of page */}
    </div>
  )
}

export default AddListingForm
