function Body({pageName}){
    return (
        <div className='body'>
            <h2>Hello from {pageName}</h2>
        </div>
    )
}

Body.defaultProps ={
    pageName: 'Home'
}

export default Body;