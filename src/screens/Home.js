import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (err) {
      console.error("Error fetching food data:", err);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />

      <div>
        <div id="foodCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-inner" id="carousel">

            {/* 🔎 Search Box Overlay */}
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
              </div>
            </div>

            {/* 🍔 Carousel Items */}
            {[
              { src: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80", alt: "Pasta" },
              { src: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=80", alt: "Biryani / Rice" },
              { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80", alt: "Burger" },
              { src: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=80", alt: "Dessert" }
            ].map((item, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                <img src={item.src} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt={item.alt} />
              </div>
            ))}

          </div>

          {/* ⏪ ⏩ Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#foodCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#foodCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* 🍴 Food Categories */}
      <div className='container'>
        {foodCat.length !== 0 &&
          foodCat.map((cat) => (
            <div className='row mb-3' key={cat._id}>
              <div className='fs-3 m-3'>{cat.CategoryName}</div>
              <hr
                id="hr-success"
                style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }}
              />

              {foodItems.length !== 0 ? (
                foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === cat.CategoryName &&
                      item.name?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodName={filteredItem.name}
                        item={filteredItem}
                        options={filteredItem.options[0]}
                        ImgSrc={filteredItem.img}
                      />
                    </div>
                  ))
              ) : (
                <div>No Such Data</div>
              )}
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
