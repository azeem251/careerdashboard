import React,{useEffect } from 'react'

const TitleChange = ({ title, children }) => {
    useEffect(() => {
        document.title = title;
      }, [title]);
    
      return children;
}

export default TitleChange
