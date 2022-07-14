import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import  './Login.css';
import {Link,useNavigate} from  'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import HeaderLogin from './HeaderLogin';
import Footer from './Footer';






const useState = React.useState


function Login(props)
{
  
   const [state,setState] = useState({
        credentials :{
            username : '',
            password : ''
        }})

    const [message,setMessage] = useState("")
 
      const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)"
      });
      const isMobileOrTablet = useMediaQuery({
        query: "(max-width: 1224px)"
      });
      /*const isMobile = useMediaQuery({
        query: "(max-width: 786px)"
      });
yn
      const isRetina = useMediaQuery({
        query: "(min-resolution: 2dppx)"
      });*/
    
       
          
   const navigate = useNavigate()

   

    const connection = (e)=>
    {
        fetch('https://congoairwaysapi.herokuapp.com/api/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.credentials)
          })
          .then( data => data.json())
          .then(
            data => {  
              if (data.username == state.credentials.username)
              {

                props.setUsername(data.username)
                setState({credentials:{username :data.username}})
                 
                navigate('/home')
              } 
              else
              {
               
                setMessage("accès réfusé")
               navigate('/')
              }
              
              
              
            }
          )
          .catch( (error) =>
            {
              setMessage("accès réfusé")
              navigate('/')
            } )
    }

    const inputChanged = (event)=>
    {
         const cred = state.credentials;
         cred[event.target.name] = event.target.value;
         setState({credentials:cred})
    }

   

    return (

<>
 <HeaderLogin />
{isDesktop && <Container className='my-auto justify-content-center text-center bordure' style={{marginTop:70,backgroundColor:'white',width:750}} >


    <Row className='justify-content-center mb-5 pt-3' >
        <Col>
        <Image src={require('./logo_new.jpg')}  className='rounded-pill ' style={{width:300}}></Image>
        </Col>
    </Row>
      
<Form>
    <Row className='justify-content-center'>
        <Col xs={6} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="nom d'utilisateur"  name="username"
        value ={state.credentials.username} onChange={inputChanged} autoFocus/>
        
         </Form.Group>
        </Col>
    </Row>
  
    <Row className='justify-content-center'>
        <Col xs={6}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Control type="password" placeholder="mot de passe" name="password"
         value ={state.credentials.password} onChange={inputChanged} />

         </Form.Group>
        </Col>
    </Row>
  
    <Row className='justify-content-center pb-3'>
        <Col  xs={12}>    
        <Link to="" style={{color:'white',textDecorationLine:'none'}}> 
        
        <Button variant="primary" type="submit" onClick={e=>connection(e)}>
        connexion
        </Button>
        </Link>
        </Col>
    </Row>
    <Row className='justify-content-center pb-3'>
        <Col  xs={"auto"}>    
        <p className='pt-3 text-danger'><b>{message}</b></p>
        </Col>
    </Row>
  


</Form>
</Container> }

{isMobileOrTablet && <Container className='my-center justify-content-center text-center bordure' style={{marginTop:50,backgroundColor:'white'}} >
    


    <Row className='justify-content-center mb-5 pt-3' >
        <Col xs={"auto"}>
        <Image src={require('./logo_new.jpg')}  className='rounded-pill ' style={{width:300}}></Image>
        </Col>
    </Row>
      
<Form>
    <Row className='justify-content-center'>
        <Col xs={"auto"} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="nom d'utilisateur"  name="username"
        value ={state.credentials.username} onChange={inputChanged} autoFocus/>
        
         </Form.Group>
        </Col>
    </Row>
  
    <Row className='justify-content-center'>
        <Col xs={"auto"}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Control type="password" placeholder="mot de passe" name="password"
         value ={state.credentials.password} onChange={inputChanged} />

         </Form.Group>
        </Col>
    </Row>
  
    <Row className='justify-content-center pb-3'>
        <Col  xs={"auto"}>    
        <Link to="" style={{color:'white',textDecorationLine:'none'}}> 
        
        <Button variant="primary" type="submit" onClick={e=>connection(e)}>
        connexion
        </Button>
        </Link>
        </Col>
    </Row>

    <Row className='justify-content-center pb-3'>
        <Col  xs={"auto"}>    
        <p className='pt-3 text-danger'><b>{message}</b></p>
        </Col>
    </Row>
  


</Form>
</Container> }


<Footer />
</>
)
}

export default Login;