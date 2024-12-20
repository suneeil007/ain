import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const HomePagePopup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [popupData, setPopupData] = useState(null); // Store popup data here

    useEffect(() => {
        // Fetch popup data from the API when the component is mounted
        axios.get('https://intellisoftnepal.com.np/ain/public/api/popup')
            .then((response) => {
                if (response.data.success && response.data.data.length > 0) {
                    setPopupData(response.data.data[0]); // Assuming you want the first popup
                    setIsModalOpen(true);
                }
            })
            .catch((error) => {
                console.error('Error fetching popup data:', error);
            });

        console.log('Popup component loaded');
    }, []);

    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            {popupData && (
                <Modal 
                    isOpen={isModalOpen} 
                    onRequestClose={closeModal} 
                    contentLabel="Homepage Popup"
                    ariaHideApp={false}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
                        },
                        content: {
                            width: '60%', // Adjust the width of the modal
                            height: 'auto',
                            maxWidth: '600px', // Max width to prevent excessive size
                            margin: 'auto', // Center the modal
                            padding: '20px', // Padding inside the modal
                            borderRadius: '10px', // Rounded corners
                            backgroundColor: '#fff', // White background for the modal
                            overflow: 'hidden', // Ensure content doesn't overflow
                            zIndex: '9999999999999999999999999',
                            position: 'relative'
                        }
                    }}
                >
                 
                    
                    <img 
                        src={popupData.image} 
                        alt={popupData.image_name || 'Popup Image'} 
                        style={{ width: '100%', height: 'auto', marginBottom: '15px' }} 
                    />
                    <button onClick={closeModal}>Close</button>
                </Modal>
            )}
        </div>
    );
};

export default HomePagePopup;
