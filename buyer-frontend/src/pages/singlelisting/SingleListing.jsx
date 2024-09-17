import './singlelisting.scss';

import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

import { FaChevronLeft } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SingleListing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState('');

    const user = JSON.parse(localStorage.getItem('user'))

    const { id } = useParams();
    const navigate = useNavigate();

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/comments/listings/${listing._id}/comments`, 
                {
                    text: commentText,
                    user_id: 'user.email',
                }
            )

            const newComment = response.data;
            setListing(prevListing => ({
                ...prevListing,
                comments: [...prevListing.comments, newComment]
            }));

            setCommentText('');
        } catch (err) {
            console.error("Failed to add comment", err)
        }
    }

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/listings/${id}`);
                setListing(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!listing) return <div>No listing found.</div>;

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='single-listing-page'>
            <div className='single-page-top'>
                <div className='single-listing-back-btn' onClick={handleBack}>
                    <FaChevronLeft /> Back
                </div>
                <div className='single-listing-header'>
                    <h2>{listing.breed}</h2>
                </div>
            </div>
            <div className='single-page-img'>
                <img src={listing.image} alt={`Image of ${listing.breed}`} />
            </div>
            <div className='single-page-info'>
                <div className='listing-info'>
                    <h3>{listing.breed}</h3>
                    <div className='listing-tags'>
                        <p className='gender-tag'>{listing.gender}</p>
                        <p className='age-tag'>{listing.age}</p>
                        <p className='available-tag'>{listing.number_available}</p>
                        <p className='price-tag'>{listing.price}</p>
                        <p className='size-tag'>{listing.size}</p>
                        <p className='location-tag'>{listing.location}</p>
                    </div>
                    <h4>Further Information</h4>
                    <p className='additional-info'>{listing.additional_info}</p>
                    <p className='date'>
                        Created {formatDistanceToNow(new Date(listing.createdAt), { includeSeconds: true })} ago
                    </p>
                </div>
                <div className='seller-info'>
                    <h3>{listing.user_id}</h3>
                    <button>Contact Now</button>
                </div>
                
            </div>
            <div className='comments-box'>
            <h4>Comments</h4>
            <div className='add-comment'>
                <input
                    type='text'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                />
            <button onClick={handleAddComment}>Add Comment</button>
            </div>
                <div className='comments-list'>
                  
                        {listing.comments.map(comment => (
                            <div key={comment._id} className='comment'>
                                <p><strong>{comment.user_id}:</strong> {comment.text}</p>
                                <p className='comment-date'>
                                    {formatDistanceToNow(new Date(comment.createdAt), { includeSeconds: true })} ago
                                </p>
                            </div>
                        ))}
                    
                </div>
                
        
            </div>
        </div>
    );
};

export default SingleListing;