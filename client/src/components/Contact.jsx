import React, { useState, useEffect } from "react";
import "../Contact.css";

const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;

      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  // We are Storing Data 
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((values) => ({ ...values, [name]: value }));
  }

  //Send the data to the backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    console.log(name, email, phone, message)

    const data = await res.json();

    if (!data) {
      console.log("Message not send");
    } else {
      window.alert("Message send Successfully");
      setUserData({ ...userData, message: " " });
    }

  }

  return (
    <>
      <div className="container contact-form">
        <div className="contact-image">
          <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
        </div>
        <form method="POST">
          <h3>Get In Touch</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" name="name" className="form-control" onChange={handleInputs} value={userData.name} placeholder="Your Name *" required />
              </div>
              <div className="form-group">
                <input type="text" name="email" className="form-control" onChange={handleInputs} value={userData.email} placeholder="Your Email *" required />
              </div>
              <div className="form-group">
                <input type='number' name="phone" className="form-control" onChange={handleInputs} value={userData.phone} placeholder="Your Phone Number *" required />
              </div>
              <div className="form-group">
                <input type="submit" name="submit" className="btnContact" onChange={handleInputs} onClick={contactForm} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <textarea name="message" className="form-control" onChange={handleInputs} value={userData.message} placeholder="Your Message *" style={{ width: "100%", height: "150px" }}></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;