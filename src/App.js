import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
  
function App() {
  const [image, setImage] = React.useState({});
  const [next, setNext] = React.useState({});
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
    console.log(image)
    console.log(image.image_url);
  }, [image]);

  function newImage(){
    //https://thispersondoesnotexist.com/
    //https://fakeface.rest/face/json
    setImage(next);


    axios({
      method: 'get',
      url: `https://fakeface.rest/face/json`,
      withCredentials: false,
    })
    .then(res => {
      setNext(res.data)
    });
  }

  function save() {
    //axios.post('', image);
    newImage();
  }

  return (
    <center id="App">
      <div className="poster" style={{ 
        backgroundImage: `url("wanted.png")`,
        backgroundSize: "100% 100%",
      }} >
      <center id="content">
        <div className='inputStuff'>
          <img src={(image.image_url)? image.image_url : "https://raw.githubusercontent.com/lewibs/haveYouSeenThisPerson/main/public/initial.png"} alt="randomPerson" width="280" height="280"/>
          <p>
            they aren't actually a real person. You can make up their info. I am just using the internet to generate a dataset...
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
            <Button variant="contained" color="success" onChange={save}>Submit</Button>
          </span>
          <span className='butt'>
            <Button variant="outlined" color="error" onClick={newImage}>Delete</Button>
          </span>
        </div>
      </center>
      </div>
    </center>
  );
}

export default App;
