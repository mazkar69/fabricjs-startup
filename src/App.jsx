import React, { useEffect, useRef, useState } from 'react'
import { fabric } from "fabric";

const App = () => {

  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [svg, setSvg] = useState()

  const fabricRef = useRef(null);
  const canvasRef = useRef(null);




  useEffect(() => {

    const fabricConfig = {
      height: 800,
      width: 800,
      backgroundColor: 'white',
      selection: false,
      renderOnAddRemove: true,

    }


    const initFabric = () => {
      fabricRef.current = new fabric.Canvas(canvasRef.current, fabricConfig).loadFromJSON(`
       {"version":"5.3.0","objects":[{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":19.85,"top":19.67,"width":150,"height":50,"fill":"#926868","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":632.89,"top":734.84,"width":150,"height":50,"fill":"#926868","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":20.82,"top":590.61,"width":150,"height":50,"fill":"#2b435a","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.4,"scaleY":3.75,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":720.42,"top":21.89,"width":150,"height":50,"fill":"#2b435a","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.4,"scaleY":3.75,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":275.26,"top":237.33,"width":1280,"height":1280,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.2,"scaleY":0.2,"angle":0,"flipX":true,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"id":"qr","src":"https://cdn.pixabay.com/photo/2015/10/11/10/13/internet-982074_1280.jpg","crossOrigin":null,"filters":[]},{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":279.94,"top":171.98,"width":228.83,"height":45.2,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Comic Sans","fontWeight":"normal","fontSize":40,"text":"Scan QR code","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"}],"background":"white"}`);
    };



    const disposeFabric = () => {
      fabricRef.current.dispose();
    };

    initFabric();

    /* Event Listeners.  */
    fabricRef.current.on('mouse:down', function (options) {
      setSelectedObject(options.target)     //Or we can also use fabricRef.current.getActiveObject()
    });


    //set backgorud img in canvas.
    // fabric.Image.fromURL("https://cdn.pixabay.com/photo/2016/06/19/18/27/background-1467365_1280.jpg", function (img) {
    //   // add background image
    //   fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current), {
    //     scaleX: fabricRef.current.width / img.width,
    //     scaleY: fabricRef.current.height / img.height
    //   });
    // });

    return () => {
      disposeFabric();
    };
  }, []);




  const toggleDrawingMode = (mode) => {
    fabricRef.current.isDrawingMode = mode;
    fabricRef.current.freeDrawingBrush.width = 4;        //For width
    fabricRef.current.freeDrawingBrush.color = "red";     //Color
    fabricRef.current.renderAll();              //Refresh the canvas, otherwise it will show old output
  }

  const deleteObject = () => {
    if (selectedObject) {
      console.log(selectedObject.type)
      fabricRef.current.remove(selectedObject);
      setSelectedObject(null);
    }
  }

  const handleColorChange = (e) => {
    const obj = selectedObject;
    obj.set({ fill: e.target.value })
    fabricRef.current.renderAll()
  }

  const stringifyConvas = () => {

    console.log(JSON.stringify(fabricRef.current))

    // same as above, first it will convert into json and then stringify the json object. Note toJSON() is the canvas method not the javascript method.
    // console.log(JSON.stringify(fabricRef.current.toJSON()))      
  }



  const jsonObject = () => {

    console.log(fabricRef.current.toJSON())
  }


  const toSVG = () => {
    console.log(fabricRef.current.toSVG())
    setSvg(fabricRef.current.toSVG());
  }

  const downloadImage = () => {

    if (!svg) return;

    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'image.png'; // Change to 'image.jpg' for JPG
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 'image/png'); // Change to 'image/jpeg' for JPG
    };

    img.src = url;
  };

  const handleQrChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        fabric.Image.fromURL(dataUrl, function (img) {
          // Assuming the QR image has a specific ID or some identifier
          const qrObject = fabricRef.current.getObjects().find(obj => obj.id === 'qr');
          if (qrObject) {
            fabricRef.current.remove(qrObject);
          }
          img.set({ id: 'qr', left: qrObject.left, top: qrObject.top, angle: qrObject.angle,id:"qr",width:1280,height:1280 }); // Set the new image to the old QR image's position and properties
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };


  // -------Copy and paste ------------------------------------------

  var _clipboard;
  function Copy() {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.

    // console.log(fabricRef.current.getActiveObject());

    fabricRef.current.getActiveObject()?.clone(function (cloned) {
      _clipboard = cloned;
    });
  }

  function Paste() {
    // clone again, so you can do multiple copies.
    _clipboard?.clone(function (clonedObj) {
      fabricRef.current.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(function (obj) {
          fabricRef.current.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        fabricRef.current.add(clonedObj);
      }
      _clipboard.top += 10;
      _clipboard.left += 10;
      fabricRef.current.setActiveObject(clonedObj);
      fabricRef.current.requestRenderAll();
    });
  }

  // -------------------------

  const addRect = () => {
    const rect = new fabric.Rect({
      top: 150,
      left: 50,
      width: 150,
      height: 50,
      fill: "gray",
      // angle: 45
    });

    fabricRef.current.add(rect);
  }

  const addCircle = () => {
    const shape = new fabric.Circle({
      radius: 20, fill: 'green', left: 100, top: 100
    });

    fabricRef.current.add(shape);
  }

  const addTriangle = () => {
    const shape = new fabric.Triangle({
      width: 30, height: 50, fill: 'blue', left: 50, top: 50
    });

    fabricRef.current.add(shape);
  }

  const addImg = () => {
    // const imgUrl = "https://cdn.pixabay.com/photo/2022/02/23/20/25/card-7031432_1280.png";
    const imgUrl = "https://cdn.pixabay.com/photo/2015/10/11/10/13/internet-982074_1280.jpg";

    fabric.Image.fromURL(imgUrl, function (oImg) {
      // scale image down, and flip it, before adding it onto canvas
      oImg.scale(0.2).set('flipX', true);
      fabricRef.current.add(oImg);
    });
  }

  const addText = () => {

    const text = new fabric.Text('hello world', {
      left: 100,
      top: 100,
      fontFamily: "Comic Sans"
    });

    fabricRef.current.add(text);
  }
  const addIText = () => {

    const text = new fabric.IText('hello world', {
      left: 100,
      top: 100,
      fontFamily: "Comic Sans"
    });

    fabricRef.current.add(text);
  }


  

  //Load from json string. 
  const loadCanvasFromJSON = () => {
    if (jsonInput) {
      fabricRef.current.loadFromJSON(jsonInput, fabricRef.current.renderAll.bind(fabricRef.current), (o, object) => {
        console.log('Loaded object:', object);
      });
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
      <canvas ref={canvasRef} style={{ border: "12px solid gray", marginBottom: "10px", borderRadius: "20px" }} />

      <div style={{ marginTop: "30px" }}>

        <button className='' onClick={(e) => Copy()} disabled={!selectedObject} > Copy</button>
        <button className='' onClick={(e) => Paste()} disabled={!selectedObject} > Paste</button>
        <button className='' onClick={(e) => addRect()} > Add Rect</button>
        <button className='' onClick={(e) => addCircle()} > Add Circle</button>
        <button className='' onClick={(e) => addTriangle()} > Add Triangle</button>
        <button className='' onClick={(e) => addImg()} > Add Image</button>
        <button className='' onClick={(e) => addText()} > Add Text</button>
        <button className='' onClick={(e) => addIText()} > Add IText</button>
        <button className='' onClick={e => { toggleDrawingMode(!isDrawingMode); setIsDrawingMode(!isDrawingMode) }} > {isDrawingMode ? "Stop" : "Start"} Drawing</button>
        <button className='' onClick={e => deleteObject()} disabled={!selectedObject} > Delete</button>
        <input type="color" disabled={!selectedObject} onChange={e => handleColorChange(e)} />
        <button className='' onClick={(e) => stringifyConvas()} > Stringify</button>
        <button className='' onClick={(e) => jsonObject()} > jsonObject</button>
        <button className='' onClick={(e) => toSVG()} > toSVG</button>
        <button className='' onClick={downloadImage} > download</button>
      </div>
      <button className='' onClick={() => document.getElementById('qr-input').click()}>Add QR</button>
      <input
        id="qr-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleQrChange}
      />
    </div>
  )

}

export default App