import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [theurl, settheurl] = useState([]);


  function updateinpuvalue (evt) {

   const drinks = evt;
   console.log(drinks);
   return (<h1>result:{drinks}</h1>); 
  };
  
  console.log(updateinpuvalue());

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);

      const urll = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );



      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
      );
      settheurl(urll.data.drinks);
      console.log(urll);
      setPosts(response.data.drinks);
      setLoading(false);
      console.log(response);

    };

    loadPosts();
  }, []);
  if (loading) {
    return <h1>drinks is loading please wait</h1>
  };
  return (
    <div>

      <h1 style={{ textAlign: 'center' }} >LOGO</h1>

      <Col style={{ background: 'white' }} md={3} offset={{ md: 5.2 }} >
        <input style={{ desplay: 'flex', textAlign: 'center' }}  onChange={evt => updateinpuvalue(evt.target.value)}
        />
      </Col>


      <Container fluid>

        <Row debug>
          <Col>
            <select>
              <option>Filter by :Ingredients</option>
            </select>

            <input />


          </Col>
          <Col md={10} offset={{ md: 10 }}>

            <select>
              <option>sort by : Date</option>
            </select>
          </Col>


        </Row>


        <Row debug>


          <Col debug md={3.5}>

            <h1  style={{ color: 'green' }}>Drink Results</h1>


           {
              updateinpuvalue()
           }

            

          </Col>


          <Col>
            {theurl.map((i) =>
              <>
                <h4 key={i+1}>Name of the cocktail: {i.strDrink}</h4>
                <h4 key={i+1}>Category of the cocktail: {i.strCategory}</h4>
                <h4 key={i}>Glass of the cocktail: {i.strGlass}</h4>
                <h4 key={i}>Ingredients of the cocktail: {i.strIngredient1},{i.strIngredient2}</h4>
                <h4 key={i}>date: {i.dateModified}</h4>
              </>
            )}

          </Col>

          {theurl.map((i) =>
            <img style={{ color: '' }} src={i.strDrinkThumb} alt="#" />
          )}


        </Row>

      </Container>
    </div>
  );
}

export default App;
