import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Clarifai, { COLOR_MODEL } from 'clarifai';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Sign';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './App.css';

window.process = {
  env: {
      NODE_ENV: 'development'
  }
}

const particlesInit = async (main) => {
  console.log(main);
  await loadFull(main);
}; //declaring particles functions

const particlesLoaded = (container) => {
  console.log(container);
};

// const app = new Clarifai.App({
//   apikey: "dd8b7140f884496b870192eb042a0b92"
// }) //adding in the API key

const app = new Clarifai.App({
  apiKey: '7e7e8e802541472a8fc9b1a6e0d54f8c'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('userImage');
   const width = Number(image.width); //image width
   const height = Number(image.height); //image height
   return { //object is going to fill up the box object and going to get 4 dots for the face and wrap in a boarder
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height),
   }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log("Error", err)
      );
  }

  onRouteChange = () => {
    this.setState({route: 'home'})
  } 

  render () {
    return (
      <div className="App">
        <Particles className="particles" // particles dev menu
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <Navigation />
        { this.state.route === "signin" 
          ? <Signin onRouteChange={this.onRouteChange} />
          : <div> 
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onSubmit={this.onSubmit}/>
          </div>
        }
          <FaceRecognition 
            box={this.state.box}
            imageURL={this.state.imageURL}/>
      </div>
      );
    }
}

export default App;
