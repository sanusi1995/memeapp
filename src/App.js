import React from 'react';
import './App.css';
import html2canvas from 'html2canvas';

class App extends React.Component {
  state = {
    topText: '',
    bottomText: '',
    allMemeImgs: [],
    randomImg: ''
  };

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(content =>
        this.setState({
          allMemeImgs: content.data.memes
        })
      );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const rand = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    this.setState({
      randomImg: rand
    });
  };

  handleReset = () => {
    this.setState({
      topText: '',
      bottomText: '',
      randomImg: ''
    });
  };

  handleDownload = () => {
    const { randomImg, topText, bottomText } = this.state;
  
    const img = new Image();
    img.src = randomImg;
    img.crossOrigin = 'Anonymous'; 
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
     
      canvas.width = img.width;
      canvas.height = img.height;
  
  
      ctx.drawImage(img, 0, 0);
  
      
      ctx.fillStyle = 'white'; 
      ctx.strokeStyle = 'black'; 
      ctx.lineWidth = 2;
  
     
      ctx.font = 'bold 40px Impact'; 
      ctx.textAlign = 'center';
      ctx.fillText(topText, canvas.width / 2, 50);
      ctx.strokeText(topText, canvas.width / 2, 50);
  
    
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20); 
      ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'meme.png';
      link.click();
    };
  };
  

  render() {
    return (
      <div>
        <svg className='header-logo'>
          <path id="curve" d="M 50 100 Q 100 200 150 100 Q 200 0 250 100 Q 300 200 350 100" />
        </svg>

        <h1 className="smile-text">&#129297; Welcome To Meme World! &#129297;</h1>

        <form className='meme-form' onSubmit={this.handleSubmit}>
          <input
            className='firstchild'
            placeholder='Enter Meme Header Description'
            type='text'
            value={this.state.topText}
            name='topText'
            onChange={this.handleChange}
            required
          />
          <input
            className='lastchild'
            placeholder='Enter Meme Bottom Description'
            type='text'
            value={this.state.bottomText}
            name='bottomText'
            onChange={this.handleChange}
            required
          />
          <div className='generate-reset'>
            <button className='lastchild-btn'>Generate</button>
            <button type="button" onClick={this.handleReset} className="reset-button">Reset</button>
          </div>
        </form>
        <br />
        <div className='meme' id='meme'>
          {this.state.randomImg && (
            <>
              <img src={this.state.randomImg} alt='meme' />
              <h2 className='top'>{this.state.topText}</h2>
              <h2 className='bottom'>{this.state.bottomText}</h2>
            </>
          )}
        </div>
        {this.state.randomImg && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={this.handleDownload} className="download-button">Download Meme</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
