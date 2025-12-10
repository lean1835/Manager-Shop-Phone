import React, { useState } from 'react'
import './BannerComponent.css'
function BannerComponent() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        "/banner-mid1.png",
        "/banner-mid2.png",
        "/banner-mid3.png",
        "/banner-mid4.png"
    ];
    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % items.length;
        setCurrentIndex(nextIndex);
    };
    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        setCurrentIndex(prevIndex);
    };
    return (
        <>
            <div class='banner'>
                <div class='banner-promotion'>
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="/banner1.png" class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="/banner2.png" class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="/banner3.png" class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='banner-mid'>
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex justify-content-between">
                                    <img src={items[currentIndex]} className="carousel-image" alt="..." />
                                    <img src={items[(currentIndex + 1) % items.length]} className="carousel-image" alt="..." />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" onClick={handleNext}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BannerComponent;