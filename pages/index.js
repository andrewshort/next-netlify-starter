import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { ChatGPTAPI } from 'chatgpt'

export default function Home(data) {
  console.log(JSON.stringify(data));  
  return (
    <div className="container">
      <Head>
        <title>Bedtime Story Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Bedtime Story Factory" />
        
      </main>
      <div class="container">
        {data.returnData.map(d => (<div>{d}<br /></div>))}
        </div>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  
    const api = new ChatGPTAPI({
        apiKey: process.env.OPEN_API_KEY
      })
    
      var q = context.query.q;

      if (!q) {
        q='puppies';
      }
      const res = await api.sendMessage('Write a bedtime story for kids about ' + q)

      var lines = res.text.split(/\r?\n/);

  // Pass data to the page via props
  return { props: { returnData: lines } }
}
