
fetch('http://localhost:3000/quotes?_embed=likes')
   .then(res => res.json())
   .then(quotes => quotes.forEach(quote => getQuotes(quote)))


   function getQuotes(quotes){

     let container = document.createElement('container')
     container.className = 'quotecard'

     let blockquote = document.createElement('blockquote')
     blockquote.className = 'blockquote'
     container.appendChild(blockquote)

     let quoteHolder = document.createElement('p')
     let footer = document.createElement('footer')
     let button1 = document.createElement('button')
     let button2 = document.createElement('button')
     blockquote.appendChild(quoteHolder)
     blockquote.appendChild(footer)
     blockquote.appendChild(button1)
     blockquote.appendChild(button2)

      quoteHolder.innerHTML=`${quotes.quote}`
      footer.innerHTML=`${quotes.author}`
      button1.innerHTML=`likes:${quotes.likes}`
      button2.innerHTML=`Delete`
       

      button2.addEventListener('click', handleDelete)
      button1.addEventListener('click', handleLike)
     
      function handleDelete(e){
        e.target.parentNode.remove()
        permDelete()
       }
    
      function permDelete(){
        fetch('http://localhost:3000/quotes/id', {
            method: 'DELETE'
       })
       .then(res => res.json())
       .then(console.log('deleted'))
      }

      function handleLike(){
        quotes.likes ++

        fetch('http://localhost:3000/likes', {
            method:'POST',
            body: {
               "key": "quoteId"
            
            }
        })
      }


      document.querySelector('#quote-list').appendChild(container)
   }

  
    