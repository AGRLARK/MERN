import React,{useState,useEffect} from "react";
import "../App.css";

const Home = () => {

  const [userName, setUserName] = useState('');
  const [ show , setShow] = useState(false)

  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <div className="home-center">
      <h3><p className="pt-5" id="p_span"><span>Welcome</span></p></h3>
      <h1>{userName}</h1>
      <h1> {show ? 'Happy, to see you back' :  'WE ARE THE MERN DEVELOPER' }</h1>
    </div>
  );
};

export default Home;
