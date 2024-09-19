import { useNavigate } from "react-router-dom"
import './add-listing.scss'
import { useState } from "react";
import { useListingsContext } from "../../hooks/useListingsContext";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";


const AddListingForm = () => {
  const {dispatch} = useListingsContext();
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
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user.email

    const formData = new FormData();
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('size', size);
    formData.append('location', location);
    formData.append('number_available', number);
    formData.append('additional_info', info);
    formData.append('price', price);
    formData.append('user_id', user_id);
    formData.append('image', image);

    try {
      const response = await axios.post(`${baseURL}/api/listings/`, formData, {
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
      dispatch({ type: 'CREATE_LISTINGS', payload: response.data }); // Uncomment if using Redux
    } catch (error) {
      setError(error.message);
    }
  };
  const handleBack = () => {
    navigate(-1);
};

  return (
    <div className='add-listing-page'>
      {/* back button and title */}
      <div className='backbtn-title'>
        <div className='back-btn' onClick={handleBack}>
          <FaChevronLeft /> Back </div>      
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
            <option value=''>Please Select</option>
                <option value='puppy'>Puppy</option>
                <option value='junior'>Junior</option>
                <option value='adult'>Adult</option>
                <option value='mature'>Mature</option>
                <option value='senior'>Senior</option>
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
              <option value='xlarge'>Extra Large</option>
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
        <button onClick={() => navigate(-1)}>Add New Listing</button>
        {error && <div className='error'>{error}</div>}
     
     {/* end of add listing form */}
      </form>

      {/* end of page */}
    </div>
  )
}

export default AddListingForm
