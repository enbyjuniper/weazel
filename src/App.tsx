import React, { useCallback, useRef, useState } from 'react';
import './App.scss';
import pub from './assets/votre_pub_ici.png'
import { Image, Title } from './components';
import { toPng } from 'html-to-image';
import { Header } from './components/Header';

function App() {
  const [downloadName, setDownloadName] = useState('article_weazel');

  const ref = useRef<HTMLDivElement>(null);

  const downloadPNG = useCallback(() => {
    if (ref.current === null) return;

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${downloadName}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, downloadName]);

  return (
    <div className="App">
      <div className='page' ref={ref} spellCheck={false}>
        <Header />
        <article>
          <Image description resizable src="https://picsum.photos/1080/500" />
          <Title />
          <h2 contentEditable>par Michel Michaud</h2>
          <div className="text">
            <span contentEditable className='date'>Los Santos, 1er janvier 2023</span>
            <span contentEditable>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at lorem tempus, malesuada quam eu, tristique justo. Duis ac lectus nec sem tincidunt elementum. Pellentesque eros tortor, tempor vitae ipsum ac, egestas ullamcorper libero. Vivamus feugiat est vel est ultrices pharetra. Vestibulum velit sem, volutpat id nisl sed, mollis facilisis neque. Morbi mollis et massa vitae blandit.<br/><br/>
              Aliquam at placerat lectus. Praesent ornare orci mauris. Fusce vitae nunc bibendum, iaculis nulla nec, ullamcorper nibh. Quisque non ante purus. Morbi ultricies rhoncus massa, sed feugiat nisl dapibus sed. Sed aliquet, mauris vitae cursus commodo, mi quam sodales metus, ac volutpat arcu quam sollicitudin magna. Integer vel elit in ligula convallis faucibus. Duis sit amet libero vitae ligula suscipit porta a non libero. Pellentesque condimentum ut est id suscipit. Pellentesque lobortis libero vel risus facilisis, non tempus quam imperdiet. Etiam vitae libero ultricies massa tristique tristique eget id metus. Cras eget hendrerit odio. Duis tincidunt eros quis accumsan maximus. Nullam iaculis, velit quis ultrices mattis, ipsum magna cursus nibh, nec consectetur urna sapien non elit.<br/><br/>
              Integer eu efficitur lorem, non gravida risus. Nulla facilisi. Ut dictum augue non mi aliquam, quis placerat est lobortis. Praesent euismod augue at neque sagittis, sit amet accumsan nibh aliquam. Praesent nec dignissim ante, eu tincidunt nunc. Integer sed odio est. Sed a est at nunc luctus eleifend.<br/><br/>
              Etiam ultrices, eros id elementum gravida, odio ante fermentum felis, in iaculis elit urna at urna. Nulla fringilla nisi vitae sapien lacinia, porttitor tempus mi venenatis. Integer laoreet erat vulputate tempor volutpat. Aenean eu lorem id felis venenatis sodales. Sed rutrum fermentum felis vel blandit. Pellentesque imperdiet arcu non nulla faucibus, vel porta tellus aliquam. Aliquam dictum lobortis velit, et pharetra metus interdum quis. Aliquam pulvinar diam ut magna pretium mollis ac non tellus. Nullam interdum mattis ipsum, ornare dictum diam viverra a. Praesent commodo condimentum rhoncus. Proin imperdiet ultrices lorem, vitae rhoncus neque commodo vel. Praesent cursus sagittis massa a convallis. Sed sit amet urna et quam congue congue. Fusce porta, justo vel ultricies faucibus, nisl tortor interdum elit, vel tristique sem justo non risus. Curabitur scelerisque felis neque, a venenatis lectus venenatis id.
            </span>
          </div>
          <Image isHidden isBottomAligned description resizable src="https://picsum.photos/1080/500" />
        </article>
        <footer>
          <Image isBottomAligned className='footer-image' src={pub} />
        </footer>
      </div>
      <div className='downloadBar'>
        <input type="text" value={downloadName} onChange={(e)=>setDownloadName(e.target?.value)} />
        <button onClick={downloadPNG}>Download</button>
      </div>
    </div>
  );
}

export default App;
