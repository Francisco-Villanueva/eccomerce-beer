import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export const OneProduct = () => {
  const { id } = useParams()
  const [book, setBook] = useState({})

  useEffect(() => {
    axios
      .get(`/rutaMostrarTodosLosLibros/${id}`)
      .then((res) => {
        setBook(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
    {/* <span>{book.volumeInfo.title}</span>
    <span>{book.volumeInfo.publisher}</span>
    <span>{book.volumeInfo.publishedDate}</span>
    <span>{book.volumeInfo.pageCount}</span>
    <span>{book.volumeInfo.averageRating}</span>
    <span>{book.volumeInfo.categories.join(", ")}</span>
    <span>{book.volumeInfo.language}</span>
    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
    <span>{book.searchInfo.textSnippet}</span> */}
  </div>
  )
}
