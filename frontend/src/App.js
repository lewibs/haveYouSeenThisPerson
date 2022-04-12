import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
  
function App() {
  const [image, setImage] = React.useState({});
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [occupation, setOcupation] = React.useState('');

  React.useEffect(() => {
    newImage();
  }, [])

  React.useEffect(() => {
    image.firstName = fname;
  },[fname]);

  React.useEffect(() => {
    image.lastName = lname;
  },[lname]);

  React.useEffect(() => {
    image.occupation = occupation;
  },[occupation]);

  React.useEffect(() => {
    setFname("");
    setLname("");
    setOcupation("");
  }, [image]);

  function newImage(){
    axios({
      method: 'get',
      url: `https://fakeface.rest/face/json`,
      withCredentials: false,
    })
    .then(res => {
      //generate a random number between 0 and 100
      let random = Math.floor(Math.random() * 100);
      //if the random number is 1 then set the image to this link: https://raw.githubusercontent.com/lewibs/haveYouSeenThisPerson/main/public/initial.png
      if(random < 5){
        setImage({
          ...res.data,
          image_url: "https://raw.githubusercontent.com/lewibs/haveYouSeenThisPerson/frontend/main/public/initial.png"
        })
      } else {
        setImage(res.data);
      }
    });
  }

  function save() {
    if (fname === "" || lname === "" || occupation === "") {
      alert("Please fill out all fields");
    } else {
      newImage();
    }
  }

  return (
    <center id="App">
      <center id="content">
        <h2>HAVE YOU SEEN THIS PERSON???</h2>
        <div className='inputStuff'>
          <img src={image.image_url} alt="randomPerson" width="280" height="280"/>
          <p>
            They aren't a real person. You can make up their info. I am just using the internet to generate a dataset...
          </p>
          <form>
            <div className="input"><TextField label="First Name" onChange={(e)=>{setFname(e.target.value)}} /></div>
            <div className="input"><TextField label="Last Name" onChange={(e)=>{setLname(e.target.value)}} /></div>
            <div className="input"><TextField  label="Occupation" onChange={(e)=>{setOcupation(e.target.value)}} /></div>
          </form>
        </div>
        <br/>
        <div className="submit">
          <span className="butt">
            <Button variant="contained" color="success" onClick={save}>Submit</Button>
          </span>
          <span className='butt'>
            <Button variant="outlined" color="error" onClick={newImage}>Delete</Button>
          </span>
        </div>
      </center>
    </center>
  );
}

export default App;
