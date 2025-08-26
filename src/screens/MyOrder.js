import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({})

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localStorage.getItem('userEmail') })
    })
    const response = await res.json()
    setOrderData(response)
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData.orderData && orderData.orderData.order_data.length > 0 ? (
            orderData.orderData.order_data.slice(0).reverse().map(([items, date], index) => (
              <div key={index} className='w-100'>
                <h5 className='m-auto mt-5 text-center'>{new Date(date).toLocaleString()}</h5>
                <hr />
                <div className='row'>
                  {items.map((arrayData, idx) => (
                    <div key={idx} className='col-12 col-md-6 col-lg-3'>
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <img src={arrayData.img} className="card-img-top" alt={arrayData.name} style={{ height: "120px", objectFit: "fill" }} />
                        <div className="card-body">
                          <h5 className="card-title">{arrayData.name}</h5>
                          <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <span className='m-1'>{arrayData.qty}</span>
                            <span className='m-1'>{arrayData.size}</span>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                              ₹{arrayData.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className='text-center mt-5'>No orders found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
