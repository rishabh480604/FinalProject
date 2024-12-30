import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; // Make sure to import your CSS file
import { AlignCenter } from 'lucide-react';

const Home = () => {
    return (
        <div className="home-container">
   
            
            {/* Scrolling Images Section */}
            <div className="scrolling-box">
                <div className="scrolling-container">
                    <Link to="/BookServices">
                        <img src="/images/image1.jpeg" alt="Image 1" className="scroll-image" />
                    </Link>
                    <Link to="/MarketPlace">
                        <img src="/images/image2.jpg" alt="Image 2" className="scroll-image" />
                    </Link>
                    <Link to="/BookServices">
                        <img src="/images/image3.jpg" alt="Image 3" className="scroll-image" />
                    </Link>
                    <Link to="/MarketPlace">
                        <img src="/images/image4.jpeg" alt="Image 4" className="scroll-image" />
                    </Link>
                    <Link to="/Drone">
                        <img src="/images/image5.png" alt="Image 5" className="scroll-image" />
                    </Link>
                    {/* Duplicate images to create an endless loop effect */}
                    <Link to="/BookServices">
                        <img src="/images/image1.jpeg" alt="Image 1" className="scroll-image" />
                    </Link>
                    <Link to="/MarketPlace">
                        <img src="/images/image2.jpg" alt="Image 2" className="scroll-image" />
                    </Link>
                    <Link to="/BookServices">
                        <img src="/images/image3.jpg" alt="Image 3" className="scroll-image" />
                    </Link>
                    <Link to="/MarketPlace">
                        <img src="/images/image4.jpeg" alt="Image 4" className="scroll-image" />
                    </Link>
                    <Link to="/Drone">
                        <img src="/images/image5.png" alt="Image 5" className="scroll-image" />
                    </Link>
                </div>
            </div>

            {/* About Section */}
            <section className="about-section">
                <h2>About KPAC</h2>
                <p>
                    At <strong>Kisan Pragati Abhyaan Centre (KPAC)</strong>, we are dedicated to empowering India’s farmers with tools, knowledge, and access to resources that drive growth and prosperity in modern agriculture. Our platform is a one-stop solution for farmers to easily register, stay informed, and connect with the agricultural marketplace.
                </p>
                <p>
                    <strong>Our Services:</strong>
                </p>
                <ul>
                    <li><strong>Agricultural Drones:</strong> KPAC provides insights into the latest drone technology designed for sowing seeds, spraying crops, and enhancing productivity. These advanced drones are built to ensure optimal coverage and efficiency in every field.</li>
                    <li><strong>Soil Testing Services:</strong> We understand that the quality of soil determines the health of the crops. Our soil testing service offers farmers precise data on soil composition, helping them make well-informed decisions for sustainable and healthy crop growth.</li>
                    <li><strong>Pesticides and Insecticides:</strong> KPAC connects farmers with information and resources for safe and effective pesticide and insecticide options. We prioritize eco-friendly solutions that protect crops without compromising the environment.</li>
                </ul>
                <p>
                    Our mission is to create a supportive environment where farmers can access reliable agricultural products and services, ultimately achieving higher yields and sustainable farming practices. Whether it’s using cutting-edge technology or eco-friendly agricultural inputs, KPAC stands committed to the progress and well-being of Indian farmers.
                </p>
          

    
                <h2 >Contact Us</h2>
                <div className="contact">
                    <p>If you have any inquiries, feel free to reach out:</p>
                    <p><strong>Phone Number: +91 9876543210 </strong></p>
                    <p><strong>Instagram:</strong> <a href="https://www.instagram.com/kpac" target="_blank" rel="noopener noreferrer">kpac</a></p>
                    <p><strong>Twitter:</strong> <a href="https://twitter.com/kpac" target="_blank" rel="noopener noreferrer">kpac</a></p>
                </div>
            </section>
        </div>
    );
};

export default Home;
