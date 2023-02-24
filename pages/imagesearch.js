import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home(data) {
  console.log(JSON.stringify(data));  
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        {data.returnData.photos.map((item,index)=>{
        return (
          

         <div>
          <h4>{item.title}</h4>
          <img src={item.url}></img>
          <div>
            {item.tags.photo.tags.tag.map((tagItem, tagIndex) => {
              return (
                <span>{tagItem.raw} |</span>
              )
            })}
          </div>
         </div>
          
         )
        
          
     })}

        
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  var data_old = {
      imgUrl: 'https://i.ebayimg.com/images/g/mjUAAOSwojRYSx8L/s-l1600.jpg'
  };

  var lat = 37.282 - Math.random();
  var lng = -86.141 - Math.random();

  lat = 40.282;
  lng = -86.041;

  const res = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=` + process.env.FLICKR_KEY +`&has_geo=1&extras=geo&lat=` + lat + `&lon=` + lng + `&radius=5&format=json&nojsoncallback=1`)
  const data = await res.json()


  var returnData = {
    photos: []
  };

  for (var i = 0; i < data.photos.photo.length && i < 20; i++) {
    var photo = data.photos.photo[i];
    
    const tagResponse = await fetch(`https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=d6604d8d7191bf60573307fabdddc2f4&photo_id=` + photo.id + `&format=json&nojsoncallback=1`)
    const tagData = await tagResponse.json()
    console.log(tagData);


    // http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}.jpg 
    var url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';  
    
    returnData.photos.push({
        
            id: photo.id,
            latitude: photo.latitude,
            longitude: photo.longitude,
            url: url,
            title: photo.title,
            tags: tagData
        
    });

  }

  console.log(returnData);
  // Pass data to the page via props
  return { props: { returnData } }
}
