import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';

const CLIENT_ID = import.meta.env.REACT_APP_CLIENT_ID //"ac778b50303747ef91231ce047fe7c2e";
const CLIENT_SECRET = import.meta.env.REACT_APP_CLIENT_SECRET //"4259ed2ecd444230be7b9daf82e952b0";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {

    var authParameters ={
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    console.log("search for " + searchInput);

    // get artist id
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
      .then(response => response.json())
      .then(data => { return  data.artists.items[0].id}) // 24:40

    console.log("artist id is" + artistID)

    // var followers = await fetch('https://api.spotify.com/v1/artists/')
  }

  return (
    <>
      <div className='App'>
        <Container>
          <InputGroup className='mb-3' size='lg'>
            <FormControl
              placeholder='Search For Artist'
              type='input'
              onKeyPress={event => {
                if (event.key == "Enter") {
                  search();
                }
              }}
              onChange={event => setSearchInput(event.target.value)}
            />
            <Button onClick={() => {console.log("CLicked buttons")}}>Search</Button>
          </InputGroup>
        </Container>
      </div>
    </>
  )
}

export default App
